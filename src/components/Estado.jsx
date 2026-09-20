// Estados da aplicação: carregando e erro. Mensagens diretas, na voz da
// interface (o desafio pede tratar o que acontece durante o uso).
export default function Estado({ tipo, mensagem }) {
  if (tipo === 'carregando') {
    return (
      <div className="estado">
        <div className="estado__spinner" aria-hidden="true"></div>
        <p className="estado__texto">Buscando dados no Banco Central…</p>
      </div>
    )
  }
  return (
    <div className="estado estado--erro">
      <p className="estado__texto">{mensagem || 'Algo deu errado ao carregar os dados.'}</p>
      <p className="estado__dica">Tente escolher outro indicador ou recarregar a página.</p>
    </div>
  )
}
