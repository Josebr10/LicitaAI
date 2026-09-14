# LicitaAI — Gestão de Licitações Públicas

Plataforma moderna para gerenciamento de licitações públicas. Permite visualizar, pesquisar, filtrar e gerenciar processos licitatórios com segurança e praticidade.

## Tecnologias

- **Next.js** (App Router) — framework full-stack
- **React** + **TypeScript** — interface de usuário
- **Tailwind CSS** — estilização
- **PostgreSQL** — banco de dados relacional
- **Prisma** — ORM
- **NextAuth.js (Auth.js v5)** — autenticação
- **bcryptjs** — hash de senhas
- **lucide-react** — ícones

## Funcionalidades

- **Páginas públicas**: página inicial, sobre nós, listagem de licitações, detalhes
- **Autenticação real**: cadastro, login, logout, sessão segura (cookie httpOnly)
- **Dashboard**: KPIs calculados no banco, distribuição por status e modalidade, licitações recentes
- **CRUD completo**: criar, visualizar, editar e excluir licitações
- **Filtros combinados**: pesquisa por texto, número, status, modalidade, órgão, faixa de valor e período
- **Paginação server-side**: consulta paginada no banco
- **Modo claro/escuro**: com persistência e sem flash visual
- **Responsividade**: desktop, tablet e celular
- **Segurança**: hash de senha, validações server-side, rotas protegidas, queries seguras via ORM

## Pré-requisitos

- Node.js ≥ 20
- PostgreSQL 14+ (ou Docker)

## Instalação local

### 1. Clone o repositório

```bash
git clone <url-do-repositório>
cd licitaai
```

### 2. Suba o PostgreSQL com Docker

```bash
docker compose up -d
```

Isso cria um banco `licitaai` com usuário `licitaai` e senha `licitaai123` na porta `5432`.

### 3. Configure o `.env`

Crie o arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://licitaai:licitaai123@localhost:5432/licitaai"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="sua-chave-secreta-aqui"
AUTH_URL="http://localhost:3000"
```

> **Dica**: gere uma chave secreta com `openssl rand -base64 32`.

### 4. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 5. Configure o banco de dados

```bash
npx prisma db push
```

### 6. Popule com dados de demonstração

```bash
npx prisma db seed
```

### 7. Execute a aplicação

```bash
npm run dev
# ou
yarn dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Credenciais de demonstração

| Campo | Valor |
|-------|-------|
| E-mail | `demo@licitaai.com.br` |
| Senha | `Demo@123` |

> ⚠️ Os dados são fictícios, criados para fins de demonstração.

## Estrutura do projeto

```
app/
├── page.tsx                  # Página inicial
├── sobre/                    # Página Sobre nós
├── licitacoes/               # Listagem + detalhes (público)
├── login/                    # Login
├── cadastro/                 # Cadastro
├── dashboard/                # Dashboard (autenticado)
│   ├── licitacoes/           # CRUD de licitações
│   └── configuracoes/        # Dados da conta
├── actions/                  # Server actions
└── api/                      # Rotas de API (auth, signup)
components/                   # Componentes reutilizáveis
lib/                          # Utilitários, constantes, formatação
prisma/                       # Schema do Prisma
scripts/                      # Script de seed
```

## Justificativa arquitetural

Para o escopo deste desafio, foi adotada uma arquitetura full-stack utilizando Next.js e PostgreSQL. A lógica server-side e o acesso ao banco ficam protegidos no ambiente do servidor, evitando a necessidade de manter um backend separado. Essa abordagem reduz a complexidade operacional e permite concentrar esforços nas funcionalidades essenciais, na experiência do usuário, segurança e qualidade da aplicação. A arquitetura pode futuramente evoluir para uma API separada caso novas integrações ou requisitos justifiquem essa necessidade.

## Licença

Projeto desenvolvido para o desafio técnico da RR Tecnol.
