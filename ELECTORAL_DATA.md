# Actualización de Datos Electorales

## 📋 Cómo Actualizar los Datos

El sistema automáticamente carga los datos electorales desde el archivo Excel ubicado en `/public/election-data.xlsx`. Para actualizar los datos:

### Opción 1: Actualización Automática via GitHub (Recomendado)

1. **Descarga el archivo Excel** desde SERVEL
2. **Renombra el archivo** a: `election-data.xlsx`
3. **Reemplaza el archivo** en GitHub:
   - Navega a: `https://github.com/cyphertechnologiesinc-star/cypher/tree/main/public`
   - Click en `election-data.xlsx`
   - Click en el ícono de edición (lápiz)
   - Elimina el archivo actual
   - Sube el nuevo archivo
4. **GitHub Actions** se ejecutará automáticamente y desplegará los cambios a Vercel en ~2 minutos

### Opción 2: Actualización Local

1. Reemplaza el archivo `/public/election-data.xlsx` localmente
2. Haz commit y push:
   ```bash
   git add public/election-data.xlsx
   git commit -m "Update election data - [fecha/hora]"
   git push origin main
   ```
3. Vercel se desplegará automáticamente

### Opción 3: Upload desde Dashboard

1. Accede a `/dashboard/cargar-datos`
2. Carga un archivo Excel directamente
3. Los datos se actualizarán en tiempo real en todas las páginas

## 📊 Dónde se Muestran los Datos

Los datos electorales cargados se visualizan en:

- **Página Principal (/)** - Resumen ejecutivo con gráficos
- **/dashboard** - Overview con estadísticas principales
- **/dashboard/candidatos** - Análisis detallado de candidatos
- **/dashboard/estadisticas** - Estadísticas completas
- **/dashboard/cargar-datos** - Información del archivo cargado
- **/dashboard/comparativas** - Análisis comparativo

## 📁 Estructura del Archivo Excel

El archivo debe cumplir con este formato:

```
Row 1:  [Vacío]
Row 2:  Resultado Elección de Presidente
Row 3:  [Vacío]
Row 4:  Datos del DD-MM-YYYY HH:MM | [Col C vacío] | [Col D vacío] | Emisión DD-MM-YYYY HH:MM
Row 5:  Total Votación - NACIONAL Y EN EL EXTRANJERO
Row 6:  [Número] mesas totales del país y del extranjero
Row 7:  [Número] mesas instaladas del país y del extranjero
Row 8:  [Número] mesas escrutadas de un total de [Número] mesas del país y del extranjero, correspondiente al [Número]% .
Row 9:  [Vacío]
Row 10: Candidatos | Votos | Porcentaje | Electo
Row 11-18: [Datos de candidatos]
Row 19: Válidamente Emitidos | [Votos] | [Porcentaje]
Row 20: Votos Nulos | [Votos] | [Porcentaje]
Row 21: Votos en Blanco | [Votos] | [Porcentaje]
Row 22: Total votación | [Votos] | [Porcentaje]
```

## 🔄 Actualización Automática

- Los datos se cargan automáticamente al acceder a cualquier página
- Si los datos ya están en el navegador, se actualizan en la próxima carga
- No es necesario recargar la página manualmente

## ⚠️ Requisitos

- El archivo debe estar en formato `.xlsx` (Excel 2007+)
- El nombre del archivo debe ser `election-data.xlsx`
- Debe estar en la carpeta `/public`

## 🚀 GitHub Actions

El workflow automático se ejecuta cuando:
- Se pushea código a `main`
- Se actualiza `public/election-data.xlsx`

Estado del deployment: Verifica en GitHub Actions → Deploy to Vercel

## 📞 Soporte

Para problemas con la actualización de datos, verifica:
1. El formato del archivo Excel
2. El nombre del archivo (`election-data.xlsx`)
3. La carpeta correcta (`/public`)
4. Los logs de GitHub Actions
