import type { Config } from 'tailwindcss'

/**
 * Cores semânticas apontam para CSS variables.
 * Para usar opacity via `text-chalk/70`, cada cor precisa ser exposta como
 * rgb channel cru (`R G B`) e lida com `rgb(var(--x) / <alpha-value>)`.
 */
function ch(cssVar: string) {
  return `rgb(var(${cssVar}) / <alpha-value>)`
}

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ========= Superfícies (inverte em light mode) =========
        ink: {
          950: ch('--surface-950-rgb'),
          900: ch('--surface-900-rgb'),
          800: ch('--surface-800-rgb'),
          700: ch('--surface-700-rgb'),
          600: ch('--surface-600-rgb'),
          500: ch('--surface-500-rgb'),
        },
        // ========= Tinta (texto/foreground) =========
        chalk: {
          DEFAULT: ch('--chalk-rgb'),
          muted: ch('--chalk-muted-rgb'),
          dim: ch('--chalk-dim-rgb'),
        },
        // ========= Accent (ajusta levemente em light) =========
        mesa: {
          neon: ch('--c-neon-rgb'),
          neonSoft: ch('--c-neon-soft-rgb'),
          magenta: ch('--c-magenta-rgb'),
          amber: ch('--c-amber-rgb'),
          orange: ch('--c-orange-rgb'),
          ice: ch('--c-ice-rgb'),
        },
        // Hairlines são semi-transparentes por natureza — ficam como var() direto
        hairline: 'var(--hairline)',
        hairlineBold: 'var(--hairline-bold)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'mega': ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'hero': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '0.96', letterSpacing: '-0.035em' }],
        'title': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        'xl2': '1.25rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'neon': '0 0 0 1px rgb(var(--c-neon-rgb) / 0.6), 0 0 40px -12px rgb(var(--c-neon-rgb) / 0.55)',
        'neon-sm': '0 0 0 1px rgb(var(--c-neon-rgb) / 0.45), 0 0 22px -10px rgb(var(--c-neon-rgb) / 0.45)',
        'soft': '0 24px 60px -30px rgba(0, 0, 0, 0.35), 0 4px 14px -8px rgba(0, 0, 0, 0.2)',
        'inner-hairline': 'inset 0 0 0 1px var(--hairline)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
        swift: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(var(--c-neon-rgb) / 0.45)' },
          '50%': { boxShadow: '0 0 0 12px rgb(var(--c-neon-rgb) / 0)' },
        },
        'tick-in': {
          '0%': { 'stroke-dashoffset': '60' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-neon': 'pulse-neon 1.8s ease-out infinite',
        'tick-in': 'tick-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
