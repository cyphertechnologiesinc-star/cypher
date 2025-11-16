'use client';

import { useElectionData } from '@/lib/use-election-data';
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
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowRight } from 'lucide-react';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function ElectionSummaryHome() {
  const { data, loading, error } = useElectionData();

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
          <p className="text-white/70 text-sm">Cargando datos electorales...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  const candidateChartData = data.candidates.slice(0, 5).map((c) => ({
    name: c.name.split(' ').slice(0, 2).join(' '),
    votos: c.votes,
    porcentaje: parseFloat(c.percentage),
  }));

  const voteTypeData = [
    { name: 'Válidos', value: data.validVotes, color: '#10b981' },
    { name: 'Nulos', value: data.nullVotes, color: '#ef4444' },
    { name: 'Blancos', value: data.blankVotes, color: '#94a3b8' },
  ];

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-400 font-semibold uppercase tracking-wide">
              Resultados en Tiempo Real
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{data.title}</h2>
          <p className="text-slate-400 text-sm">
            Datos del {data.dataDate} | Actualizado {data.emissionDate}
          </p>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <p className="text-white/60 text-xs mb-1">Mesas Escrutadas</p>
            <p className="text-2xl font-bold text-white">
              {data.scrutinizedPercentage.toFixed(1)}%
            </p>
            <p className="text-xs text-white/40 mt-1">
              {data.scrutinizedMesas.toLocaleString()} mesas
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <p className="text-white/60 text-xs mb-1">Votos Totales</p>
            <p className="text-2xl font-bold text-white">{data.totalVotes.toLocaleString()}</p>
            <p className="text-xs text-white/40 mt-1">Votos procesados</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <p className="text-white/60 text-xs mb-1">Líder</p>
            <p className="text-2xl font-bold text-green-400">{data.candidates[0]?.percentage}</p>
            <p className="text-xs text-white/40 mt-1 truncate">{data.candidates[0]?.name.split(' ')[0]}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
            <p className="text-white/60 text-xs mb-1">Votos Válidos</p>
            <p className="text-2xl font-bold text-green-400">{data.validPercentage}</p>
            <p className="text-xs text-white/40 mt-1">
              {data.validVotes.toLocaleString()} votos
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Top 5 Candidatos</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={candidateChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [(value as number).toLocaleString(), 'Votos']}
                />
                <Bar dataKey="votos" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Composición de Votos</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={voteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={70}
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
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 3 Candidates */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
          <h3 className="text-white font-semibold mb-4">🏆 Candidatos Líderes</h3>
          <div className="space-y-3">
            {data.candidates.slice(0, 3).map((candidate, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{candidate.name}</p>
                  <p className="text-white/50 text-xs">{candidate.votes.toLocaleString()} votos</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold text-lg">{candidate.percentage}</p>
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: candidate.percentage }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              Ver Dashboard Completo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
