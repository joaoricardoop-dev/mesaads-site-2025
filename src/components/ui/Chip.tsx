import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neon' | 'magenta' | 'amber' | 'orange' | 'neutral' | 'ice'
  size?: 'xs' | 'sm'
  dot?: boolean
}

const toneCls: Record<NonNullable<Props['tone']>, string> = {
  neon: 'text-mesa-neon bg-mesa-neon/10 border-mesa-neon/30',
  magenta: 'text-mesa-magenta bg-mesa-magenta/10 border-mesa-magenta/30',
  amber: 'text-mesa-amber bg-mesa-amber/10 border-mesa-amber/30',
  orange: 'text-mesa-orange bg-mesa-orange/10 border-mesa-orange/30',
  ice: 'text-mesa-ice bg-mesa-ice/10 border-mesa-ice/30',
  neutral: 'text-chalk/70 bg-chalk/5 border-hairline',
}

export function Chip({ tone = 'neutral', size = 'sm', dot, className, children, ...rest }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border tracking-tight',
        size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]',
        toneCls[tone],
        className,
      )}
      {...rest}
    >
      {dot && <span className="inline-block size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
