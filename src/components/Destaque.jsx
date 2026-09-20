// Número-herói: o valor mais recente do indicador, grande e legível, com a
// variação frente ao ponto anterior. É a primeira coisa que o usuário lê.
export default function Destaque({ indicador, ponto, serie }) {
  const anterior = serie.length > 1 ? serie[serie.length - 2].valor : null
  const variacao = anterior !== null ? ponto.valor - anterior : null
  const subiu = variacao !== null && variacao > 0
  const desceu = variacao !== null && variacao < 0

  const valorFmt = indicador.tipo === 'cambio'
    ? ponto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
    : ponto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <section className="destaque">
      <p className="destaque__rotulo">{indicador.nome} · {ponto.data}</p>
      <p className="destaque__valor">
        <span className="destaque__unidade">{indicador.tipo === 'cambio' ? 'R$' : ''}</span>
        {valorFmt}
        <span className="destaque__unidade">{indicador.tipo === 'juros' ? '% a.a.' : ''}</span>
      </p>
      {variacao !== null && (
        <p className={'destaque__var' + (subiu ? ' destaque__var--sobe' : desceu ? ' destaque__var--desce' : '')}>
          {subiu ? '▲' : desceu ? '▼' : '■'} {Math.abs(variacao).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} frente ao período anterior
        </p>
      )}
    </section>
  )
}
