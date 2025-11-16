import { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import { type ElectionData } from './excel-parser';

export function useElectionData() {
  const [data, setData] = useState<ElectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from public folder
        const response = await fetch('/election-data.xlsx');
        if (!response.ok) {
          throw new Error('Failed to fetch election data');
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (string | number)[][];

        // Parse structure
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

        setData(electionData);
      } catch (err) {
        console.error('Error loading election data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}
