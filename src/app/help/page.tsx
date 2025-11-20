"use client"

import { useState } from 'react'
import { Search, Book, CreditCard, Bot, Home } from 'lucide-react'
import Link from 'next/link'

type Language = 'pt' | 'en'

const HELP_TEXTS = {
  pt: {
    title: "Central de Ajuda",
    subtitle: "Encontre tudo o que você precisa saber sobre a Celan IA",
    searchPlaceholder: "Buscar artigos...",
    backHome: "← Voltar para início",
    
    // Categories
    gettingStarted: "Primeiros Passos",
    plansBilling: "Planos e Cobrança",
    aiAgents: "Agentes de IA",
    
    // Getting Started articles
    article1Title: "Como criar sua primeira conta",
    article1Content: "Criar uma conta na Celan IA é simples e rápido. Clique em 'Criar conta' no topo da página, preencha seus dados (nome, email e senha) e pronto! Você será automaticamente direcionado para o dashboard onde pode começar a configurar sua plataforma imediatamente.",
    
    article2Title: "Configurando sua marca",
    article2Content: "Personalize sua plataforma com a identidade visual da sua marca. No dashboard, acesse as configurações e customize logo, cores, textos e idiomas. Todas as mudanças são aplicadas em tempo real e você pode visualizar antes de publicar.",
    
    article3Title: "Escolhendo seu primeiro plano",
    article3Content: "Oferecemos três planos principais: Starter ($19/mês) para validação inicial, Pro ($49/mês) para agências e negócios digitais, e Scale ($99/mês) para empresas que precisam de escala. Você pode trocar de plano a qualquer momento sem burocracia.",
    
    // Plans & Billing articles
    article4Title: "Como funcionam os pagamentos",
    article4Content: "Todos os pagamentos são processados em dólar americano (USD) através de gateways seguros. A cobrança é mensal e você pode cancelar a qualquer momento sem multas ou taxas de cancelamento. Aceitamos cartões de crédito internacionais.",
    
    article5Title: "Upgrade e downgrade de planos",
    article5Content: "Você pode mudar de plano a qualquer momento no dashboard. O upgrade é instantâneo e você paga apenas a diferença proporcional. No downgrade, o crédito é aplicado no próximo ciclo de cobrança.",
    
    article6Title: "Política de reembolso",
    article6Content: "Oferecemos garantia de 7 dias para novos clientes. Se você não estiver satisfeito, entre em contato através do dashboard e processaremos o reembolso integral. Após 7 dias, não há reembolso mas você pode cancelar a qualquer momento.",
    
    // AI Agents articles
    article7Title: "O que são agentes de IA",
    article7Content: "Agentes de IA são chatbots inteligentes que podem atender seus clientes 24/7, responder perguntas, qualificar leads e até processar vendas. Eles aprendem continuamente e se integram com seus sistemas existentes.",
    
    article8Title: "Criando seu primeiro agente",
    article8Content: "No dashboard, clique em 'Criar novo agente', escolha o tipo (suporte, vendas, marketing), configure as respostas base e treine com seus dados. Em poucos minutos seu agente estará pronto para atender clientes.",
    
    article9Title: "Integrações disponíveis",
    article9Content: "Nossos agentes se integram com CRMs populares, plataformas de email marketing, sistemas de pagamento e muito mais. Todas as integrações são configuradas através de APIs simples e documentadas.",
  },
  en: {
    title: "Help Center",
    subtitle: "Find everything you need to know about Celan IA",
    searchPlaceholder: "Search articles...",
    backHome: "← Back to home",
    
    // Categories
    gettingStarted: "Getting Started",
    plansBilling: "Plans & Billing",
    aiAgents: "AI Agents",
    
    // Getting Started articles
    article1Title: "How to create your first account",
    article1Content: "Creating an account on Celan IA is simple and fast. Click 'Create account' at the top of the page, fill in your details (name, email and password) and you're done! You'll be automatically directed to the dashboard where you can start setting up your platform immediately.",
    
    article2Title: "Setting up your brand",
    article2Content: "Customize your platform with your brand's visual identity. In the dashboard, access settings and customize logo, colors, texts and languages. All changes are applied in real-time and you can preview before publishing.",
    
    article3Title: "Choosing your first plan",
    article3Content: "We offer three main plans: Starter ($19/mo) for initial validation, Pro ($49/mo) for agencies and digital businesses, and Scale ($99/mo) for companies that need scale. You can change plans at any time without bureaucracy.",
    
    // Plans & Billing articles
    article4Title: "How payments work",
    article4Content: "All payments are processed in US dollars (USD) through secure gateways. Billing is monthly and you can cancel at any time without penalties or cancellation fees. We accept international credit cards.",
    
    article5Title: "Plan upgrade and downgrade",
    article5Content: "You can change plans at any time in the dashboard. Upgrades are instant and you only pay the proportional difference. On downgrades, credit is applied to the next billing cycle.",
    
    article6Title: "Refund policy",
    article6Content: "We offer a 7-day guarantee for new customers. If you're not satisfied, contact us through the dashboard and we'll process a full refund. After 7 days, there are no refunds but you can cancel at any time.",
    
    // AI Agents articles
    article7Title: "What are AI agents",
    article7Content: "AI agents are intelligent chatbots that can serve your customers 24/7, answer questions, qualify leads and even process sales. They learn continuously and integrate with your existing systems.",
    
    article8Title: "Creating your first agent",
    article8Content: "In the dashboard, click 'Create new agent', choose the type (support, sales, marketing), configure base responses and train with your data. In minutes your agent will be ready to serve customers.",
    
    article9Title: "Available integrations",
    article9Content: "Our agents integrate with popular CRMs, email marketing platforms, payment systems and more. All integrations are configured through simple and documented APIs.",
  }
}

