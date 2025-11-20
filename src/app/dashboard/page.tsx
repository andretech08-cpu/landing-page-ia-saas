"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, logout, updateUserPlan } from '@/lib/auth'
import { getUserAgents, createAgent as createAgentDB, updateAgentStatus, runAgent as runAgentDB, type Agent } from '@/lib/agents'
import { 
  DollarSign, 
  Users, 
  Zap, 
  Bot, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  LogOut,
  X,
  Play
} from 'lucide-react'
import Link from 'next/link'

const PLAN_INFO = {
  starter: { name: 'Starter', price: '$19/mo', color: 'text-blue-400' },
  pro: { name: 'Pro', price: '$49/mo', color: 'text-emerald-400' },
  scale: { name: 'Scale', price: '$99/mo', color: 'text-purple-400' }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [agents, setAgents] = useState<Agent[]>([])
  const [showModal, setShowModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  // Form state
  const [agentName, setAgentName] = useState('')
  const [agentType, setAgentType] = useState<'Support' | 'Sales' | 'Marketing' | 'Other'>('Support')
  const [agentDescription, setAgentDescription] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/login')
      } else {
        setUser(currentUser)
        // Load agents for this user
        const userAgents = await getUserAgents(currentUser.id)
        setAgents(userAgents)
        setLoading(false)
      }
    }
    
    loadUser()
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleCreateAgent = async () => {
    setFormError('')
    
    if (!agentName.trim()) {
      setFormError('Agent name is required')
      return
    }

    try {
      const newAgent = await createAgentDB(user.id, agentName, agentType, agentDescription)
      
      // Add new agent to list
      setAgents([newAgent, ...agents])
      
      // Show success message
      setSuccessMessage('Agent created successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Reset form and close modal
      setAgentName('')
      setAgentType('Support')
      setAgentDescription('')
      setShowModal(false)
    } catch (error: any) {
      setFormError(error.message || 'Failed to create agent')
    }
  }

  const handleToggleStatus = async (agentId: string) => {
    try {
      const agent = agents.find(a => a.id === agentId)
      if (!agent) return
      
      const newStatus = agent.status === 'Active' ? 'Paused' : 'Active'
      await updateAgentStatus(agentId, newStatus)
      
      // Update agents list
      const updatedAgents = await getUserAgents(user.id)
      setAgents(updatedAgents)
      
      setSuccessMessage('Agent status updated!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Failed to toggle agent status:', error)
    }
  }

  const handleRunAgent = async (agentId: string) => {
    try {
      await runAgentDB(agentId)
      
      // Update agents list
      const updatedAgents = await getUserAgents(user.id)
      setAgents(updatedAgents)
      
      setSuccessMessage('Agent executed successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Failed to run agent:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Mock recent activity
  const mockActivity = [
    { action: 'New user registered', time: '5 minutes ago', type: 'success' },
    { action: 'AI agent processed 150 requests', time: '30 minutes ago', type: 'info' },
    { action: 'Monthly report generated', time: '2 hours ago', type: 'success' },
    { action: 'API limit warning (80% used)', time: '4 hours ago', type: 'warning' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      {/* Success message toast */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-slate-900 px-6 py-3 rounded-xl shadow-lg font-semibold animate-in slide-in-from-top">
          {successMessage}
        </div>
      )}

      {/* Modal for creating agent */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/70 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Create New Agent</h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  setFormError('')
                  setAgentName('')
                  setAgentType('Support')
                  setAgentDescription('')
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-red-400">{formError}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Agent Name *
                </label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="e.g., Customer Support Bot"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={agentType}
                  onChange={(e) => setAgentType(e.target.value as 'Support' | 'Sales' | 'Marketing' | 'Other')}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                >
                  <option value="Support">Support</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  placeholder="Brief description of what this agent does..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setFormError('')
                    setAgentName('')
                    setAgentType('Support')
                    setAgentDescription('')
                  }}
                  className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAgent}
                  className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl font-semibold transition-all"
                >
                  Create Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-sm border-b border-slate-700/70">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                IA
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Celan IA</span>
                <span className="text-xs text-gray-400">AI SaaS Platform</span>
              </div>
            </Link>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/help" 
                className="text-sm text-gray-300 hover:text-emerald-400 transition-colors"
              >
                Help
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-400">Here's what's happening with your AI SaaS today</p>
        </div>

        {/* Current Plan Card */}
        {user?.plan ? (
          <div className="mb-8 bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Current Plan</p>
                <p className={`text-2xl font-bold ${PLAN_INFO[user.plan as keyof typeof PLAN_INFO].color}`}>
                  {PLAN_INFO[user.plan as keyof typeof PLAN_INFO].name} – {PLAN_INFO[user.plan as keyof typeof PLAN_INFO].price}
                </p>
              </div>
              <Link 
                href="/#pricing"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-all"
              >
                Change Plan
              </Link>
            </div>
          </div>
        ) : (
          <div className="mb-8 bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">No active plan</p>
                <p className="text-white">Choose a plan to unlock all features</p>
              </div>
              <Link 
                href="/#pricing"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl text-sm font-semibold transition-all"
              >
                Choose Plan
              </Link>
            </div>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Monthly Revenue */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Monthly Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">$12,450</div>
            <div className="flex items-center text-sm text-emerald-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +23.5% from last month
            </div>
          </div>

          {/* Active Clients */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Active Clients</span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1,247</div>
            <div className="flex items-center text-sm text-emerald-400">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.3% from last month
            </div>
          </div>

          {/* AI Requests */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">AI Requests</span>
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">8,432</div>
            <div className="flex items-center text-sm text-gray-400">
              <span>of 10,000 limit</span>
            </div>
          </div>
        </div>

        {/* My AI Agents */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">My AI Agents</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Create new agent</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {agents.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No agents yet</p>
                <p className="text-sm text-gray-500">Create your first AI agent to get started</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Last run</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <Bot className="w-5 h-5 text-emerald-400" />
                          <span className="text-white font-medium">{agent.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{agent.type}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStatus(agent.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all hover:scale-105 ${
                            agent.status === 'Active' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20' 
                              : 'bg-gray-500/10 text-gray-400 border border-gray-500/20 hover:bg-gray-500/20'
                          }`}
                        >
                          {agent.status === 'Active' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {agent.status}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          {new Date(agent.last_run).toLocaleString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleRunAgent(agent.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-medium transition-all"
                        >
                          <Play className="w-3 h-3" />
                          <span>Run</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {mockActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-slate-800/30 rounded-2xl">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-emerald-400' :
                  activity.type === 'warning' ? 'bg-yellow-400' :
                  'bg-blue-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-700/70 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Celan IA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
