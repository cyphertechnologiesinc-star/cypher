import { useState, useEffect } from 'react';
import { supabase } from './supabase-client';
import { type ElectionData } from './excel-parser';

export interface AllElectionsData {
  latest: ElectionData | null;
  elections2025: ElectionData | null;
  elections2021: ElectionData | null;
  allHistorical: ElectionData[];
  loading: boolean;
  error: string | null;
  source: 'supabase' | 'local';
}

function transformDbToElectionData(dbData: any): ElectionData {
  return {
    title: dbData.title,
    dataDate: dbData.data_date,
    emissionDate: dbData.emission_date,
    totalMesas: dbData.total_mesas,
    installedMesas: dbData.installed_mesas,
    scrutinizedMesas: dbData.scrutinized_mesas,
    scrutinizedPercentage: dbData.scrutinized_percentage,
    candidates: dbData.candidates.sort((a: any, b: any) => b.votes - a.votes),
    validVotes: dbData.valid_votes,
    validPercentage: dbData.valid_percentage,
    nullVotes: dbData.null_votes,
    nullPercentage: dbData.null_percentage,
    blankVotes: dbData.blank_votes,
    blankPercentage: dbData.blank_percentage,
    totalVotes: dbData.total_votes,
  };
}

export function useAllElections(): AllElectionsData {
  const [latest, setLatest] = useState<ElectionData | null>(null);
  const [elections2025, setElections2025] = useState<ElectionData | null>(null);
  const [elections2021, setElections2021] = useState<ElectionData | null>(null);
  const [allHistorical, setAllHistorical] = useState<ElectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'supabase' | 'local'>('local');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (supabase) {
          try {
            // Get all elections ordered by data_date
            const { data: allData, error: dbError } = await supabase
              .from('election_data')
              .select('*')
              .order('data_date', { ascending: false });

            if (!dbError && allData && allData.length > 0) {
              // Transform all data
              const transformedData = allData.map(transformDbToElectionData);

              // Find latest (first in descending order)
              setLatest(transformedData[0]);

              // Find 2025 and 2021 elections
              const election2025 = transformedData.find(
                (e) => e.title.includes('2025')
              );
              const election2021 = transformedData.find(
                (e) => e.title.includes('2021')
              );

              setElections2025(election2025 || null);
              setElections2021(election2021 || null);
              setAllHistorical(transformedData);
              setSource('supabase');
              return;
            }
          } catch (supabaseError) {
            console.warn('Supabase read failed, falling back to local Excel:', supabaseError);
          }
        }

        // Fallback to local Excel file
        const response = await fetch('/election-data.xlsx');
        if (!response.ok) {
          throw new Error('Failed to fetch local election data');
        }

        const arrayBuffer = await response.arrayBuffer();
        const XLSX = await import('xlsx');
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (string | number)[][];

        // Parse structure (same as before)
        const title = rows[1]?.[0] as string || 'Resultado Elección';
        const dataDate = (rows[3]?.[0] as string || '').replace('Datos del ', '').trim();
        const emissionDate = (rows[3]?.[3] as string || '').replace('Emisión ', '').trim();

        const totalMesasText = rows[5]?.[0] as string || '';
        const totalMesas = parseInt(totalMesasText.match(/\d+/)?.[0] || '0');

        const scrutinizedText = rows[7]?.[0] as string || '';
        const scrutinizedMatch = scrutinizedText.match(/(\d+) mesas.*(\d+\.\d+)%/);
        const scrutinizedMesas = scrutinizedMatch ? parseInt(scrutinizedMatch[1]) : 0;
        const scrutinizedPercentage = scrutinizedMatch ? parseFloat(scrutinizedMatch[2]) : 0;

        // Parse candidates
        const candidates = [];
        for (let i = 10; i < 18; i++) {
          const row = rows[i];
          if (row && row[0]) {
            const nameWithNumber = row[0] as string;
            const position = parseInt(nameWithNumber.match(/^\d+/)?.[0] || '0');
            const name = nameWithNumber.replace(/^\d+\s/, '');
            const votes = parseInt(String(row[1]) || '0');
            const percentage = String(row[2] || '');

            candidates.push({
              position,
              name,
              votes,
              percentage,
              elected: row[3] === '✓'
            });
          }
        }

        // Parse summary
        const validVotes = parseInt(String(rows[18]?.[1]) || '0');
        const nullVotes = parseInt(String(rows[19]?.[1]) || '0');
        const blankVotes = parseInt(String(rows[20]?.[1]) || '0');
        const totalVotes = parseInt(String(rows[21]?.[1]) || '0');

        const electionData: ElectionData = {
          title,
          dataDate,
          emissionDate,
          totalMesas,
          installedMesas: totalMesas,
          scrutinizedMesas,
          scrutinizedPercentage,
          candidates: candidates.sort((a, b) => b.votes - a.votes),
          validVotes,
          validPercentage: String(rows[18]?.[2] || ''),
          nullVotes,
          nullPercentage: String(rows[19]?.[2] || ''),
          blankVotes,
          blankPercentage: String(rows[20]?.[2] || ''),
          totalVotes
        };

        setLatest(electionData);
        setAllHistorical([electionData]);
        setSource('local');
      } catch (err) {
        console.error('Error loading election data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    latest,
    elections2025,
    elections2021,
    allHistorical,
    loading,
    error,
    source,
  };
}
