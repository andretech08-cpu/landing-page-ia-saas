import { supabase } from './supabase';

export type User = {
  id: string;
  email: string;
  name: string;
  plan?: 'starter' | 'pro' | 'scale';
};

// Signup com Supabase
export async function signup(email: string, password: string, name: string, plan?: string) {
  try {
    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    // Inserir dados adicionais na tabela users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name,
        plan: plan as 'starter' | 'pro' | 'scale' | undefined,
      })
      .select()
      .single();

    if (userError) throw userError;

    return { user: userData, session: authData.session };
  } catch (error: any) {
    console.error('Signup error:', error);
    throw new Error(error.message || 'Failed to sign up');
  }
}

// Login com Supabase
export async function login(email: string, password: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Invalid credentials');

    // Buscar dados do usuário
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) throw userError;

    return { user: userData, session: authData.session };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Invalid email or password');
  }
}

// Logout
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Failed to logout');
  }
}

// Obter usuário atual
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return null;

    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) throw error;

    return userData;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

// Atualizar plano do usuário
export async function updateUserPlan(userId: string, plan: 'starter' | 'pro' | 'scale') {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ plan })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error('Update plan error:', error);
    throw new Error(error.message || 'Failed to update plan');
  }
}

// Verificar se está autenticado
export async function isAuthenticated(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}
