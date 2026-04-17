import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MesaAdsLogo, ArrowRight } from '../../assets/logo'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

const NAV = [
  { id: 'formatos', label: 'Formatos', anchor: true },
  { id: 'rede', label: 'Rede', anchor: true },
  { id: 'casos', label: 'Casos', anchor: true },
  { id: 'como-funciona', label: 'Como funciona', anchor: true },
  { id: '/media-kit', label: 'Media Kit', anchor: false },
  { id: 'condicoes', label: 'Condições', anchor: true },
]

export function SiteHeader() {
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 120], [0, 1])
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 24))
  }, [scrollY])

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-40 transition-colors duration-300 ease-apple',
          scrolled ? 'border-b border-hairline' : 'border-b border-transparent',
        )}
      >
        <motion.div
          aria-hidden
          style={{ opacity: headerOpacity }}
          className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl"
        />

        <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            <Link to="/" className="flex items-center">
              <MesaAdsLogo className="text-[19px]" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
              {NAV.map((n) =>
                n.anchor ? (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    className="rounded-full px-3 py-2 text-[13px] tracking-tight text-chalk/70 hover:text-chalk hover:bg-chalk/5 transition-colors duration-200 ease-apple"
                  >
                    {n.label}
                  </a>
                ) : (
                  <Link
                    key={n.id}
                    to={n.id}
                    className="rounded-full px-3 py-2 text-[13px] tracking-tight text-chalk/70 hover:text-chalk hover:bg-chalk/5 transition-colors duration-200 ease-apple"
                  >
                    {n.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle variant="icon" />
              <a href="https://app.mesaads.com.br/campanha" className="hidden sm:inline-flex">
                <Button size="sm" iconRight={<ArrowRight className="size-3.5" />}>
                  Montar campanha
                </Button>
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Abrir menu"
                className="lg:hidden flex size-9 items-center justify-center rounded-full border border-hairline bg-chalk/5 hover:bg-chalk/10"
              >
                <svg viewBox="0 0 24 24" className="size-4 text-chalk" fill="none">
                  <path
                    d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'}
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-[39] lg:hidden transition-all duration-300 ease-apple',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={clsx(
            'relative mx-auto max-w-[520px] px-6 pt-[88px] transition-transform duration-400 ease-apple',
            open ? 'translate-y-0' : '-translate-y-4',
          )}
        >
          <nav className="flex flex-col gap-1">
            {NAV.map((n) =>
              n.anchor ? (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-4 text-[18px] tracking-tight text-chalk hover:bg-chalk/5 transition-colors"
                >
                  {n.label}
                </a>
              ) : (
                <Link
                  key={n.id}
                  to={n.id}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-4 text-[18px] tracking-tight text-chalk hover:bg-chalk/5 transition-colors"
                >
                  {n.label}
                </Link>
              ),
            )}
            <a
              href="https://app.mesaads.com.br/campanha"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-2xl bg-mesa-neon text-ink-950 font-semibold px-4 py-4 text-[17px] tracking-tight flex items-center justify-between"
            >
              Montar campanha
              <ArrowRight className="size-4" />
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}
