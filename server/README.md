# Servidor E-commerce

Um servidor de e-commerce simples construído com Node.js, TypeScript, Express e PostgreSQL.

## Pré-requisitos

- Node.js (v16 ou superior)
- Banco de dados PostgreSQL
- pnpm (Utilizado), npm ou yarn

## Configuração

1. **Instalar dependências:**
   ```bash
   pnpm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp env.example .env
   ```
   
   Edite o arquivo `.env` e configure sua URL do banco de dados:
   ```
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce"
   ```

3. **Configurar o banco de dados:**
   ```bash
   # Executar migrações do banco de dados
   pnpm migrate:run
   ```

## Executando a Aplicação

### Sem Docker (Execução Local)

#### 1. Configurar PostgreSQL Localmente

**Instalação do PostgreSQL:**

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS (com Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
- Baixe e instale o PostgreSQL do site oficial: https://www.postgresql.org/download/windows/

#### 2. Criar Banco de Dados
```bash
# Conectar ao PostgreSQL
sudo -u postgres psql

# Criar banco de dados e usuário
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH PASSWORD 'ecommerce_password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
\q
```

#### 3. Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar .env com suas configurações
DATABASE_URL="postgresql://ecommerce_user:ecommerce_password@localhost:5432/ecommerce_db"
PORT=3000
NODE_ENV=development
```

#### 4. Instalar Dependências e Executar Migrações
```bash
# Instalar dependências
pnpm install

# Executar migrações
pnpm migrate:run

# Verificar status das migrações
pnpm migrate:status
```

#### 5. Executar a Aplicação

**Modo Desenvolvimento:**
```bash
pnpm dev
```

**Modo Produção:**
```bash
# Compilar o projeto
pnpm build

# Executar em produção
pnpm start
```

#### 6. Verificar se Está Funcionando

**Testar a API:**
```bash
# Verificar se o servidor está rodando
curl http://localhost:3000/api/products

# Deve retornar uma lista de produtos (array vazio se não houver dados)
```

**Verificar logs:**
```bash
# O servidor deve mostrar:
# ✅ Connected to database
# 🚀 Server listening on port=3000
# 📚 API endpoints:
#   GET /api/products
#   GET /api/products/:id
#   POST /api/cart/add
#   GET /api/cart
```

### Com Docker (Opcional)

#### Modo Desenvolvimento
```bash
# Iniciar com Docker Compose (desenvolvimento)
docker-compose -f docker-compose.dev.yml up --build
```

#### Modo Produção
```bash
# Iniciar com Docker Compose (produção)
docker-compose -f docker-compose.migrations.yml up --build
```

## Endpoints da API

- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Obter produto por ID
- `POST /api/cart/add` - Adicionar produto ao carrinho
- `GET /api/cart` - Obter carrinho atual

### Exemplos de Uso da API

**Adicionar produto ao carrinho:**
```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId": "produto-id", "quantity": 2}'
```

**Obter carrinho:**
```bash
curl http://localhost:3000/api/cart
```

## Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes com cobertura
pnpm test:coverage
```

## Gerenciamento do Banco de Dados

### Usando Migrações Manuais do PostgreSQL
```bash
# Executar migrações manuais
./migrations/postgresql/manage_migrations.sh run

# Verificar status das migrações
./migrations/postgresql/manage_migrations.sh status

# Criar nova migração
./migrations/postgresql/manage_migrations.sh create

# Resetar banco de dados (CUIDADO: Deleta todos os dados)
./migrations/postgresql/manage_migrations.sh reset
```

### Docker com Migrações
```bash
# Desenvolvimento com migrações automáticas
docker-compose -f docker-compose.dev.yml up --build

# Produção com migrações automáticas
docker-compose -f docker-compose.migrations.yml up --build
```

## Estrutura do Projeto

```
src/
├── applications/use-cases/    # Lógica de negócio
├── domain/entities/          # Modelos de domínio
├── domain/ports/             # Interfaces
├── infra/controller/         # Controladores HTTP
├── infra/database/           # Adaptadores de banco
└── tests/                    # Arquivos de teste
```

## Variáveis de Ambiente

- `DATABASE_URL` - String de conexão PostgreSQL
- `PORT` - Porta do servidor (padrão: 3000)
- `NODE_ENV` - Ambiente (development/production)

## Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                    # Iniciar servidor de desenvolvimento
pnpm build                  # Compilar TypeScript
pnpm start                  # Iniciar servidor de produção

# Testes
pnpm test                   # Executar testes
pnpm test:watch             # Executar testes em modo watch
pnpm test:coverage          # Executar testes com cobertura

# Qualidade de Código
pnpm lint                   # Verificar linting
pnpm lint:fix               # Corrigir problemas de linting
pnpm format                 # Formatar código
pnpm format:check           # Verificar formatação

# Migrações
pnpm migrate:run            # Executar migrações
pnpm migrate:status         # Verificar status das migrações
pnpm migrate:create         # Criar nova migração
pnpm migrate:reset          # Resetar banco de dados

# Docker
pnpm docker:dev             # Executar em modo desenvolvimento
pnpm docker:prod            # Executar em modo produção
pnpm docker:down            # Parar containers
```

## Solução de Problemas

### Execução Local (Sem Docker)

**PostgreSQL não está rodando:**
```bash
# Ubuntu/Debian
sudo systemctl status postgresql
sudo systemctl start postgresql

# macOS
brew services list | grep postgresql
brew services start postgresql

# Windows
# Verifique se o serviço PostgreSQL está rodando no Gerenciador de Serviços
```

**Erro de conexão com o banco:**
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo .env
- Teste a conexão: `psql -h localhost -U ecommerce_user -d ecommerce_db`

**Erro de permissão no banco:**
```bash
# Conectar como superusuário e dar permissões
sudo -u postgres psql
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecommerce_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ecommerce_user;
\q
```

**Porta já em uso:**
- Altere a PORT no arquivo .env
- Ou mate o processo usando a porta: `lsof -ti:3000 | xargs kill`

**Problemas com migrações:**
- Verifique se o banco de dados está acessível
- Confirme as credenciais no arquivo .env
- Execute `pnpm migrate:status` para verificar o estado
- Se necessário, reset o banco: `pnpm migrate:reset`

### Execução com Docker

**Problemas de conexão com o banco:**
- Verifique se o PostgreSQL está rodando
- Confira a DATABASE_URL no arquivo .env
- Execute `pnpm migrate:run` após mudanças no schema

**Containers não sobem:**
```bash
# Verificar logs
docker-compose logs

# Reconstruir containers
docker-compose down -v
docker-compose up --build
```

## Arquitetura

O projeto segue os princípios de **Clean Architecture**:

- **Domain Layer**: Entidades e regras de negócio
- **Application Layer**: Casos de uso e lógica de aplicação
- **Infrastructure Layer**: Implementações concretas (banco, HTTP, etc.)

### Fluxo de Dados

1. **Controller** recebe requisição HTTP
2. **Use Case** executa lógica de negócio
3. **DAO** acessa dados no banco
4. **Entity** representa dados de domínio
