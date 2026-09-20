// Cabeçalho: título do painel + seletor de indicador (a interação principal).
// O seletor é o coração da interatividade: trocar o indicador refaz a consulta.
export default function Header({ indicadores, selecionado, aoSelecionar }) {
  return (
    <header className="header">
      <div className="header__marca">
        <h1 className="header__titulo">Painel de Crédito</h1>
        <p className="header__sub">Juros e câmbio, direto do Banco Central</p>
      </div>
      <nav className="seletor" aria-label="Escolha o indicador">
        {indicadores.map((ind) => (
          <button
            key={ind.id}
            className={'seletor__btn' + (ind.id === selecionado.id ? ' seletor__btn--ativo' : '')}
            onClick={() => aoSelecionar(ind)}
            aria-pressed={ind.id === selecionado.id}
          >
            {ind.nome}
          </button>
        ))}
      </nav>
    </header>
  )
}
