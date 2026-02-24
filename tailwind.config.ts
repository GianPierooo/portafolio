import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark palette from references - Deep space theme
        'space': {
          950: '#020617', // Near black - Hero background
          900: '#0f172a', // Slate 900
          800: '#1e293b', // Slate 800
        },
        // Accent colors for the 4 verticals
        'accent': {
          cloud: '#06b6d4',    // Cyan - Cloud/Linux
          ai: '#8b5cf6',       // Violet - AI
          automation: '#8b5cf6', // Violet - Automation (same as AI)
          gamedev: '#f59e0b',  // Amber - GameDev
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
