/**
 * Stats do Media Kit Mesa.ads.
 * Mantém números exatos e fontes citadas.
 */

export interface Stat {
  value: string
  label: string
  source: string
}

export const ATTENTION_PROBLEM: Stat[] = [
  { value: '9h13', label: 'tempo médio do brasileiro online', source: 'Data Rare Portal' },
  { value: 'R$ 37,9 bi', label: 'gastos em mídia digital no Brasil', source: 'Kantar Ibope Mídia' },
  { value: '78%', label: 'das pessoas pulam anúncios online', source: 'CNDL' },
  { value: '21%', label: 'acham anúncios digitais relevantes', source: 'Serasa Experian' },
]

export const MESA_ADVANTAGE: Stat[] = [
  {
    value: '74,4 min/dia',
    label: 'as pessoas passam "comendo e bebendo"',
    source: 'National Restaurant Association',
  },
  {
    value: '55 min',
    label: 'janela real de uma refeição típica do brasileiro',
    source: 'Wharton Faculty Plataform',
  },
  {
    value: '2h20',
    label: 'tempo médio em happy hours e bares',
    source: 'Saturday Night at the Bar',
  },
  {
    value: '1,9 seg',
    label: 'atenção média em anúncios digitais',
    source: 'Lumen Research',
  },
]

export const NETWORK_STATS = [
  { value: '20', label: 'casas parceiras', sub: 'ativas em Manaus' },
  { value: '100k', label: 'clientes impactados', sub: 'por mês' },
  { value: '20%', label: 'crescimento', sub: 'por semana' },
]

export const ACTIVE_NEIGHBORHOODS = [
  'Ponta Negra',
  'Adrianópolis',
  'Vieiralves',
  'Aeroporto',
  'Centro',
]

export const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Você escolhe onde anunciar',
    body: 'Defina o plano e escolha os bares, restaurantes e salas VIP que mais combinam com o seu público.',
  },
  {
    n: '02',
    title: 'A Mesa.ads produz a campanha',
    body: 'A equipe cria a arte do seu porta-copo. Depois disso, ele é impresso e preparado para entrega.',
  },
  {
    n: '03',
    title: 'A campanha vai pras mesas',
    body: 'Os porta-copos são distribuídos nos locais escolhidos. Enviamos fotos semanais como prova de veiculação.',
  },
]

export const COMMERCIAL_BLOCKS = [
  {
    title: 'Veiculação',
    body: 'Feita em ciclos de 4 semanas padronizados ao longo do ano.',
  },
  {
    title: 'Prazo — Design',
    body: '5 dias após o faturamento.',
  },
  {
    title: 'Prazo — Produção',
    body: '20 dias após a conclusão do design.',
  },
  {
    title: 'Pagamento',
    body: '100% antes da veiculação. Pix à vista (-5%), boleto parcelado pelo período da campanha, ou cartão em até 3x sem juros.',
  },
  {
    title: 'Cancelamento',
    body: 'Entrou em produção, não cancela. Não é possível cancelar pedidos de múltiplos meses.',
  },
  {
    title: 'Conteúdo proibido',
    body: 'Definido por cada restaurante parceiro individualmente.',
  },
  {
    title: 'Prova de veiculação',
    body: 'Relatório fotográfico semanal enviado ao anunciante.',
  },
  {
    title: 'Reposição',
    body: 'Se necessário e mediante aprovação (custo adicional).',
  },
]
