import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eyebrow } from '../Section'
import { VENUES } from '../../../data/venues'
import { Chip } from '../../ui/Chip'
import { KineticTitle } from '../../ui/KineticTitle'

gsap.registerPlugin(ScrollTrigger)

/**
 * Seção Rede com HORIZONTAL PIN SCROLL:
 * - Ao chegar na seção, o scroll vertical "trava" e os 11 parceiros
 *   deslizam horizontalmente enquanto o usuário continua scrollando.
 * - Depois da última card, destrava e continua o scroll normal da página.
 */
export function Network() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    // Desabilita horizontal pin em mobile/tablet — fica muito desconfortável
    if (window.innerWidth < 1024) return

    // Quanto a track precisa mover pra mostrar tudo
    const getDistance = () => track.scrollWidth - window.innerWidth + 120

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => setProgress(st.progress),
        },
      })
      return () => tween.scrollTrigger?.kill()
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      id="rede"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-ink-950"
    >
      {/* Progress bar do horizontal scroll */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-chalk/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-mesa-neon to-mesa-magenta"
          style={{ width: `${progress * 100}%`, transition: 'width 80ms linear' }}
        />
      </div>

      <div className="min-h-screen flex flex-col py-16 lg:py-20">
        {/* Header */}
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 shrink-0">
          <Eyebrow>06 · Rede Mesa Ads</Eyebrow>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display font-medium text-title text-chalk text-balance max-w-3xl">
              <KineticTitle as="span" stagger={0.06}>11 casas,</KineticTitle>{' '}
              <span className="italic font-serif font-normal text-chalk/85">
                <KineticTitle as="span" stagger={0.06} delay={0.18}>um só</KineticTitle>
              </span>{' '}
              <KineticTitle as="span" stagger={0.06} delay={0.3}>momento: a mesa.</KineticTitle>
            </h2>

            {/* Stats compactos */}
            <div className="flex items-baseline gap-8">
              <div>
                <div className="font-display text-[44px] leading-none tabular font-medium text-mesa-neon">
                  100k
                </div>
                <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-chalk/50">
                  clientes/mês
                </div>
              </div>
              <div>
                <div className="font-display text-[44px] leading-none tabular font-medium text-chalk">
                  +20%
                </div>
                <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-chalk/50">
                  por semana
                </div>
              </div>
            </div>
          </div>

          {/* Chips de bairros */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              'Tarumã',
              'Nossa Senhora das Graças',
              'Adrianópolis',
              'Distrit Industrial I',
              'Parque 10',
              'Santa Etelvina',
              'Centro',
            ].map((n) => (
              <Chip key={n} tone="neon" size="sm" dot>
                {n}
              </Chip>
            ))}
          </div>

          <p className="hidden lg:block mt-10 text-[10px] tracking-[0.22em] uppercase text-chalk/40">
            ↓ role pra atravessar a rede →
          </p>
        </div>

        {/* Horizontal scrolling track */}
        <div className="flex-1 flex items-center mt-10 lg:mt-14 overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-stretch gap-4 pl-6 lg:pl-10 pr-6 lg:pr-20"
            style={{ willChange: 'transform' }}
          >
            {VENUES.map((v, i) => (
              <VenueCardHorizontal key={v.id} venue={v} index={i} />
            ))}

            {/* Card final: CTA */}
            <div className="flex shrink-0 items-center justify-center w-[380px] lg:w-[420px]">
              <div className="text-center">
                <div className="text-[10px] tracking-[0.22em] uppercase text-mesa-neon/80 mb-3">
                  próximo passo
                </div>
                <div className="font-display text-[28px] lg:text-[40px] leading-[1.02] tracking-[-0.025em] text-chalk text-balance">
                  Sua marca
                  <br />
                  <span className="italic font-serif font-normal text-chalk/85">
                    em qualquer delas.
                  </span>
                </div>
                <a
                  href="https://app.mesaads.com.br/campanha"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-mesa-neon/40 bg-mesa-neon/10 px-5 h-11 text-[13px] tracking-tight text-mesa-neon hover:bg-mesa-neon hover:text-ink-950 transition-colors duration-300"
                >
                  Montar campanha →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VenueCardHorizontal({
  venue,
  index,
}: {
  venue: (typeof VENUES)[number]
  index: number
}) {
  const accent =
    venue.accent === 'magenta'
      ? 'rgba(255,46,138,0.25)'
      : venue.accent === 'amber'
        ? 'rgba(245,230,58,0.22)'
        : venue.accent === 'orange'
          ? 'rgba(242,122,26,0.25)'
          : venue.accent === 'ice'
            ? 'rgba(184,241,255,0.22)'
            : 'rgba(0,230,64,0.25)'

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0 w-[320px] lg:w-[360px] rounded-3xl border border-hairline bg-gradient-to-br from-ink-800/70 to-ink-900/95 p-7 relative overflow-hidden flex flex-col"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-56 rounded-full opacity-40"
        style={{
          background: `radial-gradient(closest-side, ${accent}, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center justify-between mb-5">
        <div className="text-[10px] tracking-[0.22em] uppercase text-chalk/40 font-mono">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="text-[10px] tracking-[0.22em] uppercase text-mesa-neon/80">
          {venue.neighborhood}
        </div>
      </div>

      <h3 className="relative font-display text-[22px] lg:text-[26px] tracking-[-0.02em] text-chalk leading-tight">
        {venue.name}
      </h3>

      <div className="relative mt-auto pt-6 grid grid-cols-2 gap-3 border-t border-hairline">
        <div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-chalk/40">Clientes</div>
          <div className="mt-1 font-mono text-[20px] tabular text-mesa-neon">
            {(venue.clientesMes / 1000).toFixed(1).replace('.', ',')}k
          </div>
          <div className="text-[10px] text-chalk/40 font-mono">por mês</div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-chalk/40">Capacidade</div>
          <div className="mt-1 font-mono text-[20px] tabular text-chalk">
            {(venue.capCoasters / 1000).toFixed(1).replace('.', ',')}k
          </div>
          <div className="text-[10px] text-chalk/40 font-mono">porta-copos</div>
        </div>
      </div>
    </motion.article>
  )
}
