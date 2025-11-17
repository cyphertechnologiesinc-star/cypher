import { type ElectionData } from './excel-parser';
import { useAllElections } from './use-all-elections';

export function useElectionData() {
  const { latest, loading, error, source } = useAllElections();

  return { data: latest, loading, error, source };
}
