# Master Plan: Portafolio de Ingeniero de Sistemas (Cloud • IA • Automatización • GameDev)

Este documento define la arquitectura, diseño y contenido del portafolio personal.
**ROL DE LA IA:** Actúa como Senior Frontend Engineer & UI Designer. Tu objetivo es ejecutar este plan con precisión pixel-perfect y código limpio.

---

## 0. Referencias Visuales (CRÍTICO)
Antes de escribir código para una sección, **analiza las imágenes correspondientes** en la carpeta `/referencias`.

- **Hero (Fondo 3D y Efectos):** Ver `inicio.png` (La imagen oscura con constelaciones). Úsala para replicar el efecto de partículas conectadas con React Three Fiber.
- **Hero (Layout y Tipografía):** Ver `inicio2.png`. Úsala para la distribución del texto y el estilo de los botones.
- **Grid de Proyectos:** Analiza `proyectos.png` y `proyectos2.png`. Combina la estructura de grid bento de la primera con el minimalismo de la segunda.
- **Perfil/About:** Ver `sobre_mi.png` y `sobre_mi2.png`.
- **Contacto:** Ver `contacto.png`.

---

## 1. Concepto Central: "Ingeniería de Sistemas & Soluciones Inteligentes"
El sitio es una **Platform Showcase**. No es solo un portafolio de diseño, es una demostración de capacidad técnica en infraestructura, lógica compleja y desarrollo 3D.

**Propuesta de Valor:** "Diseño arquitecturas en la nube, automatizo flujos de negocio con IA y desarrollo videojuegos con lógica avanzada".

### La Navegación (Navbar)
Debe ser fija (sticky), con fondo blur (glassmorphism), minimalista y contener estrictamente estos enlaces:
1. **Inicio** (`/`)
2. **Proyectos** (`/projects`)
3. **Sobre Mí** (`/about`)
4. **Contacto** (`/contact`)

### El "Vertical Switcher" (Feature Core)
Componente de pestañas (Tabs) que filtra el contenido y cambia el contexto visual sutilmente.
**Las 4 Verticales:**
1. **Cloud Architecture:** (Linux Ubuntu, Oracle Cloud, VM Management, Deployments).
2. **Artificial Intelligence:** (RAG Systems, LLM Integration, Intelligent Web Apps).
3. **Business Automation:** (n8n, Workflow Orchestration, API Integrations).
4. **Game Development:** (Godot Engine, C++, GDScript, System Design).

---

## 2. Stack Tecnológico (Estricto)
- **Framework:** Next.js 15 (App Router).
- **Lenguaje:** TypeScript (Strict mode).
- **Estilos:** Tailwind CSS.
- **UI Kit:** Shadcn/ui (para componentes base limpios).
- **Animaciones 2D:** Framer Motion (transiciones suaves entre verticales).
- **Gráficos 3D (Hero):** React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`) para el fondo espacial.
- **Contenido:** MDX con Frontmatter tipado.

---

## 3. Arquitectura de Información

### 3.1 Página de Inicio (`/`)
- **Hero Section (Visuals & Tech):**
    - **Fondo 3D:** Implementar un componente `<Canvas>` que ocupe toda la pantalla (full viewport).
    - **Efecto:** Crear un campo de estrellas o partículas conectadas ("Constellation effect") que se mueva en un loop infinito suave (rotación lenta o avance tipo "warp speed" muy lento).
    - **Estética:** Debe verse futurista, profundo y elegante. Referencia visual: `hero_ref.png`.
    - **Interacción:** Las partículas/estrellas pueden reaccionar sutilmente al mouse (opcional, si no afecta performance).

- **Hero Content (Textos - Overlay):**
    - Debe estar posicionado con `z-index` superior sobre el Canvas 3D.
    - **Nombre (H1):** "Gian Piero Cano". (Tipografía Sans-serif moderna, Bold, Tracking tight).
    - **Título (H2):** "Ingeniero de Sistemas & Arquitecto de Soluciones IA".
    - **Subtítulo:** "Diseñando el futuro con Inteligencia Artificial, Cloud Computing y Automatización."
    - **Social:** Iconos minimalistas (GitHub, LinkedIn, Email) con efecto glass.
    - **CTA:** Botón "Explorar Arquitecturas" con borde brillante sutil.

- **Tech Marquee:** Carrusel infinito debajo del Hero con tecnologías "Hardcore": Linux, Python, Docker, C++, Godot, n8n, OpenAI.

### 3.2 Página de Proyectos (`/projects`)
- **Filtro:** El "Vertical Switcher" controla qué proyectos se ven.
- **Layout:** Bento Grid (Grilla asimétrica pero ordenada).
- **Card de Proyecto:** Minimalista. Imagen oscura, título blanco, pills de tecnología.

### 3.3 Página Sobre Mí (`/about`)
- **Bio Profesional:** Enfoque en la resolución de problemas de ingeniería y visión sistémica.
- **Toolkit Técnico:** Visualizar el stack dividido en las 4 verticales.

### 3.4 Página de Contacto (`/contact`)
- Formulario funcional con validación Zod.
- Footer simple.

---

## 4. Estructura de Datos (TypeScript Interface)

```typescript
export type ProjectCategory = 'cloud' | 'ai' | 'automation' | 'gamedev';

