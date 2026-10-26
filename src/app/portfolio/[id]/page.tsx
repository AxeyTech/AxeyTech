// ====== PORTFOLIO DETAIL PAGE ======
// src/app/portfolio/[id]/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useCyberTransition } from '@/context/TransitionContext'
import { setIntroPlayed } from '@/lib/introState'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Sparkles,
  Code2,
  Layers,
  X,
  Box,
  Zap,
  ShieldCheck,
  Cpu,
  Database,
  Globe,
  Activity,
  CheckCircle2,
  Terminal,
  Eye,
  ArrowUpRight,
} from 'lucide-react'

type ProjectDetail = {
  id: string
  title: string
  subtitle: string
  badge: string
  category: string
  role: string
  description: string
  architectural_overview: string
  metrics: { label: string; value: string; desc: string }[]
  technologies: string[]
  tech_categories: { name: string; items: string[] }[]
  key_features: { title: string; desc: string; icon: string }[]
  system_architecture: { step: string; title: string; desc: string }[]
  image_url: string
  image_urls: string[]
  live_url: string
  github_url: string
}

const PROJECTS_DATA: Record<string, ProjectDetail> = {
  resumeiq: {
    id: 'resumeiq',
    title: 'ResumeIQ',
    subtitle: 'Full-Stack AI Resume Intelligence & Enterprise ATS Scoring Platform',
    badge: 'Live Production SaaS',
    category: 'Full-Stack AI Application',
    role: 'Lead Architect & Full-Stack Software Engineer',
    description:
      'ResumeIQ is an advanced full-stack AI career intelligence platform engineered to eliminate the opaque black-box filtering of modern Applicant Tracking Systems (ATS). Powered by Google Gemini AI, it delivers instantaneous vector-like semantic resume analysis, computes granular ATS match scores in under 1.4 seconds, pinpoints high-stakes keyword deficiencies, and generates recruiter-optimized bullet rewrites to maximize interview call rates.',
    architectural_overview:
      'Engineered on a decoupled Client-Server architecture. The frontend leverages React 18, TypeScript, and Tailwind CSS for fluid micro-interactions and immediate diagnostic feedback. The backend operates on an Express.js & Node.js gateway paired with PostgreSQL for relational persistence of historical scan diagnostics and user profiles. Authentication is cryptographically secured via Google OAuth 2.0 and JWT stateless sessions.',
    metrics: [
      { label: 'Analysis Speed', value: '< 1.4s', desc: 'Real-time Gemini inference' },
      { label: 'Scoring Precision', value: '99.4%', desc: 'Semantic ATS benchmark' },
      { label: 'Tech Stack', value: '8+ Core', desc: 'Modern full-stack suite' },
      { label: 'Doc Formats', value: 'PDF / DOCX', desc: 'Multi-column stream parsing' },
    ],
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Google Gemini AI',
      'Tailwind CSS',
      'Google OAuth 2.0',
    ],
    tech_categories: [
      {
        name: 'Frontend Engineering',
        items: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
      },
      {
        name: 'Backend & APIs',
        items: ['Node.js', 'Express.js', 'REST API Gateway', 'Multer Stream Processing'],
      },
      {
        name: 'AI & Intelligence',
        items: ['Google Gemini AI LLM', 'Semantic NLP Diagnostics', 'Contextual Prompt Matrix'],
      },
      {
        name: 'Database & Security',
        items: ['PostgreSQL', 'Google OAuth 2.0', 'Stateless JWT Sessions', 'Encrypted Stores'],
      },
    ],
    key_features: [
      {
        title: 'Instant ATS Match Scoring',
        desc: 'Calculates overall candidate-to-job relevance rating in sub-second latency against enterprise filters.',
        icon: 'Zap',
      },
      {
        title: 'Gemini NLP Keyword Diagnostics',
        desc: 'Identifies missing hard technical competencies, soft skills, and industry terminology.',
        icon: 'Sparkles',
      },
      {
        title: 'Multi-Format Stream Ingestion',
        desc: 'Parses complex multi-column PDF and DOCX files without layout distortion or character loss.',
        icon: 'Layers',
      },
      {
        title: 'Contextual Action Rewriter',
        desc: 'Transforms passive, generic bullet points into high-impact, metric-driven achievement statements.',
        icon: 'Code2',
      },
      {
        title: 'Audit Trail & Scan Evolution',
        desc: 'PostgreSQL-backed session logs enable candidates to track score progress over multiple revisions.',
        icon: 'Database',
      },
      {
        title: 'Enterprise OAuth 2.0 & JWT Security',
        desc: 'Frictionless Google authentication combined with cryptographically signed stateless session tokens.',
        icon: 'ShieldCheck',
      },
    ],
    system_architecture: [
      {
        step: '01',
        title: 'Document Ingestion & Stream Parsing',
        desc: 'User uploads a resume (PDF/DOCX). Server-side buffer streams parse raw textual structures, sections, and dates.',
      },
      {
        step: '02',
        title: 'Gemini NLP Semantic Analysis',
        desc: 'Contextual prompts evaluate candidate experience vectors, semantic relevance, and keyword distribution.',
      },
      {
        step: '03',
        title: 'Scoring & Actionable Insights Engine',
        desc: 'Generates real-time percentage match score, flags missing keywords, and renders rewrite recommendations.',
      },
      {
        step: '04',
        title: 'PostgreSQL Relational Persistence',
        desc: 'Stores diagnostic telemetry, scan history, and user metadata for longitudinal performance tracking.',
      },
    ],
    image_url: '/assets/resumeiq_preview.png',
    image_urls: ['/assets/resumeiq_preview.png'],
    live_url: 'https://getresumeiq.onrender.com',
    github_url: 'https://github.com/AxeyTech/ResumeIQ',
  },
  cosmicsoul: {
    id: 'cosmicsoul',
    title: 'CosmicSoul',
    subtitle: 'AI-Powered Vedic Astrology, Planetary Mechanics & North-Indian Kundli Engine',
    badge: 'Live Production App',
    category: 'Computational Astronomy & AI',
    role: 'Lead Architect & Full-Stack Software Engineer',
    description:
      'CosmicSoul is an innovative full-stack Vedic Astrology and Numerology platform engineered to unite ancient astrological wisdom with rigorous astronomical mathematics and Google Gemini 2.5 Flash LLM intelligence. Unlike traditional horoscope generators relying on static pre-written templates, CosmicSoul calculates high-precision planetary positions for all 9 Grahas using real-time ephemeris algorithms and the Lahiri Chitrapaksha Ayanamsa. It dynamically constructs interactive North-Indian 12-house Kundli charts and synthesizes rich, culturally authentic astrological and numerological predictions in both English and Hindi.',
    architectural_overview:
      'Engineered around a high-precision Mathematical Ephemeris Pipeline. Planetary coordinates, ascendant (Lagna) degrees, and planetary house cusps are computed client-side and server-side using astronomy-engine. The calculated astrological matrix is rendered onto an interactive SVG/HTML5 canvas. These exact celestial parameters are then channeled into Google Gemini 2.5 Flash with nuanced Vedic prompt engineering, delivering culturally resonant, contextual spiritual forecasts.',
    metrics: [
      { label: 'Planetary Math', value: '9 Grahas', desc: 'Real-time Lahiri Ayanamsa' },
      { label: 'AI Inference', value: 'Gemini 2.5 Flash', desc: 'Sub-second LLM synthesis' },
      { label: 'Localization', value: 'Bilingual', desc: 'English & Hindi support' },
      { label: 'Global Coverage', value: '200+ Cities', desc: 'Built-in coordinate geocoding' },
    ],
    technologies: [
      'React',
      'Vite',
      'Node.js',
      'Express',
      'Google Gemini 2.5 Flash',
      'Astronomy Engine',
      'Tailwind CSS',
      'Render Cloud',
    ],
    tech_categories: [
      {
        name: 'Frontend & Interactive Canvas',
        items: ['React', 'Vite', 'Tailwind CSS', 'Dynamic SVG Kundli Canvas', 'Framer Motion'],
      },
      {
        name: 'Astronomical & Numerology Math',
        items: ['Astronomy-Engine', 'Lahiri Chitrapaksha Ayanamsa', 'Mulank & Bhagyank Algorithmic Calculator'],
      },
      {
        name: 'AI & Bilingual NLP',
        items: ['Google Gemini 2.5 Flash', 'Vedic Astrological Prompt Matrix', 'Dual-Language Synthesis'],
      },
      {
        name: 'Backend & Cloud Infrastructure',
        items: ['Node.js', 'Express.js', 'RESTful API Services', 'Render Cloud Deployment'],
      },
    ],
    key_features: [
      {
        title: 'Dynamic 12-House Kundli Chart',
        desc: 'Interactive North-Indian diamond chart rendering all 12 Bhavas, 9 Grahas, and zodiac signs in real time.',
        icon: 'Layers',
      },
      {
        title: 'Real-Time Ephemeris Calculations',
        desc: 'High-precision mathematical planetary coordinates calculated using astronomical ephemeris formulas.',
        icon: 'Cpu',
      },
      {
        title: 'Bilingual AI Astrological Predictions',
        desc: 'Culturally authentic, spiritually grounded insights generated in English and Hindi via Gemini 2.5 Flash.',
        icon: 'Sparkles',
      },
      {
        title: 'Numerology Mulank & Bhagyank Core',
        desc: 'Instant calculation of psychic and destiny numbers with deep personality and life path analysis.',
        icon: 'Zap',
      },
      {
        title: 'Global 200+ City Coordinate Geocoder',
        desc: 'Integrated latitude, longitude, and timezone calculations for cities across India and worldwide.',
        icon: 'Globe',
      },
      {
        title: 'Cosmic Cyber Visual Aesthetics',
        desc: 'Immersive dark cosmic theme featuring an interactive particle starfield and devilish red astrological accents.',
        icon: 'Sparkles',
      },
    ],
    system_architecture: [
      {
        step: '01',
        title: 'Birth Coordinates & Timestamp Resolution',
        desc: 'User inputs birth date, exact time, and location. Integrated geocoder resolves latitude, longitude, and UTC offset.',
      },
      {
        step: '02',
        title: 'Astronomical Ephemeris & Ayanamsa Math',
        desc: 'Astronomy engine calculates planetary degrees and applies Lahiri Chitrapaksha Ayanamsa for Lagna and Grahas.',
      },
      {
        step: '03',
        title: 'Dynamic 12-House Kundli Chart Generation',
        desc: 'Computes house placements (1st to 12th Bhava) and renders the North-Indian chart with retrograde indicators.',
      },
      {
        step: '04',
        title: 'Gemini 2.5 Flash Synthesis & Numerology',
        desc: 'Transmits planetary matrix to Gemini for culturally rich English/Hindi predictions and computes Mulank/Bhagyank.',
      },
    ],
    image_url: '/assets/cosmicsoul_preview.png',
    image_urls: ['/assets/cosmicsoul_preview.png'],
    live_url: 'https://cosmicsoul.onrender.com',
    github_url: 'https://github.com/AxeyTech/cosmicSoul',
  },
}

