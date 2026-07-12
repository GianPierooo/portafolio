import { NextResponse } from 'next/server';
import { retrieve } from '@/lib/rag';

/**
 * API Route: POST /api/chat  —  Demo RAG "Pregúntale a mi IA" (§6.1)
 *
 * VERSIÓN LITE: hace retrieval real sobre la base de conocimiento (lib/rag) y
 * "genera" la respuesta a partir de contenido curado, transmitiéndola como un
 * stream de eventos NDJSON que reflejan el pipeline: retrieval → context → generación.
 *
 * PARA CONECTAR EL LLM REAL (cuando Gian lo indique):
 *   1. Añadir la API key como variable de entorno en Vercel (NO en el repo).
 *   2. En la fase de "generación", sustituir el stream de `answer` por la llamada
 *      real al LLM (Claude/OpenAI) pasando `result.chunks` como contexto RAG.
 *   3. El contrato de streaming y el rate limiting ya están listos; el frontend
 *      no necesita cambios.
 */

export const runtime = 'nodejs';

/* --------------------------- Rate limiting ---------------------------- */
/**
 * Best-effort en memoria (por instancia de lambda). Suficiente para una demo.
 * En producción con LLM real: usar un store distribuido (Upstash/Redis).
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 12;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

/* ------------------------------- Handler ------------------------------ */

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas preguntas seguidas. Espera un momento e inténtalo de nuevo.' },
      { status: 429 }
    );
  }

  let question = '';
  let reducedMotion = false;
  try {
    const body = await request.json();
    question = typeof body?.question === 'string' ? body.question.slice(0, 500) : '';
    reducedMotion = body?.reducedMotion === true;
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 });
  }

  if (!question.trim()) {
    return NextResponse.json({ error: 'Falta la pregunta' }, { status: 400 });
  }

  const result = retrieve(question);

  const encoder = new TextEncoder();
  const send = (
    controller: ReadableStreamDefaultController,
    event: Record<string, unknown>
  ) => controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));

  const sleep = (ms: number) =>
    reducedMotion ? Promise.resolve() : new Promise((r) => setTimeout(r, ms));

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // 1) Retrieval — qué fragmentos se recuperaron
        send(controller, {
          type: 'retrieval',
          chunks: result.chunks.map((c) => ({ id: c.id, label: c.label })),
          score: result.score,
        });
        await sleep(450);

        // 2) Context — ensamblado del contexto RAG
        send(controller, { type: 'context', count: result.chunks.length });
        await sleep(350);

        // 3) Generación — stream palabra por palabra
        send(controller, { type: 'generation_start' });
        const words = result.faq.answer.split(' ');
        for (let i = 0; i < words.length; i++) {
          send(controller, { type: 'token', value: words[i] + (i < words.length - 1 ? ' ' : '') });
          await sleep(28);
        }

        send(controller, { type: 'done' });
      } catch {
        send(controller, { type: 'error', message: 'Error generando la respuesta' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
