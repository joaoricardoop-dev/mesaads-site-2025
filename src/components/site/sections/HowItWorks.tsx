import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { KineticTitle } from '../../ui/KineticTitle'

const STEPS = [
  { n: '01', title: 'Você escolhe', body: 'Formato, locais, prazo.', detail: 'Em 3 minutos.' },
  { n: '02', title: 'A gente produz', body: 'Arte + impressão.', detail: 'Design 5d · Produção 20d.' },
  { n: '03', title: 'Vai pras mesas', body: 'Fotos semanais.', detail: 'Prova de veiculação.' },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 40%'],
  })

  // Preenche a linha horizontal conforme o usuário rola
  const lineWidth = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="como-funciona" pad="lg" tone="elevated">
      <div data-nav-theme="dark">
        <Eyebrow>05 · Como funciona</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          <KineticTitle as="span" stagger={0.07}>Três passos.</KineticTitle>{' '}
          <span className="italic font-serif font-normal text-chalk/85">
            <KineticTitle as="span" stagger={0.07} delay={0.22}>Zero atrito.</KineticTitle>
          </span>
        </SectionTitle>

        {/* Timeline horizontal animada */}
        <div ref={ref} className="mt-20 relative">
          {/* Linha base */}
          <div className="absolute left-[8%] right-[8%] top-[38px] h-px bg-chalk/10" />
          {/* Linha que preenche com scroll */}
          <motion.div
            className="absolute left-[8%] top-[38px] h-[2px] bg-gradient-to-r from-mesa-neon via-mesa-neon to-mesa-magenta origin-left"
            style={{
              width: '84%',
              scaleX: lineWidth,
              boxShadow: '0 0 12px rgba(0,230,64,0.6)',
            }}
          />

          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Dot na timeline com pulse ring */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 200, damping: 18 }}
                  className="relative z-10 flex size-[76px] items-center justify-center rounded-full border border-mesa-neon/40 bg-ink-900 font-display text-[24px] tabular font-medium text-mesa-neon"
                  style={{
                    boxShadow: '0 0 32px rgba(0,230,64,0.3), inset 0 0 20px rgba(0,230,64,0.1)',
                  }}
                >
                  {s.n}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-mesa-neon/40"
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
                  />
                </motion.div>

                <h3 className="mt-6 font-display text-[26px] lg:text-[32px] tracking-[-0.02em] text-chalk leading-none">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] text-chalk/65 leading-snug max-w-[200px]">
                  {s.body}
                </p>
                <p className="mt-3 text-[11px] tracking-[0.14em] uppercase text-mesa-neon/80">
                  {s.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex items-center justify-center gap-3 text-[11px] tracking-[0.22em] uppercase text-chalk/40">
          <span className="size-1 rounded-full bg-mesa-neon" />
          Ciclo · 4 semanas
          <span className="size-1 rounded-full bg-chalk/30" />
          Total · 25 dias até o ar
          <span className="size-1 rounded-full bg-chalk/30" />
        </div>
      </div>
    </Section>
  )
}
