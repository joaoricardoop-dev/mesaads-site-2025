/**
 * Matrizes oficiais Mesa.ads — dados transcritos das tabelas fornecidas pelo cliente.
 *
 * COASTER (PRICE_MATRIX):
 *   Eixos: VOLUME_STEPS (coasters/ciclo de 4 semanas, 1k→20k)
 *          × WEEK_STEPS (semanas totais da campanha, 4→52)
 *   Valor = preço TOTAL da campanha (BRL), descontos volume+prazo já embutidos.
 *
 * TELAS VIP (VIP_TELAS_PRICE_PER_WEEK): 1 tela 55" na Sala VIP MAO — preço por unidade,
 *   base R$ 9.000/ciclo. Faixas de desconto: 12sem -5%, 16sem+ -10%.
 *
 * JANELA DIGITAL VIP (VIP_JANELA_PRICE_PER_WEEK): 1 janela digital na Sala VIP MAO,
 *   base R$ 12.000/ciclo. Faixas: 12-20sem -5%, 24sem+ -10%.
 *
 * ⚠️  Validar com o time comercial antes de publicar em produção.
 */

export type CoasterProduct = 'coaster'
export type VipProduct = 'vip-telas' | 'vip-janela'
export type PriceableProduct = CoasterProduct | VipProduct | 'ativacao'

// ============================================================
// Coaster — matriz 20×13
// ============================================================
export const VOLUME_STEPS = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000,
] as const

export const WEEK_STEPS = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52] as const

export type VolumeStep = (typeof VOLUME_STEPS)[number]
export type WeekStep = (typeof WEEK_STEPS)[number]

// prettier-ignore
export const PRICE_MATRIX: readonly (readonly number[])[] = [
  // 4,        8,         12,        16,         20,         24,         28,         32,         36,         40,         44,         48,         52
  [ 2633.58,   5109.14,   7505.70,   9796.91,   11982.78,   14063.31,   16038.50,   17908.34,   19672.83,   21331.99,   22885.80,   24334.27,   25677.39], // 1k
  [ 4411.37,   8558.05,  12572.40,  16410.29,   20071.73,   23556.71,   26865.23,   29997.31,   32952.92,   35732.08,   38334.79,   40761.04,   43010.84], // 2k
  [ 6415.95,  12446.94,  18285.45,  23867.32,   29192.56,   34261.16,   39073.12,   43628.44,   47927.13,   51969.17,   55754.58,   59283.35,   62555.49], // 3k
  [ 8419.00,  16332.86,  23994.15,  31318.68,   38306.45,   44957.46,   51271.71,   57249.20,   62889.93,   68193.90,   73161.11,   77791.56,   82085.25], // 4k
  [ 9774.68,  18962.89,  27857.85,  36361.83,   44474.81,   52196.81,   59527.83,   66467.85,   73016.89,   79174.94,   84942.01,   90318.08,   95303.17], // 5k
  [11778.21,  22849.73,  33567.90,  43814.94,   53590.86,   62895.64,   71729.30,   80091.83,   87983.23,   95403.51,  102352.65,  108830.67,  114837.55], // 6k
  [13779.16,  26731.57,  39270.60,  51258.47,   62695.17,   73580.70,   83915.07,   93698.27,  102930.31,  111611.18,  119740.88,  127319.42,  134346.79], // 7k
  [15661.16,  30382.65,  44634.30,  58259.51,   71258.27,   83630.58,   95376.45,  106495.87,  116988.85,  126855.38,  136095.46,  144709.10,  152696.29], // 8k
  [17664.68,  34269.49,  50344.35,  65712.63,   80374.31,   94329.41,  107577.93,  120119.85,  131955.19,  143083.94,  153506.11,  163221.68,  172230.67], // 9k
  [19097.21,  35108.59,  51577.05,  67321.62,   82342.31,   96639.10,  110212.01,  123061.03,  135186.16,  146587.41,  157264.76,  167218.23,  176447.80], // 10k
  [20248.00,  39281.12,  57706.80,  75322.56,   92128.40,  108124.32,  123310.32,  137686.40,  151252.56,  164008.80,  175955.12,  187091.52,  197418.00], // 11k
  [22092.11,  42858.68,  62962.50,  82182.63,  100519.08,  117971.84,  134540.92,  150226.32,  165028.03,  178946.05,  191980.39,  204131.05,  215398.03], // 12k
  [24240.32,  47026.21,  69084.90,  90173.97,  110293.44,  129443.29,  147623.52,  164834.15,  181075.16,  196346.56,  210648.34,  223980.52,  236343.08], // 13k
  [26087.00,  50608.78,  74347.95,  97043.64,  118695.85,  139304.58,  158869.83,  177391.60,  194869.89,  211304.70,  226696.03,  241043.88,  254348.25], // 14k
  [27393.11,  54186.34,  79603.65, 103903.71,  127086.53,  149152.10,  170100.43,  189931.52,  208645.36,  226241.95,  242721.30,  258083.41,  272328.28], // 15k
  [29656.26,  57533.15,  84520.35, 110321.30,  134936.00,  158364.45,  180606.64,  201662.59,  221532.29,  240215.73,  257712.93,  274023.87,  289148.57], // 16k
  [31502.95,  61115.72,  89783.40, 117190.96,  143338.41,  168225.74,  191852.95,  214220.04,  235327.02,  255173.87,  273760.61,  291087.23,  307153.74], // 17k
  [33347.05,  64693.28,  95039.10, 124051.04,  151729.09,  178073.26,  203083.55,  226759.96,  249102.48,  270111.13,  289785.89,  308126.77,  325133.76], // 18k
  [35072.21,  68040.09,  99955.80, 130468.62,  159578.56,  187285.60,  213589.76,  238491.03,  261989.41,  284084.91,  304777.51,  324067.23,  341954.05], // 19k
  [35866.20,  69580.55, 102218.85, 133422.50,  163191.50,  191525.85,  218425.54,  243890.59,  267920.99,  290516.73,  311677.83,  331404.27,  349606.77], // 20k
]

