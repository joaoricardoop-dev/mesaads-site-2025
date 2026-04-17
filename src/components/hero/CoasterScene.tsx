import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'
import { Coaster3D } from './Coaster3D'

/**
 * Artes reais das campanhas Mesa.ads, aplicadas como textura no circleGeometry.
 * Cada arquivo é um PNG quadrado com o círculo do porta-copo centralizado.
 * `rim` = cor do anel lateral do disco 3D (harmoniza com a arte).
 * `zoom` = fator de crop UV para o círculo da arte preencher o circleGeometry
 *          sem deixar aparecer a borda quadrada de fundo.
 */
interface CoasterArt {
  url: string
  rim: string
  zoom: number
}

const COASTERS: CoasterArt[] = [
  { url: '/coasters/coaster-nao-pode-pular.png', rim: '#0A0A0C', zoom: 0.92 },
  { url: '/coasters/coaster-sua-marca.png', rim: '#0A0A0C', zoom: 0.92 },
  { url: '/coasters/coaster-mesa-ads-orange.png', rim: '#D1620F', zoom: 0.92 },
  { url: '/coasters/coaster-unipar-harmonia.png', rim: '#B09C7A', zoom: 0.92 },
  { url: '/coasters/coaster-unipar-parque.png', rim: '#C3BEB4', zoom: 0.92 },
]

interface FloatingProps {
  index: number
  total: number
  art: CoasterArt
  pointer: React.MutableRefObject<{ x: number; y: number }>
}

function FloatingCoaster({ index, total, art, pointer }: FloatingProps) {
  const group = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, art.url) as THREE.Texture

  // Ajuste da textura uma única vez (colorSpace, anisotropy, crop central)
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    // Crop central: elimina a borda quadrada ao redor do círculo PNG
    const off = (1 - art.zoom) / 2
    texture.repeat.set(art.zoom, art.zoom)
    texture.offset.set(off, off)
    texture.needsUpdate = true
  }, [texture, art.zoom])

  // Material da frente com a textura real
  const frontMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.55,
        metalness: 0.05,
      }),
    [texture],
  )

  // Material do verso usa a MESMA textura, na mesma orientação da frente.
  // Fisicamente inconsistente (uma peça real teria verso diferente), mas
  // garante que a arte nunca aparece espelhada conforme o coaster roda.
  const backMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.55,
        metalness: 0.05,
      }),
    [texture],
  )

  const base = useMemo(() => {
    const angle = (index / total) * Math.PI * 2
    const radius = 2.8 + ((index * 37) % 7) * 0.08
    return {
      angle,
      radius,
      yOff: ((index * 13) % 7) * 0.18 - 0.6,
      spin: 0.2 + ((index * 7) % 5) * 0.05,
      tilt: ((index * 29) % 7) * 0.03 - 0.1, // tilt reduzido pra não virar
    }
  }, [index, total])

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    const angle = base.angle + t * base.spin * 0.18

    const x = Math.cos(angle) * base.radius
    const z = Math.sin(angle) * base.radius * 0.6
    const y = Math.sin(t * 0.6 + index) * 0.25 + base.yOff

    group.current.position.set(x, y, z)

    // Rotação Y limitada a ±0.15rad (~9°) + parallax do pointer — coaster NÃO vira.
    // Rotação X idem (apenas tilt sutil).
    // Rotação Z livre (spin no próprio plano, sempre mostra a face frontal).
    const targetRotY = pointer.current.x * 0.12
    const targetRotX = base.tilt + pointer.current.y * 0.12
    const targetRotZ = t * 0.35 + index * 0.4

    group.current.rotation.y += (targetRotY - group.current.rotation.y) * Math.min(1, delta * 3)
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * Math.min(1, delta * 3)
    group.current.rotation.z = targetRotZ
  })

  return (
    <group ref={group}>
      <Coaster3D
        frontMaterial={frontMaterial}
        backMaterial={backMaterial}
        rimColor={art.rim}
        radius={0.75}
        thickness={0.05}
      />
    </group>
  )
}

export function CoasterScene({ className }: { className?: string }) {
  const pointer = useRef({ x: 0, y: 0 })

  return (
    <div
      className={className}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
        pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
      }}
      onPointerLeave={() => {
        pointer.current.x = 0
        pointer.current.y = 0
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.6, 6.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 8, 4]} intensity={1.1} castShadow />
          <directionalLight position={[-5, 3, -2]} intensity={0.6} color="#00E640" />
          <spotLight position={[0, 6, 6]} angle={0.6} intensity={0.4} color="#FF2E8A" />
          <Environment preset="city" />

          {COASTERS.map((art, i) => (
            <FloatingCoaster
              key={art.url}
              index={i}
              total={COASTERS.length}
              art={art}
              pointer={pointer}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
