"use client"

import { useState } from 'react'
import { Search, Book, MessageCircle, FileText, Video, ChevronDown, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      articles: [
        { title: 'How to create your first account', link: '#' },
        { title: 'Choosing the right plan for you', link: '#' },
        { title: 'Setting up your first AI agent', link: '#' },
        { title: 'Understanding the dashboard', link: '#' },
      ]
    },
    {
      id: 'ai-features',
      title: 'AI Features',
      icon: MessageCircle,
      articles: [
        { title: 'How to use the AI chat', link: '#' },
        { title: 'Training your AI assistant', link: '#' },
        { title: 'API integration guide', link: '#' },
        { title: 'Best practices for AI prompts', link: '#' },
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Plans',
      icon: FileText,
      articles: [
        { title: 'Understanding pricing plans', link: '#' },
        { title: 'How to upgrade or downgrade', link: '#' },
        { title: 'Payment methods accepted', link: '#' },
        { title: 'Cancellation and refund policy', link: '#' },
      ]
    },
    {
      id: 'tutorials',
      title: 'Video Tutorials',
      icon: Video,
      articles: [
        { title: 'Platform overview (5 min)', link: '#' },
        { title: 'Creating your first automation', link: '#' },
        { title: 'Advanced AI configuration', link: '#' },
        { title: 'Team collaboration features', link: '#' },
      ]
    },
  ]

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0)

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
                <span className="text-xs text-gray-400">Help Center</span>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-sm text-gray-300 hover:text-emerald-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/app"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              >
                AI Chat
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Search our knowledge base or browse categories below
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-slate-700/70 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {(searchQuery ? filteredCategories : categories).map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id

              return (
                <div
                  key={category.id}
                  className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setActiveCategory(isActive ? null : category.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-slate-800/50 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        <p className="text-sm text-gray-400">{category.articles.length} articles</p>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isActive && (
                    <div className="px-6 pb-6 space-y-2">
                      {category.articles.map((article, index) => (
                        <a
                          key={index}
                          href={article.link}
                          className="block p-3 rounded-xl hover:bg-slate-800/50 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 group-hover:text-emerald-400 transition-colors">
                              {article.title}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Still need help?
            </h2>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/app"
                className="inline-flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat with AI Support</span>
              </Link>
              <a
                href="mailto:support@celan-ia.com"
                className="inline-flex items-center justify-center space-x-2 border-2 border-emerald-500/50 hover:border-emerald-500 text-emerald-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <FileText className="w-5 h-5" />
                <span>Email Support</span>
              </a>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Popular Topics
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Account Setup',
                'API Integration',
                'Billing Questions',
                'AI Training',
                'Team Management',
                'Security & Privacy'
              ].map((topic, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-xl p-4 text-center hover:border-emerald-500/50 transition-all group"
                >
                  <span className="text-gray-300 group-hover:text-emerald-400 transition-colors">
                    {topic}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
