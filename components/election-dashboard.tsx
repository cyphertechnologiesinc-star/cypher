'use client';

import { useState, useEffect } from 'react';
import { parseElectionExcel, type ElectionData } from '@/lib/excel-parser';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, TrendingUp } from 'lucide-react';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function ElectionDashboard() {
  const [data, setData] = useState<ElectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      // Try to fetch from API that will use the uploaded file
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
      setLoading(true);
      setError(null);
      const electionData = await parseElectionExcel(file);
      setData(electionData);
    } catch (err) {
      setError(`Error loading file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Cargando datos electorales...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Dashboard Electoral</CardTitle>
              <CardDescription>Carga un archivo Excel con los resultados electorales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-600 rounded-lg">
                <Upload className="w-12 h-12 text-slate-400 mb-4" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button asChild variant="default" className="mb-2">
                    <span>Seleccionar archivo Excel</span>
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-slate-400 mt-2">O arrastra un archivo aquí</p>
              </div>
              {error && <div className="mt-4 p-4 bg-red-900 text-red-100 rounded-lg">{error}</div>}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const candidateChartData = data.candidates.map((c) => ({
    name: c.name.split(' ').slice(0, 2).join(' '),
    votes: c.votes,
    percentage: parseFloat(c.percentage),
  }));

  const voteTypeData = [
    { name: 'Válidos', value: data.validVotes, color: '#10b981' },
    { name: 'Nulos', value: data.nullVotes, color: '#ef4444' },
    { name: 'Blancos', value: data.blankVotes, color: '#94a3b8' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
            <p className="text-slate-400">
              Datos del {data.dataDate} | Emisión {data.emissionDate}
            </p>
          </div>
          <label htmlFor="file-upload-2" className="cursor-pointer">
            <Button asChild variant="outline">
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Actualizar datos
              </span>
            </Button>
            <input
              id="file-upload-2"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Mesas Escrutadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{data.scrutinizedMesas.toLocaleString()}</div>
              <p className="text-xs text-slate-400 mt-1">
                {data.scrutinizedPercentage.toFixed(2)}% de {data.totalMesas.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Votos Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{data.totalVotes.toLocaleString()}</div>
              <p className="text-xs text-slate-400 mt-1">Votos procesados</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Votos Válidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{data.validVotes.toLocaleString()}</div>
              <p className="text-xs text-slate-400 mt-1">{data.validPercentage}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Votos Nulos/Blancos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-400">
                {(data.nullVotes + data.blankVotes).toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {((data.nullVotes + data.blankVotes) / data.totalVotes * 100).toFixed(2)}% del total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Candidates Bar Chart */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Votos por Candidato</CardTitle>
              <CardDescription>Resultados actuales</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={candidateChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#cbd5e1', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: '#cbd5e1' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [(value as number).toLocaleString(), 'Votos']}
                  />
                  <Bar dataKey="votes" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Vote Type Pie Chart */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Composición de Votos</CardTitle>
              <CardDescription>Distribuición de tipos de voto</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={voteTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {voteTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [(value as number).toLocaleString(), 'Votos']}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Candidates Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Ranking de Candidatos
            </CardTitle>
            <CardDescription>Resultados preliminares</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Posición</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Candidato</th>
                    <th className="text-right py-3 px-4 text-slate-300 font-semibold">Votos</th>
                    <th className="text-right py-3 px-4 text-slate-300 font-semibold">Porcentaje</th>
                    <th className="text-center py-3 px-4 text-slate-300 font-semibold">Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {data.candidates.map((candidate, index) => (
                    <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-bold">
                          {candidate.position}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white">{candidate.name}</td>
                      <td className="py-3 px-4 text-right text-white font-semibold">
                        {candidate.votes.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-300">{candidate.percentage}</td>
                      <td className="py-3 px-4 text-center">
                        {candidate.elected ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                            ✓ Electo
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Resumen Electoral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <p className="text-slate-300 text-sm mb-1">Votos Válidamente Emitidos</p>
                <p className="text-2xl font-bold text-green-400">{data.validVotes.toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-1">{data.validPercentage}</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <p className="text-slate-300 text-sm mb-1">Votos Nulos</p>
                <p className="text-2xl font-bold text-red-400">{data.nullVotes.toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-1">{data.nullPercentage}</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <p className="text-slate-300 text-sm mb-1">Votos en Blanco</p>
                <p className="text-2xl font-bold text-orange-400">{data.blankVotes.toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-1">{data.blankPercentage}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-400 py-4">
          <p>Resultados preliminares según artículo 185, Ley 18.700. Sin valor legal como escrutinio.</p>
        </div>
      </div>
    </div>
  );
}
