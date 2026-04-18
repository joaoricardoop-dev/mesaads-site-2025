import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { PRODUCTS } from '../../../data/products'
import { Chip } from '../../ui/Chip'
import { ArrowRight } from '../../../assets/logo'
import { TiltCard } from '../../ui/TiltCard'
import { KineticTitle } from '../../ui/KineticTitle'
import clsx from 'clsx'

export function Formats() {
  return (
    <Section id="formatos" pad="lg">
      <div data-nav-theme="dark">
        <Eyebrow>03 · Formatos</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          <KineticTitle as="span" stagger={0.07}>Três formatos,</KineticTitle>
          <br />
          <KineticTitle as="span" stagger={0.07} delay={0.18}>uma</KineticTitle>{' '}
          <span className="italic font-serif font-normal text-chalk/85">
            <KineticTitle as="span" stagger={0.07} delay={0.3}>mesma ideia.</KineticTitle>
          </span>
        </SectionTitle>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={clsx(p.id === 'coaster' && 'md:col-span-2 lg:col-span-2')}
            >
              <TiltCard
                maxTilt={6}
                glare={0.12}
                className="group relative overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-ink-800/70 to-ink-900/90 p-7 flex flex-col h-full"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full opacity-25 transition-opacity duration-500 ease-apple group-hover:opacity-50"
                  style={{
                    background: `radial-gradient(closest-side, ${accentColor(p.accent)}, transparent 70%)`,
                  }}
                />

                <div className="relative flex flex-wrap items-center gap-2 mb-5">
                  <Chip tone={p.accent} size="xs">
                    {p.tag}
                  </Chip>
                  {p.id === 'coaster' && (
                    <Chip tone="neon" size="xs" dot>
                      Mais pedido
                    </Chip>
                  )}
                </div>

                <h3 className="relative font-display text-[26px] lg:text-[30px] tracking-[-0.02em] text-chalk">
                  {p.name}
                </h3>
                <p className="relative mt-2 text-[14px] text-chalk/65 leading-snug max-w-sm">
                  {p.tagline}
                </p>

                <div className="relative mt-auto pt-6 flex items-end justify-between border-t border-hairline">
                  <div className="text-[11px] tracking-[0.12em] uppercase text-chalk/45">
                    {p.fromPrice}
                  </div>
                  <a
                    href="https://app.mesaads.com.br/campanha"
                    className="inline-flex items-center gap-1.5 text-[12px] tracking-wide text-chalk/80 hover:text-chalk group/cta"
                  >
                    Montar
                    <ArrowRight className="size-3.5 transition-transform duration-200 ease-apple group-hover/cta:translate-x-1" />
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function accentColor(a: string) {
  switch (a) {
    case 'magenta': return 'rgba(255,46,138,0.55)'
    case 'amber': return 'rgba(245,230,58,0.5)'
    case 'orange': return 'rgba(242,122,26,0.55)'
    case 'ice': return 'rgba(184,241,255,0.5)'
    default: return 'rgba(0,230,64,0.6)'
  }
}
