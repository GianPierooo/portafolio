# Portafolio de Ingeniero de Sistemas

Portafolio personal de Gian Piero Cano - Ingeniero de Sistemas & Arquitecto de Soluciones IA.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript (Strict mode)
- **Estilos:** Tailwind CSS
- **Animaciones 2D:** Framer Motion
- **Gráficos 3D:** React Three Fiber + Drei
- **Iconos:** Lucide React

## 🎨 Características del Hero

### Fondo 3D Espacial
- **Constelación animada:** 150 partículas conectadas por líneas (efecto red neuronal)
- **Profundidad visual:** Starfield de fondo con 3000 estrellas
- **Nodos cian brillantes:** 10% de las partículas con color accent para destacar
- **Animación orgánica:** Rotación suave + movimiento flotante de partículas
- **Optimizado para 60FPS:** Instanced meshes y adaptive pixel ratio

### UI del Hero
- **Tipografía moderna:** Inter + JetBrains Mono
- **Glassmorphism:** Efectos de vidrio en botones y enlaces sociales
- **Animaciones de entrada:** Framer Motion con delays escalonados
- **Gradientes sutiles:** Títulos con gradiente de blanco a cyan
- **Efectos glow:** Halos luminosos en hover para elementos interactivos

## 📁 Estructura del Proyecto

```
portafolio/
├── app/
│   ├── layout.tsx                    # Layout raíz con fuentes
│   ├── page.tsx                      # Hero + Projects Section
│   ├── about/
│   │   └── page.tsx                  # Página Sobre Mí
│   ├── projects/[slug]/
│   │   └── page.tsx                  # Página dinámica de proyecto
│   └── globals.css                   # Estilos globales + utilities
├── components/ui/
│   ├── SpaceBackground.tsx           # Canvas 3D constelación
│   ├── VerticalSwitcher.tsx          # Filtro animado de categorías
│   ├── ProjectCard.tsx               # Card de proyecto Bento style
│   └── ExperienceTimeline.tsx        # Timeline de experiencia
├── content/projects/
│   └── logimatix-ecosystem.mdx       # Case study de ejemplo
├── lib/
│   ├── utils.ts                      # cn() utility
│   ├── data.ts                       # Tipos y datos de proyectos
│   └── mdx.ts                        # Helpers para leer MDX
└── tailwind.config.ts                # Config + typography plugin
```

## 🎯 Paleta de Colores

- **Background:** `#020617` (Slate-950) - Negro espacial profundo
- **Acentos:**
  - Cloud/Linux: `#06b6d4` (Cyan)
  - AI/Automation: `#8b5cf6` (Violet)
  - GameDev: `#f59e0b` (Amber)

