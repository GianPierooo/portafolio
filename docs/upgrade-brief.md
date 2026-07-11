# Prompt maestro para Claude Code — Upgrade del portafolio de Gian Piero Cano

> Pega este documento completo como primer mensaje en Claude Code, dentro del repo `portafolio`.
> Está diseñado para **evolucionar** el sitio actual (no reconstruirlo) y trabajar por fases con checkpoints.

---

## 0. Rol y contexto

Actúa como **Senior Frontend & Design Engineer** especializado en portafolios de ingeniería de alto nivel. Vas a mejorar un portafolio **ya desplegado** en Vercel bajo el dominio `gpcano.space`.

Antes de escribir cualquier código:
1. Lee el repo completo: `app/`, `components/ui/`, `content/projects/`, `lib/`, `tailwind.config.ts`, `globals.css` y `project-brief.md`.
2. Lee las imágenes de `/referencias`.
3. Hazme un resumen de 10 líneas de lo que ya existe y de lo que vas a tocar, y **espera mi OK antes de la Fase 1**.

**Stack existente (respétalo, no lo cambies):** Next.js 15 (App Router), TypeScript strict, Tailwind, Framer Motion, React Three Fiber + Drei, shadcn/ui, MDX, react-hook-form + Zod, Lucide, Sonner.

---

## 1. MANDATO DE POSICIONAMIENTO (lo más importante — no lo negocies)

El dueño es un **Ingeniero Cloud profundamente metido en IA**. NO es un "desarrollador web full-stack genérico". Este error de percepción es el problema #1 a resolver. Todo cambio debe reforzar esta identidad:

- **Título nuevo (H1/H2 del hero):** "Gian Piero Cano — Cloud Engineer & AI Solutions Architect" / subtítulo en español: *"Diseño arquitecturas en la nube y sistemas de IA en producción."*
- **Elimina la palabra "full-stack" como identidad.** Si aparece (ej. en `about/page.tsx`), reencuádrala: el desarrollo es la *capa de entrega* de sistemas cloud + IA, no la identidad.
- **Narrativa columna vertebral:** Cloud + IA son el eje. La automatización, los videojuegos y el e-commerce son **evidencia y aplicaciones** de ese eje, no verticales que compiten con él. El mensaje implícito debe ser: *"Arquitecto sistemas de IA y los despliego en infraestructura cloud; los productos que ves son lo que esos sistemas potencian."*
- **Reordena el Vertical Switcher** en este orden: `Cloud Architecture` → `Artificial Intelligence` → `Automation` → `Game Development`. Cloud e IA siempre primero y visualmente dominantes.
- **Lenguaje técnico específico de cloud/IA** en todo el sitio: menciona servicios y patrones reales (Oracle Cloud, Ubuntu VMs, Nginx, PostgreSQL, IaC, RAG, LLM integration, orchestration, observability) en vez de genéricos.

---

## 2. Estado actual — evolucionar, no reconstruir

Ya existe y funciona: hero 3D con constelación, VerticalSwitcher, ProjectCard (bento), páginas MDX por proyecto, About con timeline, Contact con validación Zod, Navbar sticky, Footer, ScrollProgress.

**No rehagas lo que funciona.** Refactoriza y sube el nivel. Mantén la paleta base (bg `#020617`, cyan `#06b6d4` para cloud, violeta `#8b5cf6` para IA, ámbar `#f59e0b` para gamedev) pero úsala con más intención (ver §4).

---

## 3. Objetivos de la mejora

1. **UI mucho más dinámica y pulida** — que se sienta viva, premium y de ingeniero, sin caer en efectos gratuitos que maten el performance.
2. **Narrativa Cloud + IA** clara e imposible de malinterpretar (§1).
3. **Contenido actualizado** con case studies reales, métricas y diagramas.
4. **Módulos diferenciadores** que demuestren capacidad técnica en vivo (§6).

---

## 4. Dirección visual y sistema de motion

Construye un **motion system coherente**, no animaciones sueltas. Define tokens de animación reutilizables (duraciones, easings, delays) en un archivo central.

- **Scroll-driven reveals:** las secciones aparecen con stagger al entrar en viewport (`whileInView`, `once: true`). Sutil, no rebotón.
- **Transiciones de página** entre rutas (Inicio/Proyectos/About/Contacto) con Framer Motion, sensación de app, no de recarga.
- **Micro-interacciones:** magnetic hover en botones/CTA, spotlight (glow que sigue al cursor) en las ProjectCards, tilt 3D sutil en cards, subrayados animados en links.
- **Hero 3D:** mantén la constelación pero hazla **reactiva al mouse** de forma sutil (parallax de partículas) sin bajar de 60 FPS. Añade un fallback estático ligero para `prefers-reduced-motion` y para móviles de gama baja.
- **Tipografía con más carácter:** conserva Inter + JetBrains Mono, pero usa la mono para "acentos de ingeniero" (labels de secciones tipo `// cloud_architecture`, métricas, paths). Jerarquía tipográfica más marcada.
- **Number counters** animados para métricas (cuentan al entrar en viewport).
- **Regla de oro:** dinámico ≠ ruidoso. Cada animación debe tener propósito. Nada de parallax mareante ni carruseles infinitos que distraigan del contenido.

