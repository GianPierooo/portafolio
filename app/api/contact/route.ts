import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * API Route: POST /api/contact
 * Envía el mensaje del formulario a tu correo usando Resend (plan gratuito).
 *
 * Configuración necesaria:
 * 1. Crear cuenta en https://resend.com (gratis: 3000 emails/mes)
 * 2. En el dashboard, crear API Key
 * 3. Añadir en .env.local:
 *    RESEND_API_KEY=re_xxxxxxxxxxxx
 *    CONTACT_EMAIL=gianpierodaniel@gmail.com
 *
 * Opcional: Verificar tu dominio en Resend y usar:
 *    RESEND_FROM=contacto@tudominio.com
 * Si no, se usa onboarding@resend.dev (solo para pruebas; revisa la bandeja del email de tu cuenta Resend).
 */

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'gianpierodaniel@gmail.com';
// En modo gratis sin dominio verificado: usa onboarding@resend.dev (solo recibes en el email de tu cuenta Resend)
const FROM_EMAIL = process.env.RESEND_FROM || 'Portafolio <onboarding@resend.dev>';

const subjectLabels: Record<string, string> = {
  trabajo: 'Propuesta de Trabajo',
  freelance: 'Proyecto Freelance',
  colaboracion: 'Colaboración',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, email, message' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY no está configurada');
      return NextResponse.json(
        { error: 'Servicio de email no configurado. Añade RESEND_API_KEY en .env.local' },
        { status: 503 }
      );
    }

    const subjectLabel = subjectLabels[subject] || subject || 'Contacto desde portafolio';
    const emailSubject = `[Portafolio] ${subjectLabel} - ${name}`;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Nuevo mensaje desde tu portafolio</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Asunto:</strong> ${escapeHtml(subjectLabel)}</p>
          <hr style="border: 1px solid #e2e8f0; margin: 1.5rem 0;" />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap; color: #334155;">${escapeHtml(message)}</p>
          <hr style="border: 1px solid #e2e8f0; margin: 1.5rem 0;" />
          <p style="font-size: 12px; color: #94a3b8;">Enviado desde gianpiero.dev</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message || 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}
