"use client"

import { useState, useEffect } from 'react'
import { Bot, Globe, Zap, Check, ChevronDown, Sparkles, TrendingUp, Users, BarChart3, DollarSign, LogOut } from 'lucide-react'
import { getCurrentUser, logout, updateUserPlan } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Language = 'pt' | 'en'

const TEXTS = {
  pt: {
    // Header
    logo: "Celan IA",
    subtitle: "Plataforma SaaS de IA",
    navHome: "Início",
    navHow: "Como funciona",
    navServices: "Serviços",
    navPricing: "Planos",
    navFaq: "Perguntas",
    navDashboard: "Dashboard",
    login: "Entrar",
    signup: "Criar conta",
    logout: "Sair",
    
    // Hero
    heroBadge: "Soluções de IA e SaaS",
    heroTitle: "Transforme seu Negócio com IA",
    heroSubtitle: "Plataforma completa para criar agentes de IA, automações e experiências digitais que escalam globalmente",
    heroBullet1: "Lançamento rápido em minutos",
    heroBullet2: "Atendimento 24/7 automático",
    heroBullet3: "Venda global em dólar",
    heroCtaPrimary: "Começar Agora",
    heroCtaSecondary: "Ver Planos",
    dashboardRevenue: "Receita Mensal",
    dashboardClients: "Clientes Ativos",
    dashboardAutomation: "Visão Geral de Automação",
    dashboardStatus: "Sistema operacional",
    
    // How it works
    howTitle: "Como funciona",
    howSubtitle: "Três passos simples para lançar seu SaaS de IA",
    howStep1Title: "1. Configure sua marca",
    howStep1Desc: "Personalize logo, cores, textos e idiomas da sua plataforma",
    howStep2Title: "2. Escolha os módulos",
    howStep2Desc: "Selecione agentes de IA, landing pages, apps e sistemas internos",
    howStep3Title: "3. Lance e venda",
    howStep3Desc: "Conecte seu domínio, defina preços e comece a vender como SaaS",
    
    // Services
    servicesTitle: "Soluções que você pode oferecer",
    servicesSubtitle: "Venda serviços e produtos digitais com IA para seus clientes",
    service1Title: "Agentes de IA",
    service1Desc: "Chatbots inteligentes para atendimento e vendas automatizadas",
    service1Feature1: "Respostas instantâneas 24/7",
    service1Feature2: "Integração com CRM e sistemas",
    service1Feature3: "Aprendizado contínuo",
    service2Title: "Sites Profissionais",
    service2Desc: "Landing pages de alta conversão para seus produtos",
    service2Feature1: "Design responsivo mobile-first",
    service2Feature2: "Performance otimizada",
    service2Feature3: "SEO e analytics integrados",
    service3Title: "Aplicativos e Painéis",
    service3Desc: "Dashboards e apps para gestão e automação de negócios",
    service3Feature1: "Interface intuitiva e moderna",
    service3Feature2: "Relatórios em tempo real",
    service3Feature3: "Integrações via API",
    
    // Pricing
    pricingTitle: "Planos em dólar para vender globalmente",
    pricingSubtitle: "Todos os planos incluem atualizações automáticas e acesso à central de ajuda",
    plan1Name: "Starter",
    plan1Price: "$19",
    plan1Period: "/mês",
    plan1Desc: "Ideal para quem está começando a validar serviços com IA.",
    plan1Feature1: "Até 1.000 requisições de IA/mês",
    plan1Feature2: "1 projeto ativo",
    plan1Feature3: "Templates básicos prontos",
    plan1Feature4: "Acesso à central de ajuda",
    plan1Cta: "Começar com Starter",
    plan2Name: "Pro",
    plan2Price: "$49",
    plan2Period: "/mês",
    plan2Badge: "Mais popular",
    plan2Desc: "Para agências e negócios digitais que querem automatizar de verdade.",
    plan2Feature1: "Até 10.000 requisições de IA/mês",
    plan2Feature2: "Projetos ilimitados",
    plan2Feature3: "Integração com APIs externas",
    plan2Feature4: "Automações avançadas",
    plan2Feature5: "Acesso antecipado a novas features",
    plan2Cta: "Escolher Pro",
    plan3Name: "Scale",
    plan3Price: "$99",
    plan3Period: "/mês",
    plan3Desc: "Para empresas que precisam de escala, equipe e personalização.",
    plan3Feature1: "Até 50.000 requisições de IA/mês",
    plan3Feature2: "Workspaces em equipe",
    plan3Feature3: "Logs e auditoria completa",
    plan3Feature4: "Limites ajustáveis sob demanda",
    plan3Feature5: "Prioridade máxima em recursos",
    plan3Cta: "Escalar com Scale",
    pricingNote: "Cobrança em dólar (USD). Cancelamento a qualquer momento, sem fidelidade.",
    planUpdated: "Seu plano foi atualizado para",
    
    // FAQ
    faqTitle: "Perguntas frequentes",
    faqSubtitle: "Tudo dentro do site, sem precisar de suporte manual obrigatório.",
    faq1Q: "Preciso falar com alguém para começar?",
    faq1A: "Não! Todo o processo é feito diretamente no site. Você cria sua conta, escolhe seu plano e já pode começar a configurar sua plataforma imediatamente. Nossa central de ajuda tem tutoriais completos para cada etapa.",
    faq2Q: "O pagamento é em dólar?",
    faq2A: "Sim, todos os planos são cobrados em dólar americano (USD). Isso permite que você venda seus serviços globalmente com preços competitivos e previsíveis.",
    faq3Q: "Consigo personalizar textos, layout e idiomas?",
    faq3A: "Totalmente! Você pode personalizar cores, textos, logo, idiomas (PT/EN e outros) e até o domínio. Sua plataforma terá a identidade visual da sua marca.",
    faq4Q: "E se eu crescer e precisar de mais recursos?",
    faq4A: "Você pode trocar de plano a qualquer momento, sem burocracia. O upgrade é instantâneo e você só paga a diferença proporcional. Também oferecemos planos enterprise customizados.",
    
    // CTA Final
    ctaTitle: "Pronto para lançar seu SaaS de IA?",
    ctaSubtitle: "Sua plataforma pode estar online e vendendo 24/7 em minutos",
    ctaButton1: "Criar minha conta",
    ctaButton2: "Central de ajuda",
    
    // Footer
    footerText: `© ${new Date().getFullYear()} Celan IA. Todos os direitos reservados.`,
  },
  en: {
    // Header
    logo: "Celan IA",
    subtitle: "AI SaaS Platform",
    navHome: "Home",
    navHow: "How it works",
    navServices: "Services",
    navPricing: "Pricing",
    navFaq: "FAQ",
    navDashboard: "Dashboard",
    login: "Login",
    signup: "Create account",
    logout: "Logout",
    
    // Hero
    heroBadge: "AI & SaaS Solutions",
    heroTitle: "Transform your Business with AI",
    heroSubtitle: "Complete platform to create AI agents, automations and digital experiences that scale globally",
    heroBullet1: "Quick launch in minutes",
    heroBullet2: "24/7 automated support",
    heroBullet3: "Global sales in USD",
    heroCtaPrimary: "Get Started",
    heroCtaSecondary: "View Pricing",
    dashboardRevenue: "Monthly Revenue",
    dashboardClients: "Active Clients",
    dashboardAutomation: "Automation Overview",
    dashboardStatus: "System operational",
    
    // How it works
    howTitle: "How it works",
    howSubtitle: "Three simple steps to launch your AI SaaS",
    howStep1Title: "1. Set up your brand",
    howStep1Desc: "Customize logo, colors, texts and languages for your platform",
    howStep2Title: "2. Choose modules",
    howStep2Desc: "Select AI agents, landing pages, apps and internal systems",
    howStep3Title: "3. Launch and sell",
    howStep3Desc: "Connect your domain, set prices and start selling as SaaS",
    
    // Services
    servicesTitle: "Solutions you can offer",
    servicesSubtitle: "Sell AI-powered digital services and products to your clients",
    service1Title: "AI Agents",
    service1Desc: "Intelligent chatbots for automated support and sales",
    service1Feature1: "Instant 24/7 responses",
    service1Feature2: "CRM and system integration",
    service1Feature3: "Continuous learning",
    service2Title: "Professional Websites",
    service2Desc: "High-conversion landing pages for your products",
    service2Feature1: "Mobile-first responsive design",
    service2Feature2: "Optimized performance",
    service2Feature3: "Built-in SEO and analytics",
    service3Title: "Apps & Dashboards",
    service3Desc: "Dashboards and apps for business management and automation",
    service3Feature1: "Intuitive modern interface",
    service3Feature2: "Real-time reports",
    service3Feature3: "API integrations",
    
    // Pricing
    pricingTitle: "USD pricing to sell globally",
    pricingSubtitle: "All plans include automatic updates and access to help center",
    plan1Name: "Starter",
    plan1Price: "$19",
    plan1Period: "/mo",
    plan1Desc: "Perfect for validating your first AI-based services.",
    plan1Feature1: "Up to 1,000 AI requests/month",
    plan1Feature2: "1 active project",
    plan1Feature3: "Ready-made basic templates",
    plan1Feature4: "Access to help center",
    plan1Cta: "Start with Starter",
    plan2Name: "Pro",
    plan2Price: "$49",
    plan2Period: "/mo",
    plan2Badge: "Most popular",
    plan2Desc: "For agencies and digital businesses that want real automation.",
    plan2Feature1: "Up to 10,000 AI requests/month",
    plan2Feature2: "Unlimited projects",
    plan2Feature3: "External API integration",
    plan2Feature4: "Advanced automations",
    plan2Feature5: "Early access to new features",
    plan2Cta: "Choose Pro",
    plan3Name: "Scale",
    plan3Price: "$99",
    plan3Period: "/mo",
    plan3Desc: "For companies that need scale, teams, and customization.",
    plan3Feature1: "Up to 50,000 AI requests/month",
    plan3Feature2: "Team workspaces",
    plan3Feature3: "Complete logs and audit",
    plan3Feature4: "Adjustable limits on demand",
    plan3Feature5: "Maximum priority on resources",
    plan3Cta: "Scale with Scale",
    pricingNote: "Charged in US dollars (USD). Cancel anytime with no long-term contracts.",
    planUpdated: "Your plan has been updated to",
    
    // FAQ
    faqTitle: "Frequently asked questions",
    faqSubtitle: "Everything handled inside the site, no manual support required.",
    faq1Q: "Do I need to talk to someone to get started?",
    faq1A: "No! The entire process is done directly on the website. You create your account, choose your plan and can start setting up your platform immediately. Our help center has complete tutorials for each step.",
    faq2Q: "Is payment in dollars?",
    faq2A: "Yes, all plans are charged in US dollars (USD). This allows you to sell your services globally with competitive and predictable pricing.",
    faq3Q: "Can I customize texts, layout and languages?",
    faq3A: "Absolutely! You can customize colors, texts, logo, languages (PT/EN and others) and even the domain. Your platform will have your brand's visual identity.",
    faq4Q: "What if I grow and need more resources?",
    faq4A: "You can change plans at any time, without bureaucracy. The upgrade is instant and you only pay the proportional difference. We also offer customized enterprise plans.",
    
    // CTA Final
    ctaTitle: "Ready to launch your AI SaaS?",
    ctaSubtitle: "Your platform can be online and selling 24/7 in minutes",
    ctaButton1: "Create my account",
    ctaButton2: "Help center",
    
    // Footer
    footerText: `© ${new Date().getFullYear()} Celan IA. All rights reserved.`,
  }
}

