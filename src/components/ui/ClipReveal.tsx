import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** shape do clip: circle (expande do centro) ou cover (de baixo) */
  shape?: 'circle' | 'cover' | 'diagonal'
  /** delay em s */
  delay?: number
  /** duração */
  duration?: number
}

/**
 * Revela o conteúdo através de uma máscara clip-path que expande.
 * - circle: expande do centro, tipo Apple product reveal
 * - cover: sweep de baixo pra cima
 * - diagonal: corte na diagonal
 */
export function ClipReveal({
  children,
  className,
  shape = 'circle',
  delay = 0,
  duration = 1.0,
}: Props) {
  const reduce = useReducedMotion()

  const initial = reduce
    ? { clipPath: 'inset(0% 0% 0% 0%)' }
    : shape === 'circle'
      ? { clipPath: 'circle(0% at 50% 50%)' }
      : shape === 'diagonal'
        ? { clipPath: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)' }
        : { clipPath: 'inset(100% 0% 0% 0%)' }

  const target =
    shape === 'circle'
      ? { clipPath: 'circle(110% at 50% 50%)' }
      : shape === 'diagonal'
        ? { clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)' }
        : { clipPath: 'inset(0% 0% 0% 0%)' }

  return (
    <motion.div
      className={clsx('will-change-[clip-path]', className)}
      initial={initial}
      whileInView={target}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}
