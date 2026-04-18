import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Smooth scroll global com Lenis.
 * Instanciado uma única vez no root. Respeita prefers-reduced-motion.
 * Retorna nada — o efeito é ambiente (document.body rola suave).
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // hash anchors via Lenis pra não quebrar com scroll-behavior nativo
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]')
      if (!a) return
      const hash = (a as HTMLAnchorElement).getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 })
    }
    document.addEventListener('click', onAnchor)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener('click', onAnchor)
    }
  }, [])
}
