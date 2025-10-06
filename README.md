# Test Stafanini - E-commerce

Este é um projeto de e-commerce desenvolvido como teste para a Stafanini, utilizando Next.js para o frontend e Node.js com Express para o backend, conectado a um banco PostgreSQL.

## 🏗️ Arquitetura

O projeto segue uma arquitetura limpa (Clean Architecture) com separação clara entre:

- **Frontend (Client)**: Next.js 15 com React 19, TypeScript e Tailwind CSS
- **Backend (Server)**: Node.js com Express, TypeScript e PostgreSQL
- **Banco de Dados**: PostgreSQL com migrações automatizadas

## 📁 Estrutura do Projeto

```
test-stafanini/
├── client/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── app/           # App Router do Next.js
│   │   ├── components/    # Componentes React
│   │   ├── contexts/      # Contextos React
│   │   └── lib/          # Utilitários e configurações
│   └── package.json
├── server/                # Backend (Node.js + Express)
│   ├── src/
│   │   ├── applications/  # Casos de uso
│   │   ├── domain/       # Entidades e portas
│   │   ├── infra/        # Implementações concretas
│   │   └── tests/        # Testes unitários
│   ├── migrations/       # Migrações do banco
│   └── package.json
├── init-client.sh        # Script de inicialização do cliente
├── init-server.sh        # Script de inicialização do servidor
└── package.json          # Configuração raiz do projeto
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker e Docker Compose
- Git

### Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd test-stafanini
   ```

2. **Instale todas as dependências:**
   ```bash
   npm run install:all
   ```

3. **Inicialize o servidor (Backend + Banco de Dados):**
   ```bash
   chmod +x init-server.sh
   ./init-server.sh
   ```

4. **Inicialize o cliente (Frontend):**
   ```bash
   chmod +x init-client.sh
   ./init-client.sh
   ```

5. **Inicie o desenvolvimento:**
   ```bash
   npm run dev
   ```

## 🛠️ Scripts Disponíveis

### Scripts Principais

- `npm run dev` - Inicia cliente e servidor em modo desenvolvimento
- `npm run build` - Constrói cliente e servidor para produção
- `npm run start` - Inicia cliente e servidor em modo produção
- `npm run install:all` - Instala dependências de todos os projetos

### Scripts do Cliente

- `npm run dev:client` - Inicia apenas o cliente em desenvolvimento
- `npm run build:client` - Constrói apenas o cliente
- `npm run start:client` - Inicia apenas o cliente em produção

### Scripts do Servidor

- `npm run dev:server` - Inicia apenas o servidor em desenvolvimento
- `npm run build:server` - Constrói apenas o servidor
- `npm run start:server` - Inicia apenas o servidor em produção
- `npm run test:server` - Executa testes do servidor

### Scripts do Banco de Dados

- `npm run migrate:run` - Executa migrações pendentes
- `npm run migrate:status` - Verifica status das migrações
- `npm run migrate:create` - Cria nova migração
- `npm run migrate:reset` - Reseta todas as migrações

### Scripts do Docker

- `npm run docker:dev` - Inicia containers em modo desenvolvimento
- `npm run docker:prod` - Inicia containers em modo produção
- `npm run docker:down` - Para e remove containers

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## 🧪 Testes

Para executar os testes do servidor:

```bash
npm run test:server
```

Para executar testes em modo watch:

```bash
cd server && npm run test:live
```

## 📊 Funcionalidades

### Frontend (Cliente)
- ✅ Listagem de produtos
- ✅ Detalhes do produto
- ✅ Carrinho de compras
- ✅ Interface responsiva
- ✅ Notificações toast
- ✅ Componentes reutilizáveis

### Backend (Servidor)
- ✅ API REST para produtos
- ✅ API REST para carrinho
- ✅ Arquitetura limpa
- ✅ Testes unitários
- ✅ Migrações de banco
- ✅ Dockerização

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com migrações automatizadas. As tabelas principais são:

- `products` - Produtos do e-commerce
- `cart_items` - Itens do carrinho de compras

### Executando Migrações

```bash
# Ver status das migrações
npm run migrate:status

# Executar migrações pendentes
npm run migrate:run

# Criar nova migração
npm run migrate:create nome_da_migracao

# Resetar todas as migrações
npm run migrate:reset
```

## 🐳 Docker

O projeto inclui configurações Docker para desenvolvimento e produção:

```bash
# Desenvolvimento
npm run docker:dev

# Produção
npm run docker:prod

# Parar containers
npm run docker:down
```

## 🔧 Configuração de Ambiente

### Cliente (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Test Stafanini
```

### Servidor (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=test_stafanini
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 📝 Desenvolvimento

### Estrutura do Backend

O backend segue os princípios da Clean Architecture:

- **Domain**: Entidades e regras de negócio
- **Applications**: Casos de uso
- **Infrastructure**: Implementações concretas (controllers, DAOs, etc.)

### Estrutura do Frontend

O frontend utiliza Next.js 15 com App Router:

- **app/**: Páginas e layouts
- **components/**: Componentes reutilizáveis
- **contexts/**: Gerenciamento de estado global
- **lib/**: Utilitários e configurações

## 🚀 Deploy

Para fazer deploy em produção:

1. Configure as variáveis de ambiente
2. Execute `npm run build`
3. Execute `npm run docker:prod`

## 📚 Tecnologias Utilizadas

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide React

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Jest (testes)
- Docker

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.
