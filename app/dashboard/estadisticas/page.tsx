'use client';

import { useState, useEffect } from 'react';
import { parseElectionExcel, type ElectionData } from '@/lib/excel-parser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, BarChart3, Percent } from 'lucide-react';
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

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function EstadisticasPage() {
  const [data, setData] = useState<ElectionData | null>(null);
  const [loading, setLoading] = useState(true);

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
      const electionData = await parseElectionExcel(file);
      setData(electionData);
    } catch (err) {
      console.error('Error loading file:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Estadísticas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">No hay datos cargados. Carga un archivo Excel.</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for charts
  const voteTypeData = [
    { name: 'Válidos', value: data.validVotes, color: '#10b981' },
    { name: 'Nulos', value: data.nullVotes, color: '#ef4444' },
    { name: 'Blancos', value: data.blankVotes, color: '#94a3b8' },
  ];

  const candidateChartData = data.candidates.map((c) => ({
    name: c.name.split(' ').slice(0, 2).join(' '),
    votos: c.votes,
    porcentaje: parseFloat(c.percentage),
  }));

  const percentageData = [
    { name: 'Válidos', value: parseFloat(data.validPercentage) },
    { name: 'Nulos', value: parseFloat(data.nullPercentage) },
    { name: 'Blancos', value: parseFloat(data.blankPercentage) },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Estadísticas Electoral</h1>
          <p className="text-slate-400">Análisis detallado de los resultados</p>
        </div>
        <label htmlFor="file-upload-stats" className="cursor-pointer">
          <Button asChild variant="outline">
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Cargar datos
            </span>
          </Button>
          <input
            id="file-upload-stats"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Escrutinio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              {data.scrutinizedPercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {data.scrutinizedMesas.toLocaleString()} de {data.totalMesas.toLocaleString()} mesas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total de Votos</CardTitle>
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
            <div className="text-3xl font-bold text-green-400">
              {((data.validVotes / data.totalVotes) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-slate-400 mt-1">{data.validVotes.toLocaleString()} votos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Vote Type */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Distribución de Votos</CardTitle>
            <CardDescription>Composición por tipo de voto</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={voteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
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

        {/* Bar Chart - Vote Percentages */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Porcentajes por Tipo</CardTitle>
            <CardDescription>Comparativa de porcentajes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={percentageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" tick={{ fill: '#cbd5e1' }} />
                <YAxis tick={{ fill: '#cbd5e1' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`${(value as number).toFixed(2)}%`, 'Porcentaje']}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Comparativa de Votos por Candidato</CardTitle>
          <CardDescription>Votos recibidos ordenados de mayor a menor</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={candidateChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
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
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              <Bar dataKey="votos" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {candidateChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Desglose Detallado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <p className="text-slate-400 text-sm mb-2">Votos Válidos</p>
              <p className="text-2xl font-bold text-green-400">{data.validVotes.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-1">{data.validPercentage} del total</p>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <p className="text-slate-400 text-sm mb-2">Votos Nulos</p>
              <p className="text-2xl font-bold text-red-400">{data.nullVotes.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-1">{data.nullPercentage} del total</p>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <p className="text-slate-400 text-sm mb-2">Votos en Blanco</p>
              <p className="text-2xl font-bold text-orange-400">{data.blankVotes.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-1">{data.blankPercentage} del total</p>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <p className="text-slate-400 text-sm mb-2">Mesas Escrutadas</p>
              <p className="text-2xl font-bold text-blue-400">{data.scrutinizedMesas.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-1">
                {data.scrutinizedPercentage.toFixed(2)}% del total
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Statistics */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Top 5 Candidatos</CardTitle>
          <CardDescription>Candidatos con mayor cantidad de votos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.candidates.slice(0, 5).map((candidate, index) => (
              <div
                key={index}
                className="p-3 bg-slate-700/30 rounded-lg border border-slate-600 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{candidate.name}</p>
                    <p className="text-xs text-slate-500">{candidate.votes.toLocaleString()} votos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-bold">{candidate.percentage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