## 🚦 Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linter
npm run lint
```

## ✅ Fase 2 Completada: Core Logic & Project Grid

### Sistema de Filtrado por Verticales
- **VerticalSwitcher:** 5 pestañas (All, Cloud, AI, Automation, GameDev)
- **Animación pill deslizante:** Transición suave con spring physics
- **Glow effects:** Cada vertical tiene su color de acento

### Grid de Proyectos Estilo Bento
- **ProjectCard:** Cards oscuras con bordes brillantes en hover
- **Responsive grid:** 1 columna (móvil) → 2 (tablet) → 3 (desktop)
- **AnimatePresence:** Transiciones fade + scale al filtrar
- **7 proyectos reales:** Logimatix, Kachimbo, Shadow Games, etc.

### Datos Estructurados
- **Type-safe:** Interfaces TypeScript para Project y ProjectCategory
- **Helper functions:** getProjectsByCategory(), getFeaturedProjects()
- **No placeholders:** Datos reales de proyectos en producción

## ✅ Fase 3 Completada: Project Details & About Section

### Infraestructura MDX
- **next-mdx-remote:** Renderizado de contenido MDX en rutas dinámicas
- **@tailwindcss/typography:** Plugin para estilos prose automáticos
- **gray-matter:** Parsing de frontmatter en archivos MDX
- **Helpers MDX:** Funciones para leer y procesar proyectos

### Páginas de Proyecto Individual (/projects/[slug])
- **Ruta dinámica:** generateStaticParams para SSG
- **Header inmersivo:** Título grande con glow effect por categoría
- **Badges:** Categorías y tech stack con colores temáticos
- **Botones de acción:** Ver Demo, Ver Código, Ver Video
- **Componentes MDX custom:** Styled h1-h6, code blocks, links, blockquotes
- **Prose styling:** `prose-invert prose-lg` para lectura óptima
- **Navegación:** Botón back y footer para más proyectos

### Página Sobre Mí (/about)
- **ExperienceTimeline:** Timeline vertical con animaciones
- **Experiencia profesional:** 4 posiciones con achievements y tech stack
- **Toolkit Grid:** 6 categorías de tecnologías con iconos
- **Bio profesional:** Introducción y enfoque técnico
- **CTA footer:** Call-to-action para proyectos

### Contenido MDX
- **logimatix-ecosystem.mdx:** Case study completo con 2000+ palabras
- **Estructura rica:** Desafíos, soluciones, código, métricas, roadmap
- **Markdown avanzado:** Code blocks, listas, blockquotes, enlaces

### Mejoras en ProjectCard
- **Cards clickeables:** Navegación a página de detalle
- **Flecha animada:** Aparece en hover indicando acción
- **Links con stopPropagation:** Demo/Repo/Video no activan navegación
- **Hover scale:** Efecto de elevación en hover

## ✅ Fase 4 Completada: Contact, Footer & Final Polish

### Página de Contacto (/contact)
- **Layout 2 columnas:** Info card (izq) + Formulario (der)
- **ContactForm.tsx:**
  - Validación con react-hook-form + Zod
  - Campos: Nombre, Email, Asunto (dropdown), Mensaje
  - Validaciones: Email válido, mensaje mín 10 caracteres
  - Toast de éxito con Sonner
  - Loading state con spinner animado
  - Inputs oscuros con focus glow cyan
- **Info Cards:**
  - Email, LinkedIn, GitHub, Ubicación
  - Iconos coloridos con hover effects
  - Status indicator "Disponible para nuevos proyectos"

### Footer Global
- **Footer.tsx:**
  - Status indicator verde pulsante "All Systems Operational"
  - Copyright dinámico (año actual)
  - Links sociales con hover effects
  - Texto "Diseñado y construido por..."
  - Tech stack mentions con colores
  - Responsive: columna en móvil, fila en desktop

### Navbar Sticky
- **Navbar.tsx:**
  - Sticky con glassmorphism al scroll
  - Indicador animado bajo link activo (layoutId)
  - Menú hamburger para móvil con AnimatePresence
  - Backdrop blur en menú móvil
  - Logo con gradient "GPC"
  - Links: Inicio, Proyectos, Sobre Mí, Contacto

### Scroll Progress Bar
- **ScrollProgress.tsx:**
  - Barra ultra-fina (2px) en top
  - Gradient de colores (cyan → violet → amber)
  - Spring animation suave
  - Aparece después de scroll
  - Integrada en páginas de proyectos

### Optimizaciones UX
- **globals.css:**
  - ::selection con cyan bg y texto negro
  - overflow-x: hidden para prevenir scroll horizontal
  - scroll-behavior: smooth
  - Custom scrollbar estilizado
- **Layout:**
  - Navbar y Footer en layout.tsx
  - pt-16 para compensar navbar sticky
  - Navegación instantánea con Next.js Link

## 🎉 Proyecto Completo

El portafolio está 100% funcional con:
- ✅ Hero 3D con constelaciones animadas
- ✅ Sistema de filtrado por verticales
- ✅ Grid de proyectos Bento style
- ✅ Páginas dinámicas MDX
- ✅ Timeline de experiencia
- ✅ Formulario de contacto validado
- ✅ Navbar y Footer globales
- ✅ Responsive mobile-first
- ✅ Animaciones Framer Motion
- ✅ Optimizaciones UX

## 🔧 Mejoras Opcionales

1. **Tech Marquee:** Carrusel infinito en Hero
2. **Imágenes:** Agregar thumbnails de proyectos
3. **Más MDX:** Case studies de Kachimbo, Shadow Games
4. **Email Backend:** Conectar formulario con API (Resend/SendGrid)
5. **Analytics:** Agregar Google Analytics o Vercel Analytics
6. **SEO:** Metatags dinámicos por página
7. **Animations:** Más micro-interacciones en hover

## 📝 Notas Técnicas

- Los componentes 3D usan `'use client'` por requisito de R3F
- Server components por defecto en el resto de la app
- Optimización: `dpr={[1, 2]}` para adaptive rendering
- Accesibilidad: aria-labels en enlaces sociales
