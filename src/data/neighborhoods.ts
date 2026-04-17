import type { Neighborhood } from '../types'

// Layout ilustrativo (não é mapa cartográfico). ViewBox 0 0 1000 700.
// Bairros posicionados aproximando a geografia de Manaus.
export const NEIGHBORHOODS: Neighborhood[] = [
  { id: 'taruma', name: 'Tarumã', cx: 240, cy: 230 },
  { id: 'distrit-industrial-i', name: 'Distrit Industrial I', cx: 680, cy: 180 },
  { id: 'adrianopolis', name: 'Adrianópolis', cx: 520, cy: 340 },
  { id: 'nossa-senhora-das-gracas', name: 'Nossa Senhora das Graças', cx: 430, cy: 380 },
  { id: 'parque-10', name: 'Parque 10 de Novembro', cx: 600, cy: 400 },
  { id: 'santa-etelvina', name: 'Santa Etelvina', cx: 350, cy: 150 },
  { id: 'centro', name: 'Centro', cx: 310, cy: 510 },
]

// normaliza nomes do campo Venue.neighborhood para o id estável do bairro
export const neighborhoodId = (name: string): string => {
  const n = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()

  if (n.startsWith('taruma')) return 'taruma'
  if (n.startsWith('distrit')) return 'distrit-industrial-i'
  if (n.startsWith('adrian')) return 'adrianopolis'
  if (n.startsWith('nossa senhora')) return 'nossa-senhora-das-gracas'
  if (n.startsWith('parque 10')) return 'parque-10'
  if (n.startsWith('santa etelvina')) return 'santa-etelvina'
  if (n.startsWith('centro')) return 'centro'
  return n
}
