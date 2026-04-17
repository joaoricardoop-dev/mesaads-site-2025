import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { NETWORK_STATS } from '../../../data/stats'
import { VENUES } from '../../../data/venues'
import { ManausMap } from '../../venues/ManausMap'
import { Chip } from '../../ui/Chip'

export function Network() {
  return (
    <Section id="rede" pad="lg">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>06 · Rede Mesa Ads</Eyebrow>
          <SectionTitle className="mt-5">
            20 casas,{' '}
            <span className="italic font-serif font-normal text-chalk/85">
              um só
            </span>{' '}
            momento: a mesa.
          </SectionTitle>
          <p className="mt-5 max-w-md text-[15px] text-chalk/60 leading-relaxed">
            Bares, restaurantes e salas VIP em Manaus. Cada parceiro foi curado pelo perfil do
            público e capacidade de distribuição.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-5">
            {NETWORK_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-display text-[40px] leading-none tabular font-medium text-mesa-neon">
                  {s.value}
                </div>
                <div className="mt-2 text-[11px] tracking-[0.1em] uppercase text-chalk/55">
                  {s.label}
                </div>
                <div className="text-[11px] text-chalk/35">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-[12px] tracking-[0.12em] uppercase text-chalk/40 mb-3">
            Cobertura ativa
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Tarumã',
              'Nossa Senhora das Graças',
              'Adrianópolis',
              'Distrit Industrial I',
              'Parque 10',
              'Santa Etelvina',
              'Centro',
            ].map((n) => (
              <Chip key={n} tone="neon" size="sm" dot>
                {n}
              </Chip>
            ))}
          </div>
        </div>

        {/* Map + list */}
        <div className="lg:col-span-7 space-y-6">
          <div className="overflow-hidden rounded-3xl border border-hairline bg-gradient-to-br from-ink-900/40 to-ink-950/60 backdrop-blur-sm">
            <div className="px-5 py-3 border-b border-hairline flex items-center justify-between">
              <div className="text-[10px] tracking-[0.22em] uppercase text-chalk/45">
                Mapa · Manaus AM
              </div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-chalk/30">
                Ilustrativo
              </div>
            </div>
            <div className="p-4 lg:p-5">
              <ManausMap selectedVenueIds={[]} className="max-h-[380px]" />
            </div>
          </div>

          {/* Venue list compacta */}
          <div className="rounded-3xl border border-hairline bg-ink-900/40 p-6">
            <div className="text-[10px] tracking-[0.22em] uppercase text-chalk/45 mb-4">
              Parceiros ativos ({VENUES.length})
            </div>
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {VENUES.map((v) => (
                <li
                  key={v.id}
                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 hover:bg-chalk/[0.04] transition-colors"
                >
                  <span className="text-[13px] text-chalk/85 line-clamp-1">{v.name}</span>
                  <span className="text-[10px] tracking-wide uppercase text-chalk/40 shrink-0">
                    {v.neighborhood}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
