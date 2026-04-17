import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CoasterScene } from '../../hero/CoasterScene'
import { Button } from '../../ui/Button'
import { ArrowRight } from '../../../assets/logo'
import { staggerContainer, staggerItem } from '../../../lib/motion'

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Canvas 3D faz fade-out conforme o usuário rola
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.6], [0.75, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section ref={ref} className="relative min-h-[96vh] overflow-hidden">
      {/* Scene 3D */}
      <motion.div
        className="pointer-events-auto absolute inset-0 z-0"
        style={{ opacity: sceneOpacity, scale: sceneScale, filter: 'saturate(0.9)' }}
      >
        <CoasterScene className="h-full w-full" />
      </motion.div>

      {/* veil radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(4,4,5,0) 40%, rgba(4,4,5,0.35) 90%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex min-h-[96vh] w-full max-w-[1240px] flex-col justify-center px-6 pt-[88px] pb-16 lg:px-10"
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="enter"
          className="max-w-[880px]"
        >
          <motion.h1
            variants={staggerItem}
            className="font-display text-mega font-medium tracking-[-0.04em] text-chalk text-balance"
          >
            Sua marca na mesa
            <br />
            <span className="italic font-serif font-normal text-chalk/90"> do seu </span>
            cliente.
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-6 max-w-[48ch] text-[16px] lg:text-[19px] text-chalk/65 leading-relaxed"
          >
            74 minutos de atenção real por refeição contra 1,9 segundo em mídia digital. Mídia em
            porta-copos, telas e salas VIP — na mão do consumidor, no momento do consumo.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="https://app.mesaads.com.br/campanha">
              <Button size="lg" iconRight={<ArrowRight className="size-4" />}>
                Montar campanha
              </Button>
            </a>
            <a href="#formatos">
              <Button size="lg" variant="ghost">
                Ver formatos
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4"
          >
            {[
              { v: '20', l: 'casas parceiras', s: 'Manaus' },
              { v: '100k', l: 'clientes/mês', s: 'impactados' },
              { v: '74 min', l: 'atenção', s: 'por refeição' },
              { v: '1,9 s', l: 'atenção', s: 'em digital' },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-[28px] leading-none text-chalk tabular font-medium">
                  {s.v}
                </div>
                <div className="mt-1.5 text-[11px] tracking-[0.1em] uppercase text-chalk/55">
                  {s.l}
                </div>
                <div className="text-[11px] text-chalk/35">{s.s}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-chalk/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Role pra descobrir</span>
        <svg viewBox="0 0 24 24" className="size-4" fill="none">
          <path
            d="M12 5v14M6 13l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </section>
  )
}
