import { Link } from 'react-router-dom'
import { MesaAdsLogo } from '../../assets/logo'
import { Chip } from '../ui/Chip'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-hairline bg-ink-950/40 py-14">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <MesaAdsLogo className="text-[22px]" />
            <p className="mt-4 max-w-sm text-[14px] text-chalk/55 leading-relaxed">
              Rede de mídia em mesas, coasters e salas VIP. Sua marca no momento do consumo —
              quando o cliente está relaxado, aberto e decidindo.
            </p>
            <Chip tone="neon" dot size="sm" className="mt-5">
              Manaus · AM · rede ativa
            </Chip>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-chalk/40 mb-4">
              Navegue
            </div>
            <ul className="flex flex-col gap-2 text-[13px] text-chalk/70">
              <li><a href="#formatos" className="hover:text-chalk transition-colors">Formatos</a></li>
              <li><a href="#rede" className="hover:text-chalk transition-colors">Rede</a></li>
              <li><a href="#casos" className="hover:text-chalk transition-colors">Casos</a></li>
              <li><a href="#como-funciona" className="hover:text-chalk transition-colors">Como funciona</a></li>
              <li><Link to="/media-kit" className="hover:text-chalk transition-colors">Media Kit</Link></li>
              <li><a href="#condicoes" className="hover:text-chalk transition-colors">Condições</a></li>
              <li>
                <a href="https://app.mesaads.com.br/campanha" className="text-mesa-neon hover:brightness-110 transition">
                  Montar campanha →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-chalk/40 mb-4">
              Contato
            </div>
            <ul className="flex flex-col gap-2 text-[13px] text-chalk/70">
              <li>
                <a href="mailto:anuncie@mesa.ads" className="hover:text-chalk transition-colors">
                  anuncie@mesa.ads
                </a>
              </li>
              <li>Manaus — Amazonas</li>
              <li>
                <a href="#" className="hover:text-chalk transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-chalk transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-[11px] tracking-wide text-chalk/40">
          <div>© {new Date().getFullYear()} Mesa.ads — Todos os direitos reservados.</div>
          <div className="font-mono">
            Feito na Amazônia
          </div>
        </div>
      </div>
    </footer>
  )
}
