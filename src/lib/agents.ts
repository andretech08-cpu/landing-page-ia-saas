import { supabase } from './supabase';

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

// Criar novo agente
export async function createAgent(
  userId: string,
  name: string,
  type: 'Support' | 'Sales' | 'Marketing' | 'Other',
  description?: string
) {
  try {
    const { data, error } = await supabase
      .from('agents')
      .insert({
        user_id: userId,
        name,
        type,
        description,
        status: 'Active',
        last_run: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error('Create agent error:', error);
    throw new Error(error.message || 'Failed to create agent');
  }
}

// Listar agentes do usuário
export async function getUserAgents(userId: string): Promise<Agent[]> {
  try {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error: any) {
    console.error('Get agents error:', error);
    return [];
  }
}

// Atualizar status do agente
export async function updateAgentStatus(
  agentId: string,
  status: 'Active' | 'Paused'
) {
  try {
    const { data, error } = await supabase
      .from('agents')
      .update({ status })
      .eq('id', agentId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error('Update agent status error:', error);
    throw new Error(error.message || 'Failed to update agent status');
  }
}

// Executar agente (atualizar last_run)
export async function runAgent(agentId: string) {
  try {
    const { data, error } = await supabase
      .from('agents')
      .update({ last_run: new Date().toISOString() })
      .eq('id', agentId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error: any) {
    console.error('Run agent error:', error);
    throw new Error(error.message || 'Failed to run agent');
  }
}

// Deletar agente
export async function deleteAgent(agentId: string) {
  try {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', agentId);

    if (error) throw error;

    return true;
  } catch (error: any) {
    console.error('Delete agent error:', error);
    throw new Error(error.message || 'Failed to delete agent');
  }
}
