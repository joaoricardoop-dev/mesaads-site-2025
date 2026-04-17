/**
 * Cases exibidos na seção Cases — mockups dos coasters reais apresentados no Media Kit.
 * Cada case tem 2 porta-copos (frente e verso, ou duas variações).
 */

export type CoasterFace = {
  bg: string
  ink: string
  /** Linhas curtas de texto (até 4) renderizadas empilhadas no SVG */
  lines?: string[]
  /** Alternativo: título grande + linhas menores abaixo */
  titleLg?: string
  titleSub?: string[]
  /** Mostra placeholder de QR no rodapé */
  qr?: boolean
  /** Tag pequena (tipo 'NOVO LANÇAMENTO') */
  footNote?: string
  /** Brand indicador no topo (em caps pequeno) */
  brandTop?: string
}

export interface CaseStudy {
  id: string
  brand: string
  headline: string
  note: string
  accent: 'ice' | 'magenta' | 'amber' | 'orange' | 'neon'
  faces: [CoasterFace, CoasterFace]
}

export const CASES: CaseStudy[] = [
  {
    id: 'brises',
    brand: 'SKN — Brises Maceió',
    headline: 'Lançamento imobiliário com QR direto pro stand',
    note: 'Porta-copo entregue em bares-alvo do público A; o verso leva ao showroom via QR.',
    accent: 'amber',
    faces: [
      {
        bg: '#EFE8D7',
        ink: '#2A2A2C',
        titleLg: 'BRISES',
        titleSub: ['MACEIÓ', 'NOVO LANÇAMENTO · SKN'],
      },
      {
        bg: '#13181E',
        ink: '#F5F5F3',
        brandTop: 'SKN INCORPORADORA',
        lines: ['Apartamentos', 'de 3 e 4 suítes', 'Av. Maceió, 854', 'Adrianópolis — Manaus'],
        qr: true,
      },
    ],
  },
  {
    id: 'azul',
    brand: 'Azul Linhas Aéreas',
    headline: 'Patrocínio regional com CTA direto na mesa',
    note: 'Ativação cercando Parintins 2026: copos na mão do público executivo e A/B em pontos de Manaus.',
    accent: 'ice',
    faces: [
      {
        bg: '#1A2B6E',
        ink: '#F5F5F3',
        lines: ['O céu', 'do Brasil é', 'azul e vermelho'],
        footNote: 'Patrocinadora oficial · Festival de Parintins 2026',
      },
      {
        bg: '#F5F5F3',
        ink: '#0A0A0C',
        brandTop: 'AZUL',
        titleLg: 'Manaus →',
        titleSub: ['Parintins', 'Só a Azul te leva'],
        qr: true,
      },
    ],
  },
  {
    id: 'unipar',
    brand: 'Unipar — Parque das Torres',
    headline: 'Campanha contínua de empreendimento residencial',
    note: 'Série de 4 peças com variação de mensagem, girando no mesmo bairro do lançamento.',
    accent: 'neon',
    faces: [
      {
        bg: '#B09C7A',
        ink: '#13181E',
        brandTop: 'UNIPAR',
        lines: ['A vida em harmonia', 'tem endereço certo'],
        footNote: 'PARQUE DAS TORRES',
      },
      {
        bg: '#13181E',
        ink: '#F5F5F3',
        brandTop: 'UNIPAR',
        lines: ['2 e 3 dormitórios', 'LAZER COMPLETO'],
        titleSub: ['Próximo à Av. das Torres'],
        qr: true,
      },
    ],
  },
]
