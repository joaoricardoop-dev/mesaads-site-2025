export type ProductId = 'coaster' | 'vip-telas' | 'vip-janela' | 'ativacao'

export type PaymentMethod = 'pix' | 'boleto' | 'cartao'

export type ArtChoice = 'own' | 'agency'

export type ClasseTag =
  | 'Classe AA'
  | 'Classe A'
  | 'Classe B'
  | 'Classe C'
  | 'Classe D'
  | 'Misto (A/B)'

export interface Venue {
  id: string
  name: string
  neighborhood: string
  classes: ClasseTag[]
  manager: string
  mesas: number
  assentos: number
  clientesMes: number
  capCoasters: number
  rating: number // 0..5
  accent: 'neon' | 'magenta' | 'amber' | 'orange' | 'ice'
  tag?: 'Premium' | 'Aeroporto'
}

export interface Neighborhood {
  id: string
  name: string
  // relative SVG coords inside a 1000x700 viewBox (ilustrativo)
  cx: number
  cy: number
}

export interface AddOn {
  id: string
  label: string
  sub: string
  monthly: number // R$ per month
  accent: 'neon' | 'magenta' | 'amber' | 'orange' | 'ice'
  icon: 'tv' | 'window' | 'mic'
  availability?: string
}

export interface CustomerInfo {
  name: string
  email: string
  doc: string
  phone: string
  company: string
}

export type CheckoutStep =
  | 'hero'
  | 'venues'
  | 'volume'
  | 'duration'
  | 'upsell'
  | 'creative'
  | 'checkout'
  | 'success'

export interface ArtState {
  choice: ArtChoice | null
  fileUrl: string | null
  fileName: string | null
  briefing: string
}

export interface OrderSnapshot {
  orderId: string
  total: number
  paidAt: string
}
