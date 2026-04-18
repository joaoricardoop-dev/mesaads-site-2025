import clsx from 'clsx'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** velocidade em segundos pra uma volta completa */
  speed?: number
  /** direção */
  direction?: 'left' | 'right'
  /** espaçamento entre items */
  gap?: number
  /** quantas cópias fazer (min 2 pra loop contínuo) */
  repeat?: number
  className?: string
  /** pausa no hover */
  pauseOnHover?: boolean
}

/**
 * Marquee infinito via CSS animation.
 * Renderiza 2 cópias (ou mais) lado a lado e translada X em loop.
 * Content deve ser "unit" repetível (ex: uma linha com várias palavras).
 */
export function Marquee({
  children,
  speed = 30,
  direction = 'left',
  gap = 48,
  repeat = 2,
  className,
  pauseOnHover = false,
}: Props) {
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right'

  return (
    <div
      className={clsx(
        'relative flex w-full overflow-hidden',
        pauseOnHover && 'group',
        className,
      )}
      aria-hidden
    >
      <div
        className={clsx(
          'flex shrink-0',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{
          gap: `${gap}px`,
          paddingRight: `${gap}px`,
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="flex items-center shrink-0" style={{ gap: `${gap}px` }}>
            {children}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
