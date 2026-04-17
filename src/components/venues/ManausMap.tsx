import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { NEIGHBORHOODS, neighborhoodId } from '../../data/neighborhoods'
import { VENUES } from '../../data/venues'

interface Props {
  selectedVenueIds: string[]
  onNeighborhoodClick?: (id: string) => void
  className?: string
}

/**
 * Abstract illustrative map of Manaus showing the active neighborhoods.
 * Not cartographically accurate — built for atmosphere and interaction.
 */
export function ManausMap({ selectedVenueIds, onNeighborhoodClick, className }: Props) {
  const venuesByNeighborhood = useMemo(() => {
    const map = new Map<string, typeof VENUES>()
    for (const v of VENUES) {
      const id = neighborhoodId(v.neighborhood)
      if (!map.has(id)) map.set(id, [])
      map.get(id)!.push(v)
    }
    return map
  }, [])

  const selectedNeighborhoods = useMemo(() => {
    const set = new Set<string>()
    for (const id of selectedVenueIds) {
      const v = VENUES.find((x) => x.id === id)
      if (v) set.add(neighborhoodId(v.neighborhood))
    }
    return set
  }, [selectedVenueIds])

  return (
    <svg
      viewBox="0 0 1000 700"
      className={clsx('w-full h-auto', className)}
      aria-label="Mapa de cobertura de Manaus"
    >
      <defs>
        <radialGradient id="mapBg" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="rgba(0,230,64,0.08)" />
          <stop offset="100%" stopColor="rgba(0,230,64,0)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* backdrop */}
      <rect width="1000" height="700" fill="url(#mapBg)" />

      {/* River — Rio Negro abstract curve */}
      <path
        d="M -50 560 C 150 520, 320 600, 480 550 C 640 500, 780 600, 1080 540 L 1080 720 L -50 720 Z"
        fill="rgba(0,180,255,0.04)"
        stroke="rgba(0,180,255,0.15)"
        strokeWidth="1"
      />
      <text x="60" y="640" fill="rgba(0,180,255,0.45)" fontSize="11" letterSpacing="4">
        RIO NEGRO
      </text>

      {/* Grid — subtle hairline */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 50}
          y1={0}
          x2={i * 50}
          y2={700}
          stroke="rgb(var(--chalk-rgb) / 0.02)"
        />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={i * 50}
          x2={1000}
          y2={i * 50}
          stroke="rgb(var(--chalk-rgb) / 0.02)"
        />
      ))}

      {/* Neighborhood blobs */}
      {NEIGHBORHOODS.map((n, idx) => {
        const vs = venuesByNeighborhood.get(n.id) ?? []
        const isSel = selectedNeighborhoods.has(n.id)
        const size = 50 + vs.length * 8
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="cursor-pointer"
            onClick={() => onNeighborhoodClick?.(n.id)}
          >
            {/* Halo when selected */}
            {isSel && (
              <motion.circle
                cx={n.cx}
                cy={n.cy}
                r={size + 18}
                fill="rgba(0,230,64,0.12)"
                stroke="rgba(0,230,64,0.4)"
                strokeWidth="1"
                filter="url(#glow)"
                animate={{ r: [size + 14, size + 22, size + 14] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <circle
              cx={n.cx}
              cy={n.cy}
              r={size}
              fill={isSel ? 'rgba(0,230,64,0.08)' : 'rgb(var(--chalk-rgb) / 0.035)'}
              stroke={isSel ? 'rgba(0,230,64,0.5)' : 'rgb(var(--chalk-rgb) / 0.12)'}
              strokeWidth={isSel ? 1.5 : 1}
              className="transition-all duration-500 ease-apple"
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r={6}
              fill={isSel ? '#00E640' : 'rgb(var(--chalk-rgb) / 0.6)'}
            />
            <text
              x={n.cx}
              y={n.cy + size + 22}
              textAnchor="middle"
              fill={isSel ? '#F5F5F3' : 'rgb(var(--chalk-rgb) / 0.55)'}
              fontSize={13}
              fontWeight={500}
              letterSpacing={0.5}
              className="transition-all duration-500"
            >
              {n.name}
            </text>
            <text
              x={n.cx}
              y={n.cy + size + 38}
              textAnchor="middle"
              fill={isSel ? 'rgba(0,230,64,0.9)' : 'rgb(var(--chalk-rgb) / 0.3)'}
              fontSize={10}
              letterSpacing={1.5}
              className="font-mono"
            >
              {vs.length} {vs.length === 1 ? 'local' : 'locais'}
            </text>
          </motion.g>
        )
      })}
    </svg>
  )
}
