# 🔷 LicitaAI

> **Plataforma full-stack para explorar, acompanhar e gerenciar licitações públicas em um só lugar.**

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-Full--Stack-black?style=for-the-badge\&logo=next.js)
![React](https://img.shields.io/badge/React-UI-61DAFB?style=for-the-badge\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Typed-3178C6?style=for-the-badge\&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge\&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge\&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge\&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

---

## 🎯 Sobre o projeto

O **LicitaAI** é uma plataforma web desenvolvida para **encontrar, consultar, acompanhar e gerenciar processos licitatórios**.

A aplicação centraliza informações importantes — como **edital, órgão, objeto, modalidade, valores, prazos e status** — em uma experiência única, organizada, responsiva e orientada ao processo de uma licitação.

O projeto foi desenvolvido como parte do **desafio técnico da RR Tecnol**, priorizando uma aplicação real, funcional e com uma arquitetura simples e segura.

### ✨ Principais objetivos

* ⚙️ Funcionamento real conectado ao PostgreSQL
* 🔑 Autenticação baseada em e-mail e senha
* 🛡️ Autorização validada no servidor
* 👤 Isolamento correto das ações por proprietário
* 🌐 Exploração pública das licitações
* 📝 CRUD completo para usuários autenticados
* 📊 Dashboard baseado em dados reais
* 🎨 Interface SaaS profissional e responsiva
* 🧩 Arquitetura simples, estável e fácil de manter

> [!NOTE]
> Apesar do nome **LicitaAI**, esta versão não implementa funcionalidades de inteligência artificial, análise automática de editais ou integração externa com o PNCP.

---

## 🧩 O problema

Informações relacionadas a licitações podem ficar distribuídas entre **editais, planilhas, documentos e diferentes fontes**, tornando mais difícil:

* encontrar oportunidades;
* consultar informações rapidamente;
* acompanhar prazos;
* organizar processos;
* visualizar uma visão geral das licitações.

O LicitaAI propõe uma experiência centralizada para que empresas, gestores e profissionais possam:

* 🧭 Explorar licitações disponíveis
* ⚡ Consultar informações relevantes rapidamente
* 📈 Acompanhar o andamento dos processos
* 🗂️ Cadastrar e organizar suas próprias licitações
* 📊 Visualizar indicadores compatíveis com seu nível de acesso

---

# ✨ Funcionalidades

## 🌐 Exploração pública

Visitantes não autenticados podem:

* acessar a página inicial;
* conhecer a plataforma;
* explorar todas as licitações disponíveis;
* pesquisar por texto;
* aplicar filtros combinados;
* utilizar paginação;
* abrir os detalhes de qualquer licitação;
* visualizar status, valores, órgão, modalidade, edital e prazos.

### 🌍 Visualização global

As licitações possuem **visualização global**.

Isso significa que usuários podem consultar registros criados por outras pessoas, enquanto as ações de gerenciamento continuam protegidas pelas regras de propriedade e autorização.

---

## 🔑 Autenticação

A aplicação utiliza autenticação real baseada em:

| Recurso              | Implementação                            |
| -------------------- | ---------------------------------------- |
| 👤 Nome              | Cadastro do usuário                      |
| 📧 E-mail            | Único por conta                          |
| 🔐 Senha             | Armazenada exclusivamente em hash seguro |
| 🍪 Sessão            | Validada no servidor                     |
| 🚪 Logout            | Disponível                               |
| 🛡️ Rotas protegidas | Validação server-side                    |
| 💬 Erros             | Mensagens amigáveis                      |

> [!IMPORTANT]
> O sistema **não utiliza `localStorage` como mecanismo de segurança** e não depende apenas da ocultação de botões no frontend.

---

# 🗂️ Gestão de licitações

Usuários autenticados podem, respeitando as permissões aplicáveis:

* ➕ Criar licitações
* 👁️ Visualizar detalhes
* ✏️ Editar seus próprios registros
* 🗑️ Excluir seus próprios registros
* 🔄 Alterar status de registros próprios
* 📈 Acompanhar processos através de uma timeline visual

O administrador possui acesso global às operações de gerenciamento.

---

# 🔎 Pesquisa, filtros e paginação

A exploração das licitações suporta filtros combinados por:

* 🔍 Pesquisa textual
* 🔢 Número
* 🔵 Status
* 📋 Modalidade
* 🏛️ Órgão
* 💰 Valor mínimo
* 💰 Valor máximo
* 📅 Data inicial
* 📅 Data final

### ⚡ Server-side

As consultas são realizadas no servidor e a paginação é executada no banco de dados.

A aplicação **não precisa carregar todos os registros no navegador** para executar filtros ou pesquisas.

---

# 📋 Detalhes e acompanhamento

Cada licitação possui uma página de detalhes contendo:

* número;
* título;
* edital;
* órgão;
* objeto;
* modalidade;
* status;
* valor estimado;
* verba liberada;
* data de publicação;
* data de abertura/encerramento;
* observações;
* responsável pelo cadastro, quando aplicável;
* ações compatíveis com o usuário atual.

### 🔄 Fluxo da licitação

```text
Preparação
    ↓
Edital publicado
    ↓
Propostas
    ↓
Julgamento
    ↓
Habilitação
    ↓
Recursos
    ↓
Homologação
    ↓
Encerramento
```

---

# 📊 Dashboards por perfil

O dashboard é calculado de acordo com o perfil do usuário.

| Perfil      | Escopo                                           |
| ----------- | ------------------------------------------------ |
| 👤 `USER`   | Indicadores e atividades das próprias licitações |
| 🛡️ `ADMIN` | Visão geral de todas as licitações e usuários    |

Os indicadores são derivados dos dados persistidos no banco.

Isso inclui:

* totais;
* valores;
* distribuições;
* licitações recentes;
* atividades.

> [!NOTE]
> Os indicadores não são valores inventados no frontend. Eles são calculados a partir dos dados reais armazenados no PostgreSQL.

---

# 🌗 Interface e responsividade

A interface foi construída para proporcionar uma experiência SaaS moderna em diferentes dispositivos.

### 🎨 Recursos visuais

* ☀️ Modo claro
* 🌙 Modo escuro
* 💾 Persistência da preferência de tema
* 📱 Responsividade
* 🧭 Sidebar responsiva
* 📄 Tabelas adaptadas
* 📝 Formulários responsivos
* ⏳ Loading states
* 💀 Skeletons
* 📭 Estados vazios
* ❌ Estados de erro
* ✅ Feedback de sucesso

Compatível com:

```text
Desktop
   │
Notebook
   │
Tablet
   │
Smartphone
```

---

# 🔐 Modelo de permissões

O sistema possui dois papéis persistidos no banco:

```text
ADMIN
USER
```

> [!IMPORTANT]
> Existe somente **uma conta administradora inicial**. O cadastro público nunca cria administradores: novas contas recebem obrigatoriamente `role = USER`.

## 🛡️ Matriz de permissões

| Ação                           | 🛡️ ADMIN |   👤 USER  |
| ------------------------------ | :-------: | :--------: |
| Visualizar todas as licitações |     ✅     |      ✅     |
| Criar licitações               |     ✅     |      ✅     |
| Editar qualquer licitação      |     ✅     | ⛔ Próprias |
| Excluir qualquer licitação     |     ✅     | ⛔ Próprias |
| Alterar qualquer status        |     ✅     | ⛔ Próprias |
| Visualizar usuários            |     ✅     |      ⛔     |
| Indicadores gerais             |     ✅     | ⛔ Próprios |
| Alterar papéis                 |     —     |      ⛔     |

---

# 🛡️ Administrador

O administrador pode:

* visualizar todas as licitações;
* criar licitações;
* editar qualquer licitação;
* excluir qualquer licitação;
* alterar o status de qualquer licitação;
* visualizar indicadores gerais;
* visualizar usuários cadastrados;
* acessar as áreas administrativas disponíveis.

---

# 👤 Usuário comum

O usuário comum pode:

* explorar todas as licitações;
* criar suas próprias licitações;
* visualizar suas próprias licitações;
* visualizar licitações de outros usuários;
* editar apenas suas próprias licitações;
* excluir apenas suas próprias licitações;
* alterar status apenas de suas próprias licitações;
* visualizar um dashboard exclusivamente com seus dados.

### 🚫 O que um usuário não pode fazer

* ❌ Editar registros de outro proprietário
* ❌ Excluir registros de outro proprietário
* ❌ Alterar status de registros de outro proprietário
* ❌ Alterar o próprio papel
* ❌ Alterar o papel de outro usuário
* ❌ Acessar indicadores administrativos
* ❌ Contornar permissões por URL
* ❌ Contornar permissões por parâmetros
* ❌ Contornar permissões através de chamadas manuais

---

# 🔗 Ownership

Cada licitação possui um proprietário através da relação:

```text
Licitacao.createdById → Usuario.id
```

Ao criar uma licitação, o `createdById` é obtido **exclusivamente da sessão autenticada no servidor**.

O formulário não pode escolher ou sobrescrever esse valor.

Antes de qualquer operação protegida, o servidor valida:

```text
1. Existe uma sessão válida?
2. Quem é o usuário autenticado?
3. Qual é o papel desse usuário?
4. Quem é o proprietário da licitação?
5. A ação solicitada é permitida?
6. A transição de status é válida?
```

Essas validações são aplicadas nas **Server Actions** e demais handlers server-side antes da operação no banco.

---

# 🔄 Status e modalidades

## Status

| Status          | Representação |
| --------------- | ------------- |
| ⚪ Rascunho      | `DRAFT`       |
| 🔵 Publicada    | `PUBLISHED`   |
| 🟡 Em análise   | `IN_ANALYSIS` |
| 🟣 Em andamento | `IN_PROGRESS` |
| 🟢 Homologada   | `APPROVED`    |
| ⚫ Encerrada     | `CLOSED`      |
| 🔴 Cancelada    | `CANCELLED`   |

Os status utilizam badges, ícones e descrições visuais, não dependendo exclusivamente de cores.

As transições respeitam o fluxo do processo e evitam alterações incoerentes.

## Modalidades

* Pregão Eletrônico
* Concorrência
* Concurso
* Leilão
* Diálogo Competitivo
* Dispensa
* Inexigibilidade

---

# 🏗️ Arquitetura

O projeto utiliza uma arquitetura **full-stack concentrada no Next.js**.

```text
┌────────────────────────────────────────────┐
│                  Next.js                   │
│                                            │
│  Interface                                │
│  Server Components                        │
│  Server Actions / Route Handlers           │
│  Autenticação                              │
│  Autorização                               │
│  Regras de negócio                         │
│  Acesso ao banco                           │
│                                            │
└──────────────────────┬─────────────────────┘
                       │
                    Prisma
                       │
                       ▼
┌────────────────────────────────────────────┐
│                PostgreSQL                  │
└────────────────────────────────────────────┘
```

## 📌 Decisão arquitetural

Para o escopo deste desafio, foi adotada uma arquitetura full-stack utilizando:

* **Next.js**
* **React**
* **TypeScript**
* **Prisma**
* **PostgreSQL**

A lógica server-side e o acesso ao banco permanecem protegidos no ambiente do servidor, evitando a necessidade de manter um backend separado.

### Benefícios

* reduz a complexidade operacional;
* evita duplicação de regras;
* mantém credenciais fora do navegador;
* facilita autenticação e autorização;
* concentra esforços nas funcionalidades essenciais;
* facilita manutenção;
* mantém o projeto enxuto.

A arquitetura pode futuramente evoluir para uma API separada caso novas integrações, múltiplos clientes ou requisitos de escala justifiquem essa necessidade.

---

# 🚫 O que não faz parte da arquitetura

Este projeto **não utiliza**:

* FastAPI
* Flask
* Backend separado
* API REST independente
* Microserviços
* Redis
* Celery
* Kubernetes
* Integrações externas obrigatórias

---

# 🧰 Stack tecnológica

| Tecnologia                   | Utilização                                      |
| ---------------------------- | ----------------------------------------------- |
| ⚡ **Next.js**                | Aplicação full-stack e renderização server-side |
| ⚛️ **React**                 | Construção da interface                         |
| 🟦 **TypeScript**            | Tipagem estática                                |
| 🎨 **Tailwind CSS**          | Estilização e responsividade                    |
| 🐘 **PostgreSQL**            | Persistência relacional                         |
| 🔧 **Prisma**                | ORM e migrations                                |
| 🔒 **Hash seguro**           | Proteção de senhas                              |
| 🖼️ **Biblioteca de ícones** | Linguagem visual                                |
| 🐳 **Docker Compose**        | Inicialização simplificada do banco             |

---

# 📁 Estrutura do projeto

A estrutura segue a organização do Next.js:

```text
app/
├── (public)/
│   ├── page.tsx
│   ├── sobre/
│   └── licitacoes/
│       ├── page.tsx
│       └── [id]/
│
├── (auth)/
│   ├── login/
│   └── cadastro/
│
├── dashboard/
│   ├── page.tsx
│   ├── licitacoes/
│   ├── usuarios/
│   └── configuracoes/
│
├── actions/
├── components/
│
├── lib/
│   ├── auth/
│   ├── permissions/
│   ├── validations/
│   └── prisma.ts
│
└── layout.tsx

prisma/
├── schema.prisma
├── migrations/
└── seed.ts

public/
└── assets/
```

> [!IMPORTANT]
> As regras de autorização devem permanecer próximas da camada server-side, evitando que a segurança dependa de componentes visuais.

---

# 🗃️ Modelo de dados

## 👤 Usuario

```text
Usuario
├── id
├── nome
├── email UNIQUE
├── senhaHash
├── role: ADMIN | USER
├── criadoEm
└── atualizadoEm
```

## 📋 Licitacao

```text
Licitacao
├── id
├── numero
├── nome
├── edital
├── status
├── verbaLiberada
├── orgao
├── objeto
├── modalidade
├── valorEstimado
├── dataPublicacao
├── dataAbertura
├── observacoes
├── createdById → Usuario.id
├── criadoEm
└── atualizadoEm
```

> [!NOTE]
> Valores monetários utilizam tipos adequados para precisão, como `Decimal`, evitando o uso de `float` para representar dinheiro.

---

# 🛡️ Segurança

A aplicação adota diversas medidas de segurança:

* 🔒 Senhas armazenadas somente como hash
* 🍪 Sessão validada no servidor
* 🔐 Cookies seguros/httpOnly quando aplicável
* 🗝️ Credenciais armazenadas em variáveis de ambiente
* 🚫 PostgreSQL inacessível diretamente pelo navegador
* ✅ Validação de entrada no servidor
* 🛂 Autorização server-side
* 👤 Ownership validado antes de alterações
* 🧱 Queries executadas pelo ORM
* 📝 Cadastro público limitado ao papel `USER`
* 🔐 Proteção de rotas administrativas
* 💬 Mensagens amigáveis sem exposição de stack trace
* 🚷 Nenhuma confiança em `createdById`, `role` ou identidade enviados pelo cliente

---

# 🧪 Dados demonstrativos

O projeto utiliza um **seed com licitações fictícias** para facilitar a avaliação visual e funcional.

Os dados demonstrativos:

* ✅ pertencem à conta administrativa inicial;
* ✅ não são duplicados para novos usuários;
* ✅ não aparecem como histórico de uma conta recém-criada;
* ✅ são identificados como fictícios;
* ✅ permitem demonstrar a visão geral da plataforma.

Uma nova conta começa completamente limpa:

```text
Total de licitações: 0
Publicadas:          0
Em análise:          0
Em andamento:        0
Homologadas:         0
Encerradas:          0
Canceladas:          0

Valor estimado:      R$ 0,00
Verba liberada:      R$ 0,00
```

---

# 🚀 Como executar

## 📋 Pré-requisitos

Antes de começar, tenha instalado:

* **Node.js** em versão compatível
* **npm**, **pnpm** ou **yarn**
* **PostgreSQL** local ou Docker
* **Git**

---

## 1️⃣ Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DA_PASTA>
```

---

## 2️⃣ Instale as dependências

```bash
npm install
```

---

## 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/licitaai"
AUTH_SECRET="substitua-por-um-segredo-forte"
```

> [!WARNING]
> **Nunca publique o arquivo `.env` no GitHub.**
>
> Utilize `.env.example` para documentar as variáveis necessárias sem expor credenciais reais.

---

## 4️⃣ Inicialize o banco

Com o PostgreSQL disponível:

```bash
npx prisma migrate dev
```

---

## 5️⃣ Popule os dados demonstrativos

```bash
npm run db:seed
```

> Caso o projeto utilize outro script, utilize o comando definido no `package.json`.

---

## 6️⃣ Execute em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível no endereço local configurado pelo Next.js.

---

# 🐳 Docker Compose

Caso o projeto possua `docker-compose.yml`, o banco pode ser iniciado com:

```bash
docker compose up -d
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

---

# 🔑 Credenciais de demonstração

| Perfil            | E-mail                | Senha                |
| ----------------- | --------------------- | -------------------- |
| 🛡️ Administrador | `<E-MAIL_ADMIN_DEMO>` | `<SENHA_ADMIN_DEMO>` |

> [!WARNING]
> Não documente senhas reais de produção. As credenciais acima devem ser exclusivas do ambiente demonstrativo.

---

# 🧾 Scripts principais

| Comando           | Descrição                                        |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Inicia o ambiente de desenvolvimento             |
| `npm run build`   | Gera o build de produção                         |
| `npm run start`   | Inicia a aplicação em produção                   |
| `npm run lint`    | Executa o lint                                   |
| `npm run test`    | Executa os testes automatizados, se configurados |
| `npm run db:seed` | Executa o seed demonstrativo                     |

---

# ✅ Roteiro de validação

Antes da entrega, os principais fluxos devem ser validados.

### 🌐 Experiência pública

* [ ] Página inicial
* [ ] Seção Sobre
* [ ] Exploração global de licitações
* [ ] Pesquisa
* [ ] Filtros combinados
* [ ] Paginação
* [ ] Detalhes públicos
* [ ] Tentativa de ação protegida sem login

### 🔑 Autenticação

* [ ] Cadastro recebe `USER`
* [ ] Nova conta inicia sem licitações
* [ ] Nova conta inicia sem histórico falso
* [ ] Login válido
* [ ] Login inválido sem revelar se o e-mail existe
* [ ] Logout
* [ ] Dashboard bloqueado sem autenticação

### 👤 Usuário

* [ ] Criar licitação própria
* [ ] Editar licitação própria
* [ ] Excluir licitação própria
* [ ] Alterar status próprio
* [ ] Visualizar licitações de outros usuários
* [ ] Bloqueio server-side de registros de terceiros
* [ ] Dashboard com dados exclusivamente próprios

### 🛡️ Administrador

* [ ] Existência de uma única conta administrativa
* [ ] Visualização global
* [ ] Edição de qualquer licitação
* [ ] Exclusão de qualquer licitação
* [ ] Alteração de status
* [ ] Indicadores gerais
* [ ] Áreas administrativas autorizadas
* [ ] Nenhum caminho público para promoção a administrador

### 🎨 Interface

* [ ] Modo claro
* [ ] Modo escuro
* [ ] Desktop
* [ ] Tablet
* [ ] Celular
* [ ] Loading
* [ ] Skeletons
* [ ] Estados vazios
* [ ] Mensagens de erro
* [ ] Feedback após mutações
* [ ] Ausência de stack traces
* [ ] Ausência de erros no console

### 🗄️ Banco

* [ ] Persistência real no PostgreSQL
* [ ] Migrations funcionando
* [ ] Seed funcionando
* [ ] Ownership funcionando
* [ ] Permissões validadas no servidor

---

# 💡 Decisões de produto

## 🌍 Visualização global + gerenciamento por ownership

O LicitaAI separa duas necessidades:

```text
DESCOBERTA
    ↓
Todas as licitações podem ser exploradas.

GESTÃO
    ↓
Alterações dependem do proprietário
ou do papel administrativo.
```

Essa decisão permite uma plataforma útil para consulta sem abrir brechas de autorização.

---

## 📊 Dashboard baseado em dados reais

Os indicadores são derivados do banco de dados e respeitam o contexto do usuário.

Um usuário comum não recebe dados globais apenas porque existem registros demonstrativos na plataforma.

---

## 🧭 Interface orientada ao processo

A experiência utiliza conceitos como:

```text
Edital
  ↓
Propostas
  ↓
Julgamento
  ↓
Habilitação
  ↓
Recursos
  ↓
Homologação
  ↓
Encerramento
```

O objetivo é tornar o produto compreensível sem simular uma implementação jurídica completa.

---

## 🎯 Escopo controlado

O projeto prioriza uma base sólida em vez de uma grande quantidade de integrações.

O objetivo é entregar uma aplicação:

* pequena;
* consistente;
* segura;
* apresentável;
* fácil de executar;
* fácil de manter.

---

# 🚧 Limitações atuais

Esta versão **não implementa**:

* integração com PNCP ou outras APIs externas;
* análise automática de editais;
* OCR;
* inteligência artificial para interpretação jurídica;
* notificações multicanal;
* gestão avançada de documentos;
* fluxo jurídico completo;
* múltiplos níveis de permissão além de `ADMIN` e `USER`;
* aplicativo mobile nativo;
* integrações com WhatsApp;
* e-mail transacional;
* sistema complexo de auditoria.

> [!NOTE]
> Essas limitações são intencionais e fazem parte do controle de escopo do desafio.

---

# 🔮 Possíveis evoluções

## 🌐 Integração com PNCP

* integração com o PNCP;
* importação por API;
* sincronização periódica;
* tratamento de duplicidades;
* identificação da origem;
* registro da data de sincronização.

---

## 📄 Inteligência documental

* upload seguro de editais;
* OCR para documentos digitalizados;
* extração de prazos;
* extração de valores;
* extração de requisitos;
* extração de objetos;
* resumo assistido;
* busca semântica;
* identificação de riscos e pontos de atenção;
* revisão humana das informações.

---

## 🔔 Alertas e acompanhamento

* histórico completo de alterações;
* timeline baseada em eventos;
* alertas de prazos;
* lembretes de abertura;
* lembretes de recursos;
* lembretes de encerramento;
* notificações por e-mail;
* calendário de oportunidades.

---

## 📎 Gestão documental

* anexos vinculados à licitação;
* versionamento de arquivos;
* categorização de documentos;
* controle de acesso;
* visualização segura;
* download seguro;
* registro de quem adicionou ou alterou arquivos.

---

## 👥 Equipes e organizações

* equipes;
* organizações;
* convite de colaboradores;
* papéis adicionais;
* analistas;
* gestores;
* permissões por organização;
* permissões por projeto;
* comentários internos;
* tarefas;
* responsáveis;
* trilha de auditoria.

---

## 📈 Analytics

* taxa de participação;
* taxa de sucesso;
* comparativos por órgão;
* comparativos por modalidade;
* evolução de valores;
* relatórios CSV;
* relatórios PDF;
* dashboards configuráveis;
* análise de prazos;
* identificação de gargalos.

---

## 🔎 Busca avançada

* busca por campos;
* filtros salvos;
* favoritos;
* alertas por palavras-chave;
* recomendações baseadas em preferências;
* ordenação por relevância;
* ordenação por prazo;
* ordenação por valor.

---

## ⚙️ Escalabilidade e infraestrutura

* cache de consultas públicas;
* filas de sincronização;
* processamento de documentos;
* observabilidade;
* logs estruturados;
* monitoramento de erros;
* backups automatizados;
* estratégia de deploy;
* rollback;
* API pública documentada, caso novos clientes necessitem de integração.

---

# 🤝 Contribuição

Contribuições são bem-vindas!

Para propor uma alteração:

```text
1. Faça um fork do projeto
        ↓
2. Crie uma branch descritiva
        ↓
3. Implemente a alteração
        ↓
4. Execute lint, build e testes
        ↓
5. Abra um Pull Request
```

Ao abrir o Pull Request, explique:

* qual problema foi resolvido;
* qual foi a solução;
* quais arquivos foram alterados;
* como a alteração foi validada.

> [!IMPORTANT]
> Toda alteração envolvendo **autenticação, ownership, status ou dados do dashboard** deve incluir validação server-side e testes correspondentes.

---

# 📄 Licença
<div align="center">

## 🚀 Projeto online

### 🌐 [Acessar o LicitaAI](https://licitaai.abacusai.app)

**Explore a plataforma de gestão e acompanhamento de licitações públicas.**

</div>

Este projeto está distribuído sob a licença **MIT**.

```text
MIT License
```

Consulte o arquivo [`LICENSE`](LICENSE) para mais informações.

---

# 📌 Status do projeto

> 🟢 **Desenvolvido para o desafio técnico da RR Tecnol**

O LicitaAI foi desenvolvido com foco em uma aplicação **enxuta, funcional e profissional** para gestão e acompanhamento de licitações públicas.

A versão atual prioriza:

```text
🔐 Autenticação
🛡️ Autorização
👤 Ownership
🌍 Exploração global
📝 CRUD
🔎 Filtros
📄 Paginação
📊 Dashboard
📱 Responsividade
🎨 Qualidade visual
🗄️ PostgreSQL
```

Evoluções adicionais devem ser implementadas somente após a validação dos fluxos essenciais.

---

<div align="center">

### 🔷 LicitaAI

**Gestão de licitações, do edital à homologação. 🇧🇷**

</div>
