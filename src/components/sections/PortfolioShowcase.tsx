'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  Layout,
  Database,
  Cpu,
} from 'lucide-react'
import usePortfolio from '@/hooks/usePortfolio'
import PortfolioCard from './PortfolioCard'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

const capabilities = [
  {
    icon: Layers,
    title: 'Full-Stack Software Engineering',
    tag: 'End-to-End Architecture',
    description:
      'Designing and developing modern, responsive web applications from concept to deployment. Seamlessly connecting dynamic user interfaces with secure, scalable backend architectures.',
    skills: [
      'Responsive Web Architecture',
      'React, Next.js & Node.js Systems',
      'Authentication & JWT Sessions',
      'Modern REST APIs & Integrations',
    ],
  },
  {
    icon: Layout,
    title: 'Modern UI/UX & Interactive Design',
    tag: 'Visual Engineering',
    description:
      'Crafting visually captivating, dark-themed, and cyber-aesthetic digital experiences. Obsessed with razor-sharp micro-interactions, pixel-perfect spacing, and mobile responsiveness.',
    skills: [
      'Devilish & Cyber Dark Aesthetics',
      'Fluid Micro-Interactions',
      'Pixel-Perfect Responsive Layouts',
      'High-Conversion User Journeys',
    ],
  },
  {
    icon: Database,
    title: 'Database Design & System Security',
    tag: 'Data Reliability & Logic',
    description:
      'Structuring organized relational databases with normalized schemas, efficient queries, and bulletproof server-side form validation for total data integrity.',
    skills: [
      'Relational Schema Design',
      'PostgreSQL & MySQL Normalization',
      'Server-Side Form Validation',
      'Data Sanitization & Auth Security',
    ],
  },
  {
    icon: Cpu,
    title: 'AI-Native Rapid Prototyping',
    tag: 'Development Multiplier',
    description:
      'Leveraging cutting-edge AI systems and advanced prompt engineering as a force multiplier to conceptualize, architect, test, and iterate production code at 10x velocity.',
    skills: [
      'Advanced Prompt Engineering',
      'AI-Assisted Full-Stack Builds',
      'Rapid Prototyping & Iteration',
      'Automated Dev & Testing Workflows',
    ],
  },
]

const featuredProjects = [
  {
    id: 'resumeiq',
    title: 'ResumeIQ — AI Resume Intelligence & ATS Scanner',
    description:
      'Full-stack AI platform powered by Google Gemini and PostgreSQL. Delivers real-time ATS scoring, keyword gap diagnostics, and automated resume optimizations with Google OAuth authentication.',
    image_url: '/assets/resumeiq_preview.png',
    live_url: 'https://getresumeiq.onrender.com',
  },
  {
    id: 'cosmicsoul',
    title: 'CosmicSoul — AI-Powered Vedic Astrology & Kundli Engine',
    description:
      'Full-stack Vedic astrology web application combining authentic astronomical mathematics (Lahiri Ayanamsa) with Gemini LLM. Features interactive 12-house Kundli chart visualization and bilingual AI predictions.',
    image_url: '/assets/cosmicsoul_preview.png',
    live_url: 'https://cosmicsoul.onrender.com',
  },
]

