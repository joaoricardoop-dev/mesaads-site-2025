import { useEffect, useRef, useState } from 'react'

/**
 * Cursor customizado com 2 camadas (dot + ring).
 * Estados:
 *  - default: ring pequeno + dot central
 *  - view: ring expande (hover em botões, links, cards)
 *  - drag: ring verde neon (sobre canvas 3D do hero)
 *
 * Esconde em touch devices (não expõe ponteiro).
 * Respeita prefers-reduced-motion (follow instantâneo em vez de lerp).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<'default' | 'view' | 'drag'>('default')

  useEffect(() => {
    // Detecta se é fine-pointer (mouse, não touch)
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(pointer: fine)')
    setEnabled(mql.matches)
    const onChange = () => setEnabled(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let mouseX = 0,
      mouseY = 0
    let ringX = 0,
      ringY = 0
    const lerpFactor = reduce ? 1 : 0.16

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`
      }
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest) return
      if (target.closest('button, a, [role="button"], label, input, textarea')) {
        setState('view')
      } else if (target.closest('canvas, [data-cursor="drag"]')) {
        setState('drag')
      } else {
        setState('default')
      }
    }

    const onLeave = () => setState('default')

    let rafId = 0
    const raf = () => {
      ringX += (mouseX - ringX) * lerpFactor
      ringY += (mouseY - ringY) * lerpFactor
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`
      }
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerleave', onLeave)

    // esconde o cursor nativo
    document.documentElement.style.cursor = 'none'

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerleave', onLeave)
      document.documentElement.style.cursor = ''
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* dot central — segue 1:1 */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-1.5 rounded-full bg-chalk mix-blend-difference"
        style={{ transition: 'background 200ms ease' }}
      />
      {/* ring — lerp atrás do dot, muda tamanho/cor por state */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border mix-blend-difference will-change-transform"
        style={{
          width: state === 'view' ? 56 : state === 'drag' ? 72 : 36,
          height: state === 'view' ? 56 : state === 'drag' ? 72 : 36,
          borderColor:
            state === 'drag' ? 'rgb(0 230 64)' : state === 'view' ? 'rgb(245 245 243)' : 'rgb(245 245 243 / 0.6)',
          borderWidth: state === 'drag' ? 2 : 1,
          transition: 'width 220ms cubic-bezier(0.22,1,0.36,1), height 220ms cubic-bezier(0.22,1,0.36,1), border-color 180ms ease, border-width 180ms ease',
          marginTop: state === 'view' ? -10 : state === 'drag' ? -18 : 0,
          marginLeft: state === 'view' ? -10 : state === 'drag' ? -18 : 0,
        }}
      />
    </>
  )
}
