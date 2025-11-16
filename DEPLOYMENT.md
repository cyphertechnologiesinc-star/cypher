# Guía de Despliegue - Cypher Elections

Esta aplicación está lista para ser desplegada en múltiples plataformas. A continuación se encuentran las instrucciones para cada una.

## Despliegue en Fly.io

### Prerequisitos

1. Crear una cuenta en [Fly.io](https://fly.io)
2. Instalar Fly CLI:
```bash
curl -L https://fly.io/install.sh | sh
export PATH="$HOME/.fly/bin:$PATH"
```

3. Autenticarse con tu token de acceso:
```bash
flyctl auth login --access-token YOUR_FLY_ACCESS_TOKEN
```

### Pasos de Despliegue

1. **Inicializar la aplicación (si es la primera vez):**
```bash
flyctl launch --copy-config --region iad
```

Este comando:
- Crea la aplicación en Fly.io con el nombre que se encuentran en `fly.toml`
- Usa la región IAD (Virginia, EE.UU.)
- Copia la configuración del archivo `fly.toml`

2. **Desplegar la aplicación:**
```bash
flyctl deploy
```

3. **Verificar el despliegue:**
```bash
flyctl status
flyctl logs
```

4. **Ver la aplicación en el navegador:**
```bash
flyctl open
```

### Configuración de Variables de Entorno

Si necesitas usar Supabase, configura las variables de entorno:

```bash
flyctl secrets set NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
flyctl secrets set NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anonymous-key"
```

### Monitoreo y Logs

```bash
# Ver logs en tiempo real
flyctl logs -f

# Ver estado de la aplicación
flyctl status

# Ver recursos utilizados
flyctl metrics
```

### Escalado (si es necesario)

```bash
# Escalar a más instancias
flyctl scale count 2

# Aumentar memoria
flyctl scale memory 2048
```

## Despliegue en Vercel

### Pasos Rápidos

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Configura las variables de entorno en el dashboard
4. Haz push a la rama `main` para desplegar automáticamente

### Configurar Variables de Entorno

En el dashboard de Vercel:
1. Ir a Settings > Environment Variables
2. Agregar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Despliegue Local

### Desarrollo

```bash
npm install --legacy-peer-deps
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Producción Local

```bash
npm run build
npm run start
```

## Características de la Aplicación

- ✅ Elecciones 2025 con cuenta regresiva en tiempo real
- ✅ Resultados de elecciones 2021 (primera y segunda vuelta)
- ✅ Historial electoral de 50 años (1975-2025)
- ✅ Navegación elegante con tabs
- ✅ Dark/Light mode
- ✅ Responsive design
- ✅ Integración con Supabase (configurar manualmente)
- ✅ Optimizado para producción

## Troubleshooting

### Error: "out of memory"

Aumenta la memoria de la VM en Fly.io:
```bash
flyctl scale memory 2048
```

### Error: "Application failed to start"

Revisa los logs:
```bash
flyctl logs -f
```

Asegúrate de que:
- Node.js 18+ está siendo usado
- Todas las dependencias están instaladas
- Las variables de entorno están configuradas correctamente

### Puerto incorrecto

El puerto debe ser 3000 (configurado en `fly.toml`). Si necesitas cambiar:

```bash
flyctl scale show
# Editar fly.toml e cambiar internal_port
```

## Documentación Adicional

- [Fly.io Docs](https://fly.io/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)

## Soporte

Para problemas con:
- **Fly.io**: Consulta [Fly.io Community](https://community.fly.io)
- **Next.js**: Consulta [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- **Esta aplicación**: Revisa los logs y busca en GitHub Issues