function getFeatureIcon(iconName: string) {
  switch (iconName) {
    case 'Zap':
      return <Zap size={18} className="text-[#ef4444]" />
    case 'Sparkles':
      return <Sparkles size={18} className="text-[#ef4444]" />
    case 'Layers':
      return <Layers size={18} className="text-[#ef4444]" />
    case 'Code2':
      return <Code2 size={18} className="text-[#ef4444]" />
    case 'Database':
      return <Database size={18} className="text-[#ef4444]" />
    case 'ShieldCheck':
      return <ShieldCheck size={18} className="text-[#ef4444]" />
    case 'Cpu':
      return <Cpu size={18} className="text-[#ef4444]" />
    case 'Globe':
      return <Globe size={18} className="text-[#ef4444]" />
    default:
      return <Sparkles size={18} className="text-[#ef4444]" />
  }
}

export default function PortfolioDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { transitionTo, setIsReturningFromDetails } = useCyberTransition()

  const rawId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : ''
  const projectId = rawId.toLowerCase()
  const staticData = projectId ? PROJECTS_DATA[projectId] : null

  const [project, setProject] = useState<any>(
    staticData || {
      title: '',
      subtitle: '',
      badge: 'Project Showcase',
      category: 'Web Application',
      role: 'Full-Stack Software Engineer',
      description: '',
      architectural_overview: '',
      metrics: [],
      technologies: [],
      tech_categories: [],
      key_features: [],
      system_architecture: [],
      image_url: '',
      image_urls: [],
      live_url: '',
      github_url: '',
    }
  )

  const [currentImage, setCurrentImage] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  // Pre-warm the home route so returning to portfolio is instantaneous
  useEffect(() => {
    try {
      router.prefetch('/')
    } catch {}
  }, [router])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('fromDetailPage', 'true')
      sessionStorage.setItem('skipIntroOnce', 'true')
      sessionStorage.setItem('heroPlayed', 'true')
    }

    if (staticData) {
      setProject(staticData)
      setIsNotFound(false)
      return
    }

    fetchProject()
  }, [projectId])

  const fetchProject = async () => {
    if (staticData) return

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()

      if (data && data.title) {
        setProject(data)
        setIsNotFound(false)
      } else {
        setIsNotFound(true)
      }
    } catch {
      setIsNotFound(true)
    }
  }

  const galleryImages =
    project?.image_urls && Array.isArray(project.image_urls) && project.image_urls.length > 0
      ? project.image_urls
      : project?.image_url
      ? [project.image_url]
      : []

  const nextImage = () => {
    if (currentImage < galleryImages.length - 1) {
      setCurrentImage((prev) => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1)
    }
  }

  const handleBack = (e?: React.MouseEvent) => {
    if (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return
      e.preventDefault()
    }
    setIntroPlayed()
    transitionTo('/#portfolio', 'RETURNING TO PORTFOLIO')
  }

  if (isNotFound) {
    return (
      <div className="min-h-screen bg-[#050000] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-full bg-[#dc2626]/10 border border-[#dc2626]/30 mb-4 shadow-[0_0_25px_rgba(220,38,38,0.2)]">
          <Terminal size={28} className="text-[#ef4444]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide">
          PROJECT RECORD NOT FOUND
        </h2>
        <p className="text-sm text-white/50 max-w-md mb-6">
          The requested system node could not be resolved in the AxeyTech database registry.
        </p>
        <Link
          href="/#portfolio"
          prefetch={true}
          onClick={handleBack}
          onMouseEnter={() => router.prefetch('/')}
          onTouchStart={() => router.prefetch('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#140404] hover:bg-[#200606] border border-[#dc2626]/40 hover:border-[#dc2626] text-white text-sm font-medium transition shadow-[0_0_20px_rgba(220,38,38,0.2)] cursor-pointer"
        >
          <ArrowLeft size={16} className="text-[#dc2626]" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    )
  }

  if (!project?.title) {
    return (
      <div className="min-h-screen bg-[#050000] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#dc2626]/30 border-t-[#dc2626] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#180505] border border-[#dc2626]/40 hover:border-[#dc2626] text-white flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.3)] transition-all cursor-pointer z-10"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            {currentImage > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#180505] border border-[#dc2626]/40 hover:border-[#dc2626] text-white flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.3)] transition-all cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[92vw] max-h-[85vh] rounded-2xl overflow-hidden border border-[#dc2626]/40 shadow-[0_0_60px_rgba(220,38,38,0.3)]"
            >
              <img
                src={galleryImages[currentImage]}
                alt={project.title}
                className="w-full h-full max-h-[85vh] object-contain bg-[#080202]"
              />
            </motion.div>

            {currentImage < galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#180505] border border-[#dc2626]/40 hover:border-[#dc2626] text-white flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.3)] transition-all cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="min-h-screen bg-[#050000] text-white relative overflow-x-hidden selection:bg-[#dc2626]/30 selection:text-white"
      >
        {/* Hardware-Accelerated Ambient Glow without Heavy GPU Blur */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(220,38,38,0.18),transparent_70%)] pointer-events-none -z-10" />

        {/* Subtle Cyber Grid Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12">
          {/* TOP NAV BAR / BACK BUTTON */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/#portfolio"
              prefetch={true}
              onClick={handleBack}
              onMouseEnter={() => router.prefetch('/')}
              onTouchStart={() => router.prefetch('/')}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#140404]/80 hover:bg-[#1f0606] border border-[#dc2626]/30 hover:border-[#dc2626] text-[13px] sm:text-sm font-medium text-white/90 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.12)] group cursor-pointer"
            >
              <ArrowLeft
                size={16}
                className="text-[#dc2626] group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span>Back to Portfolio</span>
            </Link>

            {project.badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dc2626]/10 border border-[#dc2626]/35 text-[#ef4444] text-xs font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
                <span>{project.badge}</span>
              </div>
            )}
          </div>

          {/* PROJECT HEADER SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#dc2626] font-medium tracking-wide uppercase mb-3">
              <span>{project.category}</span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">{project.role}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              <span className="bg-gradient-to-r from-white via-white/95 to-[#ef4444] bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>

            {project.subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-4xl font-normal leading-relaxed mb-6">
                {project.subtitle}
              </p>
            )}

            <div className="h-[2px] w-24 bg-gradient-to-r from-[#dc2626] via-[#dc2626]/60 to-transparent rounded-full mb-8" />

            {/* ACTION BUTTONS (LIVE DEMO & GITHUB) */}
            <div className="flex flex-wrap items-center gap-4">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] text-white text-sm sm:text-base font-semibold shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <ExternalLink size={17} />
                  <span>Open Live Application</span>
                  <ArrowUpRight size={16} />
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#120404] hover:bg-[#1f0707] border border-[#dc2626]/30 hover:border-[#dc2626]/70 text-white text-sm sm:text-base font-medium shadow-[0_0_20px_rgba(220,38,38,0.1)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <GitBranch size={17} className="text-[#dc2626]" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* METRICS ROW */}
          {project.metrics && project.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12"
            >
              {project.metrics.map((metric: any, i: number) => (
                <div
                  key={i}
                  className="rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#130404]/90 to-[#0a0202]/90 border border-[#dc2626]/20 hover:border-[#dc2626]/50 shadow-[0_0_25px_rgba(220,38,38,0.06)] hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all group backdrop-blur-xl"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#ef4444] mb-1 tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                    {metric.value}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white/90 mb-0.5 tracking-wide">
                    {metric.label}
                  </p>
                  <p className="text-[11px] text-white/50">{metric.desc}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* MAIN TWO-COLUMN CONTENT GRID */}
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
            {/* LEFT COLUMN: Overview, Categorized Tech, System Architecture */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Executive Overview Card */}
              <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#120404]/90 via-[#0d0303]/90 to-[#070101]/90 border border-[#dc2626]/25 shadow-[0_0_35px_rgba(220,38,38,0.08)] backdrop-blur-xl">
                <div className="flex items-center gap-2.5 mb-4 text-[#ef4444]">
                  <Activity size={18} />
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    Executive Overview
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-4 text-justify">
                  {project.description}
                </p>
                {project.architectural_overview && (
                  <div className="pt-4 border-t border-[#dc2626]/15">
                    <p className="text-xs uppercase tracking-wider text-[#dc2626] font-semibold mb-2">
                      Architectural Paradigm
                    </p>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed text-justify">
                      {project.architectural_overview}
                    </p>
                  </div>
                )}
              </div>

              {/* Categorized Tech Stack */}
              {project.tech_categories && project.tech_categories.length > 0 ? (
                <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#120404]/90 via-[#0d0303]/90 to-[#070101]/90 border border-[#dc2626]/25 shadow-[0_0_35px_rgba(220,38,38,0.08)] backdrop-blur-xl">
                  <div className="flex items-center gap-2.5 mb-5 text-[#ef4444]">
                    <Code2 size={18} />
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      Technical Architecture & Tools
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {project.tech_categories.map((cat: any, i: number) => (
                      <div key={i}>
                        <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">
                          {cat.name}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map((item: string, j: number) => (
                            <span
                              key={j}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#170505] border border-[#dc2626]/20 hover:border-[#dc2626]/50 text-xs text-white/85 transition-all shadow-[0_0_15px_rgba(220,38,38,0.04)]"
                            >
                              <Box size={11} className="text-[#dc2626]" />
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                project.technologies && (
                  <div className="rounded-3xl p-6 bg-[#120404]/90 border border-[#dc2626]/25">
                    <p className="text-sm font-semibold text-white mb-3">Technologies Used</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((t: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-xl bg-[#170505] border border-[#dc2626]/20 text-xs text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* System Architecture Flow */}
              {project.system_architecture && project.system_architecture.length > 0 && (
                <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#120404]/90 via-[#0d0303]/90 to-[#070101]/90 border border-[#dc2626]/25 shadow-[0_0_35px_rgba(220,38,38,0.08)] backdrop-blur-xl">
                  <div className="flex items-center gap-2.5 mb-5 text-[#ef4444]">
                    <Terminal size={18} />
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      End-to-End Execution Pipeline
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {project.system_architecture.map((arch: any, i: number) => (
                      <div
                        key={i}
                        className="flex gap-4 p-3.5 rounded-2xl bg-[#160404]/60 border border-[#dc2626]/15 hover:border-[#dc2626]/40 transition-all"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#dc2626]/15 border border-[#dc2626]/30 flex items-center justify-center shrink-0 text-[#ef4444] text-xs font-bold font-mono">
                          {arch.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/95 mb-1">{arch.title}</p>
                          <p className="text-xs text-white/60 leading-relaxed">{arch.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* RIGHT COLUMN: Screenshot Showcase & Key Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Interactive Screenshot Showcase */}
              {galleryImages.length > 0 && (
                <div className="rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-[#120404]/90 to-[#070101]/90 border border-[#dc2626]/30 shadow-[0_0_40px_rgba(220,38,38,0.12)] backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ef4444]">
                      <Eye size={14} />
                      <span>Interface Showcase</span>
                    </div>
                    <span className="text-[11px] text-white/40">Click to expand</span>
                  </div>

                  <div
                    onClick={() => setPreviewOpen(true)}
                    className="relative rounded-2xl overflow-hidden border border-[#dc2626]/30 bg-[#090202] group cursor-pointer shadow-[0_0_30px_rgba(220,38,38,0.15)]"
                  >
                    <img
                      src={galleryImages[currentImage]}
                      alt={project.title}
                      className="w-full h-[220px] sm:h-[280px] md:h-[320px] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#160404]/90 border border-[#dc2626]/50 text-xs text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                        <Eye size={13} className="text-[#dc2626]" />
                        <span>Click for Full Screen Preview</span>
                      </span>
                    </div>

                    {galleryImages.length > 1 && currentImage > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#180505]/90 border border-[#dc2626]/40 text-white flex items-center justify-center hover:bg-[#280808] transition-all"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    )}

                    {galleryImages.length > 1 && currentImage < galleryImages.length - 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#180505]/90 border border-[#dc2626]/40 text-white flex items-center justify-center hover:bg-[#280808] transition-all"
                      >
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>

                  {galleryImages.length > 1 && (
                    <div className="flex justify-center gap-2 mt-3">
                      {galleryImages.map((_: any, i: number) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImage(i)}
                          className={`rounded-full transition-all duration-300 ${
                            currentImage === i
                              ? 'w-6 h-1.5 bg-[#dc2626] shadow-[0_0_10px_#dc2626]'
                              : 'w-1.5 h-1.5 bg-white/25'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Key Features Grid */}
              {project.key_features && project.key_features.length > 0 && (
                <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#120404]/90 via-[#0d0303]/90 to-[#070101]/90 border border-[#dc2626]/25 shadow-[0_0_35px_rgba(220,38,38,0.08)] backdrop-blur-xl">
                  <div className="flex items-center gap-2.5 mb-5 text-[#ef4444]">
                    <Sparkles size={18} />
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                      Core Engineered Features
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {project.key_features.map((feat: any, i: number) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-[#140404]/70 border border-[#dc2626]/18 hover:border-[#dc2626]/50 shadow-[0_0_20px_rgba(220,38,38,0.04)] hover:shadow-[0_0_25px_rgba(220,38,38,0.12)] transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#dc2626]/15 border border-[#dc2626]/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          {getFeatureIcon(feat.icon)}
                        </div>
                        <p className="text-sm font-semibold text-white/95 mb-1.5 leading-snug">
                          {feat.title}
                        </p>
                        <p className="text-xs text-white/60 leading-relaxed">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* BOTTOM CTA CALLOUT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 rounded-3xl p-8 text-center bg-gradient-to-r from-[#170505]/90 via-[#1f0606]/90 to-[#170505]/90 border border-[#dc2626]/35 shadow-[0_0_50px_rgba(220,38,38,0.18)] backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-96 h-32 bg-[#dc2626]/20 blur-[80px] pointer-events-none" />

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Explore{' '}
              <span className="bg-gradient-to-r from-white via-white to-[#ef4444] bg-clip-text text-transparent">
                {project.title}
              </span>{' '}
              in Real Time
            </h3>
            <p className="text-sm sm:text-base text-white/65 max-w-xl mx-auto mb-6">
              Experience the live deployed web application, explore the user interface, and review the architectural implementation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] text-white text-sm font-semibold shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] transition-all"
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Demo</span>
                  <ArrowUpRight size={15} />
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#120404] hover:bg-[#1f0707] border border-[#dc2626]/30 hover:border-[#dc2626]/70 text-white text-sm font-medium shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all"
                >
                  <GitBranch size={16} className="text-[#dc2626]" />
                  <span>GitHub Repository</span>
                </a>
              )}

              <Link
                href="/#portfolio"
                prefetch={true}
                onClick={handleBack}
                onMouseEnter={() => router.prefetch('/')}
                onTouchStart={() => router.prefetch('/')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0d0303] hover:bg-[#190606] border border-[#dc2626]/30 hover:border-[#dc2626] text-white/90 text-sm font-medium transition-all cursor-pointer"
              >
                <ArrowLeft size={16} className="text-[#dc2626]" />
                <span>Return to Portfolio</span>
              </Link>
            </div>
          </motion.div>
        </main>
      </motion.div>
    </>
  )
}
