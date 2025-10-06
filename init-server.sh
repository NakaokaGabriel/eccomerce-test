#!/bin/bash

# Script de inicialização do servidor (Node.js + Express + PostgreSQL)
# Este script configura e inicia o ambiente de desenvolvimento do backend

echo "🚀 Inicializando o servidor (Node.js + Express + PostgreSQL)..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não está instalado. Por favor, instale o npm primeiro."
    exit 1
fi

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Navegar para o diretório do servidor
cd server

# Verificar se o package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ package.json não encontrado no diretório server/"
    exit 1
fi

echo "📦 Instalando dependências do servidor..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências do servidor"
    exit 1
fi

echo "✅ Dependências do servidor instaladas com sucesso!"

# Verificar se existe um arquivo .env
if [ ! -f ".env" ]; then
    echo "📝 Criando arquivo .env baseado no env.example..."
    if [ -f "env.example" ]; then
        cp env.example .env
        echo "✅ Arquivo .env criado a partir do env.example!"
        echo "⚠️  Por favor, configure as variáveis de ambiente no arquivo .env"
    else
        echo "📝 Criando arquivo .env básico..."
        cat > .env << EOF
# Configurações do banco de dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=test_stafanini
DB_USER=postgres
DB_PASSWORD=postgres

# Configurações do servidor
PORT=3001
NODE_ENV=development

# Configurações de CORS
CORS_ORIGIN=http://localhost:3000
EOF
        echo "✅ Arquivo .env criado!"
    fi
fi

echo "🐳 Iniciando containers Docker (PostgreSQL)..."
docker-compose -f docker-compose.dev.yml up -d

if [ $? -ne 0 ]; then
    echo "❌ Erro ao iniciar containers Docker"
    exit 1
fi

echo "⏳ Aguardando o banco de dados ficar disponível..."
sleep 10

echo "🔄 Executando migrações do banco de dados..."
npm run migrate:run

if [ $? -ne 0 ]; then
    echo "❌ Erro ao executar migrações"
    echo "💡 Tente executar manualmente: npm run migrate:run"
fi

echo "🎉 Servidor inicializado com sucesso!"
echo "💡 Para iniciar o servidor de desenvolvimento, execute: npm run start:dev"
echo "🌐 O servidor estará disponível em: http://localhost:3001"
echo "🗄️  PostgreSQL estará disponível em: localhost:5432"
echo "📊 Para verificar o status das migrações: npm run migrate:status"
