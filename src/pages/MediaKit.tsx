import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { MesaAdsLogo, ArrowRight, ArrowLeft, CheckIcon } from '../assets/logo'
import { Button } from '../components/ui/Button'
import { Chip } from '../components/ui/Chip'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { WhatsAppFloat } from '../components/ui/WhatsAppFloat'
import { CoasterMock } from '../components/site/CoasterMock'
import { ManausMap } from '../components/venues/ManausMap'
import {
  ATTENTION_PROBLEM,
  MESA_ADVANTAGE,
  NETWORK_STATS,
  HOW_IT_WORKS,
  COMMERCIAL_BLOCKS,
} from '../data/stats'
import { PRODUCTS } from '../data/products'
import { CASES } from '../data/cases'
import { VENUES } from '../data/venues'
import { WHY_POINTS } from '../data/faq'

/**
 * Media Kit — deck em 10 "slides" verticais.
 * Scroll-snap, nav fixa à direita, print-friendly.
 */
export default function MediaKitPage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  const slides = [
    { id: 'capa', label: 'Capa' },
    { id: 'problema', label: 'Problema' },
    { id: 'solucao', label: 'Solução' },
    { id: 'formatos', label: 'Formatos' },
    { id: 'rede', label: 'Rede' },
    { id: 'cases', label: 'Cases' },
    { id: 'como-funciona', label: 'Como funciona' },
    { id: 'precos', label: 'Preços' },
    { id: 'condicoes', label: 'Condições' },
    { id: 'contato', label: 'Contato' },
  ]

  function handleShare() {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <div className="mk-root relative min-h-screen grain">
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 -left-32 h-[520px] w-[520px] rounded-full"
        style={{
          background: 'radial-gradient(closest-side, rgba(0,230,64,0.10), rgba(0,230,64,0) 70%)',
          filter: 'blur(30px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -right-32 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,46,138,0.08), rgba(255,46,138,0) 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Top bar */}
      <header className="mk-no-print fixed top-0 inset-x-0 z-40 border-b border-hairline bg-ink-950/75 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] flex items-center justify-between px-6 lg:px-8 h-[64px]">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-chalk/70 hover:text-chalk transition-colors">
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline text-[13px]">Voltar</span>
            </Link>
            <span className="h-4 w-px bg-hairline hidden sm:inline-block" />
            <MesaAdsLogo className="text-[17px]" />
            <Chip tone="neon" size="xs" dot className="hidden md:inline-flex">
              Media Kit · 2026
            </Chip>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle variant="icon" />
            <button
              type="button"
              onClick={handleShare}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-hairline bg-chalk/5 px-3 h-9 text-[12px] tracking-tight text-chalk/75 hover:bg-chalk/10 hover:text-chalk transition-colors"
            >
              {copied ? (
                <>
                  <CheckIcon className="size-3.5 text-mesa-neon" />
                  Copiado
                </>
              ) : (
                <>
                  <ShareIcon className="size-3.5" />
                  Compartilhar
                </>
              )}
            </button>
            <a
              href="/mesa-ads-media-kit.pdf"
              download="mesa-ads-media-kit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-chalk/5 px-3 h-9 text-[12px] tracking-tight text-chalk/75 hover:bg-chalk/10 hover:text-chalk transition-colors"
            >
              <DownloadIcon className="size-3.5" />
              PDF
            </a>
            <a href="https://app.mesaads.com.br/campanha" className="hidden lg:inline-flex">
              <Button size="sm" iconRight={<ArrowRight className="size-3.5" />}>
                Montar campanha
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Side TOC (desktop) */}
      <nav
        aria-label="Índice"
        className="mk-no-print fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-2.5"
      >
        {slides.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 text-[11px] tracking-[0.14em] uppercase text-chalk/40 hover:text-chalk transition-colors"
          >
            <span className="font-mono tabular text-[10px] w-4">{String(i).padStart(2, '0')}</span>
            <span className="size-1.5 rounded-full bg-chalk/30 group-hover:bg-mesa-neon transition-colors" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{s.label}</span>
          </a>
        ))}
      </nav>

      <main className="pt-[64px]">
        {/* 00 · CAPA */}
        <Slide id="capa" number="00">
          <div className="relative flex flex-col items-center justify-center min-h-[72vh] text-center">
            <Chip tone="neon" size="sm" dot className="mb-6">
              Media Kit · 2026
            </Chip>
            <h1 className="font-display font-medium text-[56px] lg:text-[120px] leading-[0.92] tracking-[-0.045em] text-chalk text-balance max-w-5xl">
              Sua marca na mesa
              <br />
              <span className="italic font-serif font-normal text-chalk/85">
                {' '}
                do seu{' '}
              </span>
              cliente.
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] lg:text-[20px] text-chalk/65 leading-relaxed">
              Rede de mídia em mesas, porta-copos e salas VIP de Manaus. Atenção real, no momento
              do consumo.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-x-12 gap-y-6 md:grid-cols-4">
              {[
                { v: '20', l: 'Casas parceiras' },
                { v: '100k', l: 'Alcance/mês' },
                { v: '74 min', l: 'Atenção/refeição' },
                { v: '−5%', l: 'Pix à vista' },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-[40px] lg:text-[56px] leading-none tabular font-medium text-chalk">
                    {s.v}
                  </div>
                  <div className="mt-2 text-[11px] tracking-[0.14em] uppercase text-chalk/50">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <a href="https://app.mesaads.com.br/campanha">
                <Button size="lg" iconRight={<ArrowRight className="size-4" />}>
                  Montar campanha
                </Button>
              </a>
              <a href="mailto:anuncie@mesa.ads">
                <Button size="lg" variant="ghost">
                  Falar com o time
                </Button>
              </a>
            </div>
          </div>
        </Slide>

        {/* 01 · PROBLEMA */}
        <Slide id="problema" number="01" title="O problema">
          <SlideHeading eyebrow="A atenção">
            Cada vez{' '}
            <span className="italic font-serif font-normal text-chalk/85">
              mais cara.
            </span>
          </SlideHeading>
          <p className="mt-5 max-w-2xl text-[15px] lg:text-[17px] text-chalk/60 leading-relaxed">
            Não falta mídia. Falta atenção de verdade no momento certo. Os dados mostram: a
            audiência existe, mas está fugindo do digital.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {ATTENTION_PROBLEM.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-hairline bg-ink-900/50 p-5"
              >
                <div className="font-display text-[32px] lg:text-[40px] leading-none tabular font-medium text-mesa-neon">
                  {s.value}
                </div>
                <div className="mt-3 text-[12px] lg:text-[13px] text-chalk/70 leading-snug">
                  {s.label}
                </div>
                <div className="mt-4 text-[10px] tracking-wide uppercase text-chalk/35">
                  {s.source}
                </div>
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* 02 · SOLUÇÃO */}
        <Slide id="solucao" number="02" title="A virada">
          <SlideHeading eyebrow="A mesa tem">
            Tempo, conversa{' '}
            <span className="italic font-serif font-normal text-chalk/85">e contexto.</span>
          </SlideHeading>
          <p className="mt-5 max-w-2xl text-[15px] lg:text-[17px] text-chalk/60 leading-relaxed">
            Porta-copo = repetição natural. A marca é vista várias vezes durante o consumo —
            frequência sem custo extra.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {MESA_ADVANTAGE.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-hairline bg-ink-900/50 p-5"
              >
                <div className="font-display text-[28px] lg:text-[34px] leading-none tabular font-medium text-chalk">
                  {s.value}
                </div>
                <div className="mt-3 text-[12px] lg:text-[13px] text-chalk/70 leading-snug">
                  {s.label}
                </div>
                <div className="mt-4 text-[10px] tracking-wide uppercase text-chalk/35">
                  {s.source}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
            {WHY_POINTS.slice(0, 3).map((p) => (
              <div key={p.title} className="rounded-2xl border border-mesa-neon/30 bg-mesa-neon/5 p-5">
                <div className="font-display text-[16px] tracking-tight text-chalk">{p.title}</div>
                <p className="mt-2 text-[13px] text-chalk/65 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Slide>

        {/* 03 · FORMATOS */}
        <Slide id="formatos" number="03" title="Formatos">
          <SlideHeading eyebrow="Três formatos">
            Uma{' '}
            <span className="italic font-serif font-normal text-chalk/85">
              mesma ideia.
            </span>
          </SlideHeading>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-hairline bg-gradient-to-br from-ink-800/70 to-ink-900/90 p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Chip tone={p.accent} size="xs">
                    {p.tag}
                  </Chip>
                </div>
                <h3 className="font-display text-[22px] tracking-tight text-chalk">{p.name}</h3>
                <p className="mt-2 text-[13px] text-chalk/65 leading-snug">{p.tagline}</p>
                <p className="mt-3 text-[12px] text-chalk/50 leading-relaxed">{p.description}</p>
                <div className="mt-auto pt-5 border-t border-hairline">
                  <div className="text-[11px] tracking-[0.12em] uppercase text-chalk/45">
                    {p.fromPrice}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-dashed border-hairline bg-chalk/[0.02] p-5 text-[13px] text-chalk/65 leading-relaxed max-w-4xl">
            <strong className="text-chalk">Specs principais do porta-copo:</strong> 90mm circular,
            impressão frente & verso em alta qualidade. Distribuição nos estabelecimentos parceiros
            em ciclos padronizados de 4 semanas.
          </div>
        </Slide>

        {/* 04 · REDE */}
        <Slide id="rede" number="04" title="Rede">
          <SlideHeading eyebrow="Rede Mesa.ads">
            20 casas,{' '}
            <span className="italic font-serif font-normal text-chalk/85">100 mil</span> clientes.
          </SlideHeading>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 space-y-8">
              <div className="grid grid-cols-3 gap-5">
                {NETWORK_STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-[44px] leading-none tabular font-medium text-mesa-neon">
                      {s.value}
                    </div>
                    <div className="mt-2 text-[11px] tracking-[0.12em] uppercase text-chalk/55">
                      {s.label}
                    </div>
                    <div className="text-[11px] text-chalk/35">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-chalk/40 mb-3">
                  Cobertura ativa
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Tarumã',
                    'Adrianópolis',
                    'N. S. das Graças',
                    'Parque 10',
                    'Centro',
                    'Distrit Industrial I',
                    'Santa Etelvina',
                  ].map((b) => (
                    <Chip key={b} tone="neon" size="sm" dot>
                      {b}
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-chalk/40 mb-3">
                  Parceiros ({VENUES.length})
                </div>
                <ul className="grid grid-cols-1 gap-1">
                  {VENUES.map((v) => (
                    <li key={v.id} className="flex justify-between text-[13px] text-chalk/75 py-1">
                      <span className="line-clamp-1">{v.name}</span>
                      <span className="text-chalk/40 text-[11px] uppercase tracking-wide">
                        {v.neighborhood}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-hairline bg-gradient-to-br from-ink-900/40 to-ink-950/60 p-4 lg:p-6 self-start">
              <ManausMap selectedVenueIds={[]} className="max-h-[480px]" />
            </div>
          </div>
        </Slide>

        {/* 05 · CASES */}
        <Slide id="cases" number="05" title="Cases">
          <SlideHeading eyebrow="Na mesa, pra valer">
            Campanhas{' '}
            <span className="italic font-serif font-normal text-chalk/85">reais</span>.
          </SlideHeading>

          <div className="mt-12 space-y-10">
            {CASES.map((c, i) => (
              <article
                key={c.id}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center"
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Chip tone={c.accent} size="xs" dot>
                    Case 0{i + 1}
                  </Chip>
                  <h3 className="mt-3 font-display text-[22px] lg:text-[30px] leading-[1.1] tracking-[-0.025em] text-chalk text-balance">
                    {c.headline}
                  </h3>
                  <div className="mt-3 text-[11px] tracking-[0.18em] uppercase text-chalk/45">
                    {c.brand}
                  </div>
                  <p className="mt-4 text-[14px] text-chalk/65 leading-relaxed max-w-md">
                    {c.note}
                  </p>
                </div>

                <div
                  className={`lg:col-span-7 flex flex-wrap items-center justify-center gap-6 py-8 rounded-3xl border border-hairline ${
                    i % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                  style={{
                    background: `radial-gradient(ellipse at center, ${accentBg(c.accent)}, rgba(4,4,5,0.5) 70%)`,
                  }}
                >
                  {c.faces.map((f, idx) => (
                    <div key={idx} style={{ transform: `rotate(${idx === 0 ? -4 : 4}deg)` }}>
                      <CoasterMock face={f} size={190} />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Slide>

        {/* 06 · COMO FUNCIONA */}
        <Slide id="como-funciona" number="06" title="Como funciona">
          <SlideHeading eyebrow="Três passos">
            Zero{' '}
            <span className="italic font-serif font-normal text-chalk/85">atrito.</span>
          </SlideHeading>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {HOW_IT_WORKS.map((s) => (
              <div
                key={s.n}
                className="relative overflow-hidden rounded-2xl border border-hairline bg-ink-900/50 p-7"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-5 font-display text-[120px] leading-none font-medium text-mesa-neon/10 tabular"
                >
                  {s.n}
                </div>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-mesa-neon/30 bg-mesa-neon/10 px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-mesa-neon">
                    Passo {s.n}
                  </div>
                  <h3 className="mt-5 font-display text-[20px] tracking-tight text-chalk leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] text-chalk/65 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 text-[13px]">
            <TimelineBox label="Design" value="5 dias" sub="após faturamento" />
            <TimelineBox label="Produção" value="20 dias" sub="após aprovação do design" />
            <TimelineBox label="Ciclo de veiculação" value="4 semanas" sub="por ciclo padronizado" />
          </div>
        </Slide>

        {/* 07 · PREÇOS */}
        <Slide id="precos" number="07" title="Preços">
          <SlideHeading eyebrow="Tabelinha de referência">
            Preços{' '}
            <span className="italic font-serif font-normal text-chalk/85">transparentes.</span>
          </SlideHeading>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            <PriceCard
              label="Porta-copos"
              start="R$ 2.633"
              unit="/ciclo de 4 sem"
              note="Volume mínimo 1.000 un · escala reduz preço unitário"
              accent="neon"
              highlight
            />
            <PriceCard
              label="Telas Sala VIP 55''"
              start="R$ 9.000"
              unit="/mês por unidade"
              note="Aeroporto de Manaus · até 3 telas simultâneas"
              accent="magenta"
            />
            <PriceCard
              label="Janela Digital VIP"
              start="R$ 12.000"
              unit="/mês por unidade"
              note="Formato vertical · altura da visão"
              accent="amber"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-mesa-neon/30 bg-mesa-neon/5 p-5">
              <div className="text-[11px] tracking-[0.18em] uppercase text-mesa-neon mb-2">
                Desconto por prazo
              </div>
              <p className="text-[13px] text-chalk/75 leading-relaxed">
                A partir de 12 semanas: <strong className="text-chalk">−5%</strong>. A partir de 24
                semanas: <strong className="text-chalk">−10%</strong>. Descontos combinam com
                volume.
              </p>
            </div>
            <div className="rounded-2xl border border-hairline bg-ink-900/50 p-5">
              <div className="text-[11px] tracking-[0.18em] uppercase text-chalk/55 mb-2">
                Pagamento
              </div>
              <p className="text-[13px] text-chalk/75 leading-relaxed">
                Pix à vista <strong className="text-mesa-neon">−5%</strong>. Boleto parcelado por
                ciclo. Cartão em <strong className="text-chalk">3× sem juros</strong>.
              </p>
            </div>
          </div>

          <div className="mt-8 text-[12px] tracking-[0.14em] uppercase text-chalk/40 text-center">
            Preço final depende de volume, prazo e forma de pagamento. Faça seu cálculo em{' '}
            <a href="https://app.mesaads.com.br/campanha" className="text-mesa-neon underline underline-offset-4 hover:brightness-110">
              app.mesaads.com.br
            </a>
            .
          </div>
        </Slide>

        {/* 08 · CONDIÇÕES */}
        <Slide id="condicoes" number="08" title="Condições">
          <SlideHeading eyebrow="Condições comerciais">
            Tudo{' '}
            <span className="italic font-serif font-normal text-chalk/85">transparente.</span>
          </SlideHeading>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
            {COMMERCIAL_BLOCKS.map((b) => (
              <div key={b.title} className="border-b border-hairline py-5">
                <div className="text-[11px] tracking-[0.18em] uppercase text-mesa-neon mb-2">
                  {b.title}
                </div>
                <p className="text-[13px] text-chalk/75 leading-relaxed max-w-md">{b.body}</p>
              </div>
            ))}
          </div>
        </Slide>

        {/* 09 · CONTATO / CTA */}
        <Slide id="contato" number="09" title="Contato" minimal>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[32px] border border-mesa-neon/30 bg-gradient-to-br from-mesa-neon/10 via-ink-900/80 to-ink-950/90 px-8 py-16 lg:px-16 lg:py-24 text-center"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -left-16 -top-16 size-80 rounded-full opacity-40"
                style={{ background: 'radial-gradient(closest-side, rgba(0,230,64,0.45), transparent 70%)' }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -bottom-16 size-80 rounded-full opacity-40"
                style={{ background: 'radial-gradient(closest-side, rgba(255,46,138,0.35), transparent 70%)' }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-mesa-neon/90 mb-5">
                  <span className="size-1 rounded-full bg-mesa-neon animate-pulse-neon" />
                  próximo passo
                </div>
                <h2 className="font-display font-medium text-[36px] lg:text-[60px] leading-[0.95] tracking-[-0.04em] text-chalk text-balance max-w-3xl mx-auto">
                  Vamos colocar sua marca
                  <br />
                  <span className="italic font-serif font-normal text-chalk/85">
                    na mesa.
                  </span>
                </h2>
                <p className="mt-5 max-w-lg mx-auto text-[15px] text-chalk/65 leading-relaxed">
                  Faça o cálculo em 3 minutos ou fale com o time comercial pra montar uma proposta
                  sob medida.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a href="https://app.mesaads.com.br/campanha">
                    <Button size="lg" iconRight={<ArrowRight className="size-4" />}>
                      Montar campanha
                    </Button>
                  </a>
                  <a href="mailto:anuncie@mesa.ads">
                    <Button size="lg" variant="ghost">
                      anuncie@mesa.ads
                    </Button>
                  </a>
                </div>
                <div className="mt-10 flex items-center justify-center gap-6 text-[11px] tracking-[0.18em] uppercase text-chalk/40 flex-wrap">
                  <span>Manaus · AM</span>
                  <span className="size-1 rounded-full bg-chalk/30" />
                  <span>Pix −5%</span>
                  <span className="size-1 rounded-full bg-chalk/30" />
                  <span>Cartão 3× sem juros</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Slide>

        <footer className="border-t border-hairline py-10 text-center text-[11px] tracking-[0.14em] uppercase text-chalk/40">
          © {new Date().getFullYear()} Mesa.ads · Media Kit
        </footer>
      </main>

      <WhatsAppFloat message="Olá! Vi o Media Kit e quero montar uma campanha." />

      {/* Print-only styles */}
      <style>{`
        @media print {
          .mk-no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .mk-root { background: white !important; }
          .mk-slide {
            page-break-inside: avoid;
            page-break-after: always;
            min-height: auto !important;
            padding: 2rem 1.5rem !important;
          }
          .grain::before { display: none !important; }
        }
      `}</style>
    </div>
  )
}

// ============================================================
// Building blocks
// ============================================================

function Slide({
  id,
  number,
  title,
  children,
  minimal,
}: {
  id: string
  number: string
  title?: string
  children: React.ReactNode
  minimal?: boolean
}) {
  return (
    <section
      id={id}
      className={clsx(
        'mk-slide relative py-16 lg:py-24 border-b border-hairline/60',
        minimal && 'pb-28 lg:pb-36',
      )}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        {title && (
          <div className="mb-10 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-chalk/40">
            <span className="font-mono tabular text-mesa-neon">{number}</span>
            <span className="h-px w-8 bg-chalk/20" />
            <span>{title}</span>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

function SlideHeading({
  eyebrow,
  children,
}: {
  eyebrow?: string
  children: React.ReactNode
}) {
  return (
    <div>
      {eyebrow && (
        <div className="text-[11px] tracking-[0.22em] uppercase text-mesa-neon/90 mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display font-medium text-[40px] lg:text-[72px] leading-[0.95] tracking-[-0.04em] text-chalk text-balance max-w-4xl">
        {children}
      </h2>
    </div>
  )
}

function TimelineBox({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-ink-900/40 p-5">
      <div className="text-[10px] tracking-[0.18em] uppercase text-chalk/45">{label}</div>
      <div className="mt-2 font-display text-[26px] tabular text-chalk font-medium">{value}</div>
      <div className="mt-1 text-[11px] text-chalk/50">{sub}</div>
    </div>
  )
}

function PriceCard({
  label,
  start,
  unit,
  note,
  accent,
  highlight,
}: {
  label: string
  start: string
  unit: string
  note: string
  accent: 'neon' | 'magenta' | 'amber'
  highlight?: boolean
}) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br from-ink-800/70 to-ink-900/90',
        highlight ? 'border-mesa-neon/50 shadow-neon-sm' : 'border-hairline',
      )}
    >
      {highlight && (
        <div className="absolute top-4 right-4">
          <Chip tone="neon" size="xs" dot>
            Mais pedido
          </Chip>
        </div>
      )}
      <div className="flex items-center gap-2 mb-5">
        <Chip tone={accent} size="xs">
          A partir de
        </Chip>
      </div>
      <div className="font-display text-[34px] lg:text-[40px] leading-none tabular font-medium text-chalk">
        {start}
      </div>
      <div className="mt-1 text-[12px] text-chalk/55">{unit}</div>
      <div className="mt-3 font-display text-[17px] tracking-tight text-chalk">{label}</div>
      <p className="mt-3 text-[12px] text-chalk/55 leading-relaxed">{note}</p>
    </div>
  )
}

function accentBg(a: string) {
  switch (a) {
    case 'magenta': return 'rgba(255,46,138,0.18)'
    case 'amber': return 'rgba(245,230,58,0.15)'
    case 'orange': return 'rgba(242,122,26,0.15)'
    case 'ice': return 'rgba(184,241,255,0.15)'
    default: return 'rgba(0,230,64,0.15)'
  }
}

// Icons
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 4v12M6 10l6 6 6-6M4 20h16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