---

## 5. Cambios de contenido concretos

### 5.1 Hero
- H1: nombre. H2: "Cloud Engineer & AI Solutions Architect".
- Subtítulo enfocado en cloud + IA (§1).
- Tira de tech marquee **curada y jerarquizada**: primero cloud/IA (Oracle Cloud, Linux, Docker, PostgreSQL, Python, RAG/LLM, n8n), luego el resto.
- 2 CTAs: "Ver arquitecturas" (scroll a proyectos) y "Descargar CV". Mantén los social links con efecto glass.

### 5.2 About
- Reescribe la bio con enfoque **Cloud + IA como identidad central**; visión sistémica, infraestructura y sistemas inteligentes en producción. El resto (gamedev, e-commerce) se menciona como aplicaciones de esa base.
- Toolkit dividido por las 4 verticales en el orden de §1, con Cloud e IA arriba y más destacadas.
- Timeline de experiencia: conserva los datos reales existentes (Logimatix, Kchimbo, Sueños Nocturnos/Endless OS, OnExotic/VictoriaModas). **Reencuadra cada uno resaltando el ángulo cloud/IA** (ej. Logimatix = "infra de automatización con agentes de IA sobre Oracle Cloud").

### 5.3 Proyectos — case studies de verdad
Cada proyecto destacado debe seguir esta estructura en su MDX:
`Problema → Arquitectura (con diagrama) → Decisiones técnicas y tradeoffs → Stack → Métricas/impacto → Enlaces (demo/repo/video)`.

- Añade un **componente de diagrama de arquitectura** reutilizable (§6.2) e insértalo en cada case study.
- **No inventes métricas ni datos.** Donde falte un dato real, deja un placeholder visible `{/* TODO: confirmar dato real con Gian */}` y lístamelo al final para que yo lo complete.

### 5.4 Proyectos posiblemente faltantes — pregúntame antes de crear
Es posible que falten proyectos recientes en el repo. Crea un espacio estructurado para ellos y **pídeme los datos** (no los inventes):
- **Matix** — proyecto personal de IA con RAG (no comercial; es pieza de showcase técnico, ideal para la demo de §6.1).
- **Shadow Games / El Último Pétalo** — juego ganador de game jam.
- **Jezici** — desarrollo de apps low-code.

### 5.5 Fixes técnicos
- Actualiza metadata, `metadataBase`, OpenGraph y `sitemap`/`robots` para apuntar a **`gpcano.space`** (el repo aún referencia el `.vercel.app`).
- Añade Vercel Analytics y Speed Insights.
- SEO: metatags dinámicos por página y JSON-LD `Person` (nombre, rol Cloud/AI, sameAs a GitHub/LinkedIn).

---

## 6. Módulos "signature" (los diferenciadores)

Implementa estos como **toggles independientes**; si alguno requiere backend o costo, avísame y dame una versión "lite" como fallback. Prioridad de mayor a menor:

### 6.1 Demo RAG interactiva en vivo (PRIORIDAD ALTA — el diferenciador clave)
Un widget "Pregúntale a mi IA" que responde preguntas sobre mi perfil/proyectos usando RAG.
- Backend: route handler serverless en Vercel (`app/api/chat/route.ts`) con **rate limiting** y streaming de respuestas.
- La base de conocimiento = mis propios proyectos/CV (embeddings). Enséñalo como "esto corre sobre mi propia arquitectura RAG".
- **Fallback lite** (si no quiero costo de API en producción): demo con respuestas cacheadas/pregeneradas a 4-5 preguntas frecuentes, con la misma UI de streaming simulado. Deja el código listo para conectar el LLM real cuando yo diga.
- Muestra sutilmente el "pipeline" (retrieval → context → generación) para que se note la ingeniería, no solo el chat.

### 6.2 Componente de diagrama de arquitectura animado
Diagramas por proyecto (nodos: cliente → CDN/Vercel → API → Oracle Cloud VM → PostgreSQL → LLM/servicios) que se **dibujan con animación** al entrar en viewport. SVG animado o React Flow. Reutilizable vía props. Esto es lo que grita "pienso en sistemas".

### 6.3 Command palette (⌘K)
Navegación tipo terminal/IDE: abrir con ⌘K, buscar proyectos, saltar a secciones, links rápidos (GitHub, LinkedIn, CV). Muy on-brand para un ingeniero cloud y mejora la UX real.

### 6.4 Tira de métricas / "status" tipo dashboard
Sección con métricas reales animadas (flujos automatizados, proyectos desplegados, uptime, años en cloud). Estética de panel de observabilidad. Usa solo datos reales (§5.3).

