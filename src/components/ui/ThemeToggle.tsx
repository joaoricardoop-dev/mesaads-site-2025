import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '../../state/themeStore'

interface Props {
  className?: string
  /** 'pill' (default) = ampla com label; 'icon' = só ícone circular */
  variant?: 'pill' | 'icon'
}

export function ThemeToggle({ className, variant = 'icon' }: Props) {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)
  const isDark = theme === 'dark'

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
        className={clsx(
          'group inline-flex items-center gap-2 rounded-full border border-hairline bg-chalk/[0.04] px-3 h-9 text-[11px] tracking-[0.08em] uppercase text-chalk/70 hover:text-chalk hover:bg-chalk/[0.08] transition-colors duration-300 ease-apple',
          className,
        )}
      >
        <Icon dark={isDark} />
        <span>{isDark ? 'tema escuro' : 'tema claro'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
      className={clsx(
        'group relative flex size-9 items-center justify-center rounded-full border border-hairline bg-chalk/[0.04] hover:bg-chalk/[0.08] transition-colors duration-300 ease-apple',
        className,
      )}
    >
      <Icon dark={isDark} />
    </button>
  )
}

function Icon({ dark }: { dark: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {dark ? (
        <motion.svg
          key="moon"
          viewBox="0 0 24 24"
          className="size-4 text-chalk/80"
          fill="none"
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ) : (
        <motion.svg
          key="sun"
          viewBox="0 0 24 24"
          className="size-4 text-mesa-amber"
          fill="none"
          initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 3v2M12 19v2M3 12h2M19 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.svg>
      )}
    </AnimatePresence>
  )
}
