"use client"

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signup } from '@/lib/auth'
import { Sparkles, AlertCircle, Check } from 'lucide-react'
import Link from 'next/link'

const PLAN_INFO = {
  starter: { name: 'Starter', price: '$19/mo' },
  pro: { name: 'Pro', price: '$49/mo' },
  scale: { name: 'Scale', price: '$99/mo' }
}

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planFromUrl = searchParams.get('plan') as 'starter' | 'pro' | 'scale' | null

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlanState] = useState<'starter' | 'pro' | 'scale' | null>(null)

  useEffect(() => {
    // Check for plan from URL or localStorage
    const storedPlan = localStorage.getItem('celan-selected-plan')
    const plan = planFromUrl || (storedPlan as 'starter' | 'pro' | 'scale' | null)
    if (plan && (plan === 'starter' || plan === 'pro' || plan === 'scale')) {
      setSelectedPlanState(plan)
    }
  }, [planFromUrl])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signup(email, password, name, selectedPlan || undefined)
      
      // Clear selected plan from localStorage
      localStorage.removeItem('celan-selected-plan')
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
            IA
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">Celan IA</span>
            <span className="text-xs text-gray-400">AI SaaS Platform</span>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              {selectedPlan ? `${PLAN_INFO[selectedPlan].name} Plan` : 'Get Started'}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-gray-400">Start building your AI SaaS today</p>
          </div>

          {/* Selected plan highlight */}
          {selectedPlan && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Selected plan:</p>
                  <p className="text-lg font-bold text-emerald-400">
                    {PLAN_INFO[selectedPlan].name} – {PLAN_INFO[selectedPlan].price}
                  </p>
                </div>
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="mt-2 text-xs text-gray-500">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
