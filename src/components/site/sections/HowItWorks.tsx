import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { RevealText } from '../../ui/RevealText'

const STEPS = [
  { n: '01', title: 'Você escolhe', body: 'Formato, locais e prazo.' },
  { n: '02', title: 'A gente produz', body: 'Arte + impressão em 25 dias.' },
  { n: '03', title: 'Vai pras mesas', body: 'Fotos semanais de prova.' },
]

export function HowItWorks() {
  return (
    <Section id="como-funciona" pad="lg" tone="elevated">
      <div data-nav-theme="dark">
        <Eyebrow>05 · Como funciona</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          <RevealText by="word">Três passos.</RevealText>{' '}
          <span className="italic font-serif font-normal text-chalk/85">
            <RevealText by="word" stagger={0.05}>
              Zero atrito.
            </RevealText>
          </span>
        </SectionTitle>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl border border-hairline bg-ink-900/50 backdrop-blur-sm p-8 overflow-hidden hover:border-mesa-neon/40 transition-colors duration-300"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-8 font-display text-[180px] leading-none font-medium text-mesa-neon/10 tabular transition-all duration-500 group-hover:text-mesa-neon/20 group-hover:-translate-y-2"
              >
                {s.n}
              </div>
              <div className="relative">
                <h3 className="font-display text-[28px] lg:text-[34px] tracking-[-0.02em] text-chalk leading-none">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] text-chalk/60 leading-snug">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-[11px] tracking-[0.22em] uppercase text-chalk/40">
          <span className="size-1 rounded-full bg-mesa-neon" />
          Ciclo · 4 semanas
          <span className="size-1 rounded-full bg-chalk/30" />
          Design · 5d
          <span className="size-1 rounded-full bg-chalk/30" />
          Produção · 20d
          <span className="size-1 rounded-full bg-chalk/30" />
        </div>
      </div>
    </Section>
  )
}
