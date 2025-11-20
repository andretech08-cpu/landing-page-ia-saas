import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export type User = {
  id: string;
  email: string;
  name: string;
  plan?: 'starter' | 'pro' | 'scale';
  created_at: string;
};

export type Agent = {
  id: string;
  user_id: string;
  name: string;
  type: 'Support' | 'Sales' | 'Marketing' | 'Other';
  description?: string;
  status: 'Active' | 'Paused';
  last_run: string;
  created_at: string;
};
