import { motion } from 'framer-motion'
import { Section, Eyebrow, SectionTitle } from '../Section'
import { RevealText } from '../../ui/RevealText'

/**
 * Condições comerciais reduzidas a chips punchy.
 * Cada chip = 1 título + 1 valor/condição bem curta. Sem bodies longos.
 */
const CHIPS = [
  { k: 'Ciclo', v: '4 semanas' },
  { k: 'Pix à vista', v: '−5%' },
  { k: 'Cartão', v: '3× sem juros' },
  { k: 'Boleto', v: 'Parcelado por ciclo' },
  { k: 'Prazo design', v: '5 dias' },
  { k: 'Produção', v: '20 dias' },
  { k: 'Prova', v: 'Fotos toda semana' },
  { k: 'Cancelamento', v: 'Antes da produção' },
] as const

export function Terms() {
  return (
    <Section id="condicoes" pad="lg" tone="elevated">
      <div data-nav-theme="dark">
        <Eyebrow>09 · Condições</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          <RevealText by="word">Sem letra miúda.</RevealText>{' '}
          <span className="italic font-serif font-normal text-chalk/85">
            <RevealText by="word" stagger={0.05}>
              Só o essencial.
            </RevealText>
          </span>
        </SectionTitle>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CHIPS.map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-hairline bg-ink-900/50 px-5 py-6 backdrop-blur-sm hover:border-mesa-neon/40 hover:bg-mesa-neon/[0.03] transition-colors duration-300 ease-apple"
            >
              <div className="text-[10px] tracking-[0.22em] uppercase text-chalk/45">{c.k}</div>
              <div className="mt-3 font-display text-[20px] lg:text-[24px] tracking-[-0.02em] text-chalk leading-tight">
                {c.v}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -bottom-6 size-16 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(0,230,64,0.3), rgba(0,230,64,0) 70%)',
                }}
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-[12px] tracking-[0.14em] uppercase text-chalk/40 text-center">
          Entrou em produção, não cancela. Conteúdo proibido: definido por cada parceiro.
        </p>
      </div>
    </Section>
  )
}
