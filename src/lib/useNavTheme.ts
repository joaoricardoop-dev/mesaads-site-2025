import { useEffect, useState } from 'react'

export type NavTheme = 'dark' | 'light' | 'neon' | 'magenta'

/**
 * Observa `data-nav-theme` das seções em viewport e retorna o tema ativo.
 * O SiteHeader usa isso pra inverter cores do logo/ctas conforme o usuário
 * passa por seções (ex: seção magenta muda o neon do logo pra branco).
 *
 * Uso:
 *   <section data-nav-theme="neon">...</section>
 *   const theme = useNavTheme()  // 'neon'
 */
export function useNavTheme(defaultTheme: NavTheme = 'dark'): NavTheme {
  const [theme, setTheme] = useState<NavTheme>(defaultTheme)

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-theme]'),
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Encontra a entry mais visível no topo da viewport (0-200px)
        const topmost = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top),
          )[0]
        if (topmost) {
          const t = (topmost.target as HTMLElement).dataset.navTheme as NavTheme
          if (t) setTheme(t)
        }
      },
      {
        // trigger quando a seção cruza 80px do topo
        rootMargin: '-80px 0px -70% 0px',
        threshold: [0, 0.1, 0.3],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return theme
}