export interface Project {
  slug: string;
  title: string;
  summary: string;        // Descripción técnica (max 120 chars)
  category: ProjectCategory[];
  techStack: string[];    // Ej: ['Linux', 'Python', 'n8n', 'Godot', 'C++']
  thumbnail: string;      // Ruta en /public/images/projects/
  featured: boolean;
  date: string;
  links: {
    demo?: string;
    repo?: string;
    video?: string;       // Para demos de juegos o automatizaciones
  };
}

5. Contenido Real (Semilla para MDX)
Usa estos datos REALES para generar los archivos iniciales.

Vertical: Automatización & IA (Logimatix)
Logimatix Ecosystem (Empresa propia)

Categoría: Automation, AI.

Resumen: Infraestructura de automatización para procesos de negocio. Integración de agentes de IA para optimización operativa.

Stack: n8n, Python, OpenAI API, Webhooks.

Sistema RAG Empresarial

Categoría: AI.

Resumen: Arquitectura de Retrieval-Augmented Generation para consultas sobre bases de conocimiento privadas.

Stack: Vector DB, Python, LLMs.

Vertical: Cloud & Web (Kachimbo & Infra)
Kachimbo Platform (EdTech)

Categoría: Cloud, AI.

Resumen: Plataforma educativa desplegada en infraestructura propia. Simulacros de examen optimizados.

Infraestructura: Oracle Cloud VM, Linux Ubuntu Server, Nginx Reverse Proxy.

ProyectaIA (University Innovation)

Categoría: AI, Web.

Resumen: Asesor de carreras inteligente. Web app que consume modelos de IA para orientación vocacional personalizada.

Stack: Next.js, AI APIs.

Vertical: GameDev (Shadow Games)
Shadow Games Studio (Indie Studio)

Categoría: GameDev.

Resumen: Estudio independiente de desarrollo. Arquitectura de sistemas de juego y mecánicas avanzadas.

Stack: Godot 4, C++, GDScript.

Core Game Mechanics / AI NPC

Categoría: GameDev.

Resumen: Desarrollo de sistemas de IA para NPCs (Pathfinding, State Machines) y lógica de físicas.

Stack: Algoritmos, Matemáticas vectoriales, Godot.

Vertical: Branding & Design (OnExotic)
OnExotic Brand Tech

Categoría: Automation, Web.

Resumen: Gestión digital y e-commerce para marca de ropa. Automatización de inventario y pedidos.

Stack: Headless CMS, Automation.

6. Sistema de Diseño (Visual Guidelines)
Vibe: "Engineering Precision". Líneas finas, tipografía técnica, fondo espacial profundo.

Paleta:

Background: Dark (Slate-950) a Negro absoluto en el Hero.

Acentos:

Cloud/Linux: Cyan/Teal (Cyberpunk sutil).

IA/Auto: Violeta/Indigo (Neon).

GameDev: Ámbar/Naranja (High energy).

Tipografía:

Títulos: 'Inter' o 'Space Grotesk' (para un toque más futurista).

Cuerpo: 'Inter'.

Código: 'JetBrains Mono'.