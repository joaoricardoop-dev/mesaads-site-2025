import { motion } from 'framer-motion'
import { Section } from '../Section'
import { Button } from '../../ui/Button'
import { ArrowRight } from '../../../assets/logo'
import { RevealText } from '../../ui/RevealText'
import { ScrambleText } from '../../ui/ScrambleText'

export function FinalCTA() {
  return (
    <Section pad="xl">
      <motion.div
        data-nav-theme="neon"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[40px] border border-mesa-neon/30 bg-gradient-to-br from-mesa-neon/10 via-ink-900/80 to-ink-950/90 px-8 py-20 lg:px-16 lg:py-28 text-center"
      >
        {/* Decorative orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 size-[360px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(closest-side, rgba(0,230,64,0.45), transparent 70%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -bottom-20 size-[360px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(closest-side, rgba(255,46,138,0.35), transparent 70%)',
          }}
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-mesa-neon/90 mb-5">
            <span className="size-1 rounded-full bg-mesa-neon animate-pulse-neon" />
            pronto pra começar
          </div>
          <h2 className="font-display font-medium text-[40px] lg:text-[80px] leading-[0.9] tracking-[-0.045em] text-chalk text-balance max-w-4xl mx-auto">
            <RevealText by="word" stagger={0.06}>Sua marca na mesa</RevealText>
            <br />
            <span className="italic font-serif font-normal text-chalk/85">
              <RevealText by="word" stagger={0.06} delay={0.2}>
                já no próximo ciclo.
              </RevealText>
            </span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-[15px] lg:text-[17px] text-chalk/65 leading-snug">
            3 minutos pra montar. 25 dias até chegar na mesa.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="https://app.mesaads.com.br/campanha">
              <Button size="lg" iconRight={<ArrowRight className="size-4" />}>
                <ScrambleText text="Montar campanha" trigger="hover" duration={500} />
              </Button>
            </a>
            <a href="mailto:anuncie@mesa.ads">
              <Button size="lg" variant="ghost">
                Falar com o time
              </Button>
            </a>
          </div>
          <p className="mt-10 text-[11px] tracking-[0.18em] uppercase text-chalk/40">
            Pix −5% · boleto parcelado · cartão 3× sem juros
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