export default function HelpPage() {
  const [lang, setLang] = useState<Language>('en')
  const [searchQuery, setSearchQuery] = useState('')
  const t = HELP_TEXTS[lang]

  // Filter articles based on search
  const articles = [
    { category: 'gettingStarted', title: t.article1Title, content: t.article1Content, icon: Book },
    { category: 'gettingStarted', title: t.article2Title, content: t.article2Content, icon: Book },
    { category: 'gettingStarted', title: t.article3Title, content: t.article3Content, icon: Book },
    { category: 'plansBilling', title: t.article4Title, content: t.article4Content, icon: CreditCard },
    { category: 'plansBilling', title: t.article5Title, content: t.article5Content, icon: CreditCard },
    { category: 'plansBilling', title: t.article6Title, content: t.article6Content, icon: CreditCard },
    { category: 'aiAgents', title: t.article7Title, content: t.article7Content, icon: Bot },
    { category: 'aiAgents', title: t.article8Title, content: t.article8Content, icon: Bot },
    { category: 'aiAgents', title: t.article9Title, content: t.article9Content, icon: Bot },
  ]

  const filteredArticles = searchQuery
    ? articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : articles

  const getCategoryTitle = (category: string) => {
    switch(category) {
      case 'gettingStarted': return t.gettingStarted
      case 'plansBilling': return t.plansBilling
      case 'aiAgents': return t.aiAgents
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
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

            {/* Language switcher */}
            <div className="flex items-center space-x-1 bg-slate-800/50 rounded-full p-1">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === 'en' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('pt')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  lang === 'pt' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                PT
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-lg text-gray-400">{t.subtitle}</p>
        </div>

        {/* Search bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 bg-slate-900/60 border border-slate-700/70 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Articles by category */}
        <div className="space-y-12">
          {['gettingStarted', 'plansBilling', 'aiAgents'].map(category => {
            const categoryArticles = filteredArticles.filter(a => a.category === category)
            if (categoryArticles.length === 0) return null

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  {category === 'gettingStarted' && <Book className="w-6 h-6 mr-3 text-emerald-400" />}
                  {category === 'plansBilling' && <CreditCard className="w-6 h-6 mr-3 text-emerald-400" />}
                  {category === 'aiAgents' && <Bot className="w-6 h-6 mr-3 text-emerald-400" />}
                  {getCategoryTitle(category)}
                </h2>
                <div className="grid gap-6">
                  {categoryArticles.map((article, index) => {
                    const Icon = article.icon
                    return (
                      <div 
                        key={index}
                        className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg hover:border-emerald-500/30 transition-all"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                            <p className="text-gray-300 leading-relaxed">{article.content}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* No results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No articles found matching your search.</p>
          </div>
        )}

        {/* Back to home button */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{t.backHome}</span>
          </Link>
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
