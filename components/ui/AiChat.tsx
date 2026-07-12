'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Search, Layers, Cpu, Send, CornerDownLeft } from 'lucide-react';
import { faqs } from '@/lib/rag';
import { cn } from '@/lib/utils';

type Stage = 'idle' | 'retrieving' | 'context' | 'generating' | 'done';

interface RetrievedChunk {
  id: string;
  label: string;
}

/**
 * AiChat — demo RAG "Pregúntale a mi IA" (§6.1, versión lite).
 * Muestra el pipeline retrieval → context → generación y transmite la respuesta
 * en streaming desde /api/chat. Respeta prefers-reduced-motion.
 */
export default function AiChat() {
  const reduced = useReducedMotion();
  const [input, setInput] = useState('');
  const [question, setQuestion] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [chunks, setChunks] = useState<RetrievedChunk[]>([]);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const busy = stage !== 'idle' && stage !== 'done';
  const abortRef = useRef(false);

  const ask = useCallback(
    async (q: string) => {
      const query = q.trim();
      if (!query || busy) return;

      setQuestion(query);
      setInput('');
      setError('');
      setChunks([]);
      setAnswer('');
      setStage('retrieving');
      abortRef.current = false;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: query, reducedMotion: reduced ?? false }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || 'No se pudo obtener respuesta.');
          setStage('idle');
          return;
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done || abortRef.current) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.trim()) continue;
            const ev = JSON.parse(line);
            switch (ev.type) {
              case 'retrieval':
                setChunks(ev.chunks);
                break;
              case 'context':
                setStage('context');
                break;
              case 'generation_start':
                setStage('generating');
                break;
              case 'token':
                setAnswer((prev) => prev + ev.value);
                break;
              case 'done':
                setStage('done');
                break;
              case 'error':
                setError(ev.message || 'Error generando la respuesta.');
                setStage('idle');
                break;
            }
          }
        }
        setStage((s) => (s === 'idle' ? s : 'done'));
      } catch {
        setError('Error de conexión. Inténtalo de nuevo.');
        setStage('idle');
      }
    },
    [busy, reduced]
  );

  const stageIndex = { idle: -1, retrieving: 0, context: 1, generating: 2, done: 3 }[stage];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass rounded-2xl border border-slate-800 p-6 sm:p-8">
        {/* Header del widget */}
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg border border-accent-ai/40 bg-accent-ai/10 p-2">
            <Sparkles className="h-5 w-5 text-accent-ai" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Pregúntale a mi IA</h3>
            <p className="font-mono text-xs text-slate-500">
              retrieval → context → generación · corre sobre mi arquitectura RAG
            </p>
          </div>
        </div>

        {/* Pipeline visible */}
        <PipelineBar stageIndex={stageIndex} chunks={chunks} reduced={!!reduced} />

        {/* Área de respuesta */}
        <div
          className="mt-5 min-h-[7rem] rounded-xl border border-slate-800 bg-slate-950/60 p-4"
          aria-live="polite"
        >
          {stage === 'idle' && !error && (
            <p className="text-sm text-slate-500">
              Elige una pregunta o escribe la tuya. Respondo sobre mi perfil, stack cloud/IA y proyectos.
            </p>
          )}
          {error && <p className="text-sm text-red-400">{error}</p>}
          {question && !error && (
            <>
              <p className="mb-2 font-mono text-xs text-accent-cloud">{'> '}{question}</p>
              <p className="text-slate-200 leading-relaxed">
                {answer}
                {stage === 'generating' && !reduced && (
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent-ai" />
                )}
              </p>
            </>
          )}
        </div>

        {/* Preguntas sugeridas */}
        <div className="mt-5 flex flex-wrap gap-2">
          {faqs.map((f) => (
            <button
              key={f.id}
              onClick={() => ask(f.question)}
              disabled={busy}
              className={cn(
                'rounded-full border border-slate-700 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-300',
                'transition-colors hover:border-accent-ai/50 hover:text-white',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              {f.question}
            </button>
          ))}
        </div>

        {/* Input libre */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="mt-4 flex items-center gap-2"
        >
          <label htmlFor="ai-chat-input" className="sr-only">
            Escribe tu pregunta
          </label>
          <input
            id="ai-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta…"
            disabled={busy}
            className={cn(
              'flex-1 rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm text-white',
              'placeholder:text-slate-600 focus:border-accent-ai/50 focus:outline-none focus:ring-1 focus:ring-accent-ai/30',
              'disabled:opacity-50'
            )}
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            aria-label="Enviar pregunta"
            className={cn(
              'flex items-center gap-1.5 rounded-lg border border-accent-ai/40 bg-accent-ai/10 px-4 py-2.5 text-sm font-medium text-white',
              'transition-colors hover:bg-accent-ai/20',
              'disabled:cursor-not-allowed disabled:opacity-40'
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-slate-600">
          <CornerDownLeft className="h-3 w-3" />
          demo lite · respuestas curadas sobre retrieval real · el LLM se conecta en producción
        </p>
      </div>
    </div>
  );
}

/* --------------------------- Pipeline bar --------------------------- */

const STEPS = [
  { key: 'retrieval', label: 'Retrieval', icon: Search },
  { key: 'context', label: 'Context', icon: Layers },
  { key: 'generation', label: 'Generación', icon: Cpu },
] as const;

function PipelineBar({
  stageIndex,
  chunks,
  reduced,
}: {
  stageIndex: number;
  chunks: RetrievedChunk[];
  reduced: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <div className="flex items-center justify-between gap-2">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const active = stageIndex >= i;
          const current = stageIndex === i;
          return (
            <div key={step.key} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors duration-300',
                  active
                    ? 'border-accent-ai/50 bg-accent-ai/10 text-white'
                    : 'border-slate-800 bg-slate-900/40 text-slate-500'
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4 shrink-0',
                    current && !reduced && 'animate-pulse',
                    active ? 'text-accent-ai' : 'text-slate-600'
                  )}
                />
                <span className="font-mono text-xs">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    'h-px flex-1 transition-colors duration-300',
                    stageIndex > i ? 'bg-accent-ai/40' : 'bg-slate-800'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Chunks recuperados */}
      <AnimatePresence>
        {chunks.length > 0 && (
          <motion.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 flex flex-wrap items-center gap-2 overflow-hidden"
          >
            <span className="font-mono text-[11px] text-slate-500">recuperados:</span>
            {chunks.map((c) => (
              <span
                key={c.id}
                className="rounded border border-accent-cloud/30 bg-accent-cloud/5 px-2 py-0.5 font-mono text-[11px] text-accent-cloud"
              >
                {c.label}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
