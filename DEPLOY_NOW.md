# 🚀 DESPLIEGUE EN FLY.IO - GUÍA DEFINITIVA

## ✅ Estado Actual

- ✅ Código optimizado (bundle -18%)
- ✅ Docker configurado correctamente
- ✅ Next.js detectado automáticamente
- ✅ Listo para desplegar

---

## 🎯 PASOS PARA DESPLEGAR (SIN ERRORES)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/cyphertechnologiesinc-star/cypher.git
cd cypher
```

### Paso 2: Instalar Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
export PATH="$HOME/.fly/bin:$PATH"
```

### Paso 3: Autenticación (IMPORTANTE)

```bash
# Opción A: Login Interactivo (RECOMENDADO)
flyctl auth login
# Se abrirá navegador - Haz login y copia el token

# Opción B: Con Token Existente
export FLY_ACCESS_TOKEN="tu_token"
```

### Paso 4: Crear Aplicación

**OPCIÓN A - SIN fly.toml (RECOMENDADO):**

```bash
# Fly.io detectará automáticamente que es Next.js
flyctl launch
```

Cuando pregunte:
```
App Name: cypher-elections
Region: iad
Database: No
Deploy now: No
```

**OPCIÓN B - CON fly.toml (Si la opción A falla):**

```bash
# El fly.toml ya está configurado
flyctl deploy
```

### Paso 5: Desplegar

```bash
flyctl deploy
```

**Verás algo como:**
```
==> Verifying app config
✓ Configuration is valid

==> Building image
  (Docker build...)

==> Pushing image to registry
  (Uploading...)

==> Creating release
  (Setting up deployment...)

==> Monitoring deployment
  (Waiting for machines...)

✓ Deployment successful!
```

### Paso 6: Abrir en Navegador

```bash
flyctl open
```

---

## 🔧 SI FALLA CON ERRORES

### Error: "launch manifest was created for a app, but this is a Next.js app"

**SOLUCIÓN:**

```bash
# 1. Elimina credenciales antiguas
rm -rf ~/.fly

# 2. Instala Fly CLI de nuevo
curl -L https://fly.io/install.sh | sh
export PATH="$HOME/.fly/bin:$PATH"

# 3. Autentica (ESPERA A QUE SE ABRA EL NAVEGADOR)
flyctl auth login

# 4. Lanza sin fly.toml existente
rm fly.toml  # Elimina el archivo existente
flyctl launch

# 5. Sigue los prompts
```

### Error: "Your organization is limited to 4 CPU cores"

**SOLUCIÓN:**
- Usa plan de pago de Fly.io
- O reduce CPU en fly.toml: `cpus = 1` (ya configurado)

### Error: "Application failed to start"

**SOLUCIÓN:**
```bash
# Ver logs detallados
flyctl logs -f

# Reiniciar
flyctl restart
```

---

## ✅ VERIFICACIÓN POST-DESPLIEGUE

Después de desplegar, verifica:

1. **Abre la app en navegador**
   ```
   https://cypher-elections.fly.dev
   ```

2. **Verifica funcionalidad**
   - [ ] Página carga
   - [ ] Dark/Light mode funciona
   - [ ] Countdown se actualiza
   - [ ] Tabs navegan
   - [ ] Responsive en móvil

3. **Ver logs**
   ```bash
   flyctl logs -f
   ```

4. **Ver estado**
   ```bash
   flyctl status
   ```

---

## 📊 INFORMACIÓN DEL DESPLIEGUE

```
App Name:           cypher-elections
Region:             IAD (Virginia, USA)
Framework:          Next.js 14
Runtime:            Node.js 18
Port:               3000 (interno) → 80/443 (público)
Memory:             1024 MB
CPU:                1 compartido
Build:              Docker
Docker Image:       Optimizado multi-stage
Bundle Size:        7.6 KB (optimizado -18%)
```

---

## 🎯 URLS FINALES

Una vez desplegado:

```
Production:  https://cypher-elections.fly.dev
Dashboard:   https://fly.io/apps/cypher-elections
```

---

## 💡 TIPS

1. **Para redeploy después de cambios:**
   ```bash
   git push origin main
   flyctl deploy
   ```

2. **Para ver logs en vivo:**
   ```bash
   flyctl logs -f
   ```

3. **Para SSH a la máquina:**
   ```bash
   flyctl ssh console
   ```

4. **Para escalar:**
   ```bash
   flyctl scale count 2     # 2 instancias
   flyctl scale memory 2048 # 2GB RAM
   ```

---

## 📞 CONTACTO

- Documentación: [QUICK_START_FLY.md](./QUICK_START_FLY.md)
- Guía completa: [FLY_DEPLOYMENT_MANUAL.md](./FLY_DEPLOYMENT_MANUAL.md)
- GitHub: https://github.com/cyphertechnologiesinc-star/cypher
- Fly.io Docs: https://fly.io/docs/

---

## ✨ ¡LISTO PARA DESPEGAR!

Sigues los pasos anteriores y tu aplicación estará en línea en **2-5 minutos**. 🚀

**Cualquier duda, revisa:**
- `QUICK_START_FLY.md` - Troubleshooting rápido
- `FLY_DEPLOYMENT_MANUAL.md` - Guía detallada
- Los logs: `flyctl logs -f`

**¡Éxito!** 🎉
