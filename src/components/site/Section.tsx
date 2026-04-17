import clsx from 'clsx'
import { motion } from 'framer-motion'

interface Props {
  id?: string
  className?: string
  children: React.ReactNode
  /** padding vertical */
  pad?: 'sm' | 'md' | 'lg' | 'xl'
  /** tone do fundo */
  tone?: 'default' | 'elevated' | 'inverted'
  /** sem animação inicial (útil pra hero) */
  noReveal?: boolean
}

const padMap = {
  sm: 'py-16 lg:py-20',
  md: 'py-20 lg:py-28',
  lg: 'py-24 lg:py-36',
  xl: 'py-28 lg:py-44',
}

const toneMap = {
  default: '',
  elevated: 'bg-ink-900/40',
  inverted: 'bg-chalk text-ink-950',
}

export function Section({
  id,
  className,
  children,
  pad = 'lg',
  tone = 'default',
  noReveal,
}: Props) {
  const content = (
    <div className={clsx('mx-auto w-full max-w-[1240px] px-6 lg:px-10', className)}>
      {children}
    </div>
  )

  if (noReveal) {
    return (
      <section id={id} className={clsx('relative', padMap[pad], toneMap[tone])}>
        {content}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={clsx('relative', padMap[pad], toneMap[tone])}
    >
      {content}
    </motion.section>
  )
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-mesa-neon/90',
        className,
      )}
    >
      <span className="size-1 rounded-full bg-mesa-neon" />
      {children}
    </div>
  )
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={clsx(
        'font-display font-medium text-title text-chalk text-balance',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function SectionSub({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={clsx(
        'mt-5 max-w-2xl text-[15px] lg:text-[17px] text-chalk/60 leading-relaxed',
        className,
      )}
    >
      {children}
    </p>
  )
}
