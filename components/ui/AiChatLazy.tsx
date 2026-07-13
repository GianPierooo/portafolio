'use client';

import dynamic from 'next/dynamic';

// Lazy con ssr:false debe vivir en un componente cliente (no permitido en server).
// El widget RAG está bajo el fold, es interactivo y no necesita SSR. Con ssr:false
// el server y el cliente arrancan igual (skeleton) → sin parpadeo ni mismatch de
// hidratación; el chunk queda fuera del bundle inicial.
const AiChat = dynamic(() => import('@/components/ui/AiChat'), {
  ssr: false,
  loading: () => (
    <div className="mx-auto max-w-3xl">
      <div className="glass h-72 animate-pulse rounded-2xl border border-slate-800" />
    </div>
  ),
});

export default function AiChatLazy() {
  return <AiChat />;
}
