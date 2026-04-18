import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { CASES } from '../../../data/cases'
import { CoasterMock } from '../CoasterMock'
import { Chip } from '../../ui/Chip'
import { ClipReveal } from '../../ui/ClipReveal'
import { KineticTitle } from '../../ui/KineticTitle'

export function Cases() {
  return (
    <Section id="casos" pad="lg">
      <Eyebrow>04 · Casos</Eyebrow>
      <SectionTitle className="mt-5 max-w-3xl">
        <KineticTitle as="span" stagger={0.07}>Na mesa do cliente,</KineticTitle>{' '}
        <span className="italic font-serif font-normal text-chalk/85">
          <KineticTitle as="span" stagger={0.07} delay={0.3}>pra valer.</KineticTitle>
        </span>
      </SectionTitle>

      <div className="mt-14 flex flex-col gap-16">
        {CASES.map((c, i) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center"
          >
            <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <Chip tone={c.accent} size="xs" dot>
                Case {String(i + 1).padStart(2, '0')}
              </Chip>
              <h3 className="mt-3 font-display text-[28px] lg:text-[40px] leading-[1.02] tracking-[-0.03em] text-chalk text-balance">
                {c.headline}
              </h3>
              <div className="mt-4 text-[11px] tracking-[0.22em] uppercase text-chalk/45">
                {c.brand}
              </div>
              <p className="mt-4 text-[14px] text-chalk/65 leading-snug max-w-md">{c.note}</p>
            </div>

            <div
              className={`lg:col-span-7 relative flex flex-wrap items-center justify-center gap-8 py-12 lg:py-16 rounded-3xl border border-hairline overflow-hidden ${
                i % 2 === 1 ? 'lg:order-1' : ''
              }`}
              style={{
                background: `radial-gradient(ellipse at center, ${accentBg(c.accent)}, rgba(4,4,5,0.5) 70%)`,
              }}
            >
              {/* Ambient orb */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${accentBg(c.accent)}, transparent 60%)`,
                }}
              />

              {c.faces.map((f, idx) => (
                <ClipReveal
                  key={idx}
                  shape="circle"
                  delay={idx * 0.15}
                  duration={1.1}
                  className="relative"
                >
                  <motion.div
                    initial={{ rotate: idx === 0 ? -6 : 8 }}
                    whileInView={{ rotate: idx === 0 ? -4 : 6 }}
                    whileHover={{ rotate: 0, y: -12, scale: 1.08 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="cursor-default"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
                  >
                    <CoasterMock face={f} size={230} />
                  </motion.div>
                </ClipReveal>
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
    case 'magenta':
      return 'rgba(255,46,138,0.18)'
    case 'amber':
      return 'rgba(245,230,58,0.15)'
    case 'orange':
      return 'rgba(242,122,26,0.15)'
    case 'ice':
      return 'rgba(184,241,255,0.15)'
    default:
      return 'rgba(0,230,64,0.15)'
  }
}
