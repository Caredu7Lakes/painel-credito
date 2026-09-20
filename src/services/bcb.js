// Serviço de acesso à API SGS do Banco Central (dados abertos, sem chave).
// A API permite CORS, então chamamos direto — sem proxy.
// Usamos consulta por INTERVALO DE DATAS (dataInicial/dataFinal) em vez de
// /ultimos/N, porque /ultimos tem limite de registros e falha (400) para N alto.

const BASE = 'https://api.bcb.gov.br/dados/serie'

export const INDICADORES = [
  { id: 20772, chave: 'imovel',   nome: 'Financiamento imobiliário (PF)', unidade: '% a.a.', tipo: 'juros' },
  { id: 20749, chave: 'veiculos', nome: 'Aquisição de veículos (PF)',     unidade: '% a.a.', tipo: 'juros' },
  { id: 432,   chave: 'selic',    nome: 'Meta Selic',                     unidade: '% a.a.', tipo: 'juros' },
  { id: 1,     chave: 'dolar',    nome: 'Dólar comercial (venda)',        unidade: 'R$',     tipo: 'cambio' },
]

// Formata uma data como DD/MM/AAAA (formato exigido pelo SGS).
function formatarData(d) {
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  return `${dia}/${mes}/${d.getFullYear()}`
}

// Busca a série num intervalo (por padrão, os últimos 'anos' anos) e devolve
// no máximo os 'limite' pontos mais recentes. Retorna [{data, valor}].
export async function buscarSerie(id, { anos = 3, limite = 24 } = {}) {
  const hoje = new Date()
  const inicio = new Date()
  inicio.setFullYear(hoje.getFullYear() - anos)

  const params = new URLSearchParams({
    formato: 'json',
    dataInicial: formatarData(inicio),
    dataFinal: formatarData(hoje),
  })
  const url = `${BASE}/bcdata.sgs.${id}/dados?${params.toString()}`

  const resp = await fetch(url)
  if (!resp.ok) {
    throw new Error(`Não foi possível carregar os dados (código ${resp.status}).`)
  }
  const bruto = await resp.json()
  if (!Array.isArray(bruto) || bruto.length === 0) {
    throw new Error('A série veio vazia para o período consultado.')
  }
  // SGS retorna data "DD/MM/AAAA" e valor como string. Pegamos os últimos pontos.
  return bruto
    .slice(-limite)
    .map((linha) => ({ data: linha.data, valor: Number(linha.valor) }))
}