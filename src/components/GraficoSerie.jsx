import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

// Gráfico de linha da série histórica (últimos ~24 pontos). ResponsiveContainer
// garante que ele se ajuste à largura da tela (parte da responsividade).
export default function GraficoSerie({ serie, indicador }) {
  return (
    <section className="grafico">
      <h2 className="grafico__titulo">Evolução recente</h2>
      <div className="grafico__area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={serie} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="#1b3047" strokeDasharray="3 3" />
            <XAxis dataKey="data" tick={{ fill: '#8fa3b8', fontSize: 11 }} minTickGap={24} />
            <YAxis tick={{ fill: '#8fa3b8', fontSize: 11 }} domain={['auto', 'auto']} width={48} />
            <Tooltip
              contentStyle={{ background: '#0d1b2a', border: '1px solid #1b3047', color: '#e0e1dd' }}
              labelStyle={{ color: '#8fa3b8' }}
              formatter={(v) => [v.toLocaleString('pt-BR', { maximumFractionDigits: 4 }), indicador.unidade]}
            />
            <Line type="monotone" dataKey="valor" stroke="#e0a458" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
