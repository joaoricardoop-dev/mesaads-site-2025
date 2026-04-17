import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle, SectionSub } from '../Section'
import { CASES } from '../../../data/cases'
import { CoasterMock } from '../CoasterMock'
import { Chip } from '../../ui/Chip'

export function Cases() {
  return (
    <Section id="casos" pad="lg">
      <Eyebrow>04 · Casos</Eyebrow>
      <SectionTitle className="mt-5 max-w-3xl">
        Na mesa do cliente,{' '}
        <span className="italic font-serif font-normal text-chalk/85">pra valer</span>.
      </SectionTitle>
      <SectionSub>
        Campanhas reais rodando em bares e restaurantes parceiros. Aqui estão três exemplos de
        como marcas usam o formato.
      </SectionSub>

      <div className="mt-14 flex flex-col gap-14">
        {CASES.map((c, i) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center"
          >
            {/* Text side — alterna ordem */}
            <div
              className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}
            >
              <Chip tone={c.accent} size="xs" dot>
                Case {String(i + 1).padStart(2, '0')}
              </Chip>
              <h3 className="mt-3 font-display text-[26px] lg:text-[34px] leading-[1.05] tracking-[-0.025em] text-chalk text-balance">
                {c.headline}
              </h3>
              <div className="mt-4 text-[12px] tracking-[0.2em] uppercase text-chalk/45">
                {c.brand}
              </div>
              <p className="mt-4 text-[14px] lg:text-[15px] text-chalk/65 leading-relaxed max-w-md">
                {c.note}
              </p>
            </div>

            {/* Visual side */}
            <div
              className={`lg:col-span-7 flex flex-wrap items-center justify-center gap-8 py-10 lg:py-14 rounded-3xl bg-gradient-to-br from-ink-800/50 to-ink-950/70 border border-hairline ${
                i % 2 === 1 ? 'lg:order-1' : ''
              }`}
              style={{
                background: `radial-gradient(ellipse at center, ${accentBg(c.accent)}, rgba(4,4,5,0.5) 70%)`,
              }}
            >
              {c.faces.map((f, idx) => (
                <motion.div
                  key={idx}
                  initial={{ rotate: idx === 0 ? -6 : 8, y: 16 }}
                  whileInView={{ rotate: idx === 0 ? -4 : 6, y: 0 }}
                  whileHover={{ rotate: 0, y: -8, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                  className="cursor-default"
                >
                  <CoasterMock face={f} size={220} />
                </motion.div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function accentBg(a: string) {
  switch (a) {
    case 'magenta': return 'rgba(255,46,138,0.18)'
    case 'amber': return 'rgba(245,230,58,0.15)'
    case 'orange': return 'rgba(242,122,26,0.15)'
    case 'ice': return 'rgba(184,241,255,0.15)'
    default: return 'rgba(0,230,64,0.15)'
  }
}
