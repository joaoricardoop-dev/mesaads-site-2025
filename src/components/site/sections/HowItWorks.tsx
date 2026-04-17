import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle, SectionSub } from '../Section'
import { HOW_IT_WORKS } from '../../../data/stats'

export function HowItWorks() {
  return (
    <Section id="como-funciona" pad="lg" tone="elevated">
      <Eyebrow>05 · Como funciona</Eyebrow>
      <SectionTitle className="mt-5 max-w-3xl">
        Três passos.{' '}
        <span className="italic font-serif font-normal text-chalk/85">
          Zero atrito.
        </span>
      </SectionTitle>
      <SectionSub>
        Ciclo padrão de 4 semanas. Você escolhe onde e por quanto tempo, a gente cuida do resto.
      </SectionSub>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-4">
        {HOW_IT_WORKS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-hairline bg-ink-900/50 backdrop-blur-sm p-8 overflow-hidden"
          >
            {/* Número gigante decorativo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 -top-6 font-display text-[140px] leading-none font-medium text-mesa-neon/10 tabular"
            >
              {s.n}
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-mesa-neon/30 bg-mesa-neon/10 px-3 py-1 text-[11px] tracking-[0.18em] uppercase text-mesa-neon font-medium">
                Passo {s.n}
              </div>
              <h3 className="mt-5 font-display text-[22px] lg:text-[26px] tracking-tight text-chalk leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-[14px] text-chalk/65 leading-relaxed">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 flex items-center justify-center gap-3 text-[12px] tracking-[0.18em] uppercase text-chalk/45"
      >
        <span className="size-1 rounded-full bg-chalk/30" />
        Prazo da campanha · cada ciclo fica ativo por 4 semanas
        <span className="size-1 rounded-full bg-chalk/30" />
      </motion.div>
    </Section>
  )
}
