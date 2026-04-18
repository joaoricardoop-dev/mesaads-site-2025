import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Coaster3D } from '../hero/Coaster3D'

const COASTERS = [
  '/coasters/coaster-nao-pode-pular.png',
  '/coasters/coaster-sua-marca.png',
  '/coasters/coaster-mesa-ads-orange.png',
  '/coasters/coaster-unipar-harmonia.png',
  '/coasters/coaster-unipar-parque.png',
]

interface FallingProps {
  index: number
  total: number
  url: string
  progress: number
}

function FallingCoaster({ index, total, url, progress }: FallingProps) {
  const group = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, url) as THREE.Texture

  const mats = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    const zoom = 0.92
    const off = (1 - zoom) / 2
    texture.repeat.set(zoom, zoom)
    texture.offset.set(off, off)
    texture.needsUpdate = true
    return {
      front: new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 0.06 }),
      back: new THREE.MeshStandardMaterial({ map: texture, roughness: 0.5, metalness: 0.06 }),
    }
  }, [texture])

  // Target position: stack on "mesa" centralizado
  const target = useMemo(() => {
    const spread = (index / Math.max(1, total - 1) - 0.5) * 2.8
    return {
      x: spread * 0.9,
      y: -0.8 + index * 0.05,
      z: (index % 2 === 0 ? 0.2 : -0.2) * 0.3,
      rotZ: ((index * 31) % 7) * 0.15 - 0.5,
    }
  }, [index, total])

  const startY = 6 + index * 0.6

  useFrame((_, delta) => {
    if (!group.current) return
    // Progress per coaster (cascade)
    const perCoasterDelay = index / total
    const perCoasterProgress = Math.max(0, Math.min(1, (progress - perCoasterDelay) / 0.35))
    const ease = perCoasterProgress * perCoasterProgress * (3 - 2 * perCoasterProgress) // smoothstep

    const y = startY + (target.y - startY) * ease
    const x = target.x * ease
    const z = target.z * ease
    // Rotação: gira enquanto cai, estabiliza
    const spinRemaining = (1 - ease) * Math.PI * 3
    const rotZ = target.rotZ + spinRemaining

    group.current.position.set(x, y, z)
    group.current.rotation.set(-0.15 + spinRemaining * 0.05, 0.2 * (1 - ease), rotZ)

    // idle "breathing" quando está parado
    if (ease > 0.98) {
      const t = performance.now() / 1000
      group.current.position.y = target.y + Math.sin(t * 1.5 + index) * 0.02
    }

    // Fade out quando progress > 0.95
    const fadeStart = 0.95
    if (progress > fadeStart) {
      const fadeProgress = (progress - fadeStart) / (1 - fadeStart)
      mats.front.opacity = 1 - fadeProgress
      mats.back.opacity = 1 - fadeProgress
      mats.front.transparent = true
      mats.back.transparent = true
    }
  })

  return (
    <group ref={group}>
      <Coaster3D
        frontMaterial={mats.front}
        backMaterial={mats.back}
        rimColor="#0A0A0C"
        radius={0.75}
        thickness={0.05}
      />
    </group>
  )
}

interface Props {
  onComplete?: () => void
  /** duração mínima em ms (independente de carregamento real) */
  minDuration?: number
}

/**
 * Loader cinematográfico: overlay preto full-screen com 5 porta-copos
 * caindo 3D e se empilhando no centro. Progress bar fina no rodapé.
 * Ao completar, fade-out suave e remove o overlay.
 */
export function CinematicLoader({ onComplete, minDuration = 2400 }: Props) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const startRef = useRef(Date.now())

  useEffect(() => {
    let rafId = 0
    const tick = () => {
      const elapsed = Date.now() - startRef.current
      const p = Math.min(1, elapsed / minDuration)
      setProgress(p)
      if (p >= 1 && !done) {
        // delay pequeno pra fade-out suave
        setTimeout(() => {
          setDone(true)
          onComplete?.()
        }, 420)
        return
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [minDuration, onComplete, done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: 'circle(0% at 50% 50%)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-ink-950 flex items-center justify-center"
          style={{ willChange: 'clip-path, opacity' }}
        >
          {/* ambient gradient */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,230,64,0.15), rgba(4,4,5,0) 60%)',
            }}
          />

          <div className="absolute inset-0">
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0.8, 4.5], fov: 42 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[4, 6, 3]} intensity={1.2} />
                <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#00E640" />
                <spotLight position={[0, 5, 3]} angle={0.5} intensity={0.5} color="#FF2E8A" />
                <Environment preset="city" />
                {COASTERS.map((url, i) => (
                  <FallingCoaster
                    key={url}
                    index={i}
                    total={COASTERS.length}
                    url={url}
                    progress={progress}
                  />
                ))}
              </Suspense>
            </Canvas>
          </div>

          {/* brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center gap-6 pointer-events-none"
          >
            <div className="font-display font-semibold text-[26px] tracking-[-0.03em] text-chalk">
              mesa<span className="text-mesa-neon">.ads</span>
            </div>
            <div className="text-[10px] tracking-[0.32em] uppercase text-chalk/40">
              sua marca na mesa
            </div>
          </motion.div>

          {/* progress bar */}
          <div className="absolute bottom-10 inset-x-0 mx-auto w-[240px] flex flex-col items-center gap-2">
            <div className="h-px w-full bg-chalk/10 overflow-hidden">
              <motion.div
                className="h-full bg-mesa-neon origin-left"
                style={{ scaleX: progress }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="font-mono tabular text-[10px] tracking-[0.2em] uppercase text-chalk/40">
              {Math.round(progress * 100).toString().padStart(2, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
