import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client with fallback if env vars are missing
// This allows build-time compilation without requiring Supabase
export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Type for election data in Supabase
export interface ElectionDataDB {
  id: string;
  title: string;
  data_date: string;
  emission_date: string;
  total_mesas: number;
  installed_mesas: number;
  scrutinized_mesas: number;
  scrutinized_percentage: number;
  valid_votes: number;
  valid_percentage: string;
  null_votes: number;
  null_percentage: string;
  blank_votes: number;
  blank_percentage: string;
  total_votes: number;
  candidates: Array<{
    position: number;
    name: string;
    votes: number;
    percentage: string;
    elected?: boolean;
  }>;
  created_at: string;
  updated_at: string;
}
