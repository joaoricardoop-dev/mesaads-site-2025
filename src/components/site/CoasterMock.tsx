import clsx from 'clsx'
import type { CoasterFace } from '../../data/cases'

interface Props {
  face: CoasterFace
  size?: number
  className?: string
}

/**
 * Mockup 2D circular de porta-copo 90mm.
 * Renderiza um SVG com fundo + tipografia Bricolage, QR placeholder opcional.
 */
export function CoasterMock({ face, size = 280, className }: Props) {
  const r = 100

  return (
    <svg
      viewBox={`0 0 ${r * 2} ${r * 2}`}
      width={size}
      height={size}
      className={clsx('drop-shadow-[0_28px_60px_rgba(0,0,0,0.45)]', className)}
      role="img"
      aria-label={face.titleLg ?? face.brandTop ?? 'Porta-copo Mesa.ads'}
    >
      <defs>
        <clipPath id={`clip-${r}`}>
          <circle cx={r} cy={r} r={r} />
        </clipPath>
      </defs>

      {/* fundo */}
      <g clipPath={`url(#clip-${r})`}>
        <rect width={r * 2} height={r * 2} fill={face.bg} />

        {/* anel decorativo */}
        <circle
          cx={r}
          cy={r}
          r={r - 6}
          fill="none"
          stroke={face.ink}
          strokeOpacity={0.14}
          strokeWidth={0.5}
        />

        {/* brand top */}
        {face.brandTop && (
          <text
            x={r}
            y={28}
            fontFamily="Bricolage Grotesque Variable, system-ui"
            fontWeight={700}
            fontSize={8}
            letterSpacing={1.4}
            fill={face.ink}
            textAnchor="middle"
            opacity={0.9}
          >
            {face.brandTop}
          </text>
        )}

        {/* title grande */}
        {face.titleLg && (
          <text
            x={r}
            y={face.titleSub?.length ? 82 : 100}
            fontFamily="Bricolage Grotesque Variable, system-ui"
            fontWeight={800}
            fontSize={26}
            letterSpacing={-0.5}
            fill={face.ink}
            textAnchor="middle"
          >
            {face.titleLg}
          </text>
        )}

        {/* lines (stacked vertical) */}
        {face.lines?.map((line, i) => {
          const count = face.lines!.length
          const startY = r - (count - 1) * 9
          return (
            <text
              key={i}
              x={r}
              y={startY + i * 18}
              fontFamily="Bricolage Grotesque Variable, system-ui"
              fontWeight={700}
              fontSize={14}
              letterSpacing={-0.3}
              fill={face.ink}
              textAnchor="middle"
            >
              {line}
            </text>
          )
        })}

        {/* title sub lines */}
        {face.titleSub?.map((line, i) => {
          const lower = face.titleLg ? 104 : 80
          return (
            <text
              key={i}
              x={r}
              y={lower + i * 12}
              fontFamily="Bricolage Grotesque Variable, system-ui"
              fontWeight={500}
              fontSize={9}
              letterSpacing={0.3}
              fill={face.ink}
              opacity={0.78}
              textAnchor="middle"
            >
              {line}
            </text>
          )
        })}

        {/* footnote */}
        {face.footNote && (
          <text
            x={r}
            y={face.qr ? r * 2 - 40 : r * 2 - 20}
            fontFamily="Bricolage Grotesque Variable, system-ui"
            fontWeight={500}
            fontSize={7}
            letterSpacing={1.1}
            fill={face.ink}
            opacity={0.8}
            textAnchor="middle"
          >
            {face.footNote}
          </text>
        )}

        {/* QR code placeholder (decorativo) */}
        {face.qr && (
          <g transform={`translate(${r - 18}, ${r * 2 - 40})`}>
            <rect width={36} height={36} fill={face.ink} opacity={0.12} rx={2} />
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 8 }).map((_, col) => {
                const seed = (row * 7 + col * 3 + 1) % 5
                if (seed < 2) return null
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={3 + col * 3.75}
                    y={3 + row * 3.75}
                    width={3}
                    height={3}
                    fill={face.ink}
                  />
                )
              }),
            )}
            {/* QR finder markers */}
            <rect x={2} y={2} width={8} height={8} fill="none" stroke={face.ink} strokeWidth={1} />
            <rect x={26} y={2} width={8} height={8} fill="none" stroke={face.ink} strokeWidth={1} />
            <rect x={2} y={26} width={8} height={8} fill="none" stroke={face.ink} strokeWidth={1} />
          </g>
        )}
      </g>
    </svg>
  )
}