export default function LandingPage() {
  const router = useRouter()
  const [lang, setLang] = useState<Language>('en')
  const [user, setUser] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const t = TEXTS[lang]

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push('/')
  }

  const handlePlanClick = async (plan: 'starter' | 'pro' | 'scale') => {
    if (!user) {
      // User not logged in - redirect to login
      router.push('/login')
    } else {
      // User logged in - update plan
      try {
        await updateUserPlan(user.id, plan)
        const planName = plan.charAt(0).toUpperCase() + plan.slice(1)
        setSuccessMessage(`${t.planUpdated} ${planName}!`)
        setUser({ ...user, plan })
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      } catch (error) {
        console.error('Failed to update plan:', error)
      }
    }
  }

  const handleGetStarted = () => {
    if (user) {
      router.push('/app')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      {/* Success message toast */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-500 text-slate-900 px-6 py-3 rounded-xl shadow-lg font-semibold animate-in slide-in-from-top">
          {successMessage}
        </div>
      )}

      {/* Header / Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-sm border-b border-slate-700/70">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                IA
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">{t.logo}</span>
                <span className="text-xs text-gray-400">{t.subtitle}</span>
              </div>
            </Link>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                {t.navHome}
              </a>
              <a href="#how" className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                {t.navHow}
              </a>
              <a href="#services" className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                {t.navServices}
              </a>
              <a href="#pricing" className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                {t.navPricing}
              </a>
              <a href="#faq" className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                {t.navFaq}
              </a>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Language switcher - EN first, PT second */}
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

              {/* Conditional rendering based on auth status */}
              {user ? (
                <>
                  <Link 
                    href="/app" 
                    className="hidden sm:block text-sm text-gray-300 hover:text-emerald-400 transition-colors"
                  >
                    {t.navDashboard}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-sm text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.logout}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="hidden sm:block text-sm text-gray-300 hover:text-emerald-400 transition-colors"
                  >
                    {t.login}
                  </Link>
                  <Link
                    href="/login"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  >
                    {t.signup}
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                {t.heroBadge}
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t.heroTitle}
              </h1>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed opacity-80">
                {t.heroSubtitle}
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  {t.heroBullet1}
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  {t.heroBullet2}
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                  {t.heroBullet3}
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 text-center"
                >
                  {t.heroCtaPrimary}
                </button>
                <a
                  href="#pricing"
                  className="border-2 border-emerald-500/50 hover:border-emerald-500 text-emerald-400 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 text-center"
                >
                  {t.heroCtaSecondary}
                </a>
              </div>
            </div>

            {/* Right side - Dashboard mockup */}
            <div className="relative">
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">{t.dashboardRevenue}</span>
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">$12,450</div>
                    <div className="text-xs text-emerald-400 mt-1">+23.5%</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">{t.dashboardClients}</span>
                      <Users className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">1,247</div>
                    <div className="text-xs text-emerald-400 mt-1">+12.3%</div>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-300 font-medium">{t.dashboardAutomation}</span>
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">AI Requests</span>
                      <span className="text-white">8,432</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: '84%'}}></div>
                    </div>
                    <div className="text-xs text-emerald-400">{t.dashboardStatus}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.howTitle}
            </h2>
            <p className="text-lg text-gray-300 opacity-80">
              {t.howSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.howStep1Title}</h3>
              <p className="text-gray-300 opacity-80">{t.howStep1Desc}</p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.howStep2Title}</h3>
              <p className="text-gray-300 opacity-80">{t.howStep2Desc}</p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.howStep3Title}</h3>
              <p className="text-gray-300 opacity-80">{t.howStep3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.servicesTitle}
            </h2>
            <p className="text-lg text-gray-300 opacity-80">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg">
              <Bot className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">{t.service1Title}</h3>
              <p className="text-gray-300 opacity-80 mb-6">{t.service1Desc}</p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service1Feature1}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service1Feature2}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service1Feature3}
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg">
              <Globe className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">{t.service2Title}</h3>
              <p className="text-gray-300 opacity-80 mb-6">{t.service2Desc}</p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service2Feature1}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service2Feature2}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service2Feature3}
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg">
              <BarChart3 className="w-12 h-12 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">{t.service3Title}</h3>
              <p className="text-gray-300 opacity-80 mb-6">{t.service3Desc}</p>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service3Feature1}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service3Feature2}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.service3Feature3}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.pricingTitle}
            </h2>
            <p className="text-lg text-gray-300 opacity-80">
              {t.pricingSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Starter Plan */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">{t.plan1Name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold text-white">{t.plan1Price}</span>
                <span className="text-gray-400 ml-2">{t.plan1Period}</span>
              </div>
              <p className="text-sm text-gray-300 opacity-80 mb-6">{t.plan1Desc}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan1Feature1}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan1Feature2}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan1Feature3}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan1Feature4}
                </li>
              </ul>
              <button
                onClick={() => handlePlanClick('starter')}
                className="block w-full bg-slate-800 hover:bg-slate-700 text-white text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                {t.plan1Cta}
              </button>
            </div>

            {/* Pro Plan - Featured */}
            <div className="bg-slate-900/60 backdrop-blur-sm border-2 border-emerald-500 rounded-3xl p-8 shadow-lg transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-slate-900 px-4 py-1 rounded-full text-xs font-bold">
                  {t.plan2Badge}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t.plan2Name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold text-white">{t.plan2Price}</span>
                <span className="text-gray-400 ml-2">{t.plan2Period}</span>
              </div>
              <p className="text-sm text-gray-300 opacity-80 mb-6">{t.plan2Desc}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan2Feature1}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan2Feature2}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan2Feature3}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan2Feature4}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan2Feature5}
                </li>
              </ul>
              <button
                onClick={() => handlePlanClick('pro')}
                className="block w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                {t.plan2Cta}
              </button>
            </div>

            {/* Scale Plan */}
            <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-2">{t.plan3Name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold text-white">{t.plan3Price}</span>
                <span className="text-gray-400 ml-2">{t.plan3Period}</span>
              </div>
              <p className="text-sm text-gray-300 opacity-80 mb-6">{t.plan3Desc}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan3Feature1}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan3Feature2}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan3Feature3}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan3Feature4}
                </li>
                <li className="flex items-start text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  {t.plan3Feature5}
                </li>
              </ul>
              <button
                onClick={() => handlePlanClick('scale')}
                className="block w-full bg-slate-800 hover:bg-slate-700 text-white text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                {t.plan3Cta}
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400">
            {t.pricingNote}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.faqTitle}
            </h2>
            <p className="text-lg text-gray-300 opacity-80">
              {t.faqSubtitle}
            </p>
          </div>

          <div className="space-y-6">
            <details className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-lg font-semibold text-white">{t.faq1Q}</span>
                <ChevronDown className="w-5 h-5 text-emerald-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-300 opacity-80 leading-relaxed">
                {t.faq1A}
              </p>
            </details>

            <details className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-lg font-semibold text-white">{t.faq2Q}</span>
                <ChevronDown className="w-5 h-5 text-emerald-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-300 opacity-80 leading-relaxed">
                {t.faq2A}
              </p>
            </details>

            <details className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-lg font-semibold text-white">{t.faq3Q}</span>
                <ChevronDown className="w-5 h-5 text-emerald-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-300 opacity-80 leading-relaxed">
                {t.faq3A}
              </p>
            </details>

            <details className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/70 rounded-3xl p-6 shadow-lg group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-lg font-semibold text-white">{t.faq4Q}</span>
                <ChevronDown className="w-5 h-5 text-emerald-400 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-300 opacity-80 leading-relaxed">
                {t.faq4A}
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-12 text-center shadow-lg">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-gray-300 opacity-80 mb-8">
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                {t.ctaButton1}
              </button>
              <Link
                href="/help"
                className="border-2 border-emerald-500/50 hover:border-emerald-500 text-emerald-400 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                {t.ctaButton2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-700/70 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            {t.footerText}
          </p>
        </div>
      </footer>
    </div>
  )
}
