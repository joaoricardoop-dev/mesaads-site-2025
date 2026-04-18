import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { RevealText } from '../../ui/RevealText'

const STATS = [
  { value: '74 min', label: 'comendo e bebendo' },
  { value: '55 min', label: 'por refeição' },
  { value: '2h20', label: 'em happy hour' },
  { value: '+40×', label: 'mais atenção que digital' },
]

export function MesaAdvantage() {
  return (
    <Section pad="lg">
      <div data-nav-theme="dark">
        <Eyebrow>02 · A virada</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          <RevealText by="word">A mesa tem</RevealText>{' '}
          <span className="italic font-serif font-normal text-chalk/85">
            <RevealText by="word" stagger={0.05}>
              tempo,
            </RevealText>
          </span>{' '}
          <RevealText by="word">conversa e contexto.</RevealText>
        </SectionTitle>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-hairline bg-ink-900/40 backdrop-blur-sm p-5 lg:p-6"
            >
              <div className="font-display text-[34px] lg:text-[46px] leading-none tabular font-medium tracking-[-0.04em] text-chalk">
                {s.value}
              </div>
              <div className="mt-3 text-[11px] lg:text-[13px] text-chalk/65 leading-snug">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Punchline gigante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative overflow-hidden rounded-3xl border border-mesa-neon/30 bg-gradient-to-br from-mesa-neon/10 to-transparent px-8 py-12 lg:px-14 lg:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full opacity-40"
            style={{
              background: 'radial-gradient(closest-side, rgba(0,230,64,0.35), transparent 70%)',
            }}
          />
          <div className="relative font-display font-medium text-[32px] lg:text-[56px] leading-[0.95] tracking-[-0.035em] text-chalk max-w-4xl">
            Porta-copo ={' '}
            <span className="text-mesa-neon">repetição natural</span>.
            <br />
            <span className="italic font-serif font-normal text-chalk/75">
              Várias vezes
            </span>{' '}
            por refeição.{' '}
            <span className="italic font-serif font-normal text-chalk/75">Sem custo extra.</span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
