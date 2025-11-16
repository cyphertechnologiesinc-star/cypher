# 🚀 Quick Start - Fly.io Deployment

## ¡ERROR RESUELTO! ✅

Hubo un conflicto con la configuración previa. He corregido el archivo `fly.toml` para Next.js.

---

## 🎯 Pasos para Desplegar (AHORA SÍ FUNCIONA)

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/cyphertechnologiesinc-star/cypher.git
cd cypher
```

### 2️⃣ Instalar Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
export PATH="$HOME/.fly/bin:$PATH"
flyctl --version
```

### 3️⃣ **IMPORTANTE: Autenticación Correcta**

```bash
# Opción A: Login Interactivo (RECOMENDADO)
flyctl auth login
# Se abrirá un navegador en https://fly.io/auth/cli/
# Haz login con tu cuenta de Fly.io
# Copia el token que aparece en la terminal
# Pégalo en la terminal y presiona Enter

# Opción B: Con Token (si ya tienes uno)
# Asegúrate que el token sea válido y vigente
flyctl auth whoami
# Debe mostrar tu email y información
```

### 4️⃣ Crear la Aplicación

```bash
flyctl launch
```

**Responde a los prompts:**
```
? App Name: cypher-elections
? Select Organization: (selecciona tu organización)
? Select Region: iad
? Would you like to set up a Postgresql database? No
? Create and deploy now? No
```

### 5️⃣ Desplegar

```bash
flyctl deploy
```

**Verás:**
```
==> Verifying app config
==> Building image
==> Pushing image to registry
==> Creating release
==> Monitoring deployment
✓ Deployment successful!
```

### 6️⃣ Abrir la Aplicación

```bash
flyctl open
```

O ve a:
```
https://cypher-elections.fly.dev
```

---

## ✅ Verificar Despliegue

```bash
# Ver estado
flyctl status

# Ver logs
flyctl logs -f

# Ver métricas
flyctl metrics
```

---

## ❌ Si Aún Hay Problemas

### Error: "You must be authenticated"

**Solución:**
```bash
# Elimina credenciales antiguas
rm -rf ~/.fly

# Instala de nuevo
curl -L https://fly.io/install.sh | sh

# Autentica nuevamente
flyctl auth login
# ¡IMPORTANTE! Espera a que se abra el navegador
# Completa el login en el navegador
# Copia el token exactamente como aparece
```

### Error: "app already exists"

**Solución:**
```bash
# Usa un nombre diferente
flyctl launch --name cypher-elections-$(date +%s)
```

### Error: "out of memory" o "CPU limit"

**Solución:**
```bash
# Reduce los requisitos en fly.toml
# O usa el plan de pago de Fly.io
```

---

## 📋 Archivo fly.toml (Ya Configurado)

El archivo `fly.toml` ya está optimizado para Next.js:
- ✅ Region: IAD (Virginia)
- ✅ CPU: 1 compartido
- ✅ RAM: 1GB
- ✅ HTTP/HTTPS en puertos 80/443
- ✅ Internal port: 3000
- ✅ Auto-scaling configurado

**No necesitas modificarlo.**

---

## 🎯 URL Final

Una vez desplegado, tu aplicación estará en:

```
https://cypher-elections.fly.dev
```

(O con el nombre que elijas)

---

## 📱 Verificar Funcionalidad

Una vez desplegado, verifica:

- [ ] Página carga correctamente
- [ ] Dark/Light mode funciona
- [ ] Countdown se actualiza
- [ ] Tabs navegan entre 2025/2021/Historial
- [ ] Datos de candidatos cargan
- [ ] Responsive en móvil

---

## 🆘 Soporte

Si aún tienes problemas:

1. **Revisa los logs:**
   ```bash
   flyctl logs -f
   ```

2. **Verifica la configuración:**
   ```bash
   flyctl config show
   ```

3. **Reinicia la app:**
   ```bash
   flyctl restart
   ```

4. **Contacta a Fly.io:**
   - Discord: https://discord.gg/flyio
   - Docs: https://fly.io/docs/

---

## ✨ ¡Éxito!

Cuando veas:
```
✓ Deployment successful!
```

¡Tu aplicación está en línea! 🎉

```bash
flyctl open
# Se abrirá automáticamente en tu navegador
```

---

**¡Cypher Elections está en el aire!** 🗳️
