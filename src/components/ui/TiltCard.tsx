import { useRef, useEffect, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  className?: string
  /** ângulo máximo em graus */
  maxTilt?: number
  /** intensidade do glare (0 = sem brilho, 0.5 = forte) */
  glare?: number
}

/**
 * Card com tilt 3D baseado na posição do mouse.
 * Perspectiva + rotateX/Y + glare gradient que segue o cursor.
 * Awwwards-style card interaction.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 9,
  glare = 0.18,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    const inner = innerRef.current
    if (!el || !inner) return

    let rafId = 0
    let tX = 0,
      tY = 0
    let cX = 0,
      cY = 0

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width // 0..1
      const py = (e.clientY - rect.top) / rect.height
      tX = (py - 0.5) * -2 * maxTilt // inverte eixo Y pra inclinação natural
      tY = (px - 0.5) * 2 * maxTilt
      if (glareRef.current) {
        glareRef.current.style.setProperty('--gx', `${px * 100}%`)
        glareRef.current.style.setProperty('--gy', `${py * 100}%`)
        glareRef.current.style.opacity = '1'
      }
    }
    const onLeave = () => {
      tX = 0
      tY = 0
      if (glareRef.current) glareRef.current.style.opacity = '0'
    }

    const animate = () => {
      cX += (tX - cX) * 0.12
      cY += (tY - cY) * 0.12
      inner.style.transform = `rotateX(${cX.toFixed(2)}deg) rotateY(${cY.toFixed(2)}deg)`
      rafId = requestAnimationFrame(animate)
    }
    animate()

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(rafId)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reduce, maxTilt])

  return (
    <div
      ref={ref}
      className={clsx('relative', className)}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
        {glare > 0 && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,' +
                glare +
                '), rgba(255,255,255,0) 50%)',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </div>
  )
}
