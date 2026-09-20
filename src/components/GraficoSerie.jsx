import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

// Gráfico de linha. Com comparação ativa, sobrepõe uma segunda linha.
// As séries podem ter granularidades diferentes (juros mensal, dólar diário),
// então NÃO casamos por data exata (as datas não batem). Em vez disso,
// alinhamos por POSIÇÃO: as últimas N observações de cada série, lado a lado.
// Usa dois eixos Y quando as unidades diferem, para uma escala não achatar a outra.
export default function GraficoSerie({ serie, indicador, serieComp = [], indicadorComp = null }) {
  const comparando = indicadorComp && serieComp.length > 0
  const doisEixos = comparando && indicadorComp.unidade !== indicador.unidade

  // Alinha por posição a partir do fim (índice comum). O rótulo do eixo X é a
  // data da série principal; a comparação entra pelo mesmo índice.
  const n = comparando ? Math.min(serie.length, serieComp.length) : serie.length
  const principalCorte = serie.slice(serie.length - n)
  const compCorte = comparando ? serieComp.slice(serieComp.length - n) : []

  const dados = principalCorte.map((p, i) => ({
    data: p.data,
    principal: p.valor,
    ...(comparando ? { comparacao: compCorte[i].valor } : {}),
  }))

  return (
    <section className="grafico">
      <h2 className="grafico__titulo">Evolução recente</h2>
      <div className="grafico__area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="#1b3047" strokeDasharray="3 3" />
            <XAxis dataKey="data" tick={{ fill: '#8fa3b8', fontSize: 11 }} minTickGap={24} />
            <YAxis yAxisId="esq" tick={{ fill: '#8fa3b8', fontSize: 11 }} domain={['auto', 'auto']} width={48} />
            {doisEixos && (
              <YAxis yAxisId="dir" orientation="right" tick={{ fill: '#8fa3b8', fontSize: 11 }} domain={['auto', 'auto']} width={48} />
            )}
            <Tooltip
              contentStyle={{ background: '#0d1b2a', border: '1px solid #1b3047', color: '#e0e1dd' }}
              labelStyle={{ color: '#8fa3b8' }}
            />
            {comparando && <Legend wrapperStyle={{ fontSize: 12, color: '#8fa3b8' }} />}
            <Line yAxisId="esq" type="monotone" dataKey="principal" name={indicador.nome}
                  stroke="#e0a458" strokeWidth={2} dot={false} connectNulls />
            {comparando && (
              <Line yAxisId={doisEixos ? 'dir' : 'esq'} type="monotone" dataKey="comparacao"
                    name={indicadorComp.nome} stroke="#5b8c9e" strokeWidth={2} dot={false} connectNulls />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}