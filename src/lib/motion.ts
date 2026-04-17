import type { Transition, Variants } from 'framer-motion'

export const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const SWIFT_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1]

export const DUR = {
  fast: 0.2,
  base: 0.45,
  slow: 0.7,
}

export const T_APPLE: Transition = { duration: DUR.base, ease: APPLE_EASE }
export const T_SWIFT: Transition = { duration: DUR.base, ease: SWIFT_EASE }

export const stepVariants: Variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: APPLE_EASE },
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: 'blur(6px)',
    transition: { duration: 0.3, ease: APPLE_EASE },
  },
}

export const staggerContainer: Variants = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: APPLE_EASE } },
}

export const springSoft = { type: 'spring' as const, stiffness: 220, damping: 28 }
export const springTight = { type: 'spring' as const, stiffness: 420, damping: 30 }
