import type { AddOn, ProductId } from '../types'

export interface ProductDef {
  id: ProductId
  name: string
  tagline: string
  description: string
  tag: 'Produto principal' | 'Premium' | 'Sob consulta'
  accent: 'neon' | 'magenta' | 'amber' | 'orange' | 'ice'
  tagline2?: string
  fromPrice?: string
}

export const PRODUCTS: ProductDef[] = [
  {
    id: 'coaster',
    name: 'Porta-Copos',
    tagline: 'Sua marca na mão do consumidor por minutos, não segundos.',
    description:
      '90mm circular, frente & verso, impresso em alta qualidade. Distribuído na mesa, lido enquanto come, bebe e conversa.',
    tag: 'Produto principal',
    accent: 'neon',
    fromPrice: 'a partir de R$ 2.633/ciclo',
  },
  {
    id: 'vip-telas',
    name: 'Telas Sala VIP',
    tagline: 'Três telas 55" no Aeroporto de Manaus.',
    description:
      'Ativação Premium na Harmony Lounge — sala VIP do MAO Airport. 3 telas 55" em loops controlados.',
    tag: 'Premium',
    accent: 'magenta',
    fromPrice: 'a partir de R$ 9.000/mês',
  },
  {
    id: 'vip-janela',
    name: 'Janelas Digitais',
    tagline: 'Vitrines digitais com fluxo premium.',
    description:
      'Janelas digitais na Sala VIP MAO. Exposição contínua para público executivo e viajantes.',
    tag: 'Premium',
    accent: 'amber',
    fromPrice: 'a partir de R$ 12.000/mês',
  },
  {
    id: 'ativacao',
    name: 'Ativações Físicas',
    tagline: 'Live marketing onde o cliente relaxa.',
    description:
      'Ações customizadas: degustação, lançamento, experiência de marca nos espaços ELMSVMAO-1 e ELMSVMAO-2.',
    tag: 'Sob consulta',
    accent: 'orange',
    fromPrice: 'sob consulta',
  },
]

export const productById = (id: ProductId) => PRODUCTS.find((p) => p.id === id)

// Add-ons apresentados no passo de Upsell para campanhas de coaster
export const ADD_ONS: AddOn[] = [
  {
    id: 'addon-telas',
    label: 'Telas 55" — Sala VIP MAO',
    sub: '3 telas, loop controlado, alcance executivo',
    monthly: 9000,
    accent: 'magenta',
    icon: 'tv',
    availability: 'ELMSVMAO-1 disponível',
  },
  {
    id: 'addon-janela',
    label: 'Janela Digital VIP',
    sub: 'Vitrine digital em altura da visão',
    monthly: 12000,
    accent: 'amber',
    icon: 'window',
    availability: 'ELMSVMAO-1 livre · ELMSVMAO-2 ocupada até dez/26',
  },
  {
    id: 'addon-live',
    label: 'Live Marketing',
    sub: 'Degustação, lançamento ou ativação com equipe',
    monthly: 0, // sob consulta
    accent: 'orange',
    icon: 'mic',
    availability: 'Valor sob consulta',
  },
]

export const addOnById = (id: string) => ADD_ONS.find((a) => a.id === id)
