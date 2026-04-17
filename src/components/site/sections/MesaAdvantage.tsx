import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { MESA_ADVANTAGE } from '../../../data/stats'

export function MesaAdvantage() {
  return (
    <Section pad="lg" className="">
      <Eyebrow>02 · A virada</Eyebrow>
      <SectionTitle className="mt-5 max-w-3xl">
        A mesa tem{' '}
        <span className="italic font-serif font-normal text-chalk/85">tempo,</span> conversa e
        contexto.
      </SectionTitle>
      <p className="mt-5 max-w-2xl text-[15px] lg:text-[17px] text-chalk/60 leading-relaxed">
        O consumidor segura, lê e repete. O porta-copo é visto várias vezes durante a refeição —
        frequência natural, sem mídia extra.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {MESA_ADVANTAGE.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-hairline bg-ink-900/40 backdrop-blur-sm p-7"
          >
            <div className="font-display text-[36px] leading-none tabular font-medium tracking-[-0.03em] text-chalk">
              {s.value}
            </div>
            <div className="mt-3 text-[13px] text-chalk/70 leading-snug">{s.label}</div>
            <div className="mt-4 text-[10px] tracking-[0.12em] uppercase text-chalk/35">
              {s.source}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Punchline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 flex flex-col items-start gap-3 rounded-3xl border border-mesa-neon/30 bg-mesa-neon/5 p-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="font-display text-[22px] lg:text-[28px] tracking-tight text-chalk max-w-xl">
          <span className="text-mesa-neon">Porta-copo = repetição natural.</span>
          <br className="hidden lg:block" />
          A mesma marca, vista várias vezes, sem custo de frequência.
        </div>
        <a
          href="#formatos"
          className="text-[13px] tracking-wide text-chalk/70 hover:text-chalk underline underline-offset-4"
        >
          Como funciona na prática →
        </a>
      </motion.div>
    </Section>
  )
}
