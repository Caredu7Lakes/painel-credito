// Seletor de comparação: escolhe um SEGUNDO indicador para sobrepor no gráfico,
// ou "nenhum" para ver só o principal. Exclui o indicador já selecionado como
// principal (não faz sentido comparar algo consigo mesmo).
export default function Comparador({ indicadores, principal, comparar, aoComparar }) {
  const opcoes = indicadores.filter((i) => i.id !== principal.id)

  return (
    <div className="comparador">
      <span className="comparador__rotulo">Comparar com:</span>
      <div className="comparador__botoes">
        <button
          className={'comparador__btn' + (comparar === null ? ' comparador__btn--ativo' : '')}
          onClick={() => aoComparar(null)}
        >
          Nenhum
        </button>
        {opcoes.map((ind) => (
          <button
            key={ind.id}
            className={'comparador__btn' + (comparar?.id === ind.id ? ' comparador__btn--ativo' : '')}
            onClick={() => aoComparar(ind)}
          >
            {ind.nome}
          </button>
        ))}
      </div>
    </div>
  )
}