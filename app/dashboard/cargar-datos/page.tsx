'use client';

import { useState, useEffect } from 'react';
import { parseElectionExcel, type ElectionData } from '@/lib/excel-parser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Check, AlertCircle, FileSpreadsheet } from 'lucide-react';

export default function CargarDatosPage() {
  const [data, setData] = useState<ElectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/election-data');
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (err) {
      console.log('No initial data available');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadStatus('uploading');
      setStatusMessage('Procesando archivo...');
      const electionData = await parseElectionExcel(file);
      setData(electionData);
      setUploadStatus('success');
      setStatusMessage(`Datos cargados exitosamente. ${electionData.candidates.length} candidatos procesados.`);
      setTimeout(() => setUploadStatus('idle'), 3000);
    } catch (err) {
      setUploadStatus('error');
      setStatusMessage(`Error: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Cargar Datos Electorales</h1>
        <p className="text-slate-400">Carga archivos Excel con los últimos resultados</p>
      </div>

      {/* Upload Area */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Subir Archivo Excel</CardTitle>
          <CardDescription>Formato soportado: .xlsx, .xls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-600 rounded-lg hover:border-slate-500 transition-colors">
            <FileSpreadsheet className="w-16 h-16 text-slate-400 mb-4" />
            <label htmlFor="file-upload-main" className="cursor-pointer text-center">
              <Button asChild variant="default" className="mb-4">
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Seleccionar Archivo
                </span>
              </Button>
              <input
                id="file-upload-main"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-sm text-slate-400 mt-2">O arrastra un archivo Excel aquí</p>
            <p className="text-xs text-slate-500 mt-4">
              Archivos compatibles: Presidente Total Votación - NACIONAL Y EN EL EXTRANJERO.xlsx
            </p>
          </div>

          {/* Status Messages */}
          {uploadStatus === 'uploading' && (
            <div className="mt-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
              <p className="text-blue-300">{statusMessage}</p>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400" />
              <p className="text-green-300">{statusMessage}</p>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-300">{statusMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Data Info */}
      {!loading && data && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Información del Archivo Cargado</CardTitle>
            <CardDescription>Datos actuales del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-slate-400 text-sm mb-1">Título</p>
                <p className="text-white font-semibold">{data.title}</p>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-slate-400 text-sm mb-1">Fecha de Datos</p>
                <p className="text-white font-semibold">{data.dataDate}</p>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-slate-400 text-sm mb-1">Emisión</p>
                <p className="text-white font-semibold">{data.emissionDate}</p>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-slate-400 text-sm mb-1">Mesas Escrutadas</p>
                <p className="text-blue-400 font-semibold text-lg">
                  {data.scrutinizedMesas.toLocaleString()} / {data.totalMesas.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-slate-400 text-sm mb-1">Votos Totales</p>
                <p className="text-green-400 font-semibold text-lg">
                  {data.totalVotes.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-slate-400 text-sm mb-1">Candidatos</p>
                <p className="text-purple-400 font-semibold text-lg">
                  {data.candidates.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-700/50">
        <CardHeader>
          <CardTitle className="text-white">Instrucciones de Carga</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-300">
          <p>Para cargar correctamente los datos electorales:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Descarga el archivo Excel desde SERVEL</li>
            <li>Verifica que tenga el nombre: "Presidente Total Votación - NACIONAL Y EN EL EXTRANJERO.xlsx"</li>
            <li>Haz click en "Seleccionar Archivo" o arrastra el archivo aquí</li>
            <li>El sistema procesará automáticamente los datos</li>
            <li>Los datos se actualizarán en todas las páginas del dashboard</li>
          </ol>
          <p className="text-xs text-slate-500 mt-4">
            ℹ️ Los cambios se aplican inmediatamente sin necesidad de recargar la página
          </p>
        </CardContent>
      </Card>

      {/* File Format Guide */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Formato Esperado</CardTitle>
          <CardDescription>Estructura del archivo Excel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 font-mono space-y-2">
            <p>Row 1: Encabezado (puede estar vacío)</p>
            <p>Row 2: Título - "Resultado Elección de Presidente"</p>
            <p>Row 4: Fecha - "Datos del DD-MM-YYYY HH:MM"</p>
            <p>Row 5-8: Información de mesas</p>
            <p>Row 10-17: Datos de candidatos (posición, nombre, votos, %)</p>
            <p>Row 18-21: Resumen (válidos, nulos, blancos, total)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
