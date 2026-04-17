import clsx from 'clsx'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

type Variant = 'primary' | 'ghost' | 'quiet' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface Props extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  size?: Size
  children?: React.ReactNode
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

const variantCls: Record<Variant, string> = {
  primary:
    'bg-mesa-neon text-ink-950 font-semibold hover:brightness-110 active:brightness-95 shadow-neon-sm disabled:opacity-40',
  ghost:
    'bg-chalk/5 text-chalk border border-hairline hover:bg-chalk/10 active:bg-chalk/[.03] disabled:opacity-40',
  quiet:
    'bg-transparent text-chalk/70 hover:text-chalk hover:bg-chalk/5 disabled:opacity-40',
  danger:
    'bg-rose-500/15 text-rose-200 border border-rose-500/30 hover:bg-rose-500/25',
}

const sizeCls: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px] rounded-full',
  md: 'h-11 px-6 text-sm rounded-full',
  lg: 'h-14 px-8 text-base rounded-full',
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'primary', size = 'md', children, iconLeft, iconRight, fullWidth, className, ...rest },
  ref,
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 tracking-tight transition-colors duration-200 ease-apple select-none',
        variantCls[variant],
        sizeCls[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </motion.button>
  )
})
