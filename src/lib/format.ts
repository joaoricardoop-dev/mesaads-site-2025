const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

const BRL_COMPACT = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const NUM = new Intl.NumberFormat('pt-BR')

const NUM_COMPACT = new Intl.NumberFormat('pt-BR', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const brl = (v: number) => BRL.format(v)
export const brlCompact = (v: number) => BRL_COMPACT.format(v)
export const num = (v: number) => NUM.format(v)
export const numCompact = (v: number) => NUM_COMPACT.format(v)

export const plural = (n: number, one: string, many: string) => (n === 1 ? one : many)

export const splitBrlParts = (v: number) => {
  const parts = BRL.formatToParts(v)
  const int = parts
    .filter((p) => p.type === 'integer' || p.type === 'group' || p.type === 'currency' || p.type === 'literal')
    .map((p) => p.value)
    .join('')
  const dec = parts
    .filter((p) => p.type === 'decimal' || p.type === 'fraction')
    .map((p) => p.value)
    .join('')
  return { int, dec }
}
