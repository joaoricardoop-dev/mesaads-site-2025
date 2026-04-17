import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { Chip } from '../../ui/Chip'
import { TvIcon, WindowIcon, MicIcon } from '../../../assets/logo'

interface Space {
  title: string
  sub: string
  tag: string
  gradient: string
  icon: 'tv' | 'window' | 'mic' | 'room'
  accent: 'magenta' | 'amber' | 'orange' | 'ice'
}

const SPACES: Space[] = [
  {
    title: 'Sala VIP Harmony Lounge',
    sub: 'Aeroporto de Manaus · público executivo, alta rotatividade',
    tag: 'Ambiente',
    gradient: 'from-[#2B3A4D] via-[#1A2530] to-[#0A0E14]',
    icon: 'room',
    accent: 'ice',
  },
  {
    title: '3 Telas 55"',
    sub: 'Loop controlado, som opcional. Exposição contínua.',
    tag: 'Premium',
    gradient: 'from-[#2A1A2E] via-[#1A0F1F] to-[#0A0508]',
    icon: 'tv',
    accent: 'magenta',
  },
  {
    title: '2 Janelas Digitais',
    sub: 'Formato vertical, altura da visão. ELMSVMAO-1 disponível.',
    tag: 'Premium',
    gradient: 'from-[#2C2A10] via-[#1A1808] to-[#0A0A04]',
    icon: 'window',
    accent: 'amber',
  },
  {
    title: 'Espaço Live Marketing',
    sub: 'Degustações, lançamentos, experiências. Sob consulta.',
    tag: 'Ativação',
    gradient: 'from-[#2E1F10] via-[#1A1208] to-[#0A0704]',
    icon: 'mic',
    accent: 'orange',
  },
]

function SpaceIcon({ i, className }: { i: Space['icon']; className?: string }) {
  if (i === 'tv') return <TvIcon className={className} />
  if (i === 'window') return <WindowIcon className={className} />
  if (i === 'mic') return <MicIcon className={className} />
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M3 10l9-6 9 6v10a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function VipLounge() {
  return (
    <Section pad="lg" tone="elevated">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <Eyebrow>07 · Sala VIP MAO</Eyebrow>
          <SectionTitle className="mt-5 max-w-2xl">
            Sala VIP do aeroporto.{' '}
            <span className="italic font-serif font-normal text-chalk/85">
              A mesa do executivo.
            </span>
          </SectionTitle>
        </div>
        <Chip tone="magenta" size="sm" dot>
          Harmony Lounge · acesso Premium
        </Chip>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {SPACES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group overflow-hidden rounded-3xl border border-hairline bg-ink-900/30"
          >
            {/* Placeholder visual (trocar por fotos reais quando disponível) */}
            <div
              className={`relative aspect-[4/5] bg-gradient-to-br ${s.gradient} flex items-center justify-center`}
            >
              <div className="absolute inset-4 rounded-2xl border border-chalk/10 pointer-events-none" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <Chip tone={s.accent} size="xs">
                  {s.tag}
                </Chip>
                <span className="text-[9px] tracking-[0.18em] uppercase text-chalk/40">
                  0{i + 1}/04
                </span>
              </div>
              <div className={`relative text-${colorClass(s.accent)} opacity-80 transition-transform duration-500 group-hover:scale-105`}>
                <SpaceIcon i={s.icon} className="size-16" />
              </div>
              <div className="absolute bottom-4 left-4 text-[9px] tracking-[0.18em] uppercase text-chalk/35">
                foto em breve
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-display text-[17px] tracking-tight text-chalk">{s.title}</h3>
              <p className="mt-1.5 text-[12px] text-chalk/55 leading-snug">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function colorClass(accent: Space['accent']): string {
  switch (accent) {
    case 'magenta': return 'mesa-magenta'
    case 'amber': return 'mesa-amber'
    case 'orange': return 'mesa-orange'
    case 'ice': return 'mesa-ice'
  }
}