### 6.5 (Opcional) Toggle de idioma ES/EN
Para admisiones a Stanford y clientes internacionales, prepara i18n ES/EN. Si es mucho alcance ahora, deja la estructura lista y márcalo como fase futura.

---

## 7. Barandas (no negociables)

- **Performance:** Lighthouse ≥ 90 en Performance y ≥ 95 en Accesibilidad/Best Practices/SEO. Lazy-load del Canvas 3D y de módulos pesados. `next/image` para todo. Respeta `prefers-reduced-motion`.
- **Accesibilidad:** foco visible, navegación por teclado (incluye el ⌘K), `aria-label` en íconos, contraste AA, `alt` en imágenes.
- **Responsive mobile-first real**, no solo "que no se rompa": el hero 3D y los diagramas deben verse bien y rendir en móvil.
- **Código limpio:** TypeScript strict sin `any`, componentes tipados, sin warnings de ESLint, sin dependencias muertas.
- **No romper lo que ya funciona.** Cada fase debe dejar el sitio desplegable.

---

## 8. Plan de trabajo por fases (con checkpoint entre cada una)

Trabaja **una fase a la vez** y espera mi visto bueno antes de seguir:

- **Fase 0 — Auditoría:** resumen del estado actual + lista de cambios propuestos. (Espera OK.)
- **Fase 1 — Reposicionamiento + contenido:** hero, about, verticales reordenadas, copy Cloud/IA, fixes de metadata/dominio. (§1, §5)
- **Fase 2 — Motion system + UI dinámica:** tokens de animación, reveals, transiciones de página, micro-interacciones, hero reactivo. (§4)
- **Fase 3 — Case studies + diagramas de arquitectura.** (§5.3, §6.2)
- **Fase 4 — Módulos signature:** RAG demo, command palette, métricas. (§6)
- **Fase 5 — Pulido final:** performance, a11y, SEO, analytics, QA responsive.

Al final de cada fase: dime qué cambiaste, qué falta y qué datos necesitas de mí.

---

## 9. Definition of Done

- [ ] Un visitante entiende en <5 segundos que soy **Cloud Engineer + AI**, no un web dev genérico.
- [ ] Cada proyecto destacado tiene diagrama de arquitectura + métricas reales + narrativa problema/decisiones.
- [ ] Hay al menos un elemento de IA **interactivo en vivo** (o su fallback lite listo para conectar).
- [ ] UI se siente dinámica y premium, con motion coherente y 60 FPS.
- [ ] Metadata/SEO/OG apuntan a `gpcano.space`; analytics activo.
- [ ] Lighthouse cumple §7. Cero warnings de TS/ESLint. Sitio desplegable en cada fase.
- [ ] Lista final de TODOs con los datos reales que necesitas de mí.

---

## 10. Qué NO hacer

- No me presentes como "full-stack developer" ni diluyas la identidad Cloud + IA.
- No inventes métricas, logros, fechas ni proyectos. Pregunta o deja TODO.
- No metas animaciones que maten el performance ni efectos gratuitos sin propósito.
- No reconstruyas desde cero lo que ya funciona.
- No cambies el stack tecnológico base.
- No hagas más de una fase sin mi confirmación.

---

## 11. Workflow de git y modo de trabajo

**Git (obligatorio):**
- Crea una rama por fase: `feat/fase-1-reposicionamiento`, `feat/fase-2-motion`, etc. **Nunca commitees directo a `main`.**
- Commits atómicos con Conventional Commits (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `perf:`).
- Antes de cerrar cada fase corre `npm run build` y `npm run lint`; si algo falla, arréglalo antes de pedir mi OK.
- Al terminar cada fase, resume en 1 párrafo qué hiciste y dame el comando para previsualizar (`npm run dev`).

**Cómo debes razonar (aprovecha que soy un modelo grande):**
- **Piensa antes de codear.** En cada fase, primero propón el plan detallado (archivos a tocar, componentes nuevos, decisiones de diseño) y espera mi OK. Luego implementas.
- **Justifica tus decisiones de diseño** brevemente: por qué esa animación, ese layout, ese patrón. Quiero ver el criterio de ingeniería, no solo el resultado.
- **Auto-revisa.** Después de implementar, haz una pasada crítica: ¿algo rompe performance, a11y o el mandato de posicionamiento? Corrígelo antes de entregarme la fase.
- **Propón mejoras** que se te ocurran y que estén alineadas con §1, aunque no estén en este brief. Márcalas como "sugerencia" para que yo decida.
- Cuando tengas dudas de contenido real (datos, métricas, proyectos), **pregunta**, no inventes.

**Referencias visuales:** analiza las imágenes de `/referencias` y respétalas como base estética, pero eleva el nivel de dinamismo y pulido. Apunta a un look de portafolio de ingeniero senior: oscuro, técnico, premium, con movimiento intencional.
