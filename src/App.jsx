import { useState, useEffect } from 'react'
import { INDICADORES, buscarSerie } from './services/bcb.js'
import Header from './components/Header.jsx'
import Destaque from './components/Destaque.jsx'
import GraficoSerie from './components/GraficoSerie.jsx'
import Estado from './components/Estado.jsx'
import Rodape from './components/Rodape.jsx'

// Componente raiz: orquestra o estado (indicador escolhido, dados, carregamento,
// erro) e passa tudo para os componentes de apresentação.
export default function App() {
  const [indicador, setIndicador] = useState(INDICADORES[1]) // veículos por padrão
  const [serie, setSerie] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // Rebusca a série sempre que o indicador escolhido muda.
  useEffect(() => {
    let ativo = true
    setCarregando(true)
    setErro(null)
    buscarSerie(indicador.id)
      .then((dados) => { if (ativo) setSerie(dados) })
      .catch((e) => { if (ativo) setErro(e.message) })
      .finally(() => { if (ativo) setCarregando(false) })
    return () => { ativo = false }   // evita atualizar estado após desmontar
  }, [indicador])

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
            <GraficoSerie serie={serie} indicador={indicador} />
          </>
        )}
      </main>
      <Rodape />
    </div>
  )
}
