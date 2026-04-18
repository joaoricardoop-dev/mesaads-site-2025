import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { Marquee } from '../../ui/Marquee'
import { RevealText } from '../../ui/RevealText'

/**
 * Palavras-chave gigantes num marquee infinito — cada palavra é um dos 6 motivos.
 * Cards abaixo com frases curtas (sem parágrafos).
 */
const KEYWORDS = [
  'ATENÇÃO REAL',
  'CONTEXTO CERTO',
  'ZERO DESPERDÍCIO',
  'PROVA NA FOTO',
  'CUSTO BAIXO',
  'FREQUÊNCIA NATURAL',
]

const POINTS = [
  { title: 'Atenção real', body: 'Minutos, não segundos.' },
  { title: 'Contexto certo', body: 'A marca na hora do consumo.' },
  { title: 'Zero desperdício', body: '100% vai pra mesa.' },
  { title: 'Prova toda semana', body: 'Fotos no email.' },
  { title: 'Custo baixo', body: 'Fração do OOH.' },
  { title: 'Frequência grátis', body: 'Várias vezes por refeição.' },
]

export function WhyMesa() {
  return (
    <Section pad="lg">
      <div data-nav-theme="neon">
        <Eyebrow>08 · Por que Mesa.ads</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          <RevealText by="word">Uma mídia que o consumidor</RevealText>{' '}
          <span className="italic font-serif font-normal text-chalk/85">
            <RevealText by="word" stagger={0.05}>
              não pula.
            </RevealText>
          </span>
        </SectionTitle>
      </div>

      {/* Marquee gigante */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="mt-16 -mx-6 lg:-mx-10 py-6 border-y border-hairline bg-gradient-to-r from-ink-950 via-ink-900/60 to-ink-950"
      >
        <Marquee speed={36} gap={80}>
          {KEYWORDS.map((w) => (
            <span
              key={w}
              className="font-display font-medium text-[52px] lg:text-[92px] leading-none tracking-[-0.03em] text-chalk/90 whitespace-nowrap"
            >
              {w}
              <span className="inline-block size-3 rounded-full bg-mesa-neon align-middle ml-8 mr-8 mb-3" />
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* Grid minimalista embaixo */}
      <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-3">
        {POINTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative pl-4 border-l border-hairline hover:border-mesa-neon/80 transition-colors duration-300"
          >
            <div className="text-[10px] tracking-[0.22em] uppercase text-mesa-neon/80 font-mono">
              0{i + 1}
            </div>
            <h3 className="mt-2 font-display text-[18px] tracking-tight text-chalk">
              {p.title}
            </h3>
            <p className="mt-1 text-[13px] text-chalk/55 leading-snug">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
