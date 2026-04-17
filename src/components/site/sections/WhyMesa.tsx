import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { WHY_POINTS } from '../../../data/faq'

export function WhyMesa() {
  return (
    <Section pad="lg">
      <Eyebrow>08 · Por que Mesa.ads</Eyebrow>
      <SectionTitle className="mt-5 max-w-3xl">
        Uma mídia que o consumidor{' '}
        <span className="italic font-serif font-normal text-chalk/85">
          não pula
        </span>
        .
      </SectionTitle>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {WHY_POINTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl border border-hairline bg-ink-900/40 p-7 hover:border-hairlineBold transition-colors"
          >
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-mesa-neon/70" />
            <h3 className="font-display text-[20px] tracking-tight text-chalk">{p.title}</h3>
            <p className="mt-3 text-[14px] text-chalk/65 leading-relaxed">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
