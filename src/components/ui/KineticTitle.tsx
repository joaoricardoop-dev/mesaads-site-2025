import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: string
  className?: string
  /** tag wrapper */
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div'
  /** atraso inicial */
  delay?: number
  /** stagger entre palavras */
  stagger?: number
  /** trigger: view (scroll into view) | mount (na montagem) */
  trigger?: 'view' | 'mount'
}

/**
 * Título cinético: palavras em 3D perspective — rotateX + translateY vindas
 * "de cima" como placas caindo. Cada palavra anima individualmente.
 */
export function KineticTitle({
  children,
  className,
  as = 'h2',
  delay = 0,
  stagger = 0.08,
  trigger = 'view',
}: Props) {
  const reduce = useReducedMotion()

  if (reduce || typeof children !== 'string') {
    const Tag = as as any
    return <Tag className={className}>{children as ReactNode}</Tag>
  }

  const words = children.split(/(\s+)/)

  const parent = {
    initial: {},
    enter: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
  const word = {
    initial: {
      opacity: 0,
      y: '-110%',
      rotateX: 75,
    },
    enter: {
      opacity: 1,
      y: '0%',
      rotateX: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const motionProps =
    trigger === 'view'
      ? { initial: 'initial', whileInView: 'enter', viewport: { once: true, margin: '-10% 0px' } }
      : { initial: 'initial', animate: 'enter' }

  const MotionTag = motion[as]

  return (
    <MotionTag
      variants={parent}
      {...(motionProps as any)}
      className={clsx('inline-block', className)}
      style={{ perspective: '800px' }}
    >
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: '0.08em' }}
          >
            <motion.span
              variants={word}
              className="inline-block"
              style={{ transformOrigin: '50% 100%', transformStyle: 'preserve-3d' }}
            >
              {w}
            </motion.span>
          </span>
        ),
      )}
    </MotionTag>
  )
}
