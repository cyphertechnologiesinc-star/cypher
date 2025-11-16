# 🚀 Despliegue Manual en Fly.io - Cypher Elections

## Estado: ✅ LISTO PARA DESPLEGAR

La aplicación está completamente compilada y lista para desplegar en Fly.io.

## 📋 Requisitos Previos

1. ✅ Código en GitHub: https://github.com/cyphertechnologiesinc-star/cypher
2. ✅ Dockerfile configurado
3. ✅ fly.toml configurado
4. ✅ Build exitoso (9.27 KB)

## 🎯 Pasos para Desplegar

### Paso 1: Instalar Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
export PATH="$HOME/.fly/bin:$PATH"
flyctl --version
```

### Paso 2: Autenticarse con Fly.io

**Opción A: Flujo Interactivo (Recomendado)**
```bash
flyctl auth login
# Se abrirá un navegador para autenticarte
```

**Opción B: Con Token (si tienes un API token válido)**
```bash
export FLY_ACCESS_TOKEN="your_token_here"
flyctl apps list
```

### Paso 3: Clonar el Repositorio

```bash
git clone https://github.com/cyphertechnologiesinc-star/cypher.git
cd cypher
```

### Paso 4: Crear Aplicación en Fly.io (Primera vez)

```bash
flyctl launch --copy-config
```

Verás prompts como:
```
? App Name (leave blank to use an auto-generated name): cypher-elections
? Select Organization: (choose your org)
? Select Region: iad (US - Virginia)
? Would you like to set up a Postgresql database now? No
? Would you like to set up an Upstash Redis database now? No
? Create and deploy now? No (we'll deploy manually)
```

### Paso 5: Desplegar la Aplicación

```bash
flyctl deploy
```

El proceso mostrará:
```
==> Building image
 (Docker build process)

==> Pushing image to registry
 (Uploading to Fly.io)

==> Creating release
 (Creating the deployment)

==> Monitoring deployment
 (Waiting for app to start)

✓ Deployment successful!
```

### Paso 6: Verificar el Despliegue

```bash
# Ver estado
flyctl status

# Ver logs en vivo
flyctl logs -f

# Abrir en navegador (automático)
flyctl open
```

## 📊 URL Final

Tu aplicación estará disponible en:
```
https://cypher-elections.fly.dev
```

(Puede variar según el nombre que elijas)

## 🔧 Configuraciones Adicionales (Opcional)

### Configurar Supabase (si lo vas a usar)

```bash
flyctl secrets set NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
flyctl secrets set NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### Aumentar Memoria (si es necesario)

```bash
flyctl scale memory 2048
```

### Escalar a Múltiples Instancias

```bash
flyctl scale count 2
```

## 📈 Monitoreo en Producción

```bash
# Ver métricas
flyctl metrics

# Ver IPs
flyctl ips list

# Ver configuración
flyctl config show

# Ver secretos (sin valores)
flyctl secrets list
```

## 🆘 Troubleshooting

### Error: "Your organization is limited to 4 CPU cores"

**Solución**: Tu plan tiene límites de recursos.
- Usa plan de pago de Fly.io
- O reduce los requisitos en `fly.toml` (ya están optimizados)

### Error: "Application failed to start"

```bash
# Ver logs detallados
flyctl logs

# Verificar puerto
# Debe ser 3000 (configurado en fly.toml)
```

### Error: "Build failed"

```bash
# Verificar que el build local funciona
npm run build

# Verificar Docker
docker build -t test .
```

## ✅ Checklist de Verificación Post-Despliegue

- [ ] App está accesible en `https://cypher-elections.fly.dev`
- [ ] Dark/Light mode funciona
- [ ] Countdown 2025 se actualiza en tiempo real
- [ ] Pestañas navegan entre 2025/2021/Historial
- [ ] Datos electorales se cargan correctamente
- [ ] Responsive en móvil
- [ ] No hay errores en la consola

## 🎬 Quick Start Resumido

```bash
# 1. Instalar Fly CLI
curl -L https://fly.io/install.sh | sh

# 2. Autenticar
flyctl auth login

# 3. Clonar código
git clone https://github.com/cyphertechnologiesinc-star/cypher.git
cd cypher

# 4. Crear y desplegar
flyctl launch --copy-config
flyctl deploy

# 5. Abrir
flyctl open
```

## 📞 Soporte

- **Fly.io Docs**: https://fly.io/docs/
- **GitHub Issues**: https://github.com/cyphertechnologiesinc-star/cypher/issues
- **Discord Fly.io**: https://discord.gg/flyio

## 🎯 Información de la Aplicación

| Aspecto | Valor |
|--------|-------|
| **Nombre** | Cypher Elections |
| **Puerto Interno** | 3000 |
| **Region Recomendada** | IAD (Virginia) |
| **Memoria** | 1024 MB (configurado) |
| **CPU** | 1 Core compartido |
| **Build** | ✅ Exitoso |
| **Tamaño Bundle** | 9.27 KB |

---

**¡Tu aplicación está lista para despegar! 🚀**

Solo sigue los pasos anteriores y tendrás Cypher Elections en línea en minutos.
