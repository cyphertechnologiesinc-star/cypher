import { useState, useEffect } from 'react';
import { useElectionDataSupabase } from './use-election-data-supabase';
import { type ElectionData } from './excel-parser';

export function useElectionData() {
  const { data, loading, error, source } = useElectionDataSupabase();

  return { data, loading, error, source };
}
