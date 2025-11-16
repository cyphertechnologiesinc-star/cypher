import XLSX from 'xlsx';

export interface Candidate {
  name: string;
  votes: number;
  percentage: string;
  position: number;
  elected?: boolean;
}

export interface ElectionData {
  title: string;
  dataDate: string;
  emissionDate: string;
  totalMesas: number;
  installedMesas: number;
  scrutinizedMesas: number;
  scrutinizedPercentage: number;
  candidates: Candidate[];
  validVotes: number;
  validPercentage: string;
  nullVotes: number;
  nullPercentage: string;
  blankVotes: number;
  blankPercentage: string;
  totalVotes: number;
}

export function parseElectionExcel(file: File): Promise<ElectionData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (string | number)[][];

        // Parse structure
        const title = rows[1]?.[0] as string || 'Resultado Elección';
        const dataDate = (rows[3]?.[0] as string || '').replace('Datos del ', '').trim();
        const emissionDate = (rows[3]?.[3] as string || '').replace('Emisión ', '').trim();

        const totalMesasText = rows[5]?.[0] as string || '';
        const totalMesas = parseInt(totalMesasText.match(/\d+/)?.[0] || '0');

        const installedMesasText = rows[6]?.[0] as string || '';
        const installedMesas = parseInt(installedMesasText.match(/\d+/)?.[0] || '0');

        const scrutinizedText = rows[7]?.[0] as string || '';
        const scrutinizedMatch = scrutinizedText.match(/(\d+) mesas.*(\d+\.\d+)%/);
        const scrutinizedMesas = scrutinizedMatch ? parseInt(scrutinizedMatch[1]) : 0;
        const scrutinizedPercentage = scrutinizedMatch ? parseFloat(scrutinizedMatch[2]) : 0;

        // Parse candidates (rows 10-17)
        const candidates: Candidate[] = [];
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

        // Parse summary data
        const validVotesRow = rows[18];
        const validVotes = parseInt(String(validVotesRow?.[1]) || '0');
        const validPercentage = String(validVotesRow?.[2] || '');

        const nullVotesRow = rows[19];
        const nullVotes = parseInt(String(nullVotesRow?.[1]) || '0');
        const nullPercentage = String(nullVotesRow?.[2] || '');

        const blankVotesRow = rows[20];
        const blankVotes = parseInt(String(blankVotesRow?.[1]) || '0');
        const blankPercentage = String(blankVotesRow?.[2] || '');

        const totalVotesRow = rows[21];
        const totalVotes = parseInt(String(totalVotesRow?.[1]) || '0');

        const electionData: ElectionData = {
          title,
          dataDate,
          emissionDate,
          totalMesas,
          installedMesas,
          scrutinizedMesas,
          scrutinizedPercentage,
          candidates: candidates.sort((a, b) => b.votes - a.votes),
          validVotes,
          validPercentage,
          nullVotes,
          nullPercentage,
          blankVotes,
          blankPercentage,
          totalVotes
        };

        resolve(electionData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });
}

export async function parseElectionExcelFromPath(filePath: string): Promise<ElectionData> {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (string | number)[][];

    // Parse structure
    const title = rows[1]?.[0] as string || 'Resultado Elección';
    const dataDate = (rows[3]?.[0] as string || '').replace('Datos del ', '').trim();
    const emissionDate = (rows[3]?.[3] as string || '').replace('Emisión ', '').trim();

    const totalMesasText = rows[5]?.[0] as string || '';
    const totalMesas = parseInt(totalMesasText.match(/\d+/)?.[0] || '0');

    const installedMesasText = rows[6]?.[0] as string || '';
    const installedMesas = parseInt(installedMesasText.match(/\d+/)?.[0] || '0');

    const scrutinizedText = rows[7]?.[0] as string || '';
    const scrutinizedMatch = scrutinizedText.match(/(\d+) mesas.*(\d+\.\d+)%/);
    const scrutinizedMesas = scrutinizedMatch ? parseInt(scrutinizedMatch[1]) : 0;
    const scrutinizedPercentage = scrutinizedMatch ? parseFloat(scrutinizedMatch[2]) : 0;

    // Parse candidates (rows 10-17)
    const candidates: Candidate[] = [];
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

    // Parse summary data
    const validVotesRow = rows[18];
    const validVotes = parseInt(String(validVotesRow?.[1]) || '0');
    const validPercentage = String(validVotesRow?.[2] || '');

    const nullVotesRow = rows[19];
    const nullVotes = parseInt(String(nullVotesRow?.[1]) || '0');
    const nullPercentage = String(nullVotesRow?.[2] || '');

    const blankVotesRow = rows[20];
    const blankVotes = parseInt(String(blankVotesRow?.[1]) || '0');
    const blankPercentage = String(blankVotesRow?.[2] || '');

    const totalVotesRow = rows[21];
    const totalVotes = parseInt(String(totalVotesRow?.[1]) || '0');

    const electionData: ElectionData = {
      title,
      dataDate,
      emissionDate,
      totalMesas,
      installedMesas,
      scrutinizedMesas,
      scrutinizedPercentage,
      candidates: candidates.sort((a, b) => b.votes - a.votes),
      validVotes,
      validPercentage,
      nullVotes,
      nullPercentage,
      blankVotes,
      blankPercentage,
      totalVotes
    };

    return electionData;
  } catch (error) {
    throw new Error(`Failed to parse election data: ${error}`);
  }
}
