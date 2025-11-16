#!/bin/bash

# Script de Despliegue - Cypher Elections
# Uso: ./deploy.sh [fly|vercel|docker]

set -e

echo "🚀 Cypher Elections - Script de Despliegue"
echo "=========================================="
echo ""

# Determinar plataforma
PLATFORM=${1:-fly}

case $PLATFORM in
  fly)
    echo "📍 Despliegue en Fly.io"
    echo ""
    echo "1️⃣  Verificando Fly CLI..."
    if ! command -v flyctl &> /dev/null; then
      echo "❌ Fly CLI no instalado. Instalando..."
      curl -L https://fly.io/install.sh | sh
      export PATH="$HOME/.fly/bin:$PATH"
    fi

    echo "✅ Fly CLI encontrado"
    echo ""

    echo "2️⃣  Verificando autenticación..."
    if flyctl auth whoami &> /dev/null; then
      echo "✅ Autenticado correctamente"
    else
      echo "❌ No autenticado. Por favor, ejecuta:"
      echo "   flyctl auth login"
      exit 1
    fi

    echo ""
    echo "3️⃣  Creando/Actualizando aplicación en Fly.io..."

    if flyctl apps list | grep -q "cypher"; then
      echo "ℹ️  App 'cypher' ya existe. Desplegando..."
      flyctl deploy
    else
      echo "ℹ️  Creando nueva app 'cypher'..."
      flyctl launch --name cypher-elections --region iad --copy-config --no-deploy
      echo "✅ App creada"
      echo ""
      echo "4️⃣  Desplegando..."
      flyctl deploy
    fi

    echo ""
    echo "✅ Despliegue exitoso en Fly.io!"
    echo ""
    echo "Abriendo en navegador..."
    flyctl open
    ;;

  vercel)
    echo "📍 Despliegue en Vercel"
    echo ""
    echo "1️⃣  Verificando Vercel CLI..."
    if ! command -v vercel &> /dev/null; then
      echo "❌ Vercel CLI no instalado."
      echo "Por favor instala: npm i -g vercel"
      exit 1
    fi

    echo "✅ Vercel CLI encontrado"
    echo ""

    echo "2️⃣  Autenticando con Vercel..."
    vercel login

    echo ""
    echo "3️⃣  Desplegando..."
    vercel --prod

    echo ""
    echo "✅ Despliegue exitoso en Vercel!"
    ;;

  docker)
    echo "📍 Despliegue con Docker"
    echo ""
    echo "1️⃣  Verificando Docker..."
    if ! command -v docker &> /dev/null; then
      echo "❌ Docker no instalado"
      exit 1
    fi

    echo "✅ Docker encontrado"
    echo ""

    echo "2️⃣  Construyendo imagen Docker..."
    docker build -t cypher-elections .

    echo ""
    echo "3️⃣  Ejecutando contenedor..."
    docker run -p 3000:3000 cypher-elections

    echo ""
    echo "✅ Contenedor ejecutándose en http://localhost:3000"
    ;;

  *)
    echo "❌ Plataforma desconocida: $PLATFORM"
    echo ""
    echo "Uso: ./deploy.sh [fly|vercel|docker]"
    echo ""
    echo "Ejemplos:"
    echo "  ./deploy.sh fly      # Desplegar en Fly.io"
    echo "  ./deploy.sh vercel   # Desplegar en Vercel"
    echo "  ./deploy.sh docker   # Ejecutar con Docker"
    exit 1
    ;;
esac

echo ""
echo "=========================================="
echo "🎉 ¡Despliegue completado exitosamente!"
echo "=========================================="
