'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

/**
 * Contact Form Schema with Zod Validation
 */
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  subject: z.string().min(1, 'Por favor selecciona un asunto'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectLabels = {
  trabajo: 'Propuesta de Trabajo',
  freelance: 'Proyecto Freelance',
  colaboracion: 'Colaboración',
};

/**
 * ContactForm Component
 * Form with validation using react-hook-form + zod
 * Displays success toast on submit (simulated for now)
 */
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }

      toast.success('¡Mensaje Enviado!', {
        description: 'Gracias por contactarme. Te responderé lo antes posible.',
        duration: 5000,
      });

      reset();
    } catch (err) {
      toast.error('Error al enviar', {
        description: err instanceof Error ? err.message : 'Intenta de nuevo más tarde.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-slate-900/50 border border-slate-800',
            'text-white placeholder:text-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-accent-cloud focus:border-transparent',
            'transition-all duration-200',
            errors.name && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="Tu nombre completo"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-slate-900/50 border border-slate-800',
            'text-white placeholder:text-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-accent-cloud focus:border-transparent',
            'transition-all duration-200',
            errors.email && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="tu@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Subject Dropdown */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
          Asunto
        </label>
        <select
          id="subject"
          {...register('subject')}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-slate-900/50 border border-slate-800',
            'text-white',
            'focus:outline-none focus:ring-2 focus:ring-accent-cloud focus:border-transparent',
            'transition-all duration-200',
            'cursor-pointer',
            errors.subject && 'border-red-500 focus:ring-red-500'
          )}
        >
          <option value="" className="bg-slate-900">
            Selecciona un asunto
          </option>
          {Object.entries(subjectLabels).map(([value, label]) => (
            <option key={value} value={value} className="bg-slate-900">
              {label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-2 text-sm text-red-400">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          className={cn(
            'w-full px-4 py-3 rounded-lg',
            'bg-slate-900/50 border border-slate-800',
            'text-white placeholder:text-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-accent-cloud focus:border-transparent',
            'transition-all duration-200',
            'resize-none',
            errors.message && 'border-red-500 focus:ring-red-500'
          )}
          placeholder="Cuéntame sobre tu proyecto o idea..."
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full px-6 py-4 rounded-lg',
          'bg-gradient-to-r from-accent-cloud to-accent-ai',
          'text-white font-semibold',
          'hover:scale-[1.02] active:scale-[0.98]',
          'transition-transform duration-200',
          'flex items-center justify-center gap-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          'shadow-lg shadow-accent-cloud/20'
        )}
      >
        {isSubmitting ? (
          <>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Enviar Mensaje</span>
          </>
        )}
      </button>
    </form>
  );
}
