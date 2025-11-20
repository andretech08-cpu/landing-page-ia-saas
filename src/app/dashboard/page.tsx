"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, logout } from '@/lib/auth'
import { Bot, LogOut, User, CreditCard, TrendingUp, Zap, Settings, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push('/login')
      } else {
        setUser(currentUser)
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleUpgrade = (plan: 'starter' | 'pro' | 'scale') => {
    if (!user) {
      router.push('/login')
      return
    }
    // Redirect to Stripe checkout with userId
    router.push(`/api/stripe/checkout?plan=${plan}&userId=${user.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const currentPlan = user?.plan || 'none'
  const planLimits = {
    none: { requests: 0, projects: 0 },
    starter: { requests: 1000, projects: 1 },
    pro: { requests: 10000, projects: 999 },
    scale: { requests: 50000, projects: 999 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      {/* Header */}
      <header className="bg-slate-950/80 backdrop-blur-sm border-b border-slate-700/70">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                IA
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Celan IA</span>
                <span className="text-xs text-gray-400">Dashboard</span>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link 
                href="/app" 
                className="hidden sm:flex items-center space-x-2 text-sm text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span>AI Chat</span>
              </Link>
              <Link 
                href="/help" 
                className="hidden sm:flex items-center space-x-2 text-sm text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-400">
            Manage your AI workspace and subscription
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              {currentPlan !== 'none' && (
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium uppercase">
                  {currentPlan}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Current Plan</h3>
            <p className="text-2xl font-bold text-emerald-400">
              {currentPlan === 'none' ? 'No Plan' : currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
            </p>
            {currentPlan === 'none' && (
              <p className="text-sm text-gray-400 mt-2">Choose a plan to get started</p>
            )}
          </div>

          {/* AI Requests */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">AI Requests</h3>
            <p className="text-2xl font-bold text-white">
              0 / {planLimits[currentPlan as keyof typeof planLimits].requests.toLocaleString()}
            </p>
            <div className="w-full bg-slate-700/50 rounded-full h-2 mt-3">
              <div className="bg-emerald-500 h-2 rounded-full" style={{width: '0%'}}></div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Active Projects</h3>
            <p className="text-2xl font-bold text-white">
              0 / {planLimits[currentPlan as keyof typeof planLimits].projects === 999 ? '∞' : planLimits[currentPlan as keyof typeof planLimits].projects}
            </p>
            <p className="text-sm text-gray-400 mt-2">No projects yet</p>
          </div>
        </div>

        {/* Subscription Management */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Subscription Management</h2>
          
          {currentPlan === 'none' ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-6">You don't have an active subscription yet</p>
              <Link
                href="/#pricing"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                View Plans
              </Link>
            </div>
          ) : (
            <div>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Starter */}
                <div className={`border rounded-2xl p-6 ${currentPlan === 'starter' ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-700/70'}`}>
                  <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                  <p className="text-3xl font-bold text-white mb-4">$19<span className="text-sm text-gray-400">/mo</span></p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-300">
                    <li>• 1,000 AI requests/month</li>
                    <li>• 1 active project</li>
                    <li>• Basic templates</li>
                  </ul>
                  {currentPlan === 'starter' ? (
                    <button disabled className="w-full bg-slate-700 text-gray-400 px-4 py-2 rounded-xl font-semibold cursor-not-allowed">
                      Current Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade('starter')}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-semibold transition-all"
                    >
                      {currentPlan === 'none' ? 'Choose Plan' : 'Downgrade'}
                    </button>
                  )}
                </div>

                {/* Pro */}
                <div className={`border rounded-2xl p-6 ${currentPlan === 'pro' ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-700/70'}`}>
                  <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                  <p className="text-3xl font-bold text-white mb-4">$49<span className="text-sm text-gray-400">/mo</span></p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-300">
                    <li>• 10,000 AI requests/month</li>
                    <li>• Unlimited projects</li>
                    <li>• Advanced features</li>
                  </ul>
                  {currentPlan === 'pro' ? (
                    <button disabled className="w-full bg-slate-700 text-gray-400 px-4 py-2 rounded-xl font-semibold cursor-not-allowed">
                      Current Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade('pro')}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-2 rounded-xl font-semibold transition-all"
                    >
                      {currentPlan === 'none' || currentPlan === 'starter' ? 'Upgrade' : 'Downgrade'}
                    </button>
                  )}
                </div>

                {/* Scale */}
                <div className={`border rounded-2xl p-6 ${currentPlan === 'scale' ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-700/70'}`}>
                  <h3 className="text-xl font-bold text-white mb-2">Scale</h3>
                  <p className="text-3xl font-bold text-white mb-4">$99<span className="text-sm text-gray-400">/mo</span></p>
                  <ul className="space-y-2 mb-6 text-sm text-gray-300">
                    <li>• 50,000 AI requests/month</li>
                    <li>• Team workspaces</li>
                    <li>• Priority support</li>
                  </ul>
                  {currentPlan === 'scale' ? (
                    <button disabled className="w-full bg-slate-700 text-gray-400 px-4 py-2 rounded-xl font-semibold cursor-not-allowed">
                      Current Plan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpgrade('scale')}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-2 rounded-xl font-semibold transition-all"
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/app"
            className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <Bot className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">AI Chat</h3>
                <p className="text-sm text-gray-400">Start chatting with your AI assistant</p>
              </div>
            </div>
          </Link>

          <Link
            href="/help"
            className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <HelpCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Help Center</h3>
                <p className="text-sm text-gray-400">Get help and documentation</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
