#!/bin/bash

# Script de inicialização do cliente (Next.js)
# Este script configura e inicia o ambiente de desenvolvimento do frontend

echo "🚀 Inicializando o cliente (Next.js)..."

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

# Navegar para o diretório do cliente
cd client

# Verificar se o package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ package.json não encontrado no diretório client/"
    exit 1
fi

echo "📦 Instalando dependências do cliente..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências do cliente"
    exit 1
fi

echo "✅ Dependências do cliente instaladas com sucesso!"

# Verificar se existe um arquivo .env.local
if [ ! -f ".env.local" ]; then
    echo "📝 Criando arquivo .env.local..."
    cat > .env.local << EOF
# Configurações do cliente
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Test Stafanini
EOF
    echo "✅ Arquivo .env.local criado!"
fi

echo "🎉 Cliente inicializado com sucesso!"
echo "💡 Para iniciar o servidor de desenvolvimento, execute: npm run dev"
echo "🌐 O cliente estará disponível em: http://localhost:3000"
