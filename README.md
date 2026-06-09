# Complexo Escolar Jamir - Portal Escolar e Web

Este é o projeto completo do website do **Complexo Escolar Jamir**, incluindo o **Portal do Estudante** e o **Painel Administrativo para Direção**.

O código foi totalmente projetado e otimizado para rodar de forma **100% independente e sem custos/configurações de serviços na nuvem**. Ele funciona de maneira autônoma (offline-first) utilizando simuladores de banco de dados locais e retenção segura em `localStorage`.

---

## 🚀 Como Rodar o Projeto no VS Code (Passo a Passo)

Siga estes passos simples para rodar o aplicativo de forma ultra-rápida no seu computador:

### 1. Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior recomendada) - [Baixar Node.js](https://nodejs.org/)
- **Visual Studio Code** (VS Code) - [Baixar VS Code](https://code.visualstudio.com/)

---

### 2. Preparar o Ambiente no VS Code
1. Baixe o código fonte deste projeto (ficheiro ZIP ou clone o repositório).
2. Extraia o ficheiro e abra a pasta do projeto diretamente no VS Code (`Ficheiro` -> `Abrir Pasta...`).
3. Abra o terminal integrado do VS Code utilizando o atalho:
   - No Windows/Linux: `Ctrl + Shift + ~` ou `Ctrl + '`
   - No macOS: `Cmd + Shift + ~` ou `Cmd + '`

---

### 3. Instalar as Dependências Locais
No terminal integrado do VS Code, execute o seguinte comando para baixar e preparar as dependências necessárias para estilização, ícones e navegação (como React, Tailwind CSS, Lucide e Framer Motion):

```bash
npm install
```

---

### 4. Iniciar o Servidor de Desenvolvimento
Após o término da instalação das dependências, inicie o servidor local digitando:

```bash
npm run dev
```

O terminal exibirá um link local rápido, como por exemplo:
👉 `http://localhost:3000` ou `http://localhost:5173`

Pressione `Ctrl` (ou `Cmd` no Mac) e clique no link exibido no terminal para abrir a aplicação no seu navegador padrão.

---

## 🔑 Credenciais de Acesso (Prontas para Testes Locais)

Não precisa criar contas ou interagir com um painel de banco de dados para testes. Utilize estas credenciais instantâneas pré-configuradas:

### 👨‍🎓 Portal do Aluno (Dashboard Estudantil)
- **E-mail:** `aluno@jamir.com`
- **Senha:** `aluno1`
- **Funcionalidades:** Consulta de Boletim de Notas, Horário das Aulas Semanal, Histórico Financeiro de Propinas, e Quadro de Avisos Importantes da Direção.

### 💼 Painel Administrativo (Gestão Geral)
- **E-mail:** `admin@jamir.com` (ou qualquer outro com o padrão admin)
- **Senha:** `admin`
- **Funcionalidades:** Gestão e alteração de Cursos, listagem corporativa e visual de estatísticas do Colégio.

---

## 🛠️ Tecnologias Utilizadas

A aplicação utiliza uma arquitetura moderna e de altíssimo desempenho:
- **React 19 + TypeScript**: Código com tipagem estática segura, evitando bugs e erros comuns de digitação.
- **Vite**: O empacotador web mais rápido do ecossistema front-end.
- **Tailwind CSS v4**: Estilização expressiva, elegante e com excelente responsividade em ecrãs de telemóveis, tablets e computadores.
- **Framer Motion**: Micro-interações elegantes e animações de fade-in suaves nos cartões de notícias e navegações de painel.
- **Lucide React**: Biblioteca rica de vetores consistentes para toda a interface.
