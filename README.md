# DESAFIO 02 — Painel Interativo com API Pública usando React + Vite

Painel interativo que consulta juros de crédito e câmbio direto das APIs
públicas do Banco Central do Brasil, em React + Vite.

🔗 **Aplicação publicada:** _(adicionar link da Vercel após o deploy)_

## Problemática

Os dados de juros e câmbio do Banco Central estão disponíveis em API pública,
mas em formato bruto (JSON de séries numéricas), difícil de consultar e
compreender por uma pessoa comum. Ter acesso ao dado não é o mesmo que
entendê-lo.

## Objetivo

Transformar essas séries em uma experiência de consulta clara: escolher um
indicador e ver, de imediato, o valor mais recente, sua variação e a evolução
histórica — sem precisar ler JSON nem montar planilha.

## Tecnologias utilizadas

- **React 18 + Vite** — interface e build
- **Recharts** — gráfico de série temporal
- **CSS puro** — design responsivo (mobile, tablet, desktop)
- **Fetch API** — consumo da API pública

## API utilizada

**Banco Central do Brasil — Sistema Gerenciador de Séries Temporais (SGS)**
`https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados`

Dados abertos, sem chave de acesso. Séries consultadas:
- `20772` — Financiamento imobiliário PF (% a.a.)
- `20749` — Aquisição de veículos PF (% a.a.)
- `432` — Meta Selic (% a.a.)
- `1` — Dólar comercial venda (R$)

## Principais funcionalidades

- **Seleção de indicador** (interação): botões trocam a série consultada e
  refazem a busca na API.
- **Valor em destaque**: o dado mais recente, grande e legível, com a variação
  frente ao período anterior.
- **Gráfico histórico**: evolução dos últimos períodos, responsivo.
- **Tratamento de estados**: carregando, erro e série vazia têm mensagens
  próprias, na voz da interface.

## Arquitetura de componentes

```
App                      (estado: indicador, dados, carregando, erro)
├── Header               (título + seletor de indicador)
├── Main
│   ├── Destaque         (valor atual + variação)
│   ├── GraficoSerie     (linha histórica)
│   └── Estado           (carregando / erro)
└── Rodape               (fonte dos dados)

services/bcb.js          (consumo da API SGS, isolado da UI)
```

## Como executar

```bash
npm install
npm run dev      # ambiente de desenvolvimento (http://localhost:5173)
npm run build    # build de produção
```

> Em desenvolvimento, um proxy do Vite (`/sgs`) contorna o CORS. Em produção,
> a API SGS é chamada diretamente.

## Decisões de projeto

- **Por que o SGS e não a API Olinda?** O SGS entrega as séries em JSON simples,
  sem chave, e é consumível direto do navegador — adequado ao escopo do desafio.
- **Por que seleção de indicador como interação?** É a ação que dá sentido ao
  painel: comparar juros e câmbio é o motivo de alguém abrir a aplicação.
- **Por que separar `services/bcb.js`?** Isola o acesso à API da interface —
  se a fonte mudar, a UI não muda.
- **Por que tratar carregando/erro/vazio?** São o que realmente acontece ao
  consumir uma API externa; ignorá-los deixaria a tela quebrada ou em branco.
