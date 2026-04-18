import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { RevealText } from '../../ui/RevealText'

/**
 * Stats encurtados e punchy.
 * Label virou 3-4 palavras no máximo. Fonte oculta no hover pra quem quiser ver.
 */
const STATS = [
  { value: '9h13', label: 'online por dia', source: 'Data Rare' },
  { value: '78%', label: 'pulam anúncios', source: 'CNDL' },
  { value: 'R$ 37 bi', label: 'em mídia digital', source: 'Kantar' },
  { value: '1,9 s', label: 'atenção em digital', source: 'Lumen Research' },
]

export function AttentionProblem() {
  return (
    <Section id="problema" pad="lg">
      <div
        data-nav-theme="dark"
        className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
      >
        <div className="lg:col-span-5">
          <Eyebrow>01 · O problema</Eyebrow>
          <SectionTitle className="mt-5">
            <RevealText by="word">A atenção está curta.</RevealText>
            <br />
            <span className="italic font-serif font-normal text-chalk/85">
              <RevealText by="word" stagger={0.05}>
                E cada vez
              </RevealText>
            </span>{' '}
            <RevealText by="word" stagger={0.05}>
              mais cara.
            </RevealText>
          </SectionTitle>
          <p className="mt-6 text-[15px] text-chalk/60 max-w-sm">
            Não falta mídia. Falta atenção no momento certo.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-3">
            {STATS.map((s, i) => (
              <motion.li
                key={s.value}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-hairline bg-ink-900/50 backdrop-blur-sm p-6 lg:p-8"
              >
                <div
                  aria-hidden
                  className="absolute -right-12 -top-12 size-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(closest-side, rgba(0,230,64,0.4), transparent 70%)',
                  }}
                />
                <div className="relative font-display text-[48px] lg:text-[64px] leading-none tabular font-medium tracking-[-0.04em] text-mesa-neon">
                  {s.value}
                </div>
                <div className="relative mt-4 text-[13px] lg:text-[14px] text-chalk/75 leading-snug">
                  {s.label}
                </div>
                <div className="relative mt-4 text-[9px] tracking-[0.18em] uppercase text-chalk/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {s.source}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
