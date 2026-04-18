import { useRef, useEffect, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  className?: string
  /** intensidade do pull (0-1, default 0.3) */
  strength?: number
  /** tag raiz */
  as?: 'div' | 'button' | 'a' | 'span'
  /** outras props (onClick, href, etc.) */
  [key: string]: any
}

/**
 * Wrapper que faz o elemento "perseguir" o cursor quando está perto.
 * Estilo Awwwards — lerp entre posição base e offset do mouse.
 * Respeita prefers-reduced-motion (aí fica estático).
 */
export function MagneticButton({
  children,
  className,
  strength = 0.28,
  as = 'div',
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return

    let rafId = 0
    let tx = 0,
      ty = 0
    let targetX = 0,
      targetY = 0

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      // ativa dentro de 1.8× a largura
      const threshold = Math.max(rect.width, rect.height) * 1.8
      if (dist < threshold) {
        const factor = (1 - dist / threshold) * strength
        targetX = dx * factor
        targetY = dy * factor
      } else {
        targetX = 0
        targetY = 0
      }
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    const animate = () => {
      tx += (targetX - tx) * 0.18
      ty += (targetY - ty) * 0.18
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`
      rafId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reduce, strength])

  const Tag = as as any
  return (
    <Tag
      ref={ref as any}
      className={clsx('inline-block will-change-transform', className)}
      style={{ transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1)' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
