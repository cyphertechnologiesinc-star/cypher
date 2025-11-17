# 🚀 Configuración Supabase para Datos Electorales

## Paso 1: Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Click en "Sign Up"
3. Regístrate con GitHub o email
4. Crea un nuevo proyecto

## Paso 2: Crear tabla en Supabase

En la consola de Supabase, ejecuta la siguiente consulta SQL:

```sql
-- Create election_data table
CREATE TABLE IF NOT EXISTS election_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  data_date TEXT NOT NULL,
  emission_date TEXT NOT NULL,
  total_mesas INTEGER NOT NULL,
  installed_mesas INTEGER NOT NULL,
  scrutinized_mesas INTEGER NOT NULL,
  scrutinized_percentage NUMERIC NOT NULL,
  valid_votes INTEGER NOT NULL,
  valid_percentage TEXT NOT NULL,
  null_votes INTEGER NOT NULL,
  null_percentage TEXT NOT NULL,
  blank_votes INTEGER NOT NULL,
  blank_percentage TEXT NOT NULL,
  total_votes INTEGER NOT NULL,
  candidates JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE election_data ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON election_data
  FOR SELECT
  USING (true);

-- Create policy for authenticated write access
CREATE POLICY "Allow authenticated write access"
  ON election_data
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

## Paso 3: Obtener credenciales

1. Ve a **Settings → API** en Supabase
2. Copia estos valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_KEY` (solo para scripts)

## Paso 4: Configurar variables de entorno

### `.env.local` (desarrollo local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
```

### Vercel (producción)
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las 3 variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`

## Paso 5: Insertar datos iniciales

### Opción 1: Usar el script Python

```bash
cd /path/to/cypher
pip install supabase python-dotenv
export NEXT_PUBLIC_SUPABASE_URL="tu-url"
export SUPABASE_SERVICE_KEY="tu-service-key"
python3 scripts/insert-election-data.py
```

### Opción 2: Insertar manualmente desde Supabase Console

Ve a **Table Editor → election_data → Insert** y pega este JSON:

```json
{
  "title": "Resultado Elección de Presidente",
  "data_date": "17-11-2025 18:30",
  "emission_date": "17-11-2025 18:35",
  "total_mesas": 40900,
  "installed_mesas": 40900,
  "scrutinized_mesas": 25669,
  "scrutinized_percentage": 62.76,
  "valid_votes": 8055810,
  "valid_percentage": "97.28%",
  "null_votes": 217678,
  "null_percentage": "2.60%",
  "blank_votes": 86690,
  "blank_percentage": "1.04%",
  "total_votes": 8360578,
  "candidates": [
    {
      "position": 1,
      "name": "JEANNETTE JARA ROMAN",
      "votes": 2145203,
      "percentage": "26.63%"
    },
    {
      "position": 2,
      "name": "JOSE ANTONIO KAST RIST",
      "votes": 1953810,
      "percentage": "24.25%"
    },
    {
      "position": 3,
      "name": "FRANCO PARISI FERNANDEZ",
      "votes": 1534310,
      "percentage": "19.05%"
    },
    {
      "position": 4,
      "name": "JOHANNES KAISER BARENTS-VON HOHENHAGEN",
      "votes": 1122799,
      "percentage": "13.94%"
    },
    {
      "position": 5,
      "name": "EVELYN MATTHEI FORNET",
      "votes": 1050521,
      "percentage": "13.04%"
    },
    {
      "position": 6,
      "name": "MARCO ANTONIO ENRIQUEZ-OMINAMI GUMUCIO",
      "votes": 93953,
      "percentage": "1.17%"
    },
    {
      "position": 7,
      "name": "HAROLD MAYNE-NICHOLLS SECUL",
      "votes": 102504,
      "percentage": "1.27%"
    },
    {
      "position": 8,
      "name": "EDUARDO ANTONIO ARTES BRICHETTI",
      "votes": 53110,
      "percentage": "0.66%"
    }
  ]
}
```

## Paso 6: Actualizar datos automáticamente

### Desde Supabase Console (manual)
1. Ve a **Table Editor → election_data**
2. Click en el registro
3. Edita los datos
4. Los cambios se actualizan automáticamente en el sitio

### Desde API (programado)
Usa un webhook o GitHub Action para actualizar automáticamente:

```javascript
// Ejemplo con curl
curl -X PATCH \
  'https://your-project.supabase.co/rest/v1/election_data?id=eq.uuid' \
  -H 'Authorization: Bearer SUPABASE_SERVICE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"scrutinized_percentage": 75.5, "total_votes": 9000000}'
```

## ¿Cómo funciona?

```
Tu Aplicación (Next.js/Vercel)
    ↓
  useElectionData hook
    ↓
  try: Leer desde Supabase
    ↓
  Mostrar datos en tiempo real
    ↓
  Si falla: Usar Excel local como fallback
```

## Seguridad

- ✅ Las claves públicas (`NEXT_PUBLIC_*`) solo permiten LECTURA
- ✅ La clave `SUPABASE_SERVICE_KEY` solo se usa en scripts/backend
- ✅ Row Level Security (RLS) está activado
- ✅ Los datos son públicos de lectura, privados de escritura

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Verifica que tienes `NEXT_PUBLIC_SUPABASE_URL` configurado
- En desarrollo: Revisa `.env.local`
- En Vercel: Revisa Settings → Environment Variables

### Los datos no se actualizan
- Espera 5-10 segundos después de editar
- Recarga la página (F5)
- Revisa la consola del navegador por errores

### Error de conexión a Supabase
- Verifica que las credenciales son correctas
- Revisa que el proyecto Supabase está activo
- Intenta usar la consola de Supabase directamente

## URLs útiles

- Dashboard Supabase: https://app.supabase.com
- Documentación: https://supabase.com/docs
- SQL Editor: En la consola de Supabase
