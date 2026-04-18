import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: string | ReactNode
  /** granularidade do split */
  by?: 'word' | 'char' | 'line'
  className?: string
  /** tag wrapper */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  /** duração da animação por item (s) */
  duration?: number
  /** atraso entre items (s) */
  stagger?: number
  /** atraso inicial (s) */
  delay?: number
  /** distância inicial em px (vertical) */
  distance?: number
  /** reveal dispara quando entra no viewport (default) ou immediately */
  trigger?: 'view' | 'mount'
}

/**
 * Revelação de texto por palavra ou char com stagger.
 * - `by="word"`: cada palavra desliza pra cima + fade (default, legível)
 * - `by="char"`: cada char (use pra headlines curtas)
 * - `by="line"`: o bloco todo
 * Suporta children string OU ReactNode (usa texto plano se string, split manual se node).
 */
export function RevealText({
  children,
  by = 'word',
  className,
  as = 'span',
  duration = 0.65,
  stagger = 0.04,
  delay = 0,
  distance = 22,
  trigger = 'view',
}: Props) {
  const reduce = useReducedMotion()

  // Se reduced motion, apenas renderiza plano
  if (reduce) {
    const Tag = as as any
    return <Tag className={className}>{children}</Tag>
  }

  // Se children for string, split de verdade
  const text = typeof children === 'string' ? children : null

  const parent = {
    initial: {},
    enter: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
  const child = {
    initial: { opacity: 0, y: distance, filter: 'blur(6px)' },
    enter: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const viewport = trigger === 'view' ? { once: true, margin: '-10% 0px' } : undefined
  const animateMode = trigger === 'view' ? 'whileInView' : 'animate'

  const motionProps = {
    initial: 'initial',
    [animateMode]: 'enter',
    ...(trigger === 'view' ? { viewport } : {}),
  }

  // por palavra ou char: só rola com string
  if (text && by === 'word') {
    const words = text.split(/(\s+)/)
    const MotionTag = motion[as]
    return (
      <MotionTag
        variants={parent}
        {...(motionProps as any)}
        className={clsx('inline-block', className)}
      >
        {words.map((w, i) =>
          /^\s+$/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={child} className="inline-block">
                {w}
              </motion.span>
            </span>
          ),
        )}
      </MotionTag>
    )
  }

  if (text && by === 'char') {
    const MotionTag = motion[as]
    return (
      <MotionTag
        variants={parent}
        {...(motionProps as any)}
        className={clsx('inline-block', className)}
      >
        {Array.from(text).map((c, i) =>
          c === ' ' ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={child} className="inline-block">
                {c}
              </motion.span>
            </span>
          ),
        )}
      </MotionTag>
    )
  }

  // Fallback: line / não-string → anima o bloco inteiro
  const MotionTag = motion[as]
  return (
    <MotionTag
      variants={child}
      {...(motionProps as any)}
      className={clsx('inline-block', className)}
    >
      {children}
    </MotionTag>
  )
}
