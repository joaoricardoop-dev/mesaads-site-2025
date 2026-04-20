# mesa.ads — Design System & Brand Brief

> Arquivo consolidado pra alimentar **Claude Design** (claude.ai/design), **Figma AI**, **v0** ou qualquer outra ferramenta de design que precise entender o projeto. Copie o conteúdo inteiro no brief inicial.

---

## 1. Sobre a marca

**Nome**: mesa.ads
**Domínio**: mesaads.com.br
**Cidade**: Manaus — Amazonas
**Categoria**: Rede de mídia OOH (out-of-home) hiperlocal
**Produto principal**: porta-copos 90mm distribuídos em bares/restaurantes
**Produtos premium**: telas 55" + janelas digitais na Sala VIP do Aeroporto de Manaus (Harmony Lounge)
**Cliente-alvo**: marcas locais (imobiliárias, lançamentos, varejo de bairro) + patrocinadores regionais

**Tese**: "74 minutos de atenção real por refeição contra 1,9 segundos em mídia digital."

**Voz**:
- Direta, provocativa, confiante
- Exemplos do Media Kit: "TENTA ME IGNORAR", "ESSE ANÚNCIO VOCÊ NÃO PODE PULAR", "OLHA PRA MIM! JÁ OLHOU"
- Frases curtas. Sem "solução inovadora", sem corporatês
- Números e fatos > adjetivos

---

## 2. Paleta de cores (CSS vars já implementadas)

```css
/* Superfícies — dark */
--surface-950: #040405   /* base/fundo */
--surface-900: #0A0A0C   /* cards elevados */
--surface-800: #141416   /* inputs, slots */

/* Tinta / texto */
--chalk: #F5F5F3         /* texto principal */
--chalk-muted: #A6A6AA
--chalk-dim: #6B6B70

/* Accents — identidade Mesa.ads */
--c-neon: #00E640        /* PRIMARY — verde neon de alta saturação */
--c-magenta: #FF2E8A     /* accent secundário (coasters) */
--c-amber: #F5E63A       /* accent (coasters amarelos) */
--c-orange: #F27A1A      /* accent (coasters laranja) */
--c-ice: #B8F1FF         /* accent frio (Sala VIP) */

/* Hairlines */
--hairline: rgba(255,255,255,0.08)
--hairline-bold: rgba(255,255,255,0.14)
```

**Uso**: fundo preto profundo + verde neon como call-to-action. Magenta/amber/orange são cores dos coasters (usar em pops, acentos, cases específicos). Magenta + neon = combinação principal.

Tem **tema light** também (inversão de superfícies com `data-theme="light"`) — toggle disponível.

---

## 3. Tipografia

- **Display**: `Bricolage Grotesque Variable` (300-900, opticalsize)
  - CDN: `@fontsource-variable/bricolage-grotesque`
  - Tracking nos títulos: -0.04em a -0.045em
  - Headlines gigantes: clamp(3.5rem, 9vw, 8rem)
- **Serif italic de destaque**: `Instrument Serif`
  - Uso: só em "pedaços de ênfase" dentro de um título grande (ex: "do seu" em "Sua marca na mesa *do seu* cliente")
- **Mono tabular (números)**: `JetBrains Mono Variable`
  - Uso: stats, preços, IDs

**NUNCA usar**: Inter, Roboto, Arial, system-ui, Space Grotesk, Geist Sans (todas muito genéricas).

---

## 4. Princípios visuais

- **Preto profundo dominante** (95% da tela), pops de neon e magenta estratégicos
- **Generous negative space** — deixar respirar
- **Números grandes** em display weight, sempre com tabular-nums mono
- **Gradient orbs** ambient (neon top-left, magenta bottom-right) com blur 30px
- **Grain overlay** sutil (noise SVG feTurbulence, mix-blend-overlay, 6% opacity)
- **Spotlight radial** que segue o cursor (verde neon sutil)
- **Hairlines** de 1px em bordas de cards (não borda sólida)
- **Backdrop-blur** em overlays (glassmorphism)

---

## 5. Animações em uso (Framer Motion + GSAP + Three.js)

### Primitivos criados (componentes React)

- `<CinematicLoader>` — overlay preto full-screen. 5 coasters 3D caem e empilham. Progress bar. Fade-out via clip-path circular. Duração 2.6s. Só na 1ª visita (sessionStorage gate).
- `<KineticTitle>` — palavras em 3D perspective (rotateX 75° → 0° + translateY -110%), stagger 0.08s entre palavras.
- `<MagneticButton>` — CTAs atraem o cursor com lerp ~±12px. Awwwards-style.
- `<TiltCard>` — perspective 3D tilt no mouse move + glare radial gradient seguindo cursor.
- `<ClipReveal>` — clip-path circular que expande do centro (shape: circle / cover / diagonal).
- `<Marquee>` — CSS loop infinito de texto gigante.
- `<ScrambleText>` — hover scramble de chars (Apple-like).
- `<RevealText>` — split por palavra/char com stagger + blur entrada.
- `<CustomCursor>` — dot + ring com states default/view/drag.

