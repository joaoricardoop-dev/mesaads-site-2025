# mesa-ads-site

Site público institucional do **mesa.ads** — rede de mídia em porta-copos, telas e salas VIP em Manaus/AM. Substitui `mesaads.com.br`.

Todos os CTAs primários ("Montar campanha") apontam para `https://app.mesaads.com.br/campanha` (ambiente logado — repo separado).

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind v3 (design tokens via CSS vars, tema light/dark)
- Framer Motion (animações) + @react-three/fiber (hero 3D com porta-copos orbitando)
- Zustand (toggle de tema)
- React Router v7 (rotas `/` e `/media-kit`)
- Fontes: Bricolage Grotesque Variable + Instrument Serif + JetBrains Mono

## Como rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build produção
npm run typecheck  # verificar tipos
```

## Rotas

- `/` — home institucional (11 seções em scroll longo: hero 3D, problema, vantagem, formatos, cases, como funciona, rede, Sala VIP, por que Mesa.ads, condições, CTA final)
- `/media-kit` — deck digital de 10 slides + download do PDF em `public/mesa-ads-media-kit.pdf`

## Estrutura

```
src/
├── pages/                Home.tsx · MediaKit.tsx
├── components/
│   ├── site/             Header, Footer, Section helper, CoasterMock SVG + 11 sections/
│   ├── hero/             Coaster3D + CoasterScene (reusado no hero)
│   ├── venues/           ManausMap (seção Rede)
│   └── ui/               Button, Chip, AnimatedNumber, ThemeToggle, WhatsAppFloat
├── state/                themeStore (light/dark)
├── data/                 stats, cases, venues, products, faq, neighborhoods, pricing
├── lib/                  format.ts (BRL), motion.ts (easings)
└── assets/logo.tsx
```

## Deploy

Conectar no Vercel ou Netlify → build `npm run build`, output `dist/`. Apontar domínio `mesaads.com.br` no painel.

## Contato WhatsApp

Botão flutuante em todas as páginas → `wa.me/5592981596354`.
