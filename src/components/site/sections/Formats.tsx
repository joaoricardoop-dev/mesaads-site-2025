import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle, SectionSub } from '../Section'
import { PRODUCTS } from '../../../data/products'
import { Chip } from '../../ui/Chip'
import { ArrowRight } from '../../../assets/logo'
import clsx from 'clsx'

export function Formats() {
  return (
    <Section id="formatos" pad="lg">
      <Eyebrow>03 · Formatos disponíveis</Eyebrow>
      <SectionTitle className="mt-5 max-w-3xl">
        Três formatos,
        <br />
        uma{' '}
        <span className="italic font-serif font-normal text-chalk/85">
          mesma ideia
        </span>
        : sua marca no momento do consumo.
      </SectionTitle>
      <SectionSub>
        Do porta-copo 90mm circular às telas e janelas digitais da Sala VIP do aeroporto, cada
        formato foi calibrado pra um tipo de público.
      </SectionSub>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              'group relative overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-ink-800/70 to-ink-900/90 p-7 flex flex-col',
              p.id === 'coaster' && 'md:col-span-2 lg:col-span-2',
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full opacity-25 transition-opacity duration-500 ease-apple group-hover:opacity-50"
              style={{ background: `radial-gradient(closest-side, ${accentColor(p.accent)}, transparent 70%)` }}
            />

            <div className="relative flex flex-wrap items-center gap-2 mb-5">
              <Chip tone={p.accent} size="xs">
                {p.tag}
              </Chip>
              {p.id === 'coaster' && <Chip tone="neon" size="xs" dot>Mais pedido</Chip>}
            </div>

            <h3 className="relative font-display text-[26px] lg:text-[30px] tracking-[-0.02em] text-chalk">
              {p.name}
            </h3>
            <p className="relative mt-2 text-[14px] text-chalk/65 leading-snug max-w-sm">
              {p.tagline}
            </p>
            <p className="relative mt-3 text-[13px] text-chalk/50 leading-relaxed max-w-sm">
              {p.description}
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
          </motion.div>
        ))}
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
