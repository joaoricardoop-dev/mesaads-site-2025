import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  /** duração total da animação em ms */
  duration?: number
  /** dispara só no hover do elemento ou do parent (via prop trigger externa) */
  trigger?: 'hover' | 'mount' | 'view'
  /** chars usados no embaralhamento */
  chars?: string
  /** prefixo que não embaralha (útil pra "R$ 2.633" manter "R$") */
  lockPrefix?: string
}

const DEFAULT_CHARS = '!@#$%&*<>?/\\|+=-_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/**
 * Scramble text Apple-like. No hover (ou mount), cada char vira lixo aleatório
 * e depois "aterrissa" na posição correta.
 */
export function ScrambleText({
  text,
  className,
  duration = 600,
  trigger = 'hover',
  chars = DEFAULT_CHARS,
  lockPrefix = '',
}: Props) {
  const [displayed, setDisplayed] = useState(text)
  const rafRef = useRef<number>(0)
  const elRef = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  const run = () => {
    if (reduce) {
      setDisplayed(text)
      return
    }
    const start = performance.now()
    const suffix = text.slice(lockPrefix.length)

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const revealed = Math.floor(progress * suffix.length)
      let out = lockPrefix
      for (let i = 0; i < suffix.length; i++) {
        if (i < revealed) {
          out += suffix[i]
        } else if (suffix[i] === ' ') {
          out += ' '
        } else {
          out += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      setDisplayed(out)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setDisplayed(text)
      }
    }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    setDisplayed(text)
    if (trigger === 'mount') run()
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger])

  useEffect(() => {
    if (trigger !== 'view') return
    const el = elRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run()
            obs.disconnect()
            return
          }
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  const handlers =
    trigger === 'hover'
      ? {
          onMouseEnter: run,
          onFocus: run,
        }
      : {}

  return (
    <span
      ref={elRef}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      {...handlers}
    >
      {displayed}
    </span>
  )
}
