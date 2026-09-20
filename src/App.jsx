import { useState, useEffect } from 'react'
import { INDICADORES, buscarSerie } from './services/bcb.js'
import Header from './components/Header.jsx'
import Comparador from './components/Comparador.jsx'
import Destaque from './components/Destaque.jsx'
import GraficoSerie from './components/GraficoSerie.jsx'
import Estado from './components/Estado.jsx'
import Rodape from './components/Rodape.jsx'

// Componente raiz: orquestra o estado (indicador principal, indicador de
// comparação, dados de cada um, carregamento, erro) e distribui para a UI.
export default function App() {
  const [indicador, setIndicador] = useState(INDICADORES[1]) // veículos por padrão
  const [comparar, setComparar] = useState(null)             // 2º indicador (opcional)
  const [serie, setSerie] = useState([])
  const [serieComp, setSerieComp] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // Busca a série principal quando o indicador muda.
  useEffect(() => {
    let ativo = true
    setCarregando(true)
    setErro(null)
    buscarSerie(indicador.id)
      .then((dados) => { if (ativo) setSerie(dados) })
      .catch((e) => { if (ativo) setErro(e.message) })
      .finally(() => { if (ativo) setCarregando(false) })
    return () => { ativo = false }
  }, [indicador])

  // Busca a série de comparação quando o 2º indicador muda (ou limpa se nulo).
  useEffect(() => {
    if (!comparar) { setSerieComp([]); return }
    let ativo = true
    buscarSerie(comparar.id)
      .then((dados) => { if (ativo) setSerieComp(dados) })
      .catch(() => { if (ativo) setSerieComp([]) })
    return () => { ativo = false }
  }, [comparar])

  const atual = serie.length ? serie[serie.length - 1] : null

  return (
    <div className="app">
      <Header
        indicadores={INDICADORES}
        selecionado={indicador}
        aoSelecionar={setIndicador}
      />
      <main className="main">
        {carregando && <Estado tipo="carregando" />}
        {erro && <Estado tipo="erro" mensagem={erro} />}
        {!carregando && !erro && atual && (
          <>
            <Destaque indicador={indicador} ponto={atual} serie={serie} />
            <Comparador
              indicadores={INDICADORES}
              principal={indicador}
              comparar={comparar}
              aoComparar={setComparar}
            />
            <GraficoSerie
              serie={serie}
              indicador={indicador}
              serieComp={serieComp}
              indicadorComp={comparar}
            />
          </>
        )}
      </main>
      <Rodape />
    </div>
  )
}