# DESAFIO 02 — Painel Interativo com API Pública usando React + Vite

Painel web que consulta **juros de crédito** e **câmbio** direto das APIs
públicas do **Banco Central do Brasil** e os apresenta de forma clara,
interativa e responsiva.

🔗 **Aplicação publicada:** https://painel-credito.vercel.app
📦 **Repositório:** https://github.com/Caredu7Lakes/painel-credito



![React](https://img.shields.io/badge/React-18-61dafb)
![Vite](https://img.shields.io/badge/Vite-5-646cff)
![Licença](https://img.shields.io/badge/dados-p%C3%BAblicos-3ddc97)

---

## 🎯 Problemática

Os dados de juros e câmbio do Banco Central estão disponíveis em API pública,
mas em **formato bruto** — séries de JSON com pares data/valor. Ter acesso ao
dado não é o mesmo que compreendê-lo: uma pessoa comum não abre um endpoint
JSON para decidir se o momento é bom para financiar um carro ou um imóvel.

**Como transformar essas séries numéricas em uma consulta que qualquer pessoa
entende em segundos?**

## 💡 Objetivo

Entregar um painel onde o usuário escolhe um indicador e vê, de imediato:
- o **valor mais recente** em destaque, com a variação frente ao período anterior;
- a **evolução histórica** num gráfico;
- e pode **comparar** dois indicadores lado a lado.

Tudo em tempo real, direto da fonte oficial, sem planilha nem código.

## 👤 Usuário

Cidadão que pesquisa crédito (financiamento de imóvel ou veículo) e quer
entender, de forma neutra, como estão os juros e o câmbio agora e nos últimos
meses — usando dados oficiais, sem intermediários.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| **React 18** | Componentização e estado da interface |
| **Vite 5** | Bundler e servidor de desenvolvimento |
| **Recharts** | Gráfico de série temporal responsivo |
| **CSS puro** (variáveis + media queries) | Design e responsividade |
| **Fetch API** | Consumo da API pública |

## 🔌 API utilizada

**Banco Central do Brasil — Sistema Gerenciador de Séries Temporais (SGS)**

```
https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados
```

Dados abertos, **sem chave de acesso** e com **CORS liberado** (consumível
direto do navegador). A consulta é feita por intervalo de datas
(`dataInicial`/`dataFinal`). Séries usadas:

| Código | Indicador | Unidade |
|---|---|---|
| `20772` | Financiamento imobiliário — PF | % a.a. |
| `20749` | Aquisição de veículos — PF | % a.a. |
| `432` | Meta Selic | % a.a. |
| `1` | Dólar comercial (venda) | R$ |


## 🤖 Uso de Inteligência Artificial


## 🏁 Prompt utilizado :

Você é um desenvolvedor front-end, sua função é criar uma aplicação React + Vite + Vercel que consome uma API pública do Banco Central do Brasil, com componentes reutilizáveis e organizados, uma interface responsiva, deve possuir formas de interação com os dados, você deve organizar a aplicação em componentes que tenham responsabilidades claras : Header, Main e Footer.


## 🏆 Objetivo : Receber um framework para iniciar o desenvolvimento. Com esse esqueleto inicial efetuo as mudanças necessárias para atingir as fases do projeto de forma mais clara.


## ✨ Principais funcionalidades

- **🌎 Seleção de indicador** (interação): botões trocam a série e refazem a
  consulta à API.
- **📊 Comparação** (interação): sobrepõe um segundo indicador no gráfico, com
  **eixos Y independentes** quando as unidades diferem (juros % × dólar R$).
- **📈 Valor em destaque**: o dado mais recente, grande e legível, com a
  variação frente ao período anterior (▲ alta / ▼ queda).
- **🕒 Gráfico histórico**: evolução dos últimos períodos, responsivo.
- **⚠️ Tratamento de estados**: carregando, erro e série vazia têm mensagens
  próprias — a tela nunca quebra nem fica em branco.

## 🧩 Arquitetura de componentes

```
App                      → orquestra o estado (indicadores, dados, carregando, erro)
├── Header               → título + seletor de indicador (interação principal)
└── Main
    ├── Destaque         → valor atual + variação
    ├── Comparador       → escolhe o 2º indicador para comparação
    ├── GraficoSerie     → gráfico de linha (1 ou 2 séries, eixos duplos)
    ├── Estado           → carregando / erro
    └── Rodape           → fonte dos dados

services/bcb.js          → acesso à API SGS, isolado da interface
```

Cada componente tem **uma responsabilidade**. O acesso à API vive num serviço
separado da UI, então trocar a fonte de dados não afeta os componentes visuais.

## 📱 Responsividade

Layout adaptado a três faixas via CSS (`clamp()` no número-herói, flexbox nos
botões e `ResponsiveContainer` no gráfico):
- **Celular** (≤ 640px): botões empilham 2 por linha, gráfico reduzido;
- **Tablet**: layout intermediário fluido;
- **Desktop**: largura máxima centralizada.

## ▶️ Como executar

Pré-requisito: **Node.js 18+**.

```bash
npm install       # instala as dependências
npm run dev       # desenvolvimento — http://localhost:5173
npm run build     # build de produção (pasta dist/)
npm run preview   # pré-visualiza o build
```

A API do BCB tem CORS liberado, então **não há proxy nem back-end** — o app
chama a API diretamente e funciona igual em desenvolvimento e em produção.

## 🚀 Deploy

Projeto pronto para **Netlify** ou **Vercel** (detectam Vite automaticamente):
- Build command: `npm run build`
- Publish directory: `dist`

## 🧠 Decisões de projeto

- **SGS em vez da API Olinda:** o SGS entrega as séries em JSON simples, sem
  chave e com CORS liberado — consumível direto do navegador, ideal para o
  escopo do desafio.
- **Consulta por datas em vez de `/ultimos/N`:** o endpoint `/ultimos/N` tem
  limite de registros e falha (HTTP 400) para N alto; a consulta por intervalo
  de datas é robusta para qualquer série.
- **Comparação com eixos Y independentes:** comparar juros (%) com dólar (R$)
  no mesmo eixo achataria uma das curvas; dois eixos preservam a leitura de
  ambas.
- **Serviço isolado (`services/bcb.js`):** separa o acesso à API da interface,
  facilitando manutenção e teste.
- **Estados de carregando/erro/vazio:** são o que realmente acontece ao
  consumir uma API externa; tratá-los é parte da experiência, não um extra.

## 📄 Fonte dos dados

Banco Central do Brasil — dados públicos, sem fins comerciais.