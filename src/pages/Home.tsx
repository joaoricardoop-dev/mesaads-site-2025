import { SiteHeader } from '../components/site/SiteHeader'
import { SiteFooter } from '../components/site/SiteFooter'
import { HomeHero } from '../components/site/sections/HomeHero'
import { AttentionProblem } from '../components/site/sections/AttentionProblem'
import { MesaAdvantage } from '../components/site/sections/MesaAdvantage'
import { Formats } from '../components/site/sections/Formats'
import { Cases } from '../components/site/sections/Cases'
import { HowItWorks } from '../components/site/sections/HowItWorks'
import { Network } from '../components/site/sections/Network'
import { VipLounge } from '../components/site/sections/VipLounge'
import { WhyMesa } from '../components/site/sections/WhyMesa'
import { Terms } from '../components/site/sections/Terms'
import { FinalCTA } from '../components/site/sections/FinalCTA'
import { WhatsAppFloat } from '../components/ui/WhatsAppFloat'
import { CustomCursor } from '../components/ui/CustomCursor'
import { useSmoothScroll } from '../lib/useSmoothScroll'

export default function HomePage() {
  useSmoothScroll()

  return (
    <div className="relative min-h-screen grain overflow-x-hidden">
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 -left-32 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(0,230,64,0.10), rgba(0,230,64,0) 70%)',
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

      <SiteHeader />

      <main className="relative z-10">
        <HomeHero />
        <AttentionProblem />
        <MesaAdvantage />
        <Formats />
        <Cases />
        <HowItWorks />
        <Network />
        <VipLounge />
        <WhyMesa />
        <Terms />
        <FinalCTA />
      </main>

      <SiteFooter />

      <WhatsAppFloat message="Olá! Quero saber mais sobre anunciar no mesa.ads." />
      <CustomCursor />
    </div>
  )
}
