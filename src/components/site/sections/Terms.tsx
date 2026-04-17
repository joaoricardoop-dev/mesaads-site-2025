import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle, SectionSub } from '../Section'
import { COMMERCIAL_BLOCKS } from '../../../data/stats'

export function Terms() {
  return (
    <Section id="condicoes" pad="lg" tone="elevated">
      <Eyebrow>09 · Condições comerciais</Eyebrow>
      <SectionTitle className="mt-5 max-w-3xl">
        Tudo transparente,{' '}
        <span className="italic font-serif font-normal text-chalk/85">
          desde o briefing
        </span>
        .
      </SectionTitle>
      <SectionSub>
        Regras claras pra produção, pagamento e prova de veiculação. Sem letra miúda.
      </SectionSub>

      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
        {COMMERCIAL_BLOCKS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-hairline py-6"
          >
            <div className="text-[12px] tracking-[0.18em] uppercase text-mesa-neon mb-2">
              {b.title}
            </div>
            <p className="text-[14px] text-chalk/75 leading-relaxed max-w-md">{b.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
