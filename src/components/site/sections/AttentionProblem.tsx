import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { ATTENTION_PROBLEM } from '../../../data/stats'

export function AttentionProblem() {
  return (
    <Section id="problema" pad="lg">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>01 · O problema</Eyebrow>
          <SectionTitle className="mt-5">
            A atenção está curta.
            <br />
            <span className="italic font-serif font-normal text-chalk/85">
              {' '}
              E cada vez mais{' '}
            </span>
            cara.
          </SectionTitle>
          <p className="mt-5 max-w-md text-[15px] text-chalk/60 leading-relaxed">
            Não falta mídia. Falta atenção de verdade, no momento certo.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ATTENTION_PROBLEM.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl border border-hairline bg-ink-900/50 backdrop-blur-sm p-7"
              >
                <div className="absolute -right-16 -top-16 size-44 rounded-full opacity-25"
                  style={{
                    background: 'radial-gradient(closest-side, rgba(0,230,64,0.4), transparent 70%)',
                  }}
                />
                <div className="relative font-display text-[44px] leading-none tabular font-medium tracking-[-0.03em] text-mesa-neon">
                  {s.value}
                </div>
                <div className="relative mt-3 text-[14px] text-chalk/75 leading-snug">
                  {s.label}
                </div>
                <div className="relative mt-4 text-[10px] tracking-[0.12em] uppercase text-chalk/35">
                  fonte · {s.source}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