export default function PortfolioShowcase() {
  const router = useRouter()
  const {
    projects,
    certificates,
    techStacks,
    loading,
  } = usePortfolio()

  const [activeTab, setActiveTab] =
    useState('projects')

  const [previewOpen, setPreviewOpen] =
    useState(false)

  const [previewImage, setPreviewImage] =
    useState('')

  const [showAllProjects, setShowAllProjects] =
    useState(false)

  // Proactively warm up project routes in memory
  useEffect(() => {
    featuredProjects.forEach((proj) => {
      if (proj.id) {
        try {
          router.prefetch(`/portfolio/${proj.id}`)
        } catch {}
      }
    })
  }, [router])

  const allProjects = projects && projects.length > 0 ? projects : featuredProjects
  const displayedProjects = showAllProjects
    ? allProjects
    : allProjects.slice(0, 3)

  return (
    <>
      {/* PREVIEW */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center px-6"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[rgba(220,38,38,0.15)] hover:bg-[rgba(220,38,38,0.25)] flex items-center justify-center transition"
            >
              <X size={18} />
            </button>

            <motion.img
              initial={{
                scale: 0.92,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.92,
                opacity: 0,
              }}
              transition={{ duration: 0.35 }}
              src={previewImage}
              className="max-w-[88vw] max-h-[88vh] rounded-3xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="portfolio"
        className="w-full max-w-[1450px] mx-auto px-8 md:px-12 lg:px-20 pt-10 pb-24 text-white"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Portfolio Showcase
          </h1>

          <p className="text-white/55 max-w-xl mx-auto text-sm md:text-base">
            Explore my journey through featured projects, core technical capabilities, and modern web solutions.
          </p>
        </motion.div>

        {/* TAB */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-2xl rounded-full border border-[rgba(220,38,38,0.15)] bg-[rgba(220,38,38,0.03)] p-2 flex gap-2 backdrop-blur-xl">
            {[
              'projects',
              'capabilities',
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)

                  if (tab !== 'projects') {
                    setShowAllProjects(false)
                  }
                }}
                className={`flex-1 rounded-full py-3 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[rgba(220,38,38,0.18)] text-white shadow-[0_0_15px_rgba(220,38,38,0.15)]'
                    : 'text-white/50 hover:text-[#dc2626]'
                }`}
              >
                {tab === 'projects' ? 'Projects' : 'Capabilities'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45 }}
          >
            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <motion.div
                  layout
                  transition={{
                    layout: {
                      duration: 0.75,
                      ease: smoothEase,
                    },
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-1"
                >
                  <AnimatePresence mode="popLayout">
                    {displayedProjects.map(
                      (item, i) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{
                            opacity: 0,
                            y: 40,
                            scale: 0.96,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: -30,
                            scale: 0.95,
                          }}
                          transition={{
                            duration: 0.55,
                            delay: i * 0.04,
                            ease: smoothEase,
                          }}
                        >
                          <PortfolioCard
                            index={i}
                            title={item.title}
                            description={
                              item.description
                            }
                            image={item.image_url}
                            live_url={item.live_url}
                            id={item.id}
                          />
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* SEE MORE / LESS */}
                {allProjects.length > 3 && (
                    <motion.div
                      layout
                      transition={{
                        duration: 0.6,
                        ease: smoothEase,
                      }}
                      className="flex justify-center"
                    >
                      <motion.button
                        layout
                        whileHover={{
                          scale: 1.04,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        onClick={() =>
                          setShowAllProjects(
                            !showAllProjects
                          )
                        }
                        className="px-6 py-3 rounded-full border border-[rgba(220,38,38,0.12)] bg-[rgba(220,38,38,0.05)] backdrop-blur-xl text-sm text-white/75 hover:text-white transition flex items-center gap-2"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={
                              showAllProjects
                                ? 'less'
                                : 'more'
                            }
                            initial={{
                              opacity: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: -8,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            className="flex items-center gap-2"
                          >
                            {showAllProjects ? (
                              <>
                                <ChevronUp
                                  size={16}
                                />
                                See Less
                              </>
                            ) : (
                              <>
                                <ChevronDown
                                  size={16}
                                />
                                See More
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>
                  )}
              </div>
            )}

            {/* CAPABILITIES */}
            {activeTab === 'capabilities' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-1">
                {capabilities.map((cap, i) => {
                  const Icon = cap.icon
                  return (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 30, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: smoothEase }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group relative overflow-hidden rounded-[26px] border border-[rgba(220,38,38,0.18)] bg-[rgba(10,2,2,0.6)] p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between hover:border-[#dc2626] hover:shadow-[0_0_35px_rgba(220,38,38,0.22)] transition-all duration-500"
                    >
                      {/* Red ambient corner glow */}
                      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[rgba(220,38,38,0.12)] blur-2xl group-hover:bg-[rgba(220,38,38,0.28)] group-hover:scale-125 transition-all duration-700 pointer-events-none" />

                      <div className="relative z-10">
                        {/* Top row: Icon + Tag */}
                        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
                          <div className="w-13 h-13 rounded-2xl bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.25)] flex items-center justify-center text-[#dc2626] group-hover:bg-[#dc2626] group-hover:text-white group-hover:scale-105 transition-all duration-500 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
                            <Icon size={24} />
                          </div>
                          <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-[#dc2626] border border-[rgba(220,38,38,0.25)] bg-[rgba(220,38,38,0.06)] uppercase">
                            {cap.tag}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-red-100 transition-colors mb-2">
                          {cap.title}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed mb-6">
                          {cap.description}
                        </p>
                      </div>

                      {/* Capabilities pill tags */}
                      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-[rgba(220,38,38,0.12)]">
                        {cap.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-xs text-white/70 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shadow-[0_0_8px_#dc2626] shrink-0" />
                            <span className="truncate">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  )
}