### Animações por seção

- **Hero**: coasters 3D (@react-three/fiber) com parallax mouse, textura PBR de artes reais. Fade-out no scroll.
- **HowItWorks**: timeline horizontal com linha gradient neon→magenta que se preenche com scroll. Dots com pulse ring.
- **Network**: horizontal pin scroll (GSAP ScrollTrigger). 11 cards de parceiros deslizam horizontal enquanto scroll vertical trava.
- **WhyMesa**: marquee gigante "ATENÇÃO REAL · CONTEXTO CERTO · …".
- **Cases**: coasters SVG entram com ClipReveal circular + stagger.

### Easings
- Apple: `cubic-bezier(0.22, 1, 0.36, 1)`
- Swift: `cubic-bezier(0.32, 0.72, 0, 1)`

---

## 6. Arquitetura técnica

- **Stack**: Vite + React 18 + TypeScript + Tailwind v3 + CSS vars
- **State**: Zustand (tema + sessão)
- **Animação**: Framer Motion 11 + GSAP (ScrollTrigger) + Lenis smooth scroll
- **3D**: @react-three/fiber + @react-three/drei + three.js
- **Router**: react-router v7
- **Deploy alvo**: Vercel

---

## 7. Referências visuais (sites inspiração)

- **landonorris.com** (Awwwards SOTD) — stack detectada: Webflow + GSAP + Three.js + GLTFLoader + Rive. Características:
  - Cinematic scroll
  - 3D capacetes com hover states
  - Horizontal pin scroll em timeline
  - Nav theme switching por seção
  - Text reveals com clip-path
  - Marquees infinitos
  - Loader inicial com Rive animation

O mesa.ads **quer chegar nesse tier** mas com identidade própria (preto + neon em vez de papaya/branco McLaren).

---

## 8. Seções atuais da landing (estrutura)

1. Hero — "Sua marca na mesa *do seu* cliente" + coasters 3D
2. AttentionProblem — "A atenção está curta" (stats)
3. MesaAdvantage — "A mesa tem tempo, conversa e contexto" (stats)
4. Formats — 4 cards dos produtos (Porta-Copos/Telas/Janelas/Ativações)
5. Cases — 3 campanhas reais (Brises, Azul, Unipar)
6. HowItWorks — 3 passos com timeline horizontal animada
7. Network — 11 parceiros em horizontal pin scroll
8. VipLounge — carrossel da Sala VIP
9. WhyMesa — marquee + 6 razões
10. Terms — 8 chips compactos de condições comerciais
11. FinalCTA — card gigante com CTAs magnéticos

---

## 9. Conteúdo a gerar / iterar (pode ajudar Claude Design a priorizar)

**Alta prioridade de melhoria visual:**
- Hero: variações de arrangement 3D (ex: pilha central vs orbitante)
- Formats: queremos um "showcase" mais cinematográfico (talvez 3D mini-cenas por formato)
- Network: o horizontal scroll tá bom — melhorar só os cards de venue
- VipLounge: ainda usa placeholder gradient — precisa de estilo de card com foto real

**Conteúdo já travado** (não re-inventar):
- Paleta de cores (verde #00E640 é sagrado)
- Tipografia (Bricolage Grotesque + Instrument Serif)
- Voz (direta/provocativa)
- Dados dos 11 parceiros (fixos)
- Matriz de preços (comercial)

---

## 10. Artefatos disponíveis pra upload

- `public/coasters/coaster-*.png` — 5 artes reais de campanha
- `public/mesa-ads-media-kit.pdf` — media kit oficial
- Screenshots do site rodando em localhost:5173
- Screenshots do site rodando em produção (mesaads-site-2025.vercel.app ou similar)
- Este arquivo `docs/design-system.md`

---

## 11. Brief copiável pra Claude Design

> "Preciso elevar o site **mesa.ads** (rede de mídia em porta-copos em Manaus) pra nível Awwwards estilo **landonorris.com**. Já tenho stack técnica completa (Vite + React + TS + Tailwind + GSAP + Three.js). Estou anexando: design-system.md (tokens, fontes, voz), 5 PNGs dos coasters de campanhas reais, screenshot do hero atual, Media Kit PDF.
>
> Quero: explorar **3 variações** do hero mantendo a identidade preto + verde neon. Cada variação com hierarquia visual diferente — (1) coasters 3D orbitando atrás do texto, (2) coasters em pilha central com câmera tilt, (3) coasters formando grid que responde ao mouse. Manter a headline *'Sua marca na mesa do seu cliente'* com 'do seu' em Instrument Serif italic. Mostre o layout em desktop (1440) e mobile (390). Me entrega HTML/CSS ou screenshots que eu passo pro Claude Code implementar."

---

## 12. Links

- **Repo atual**: https://github.com/joaoricardoop-dev/mesaads-site-2025
- **Preview local**: http://localhost:5173
- **Media Kit PDF**: `public/mesa-ads-media-kit.pdf`
- **Artes coasters**: `public/coasters/*.png`