// ============================================================
// Telas VIP (55" · Sala Vip Manaus Airport) — preço por 1 unidade
// ============================================================
// Sequência alinhada a WEEK_STEPS (4, 8, 12, ..., 52)
// prettier-ignore
export const VIP_TELAS_PRICE: readonly number[] = [
//   4,       8,       12,      16,      20,      24,      28,      32,      36,      40,      44,      48,      52
  9000.00, 18000.00, 25650.00, 32400.00, 40500.00, 48600.00, 56700.00, 64800.00, 72900.00, 81000.00, 89100.00, 97200.00, 105300.00,
]

// ============================================================
// Janela Digital VIP — preço por 1 unidade
// ============================================================
// prettier-ignore
export const VIP_JANELA_PRICE: readonly number[] = [
//   4,       8,        12,      16,      20,      24,      28,      32,      36,      40,      44,      48,      52
  12000.00, 24000.00, 34200.00, 45600.00, 57000.00, 64800.00, 75600.00, 86400.00, 97200.00, 108000.00, 118800.00, 129600.00, 140400.00,
]

// Disponibilidade física (inventário real)
export const VIP_INVENTORY = {
  'vip-telas': { max: 3, label: 'telas 55"' },
  'vip-janela': { max: 2, label: 'janelas digitais', note: 'ELMSVMAO-1 livre · ELMSVMAO-2 ocupado até dez/26' },
} as const

// ============================================================
// Snap / lookup helpers
// ============================================================

/** Helper: snap arbitrary value to the nearest allowed step. */
export const snapTo = <T extends number>(value: number, steps: readonly T[]): T => {
  return steps.reduce((best, step) =>
    Math.abs(step - value) < Math.abs(best - value) ? step : best,
  ) as T
}

/** Lookup total price (BRL) for a given volume (per cycle) and total weeks — coaster only. */
export function lookupTotal(volume: number, weeks: number): number {
  const v = snapTo(volume, VOLUME_STEPS)
  const w = snapTo(weeks, WEEK_STEPS)
  const row = VOLUME_STEPS.indexOf(v as VolumeStep)
  const col = WEEK_STEPS.indexOf(w as WeekStep)
  if (row === -1 || col === -1) return 0
  return PRICE_MATRIX[row][col]
}

/** Lookup price for VIP products (per unit × quantity). */
export function lookupVipTotal(product: VipProduct, weeks: number, quantity: number): number {
  const w = snapTo(weeks, WEEK_STEPS)
  const col = WEEK_STEPS.indexOf(w as WeekStep)
  if (col === -1) return 0
  const row = product === 'vip-telas' ? VIP_TELAS_PRICE : VIP_JANELA_PRICE
  return row[col] * Math.max(1, quantity)
}

/** Desconto de prazo aplicado na faixa (informativo) */
export function prazoDiscountPct(product: 'vip-telas' | 'vip-janela', weeks: number): number {
  const w = snapTo(weeks, WEEK_STEPS)
  if (product === 'vip-telas') {
    if (w >= 16) return 10
    if (w >= 12) return 5
    return 0
  } else {
    // janela
    if (w >= 24) return 10
    if (w >= 12) return 5
    return 0
  }
}

/** Total coasters impresos no contrato (volume por ciclo × ciclos). */
export function totalCoastersForCampaign(volume: number, weeks: number): number {
  const cycles = Math.max(1, Math.round(weeks / 4))
  return volume * cycles
}

/** Effective unit price per coaster (BRL / coaster). */
export function effectiveUnitPrice(volume: number, weeks: number): number {
  const total = lookupTotal(volume, weeks)
  const n = totalCoastersForCampaign(volume, weeks)
  return n > 0 ? total / n : 0
}
