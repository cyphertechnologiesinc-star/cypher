import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
  )
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
)

export type PresidentialElection = {
  id: string
  year: number
  round: "primera" | "segunda"
  candidates: Array<{
    name: string
    party: string
    votes: number
    percentage: number
    elected: boolean
  }>
  total_votes: number
  turnout: number
  date: string
}
