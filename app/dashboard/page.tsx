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
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, TrendingUp, Target } from 'lucide-react';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function DashboardPage() {
  const [data, setData] = useState<ElectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Cargando datos electorales...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{data.title}</h1>
          <p className="text-slate-400">
            Datos del {data.dataDate} | Emisión {data.emissionDate}
          </p>
        </div>
        <label htmlFor="file-upload-dashboard" className="cursor-pointer">
          <Button asChild variant="outline">
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Actualizar datos
            </span>
          </Button>
          <input
            id="file-upload-dashboard"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium text-slate-300">Candidato Líder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {data.candidates[0]?.percentage}
            </div>
            <p className="text-xs text-slate-400 mt-1">{data.candidates[0]?.name.split(' ')[0]}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
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

        {/* Pie Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Composición de Votos</CardTitle>
            <CardDescription>Distribución de tipos</CardDescription>
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

      {/* Top 3 Candidates */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Top 3 Candidatos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.candidates.slice(0, 3).map((candidate, index) => (
              <div
                key={index}
                className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{candidate.name}</p>
                      <p className="text-xs text-slate-400">{candidate.votes.toLocaleString()} votos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">{candidate.percentage}</p>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: candidate.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
