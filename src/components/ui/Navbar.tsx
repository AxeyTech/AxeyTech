'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCyberTransition } from '@/context/TransitionContext'
import { setIntroPlayed } from '@/lib/introState'

export default function Navbar() {
  const { triggerQuantumWarp } = useCyberTransition()
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const [isWarping, setIsWarping] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => setIsMobile(window.innerWidth < 768)

    // Ultra-light passive scroll listener (zero layout reflow)
    let lastKnownScrollY = 0
    let ticking = false
    const handleScroll = () => {
      lastKnownScrollY = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(lastKnownScrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    // Zero-reflow IntersectionObserver for active section detection
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0,
    })

    const sections = ['home', 'about', 'portfolio', 'contact']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    handleResize()
    handleScroll()
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const navbarPlayed = sessionStorage.getItem('navbarPlayed')
    if (navbarPlayed) { setShowNavbar(true); return }
    const timer = setTimeout(() => {
      setShowNavbar(true)
      sessionStorage.setItem('navbarPlayed', 'true')
    }, 3800)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    setIntroPlayed()
    setIsWarping(true)
    setTimeout(() => setIsWarping(false), 900)
    triggerQuantumWarp(() => {
      const target = document.getElementById('home')
      if (target) {
        target.scrollIntoView({ behavior: 'instant' })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      setActiveSection('home')
    })
  }

  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(targetId)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'fixed', top: isMobile ? 12 : 20, left: isMobile ? 14 : 60, right: isMobile ? 14 : 60, zIndex: 50 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '8px 16px' : '12px 28px',
          width: '100%',
          borderRadius: 999,
          backgroundColor: scrolled ? 'rgba(5,0,0,0.92)' : 'rgba(5,0,0,0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(220,38,38,0.1)',
          boxShadow: scrolled ? '0 0 30px rgba(220,38,38,0.08)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Interactive AxeyTech Logo with Cyber Shimmer Hover & Quantum Warp Click */}
        <motion.button
          type="button"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="relative group px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-[rgba(220,38,38,0.25)] hover:border-[#dc2626] bg-[rgba(220,38,38,0.06)] hover:bg-[rgba(220,38,38,0.16)] transition-all cursor-pointer overflow-hidden flex items-center gap-2.5 shadow-[0_0_15px_rgba(220,38,38,0.08)] hover:shadow-[0_0_28px_rgba(220,38,38,0.45)] focus:outline-none"
        >
          {/* Laser specular sweep on hover */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          {/* Circular AxeyTech Website Emblem with Multi-Layered Cyber FX */}
          <div className="relative w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center shrink-0">
            {/* Quantum Shockwave Ring on Click */}
            <AnimatePresence>
              {isWarping && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 rounded-full border-2 border-[#ef4444] shadow-[0_0_25px_#dc2626] pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Outer Dashed Orbit Ring (Spins on Hover) */}
            <div className="absolute -inset-[3px] rounded-full border border-dashed border-[#dc2626]/40 group-hover:border-[#dc2626] group-hover:rotate-180 transition-all duration-700 ease-out pointer-events-none" />

            {/* Ambient Red Glow Halo */}
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-[#dc2626] to-[#ef4444] opacity-25 group-hover:opacity-85 blur-[3px] transition-all duration-500 pointer-events-none" />

            {/* Circular Emblem Lens */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-[#1c0404] via-[#0d0101] to-[#050000] border border-[#dc2626]/60 group-hover:border-[#ef4444] shadow-[0_0_12px_rgba(220,38,38,0.4)] group-hover:shadow-[0_0_22px_rgba(220,38,38,0.9)] flex items-center justify-center transition-all duration-300">
              <img
                src="/assets/website_icon_a.png"
                alt="AxeyTech Icon"
                className="w-[82%] h-[82%] object-contain drop-shadow-[0_0_8px_rgba(220,38,38,0.85)] group-hover:scale-115 group-hover:rotate-6 group-active:scale-90 group-active:rotate-45 transition-all duration-300 ease-out"
              />
            </div>
          </div>

          {/* Logo Text with dual-tone glow & letter spacing expansion */}
          <span className="font-mono text-sm tracking-[0.14em] font-bold select-none group-hover:tracking-[0.18em] transition-all flex items-center">
            <span className="text-[#dc2626] drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">Axey</span>
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Tech</span>
          </span>

          {/* Cyber Accent Arrow */}
          <span className="text-[#dc2626] text-[10px] font-mono opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            ▸
          </span>
        </motion.button>

        {/* Desktop Nav */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: 36 }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                  style={{
                    position: 'relative',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: isActive ? '#dc2626' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    paddingBottom: 6,
                    transition: 'color 0.3s ease',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                  {/* Active dot indicator */}
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isActive ? 6 : 0,
                    height: isActive ? 6 : 0,
                    borderRadius: '50%',
                    background: '#dc2626',
                    boxShadow: isActive ? '0 0 10px rgba(220,38,38,0.6)' : 'none',
                    transition: 'all 0.3s ease',
                  }} />
                </a>
              )
            })}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              cursor: 'pointer',
              padding: 8,
              background: 'transparent',
              border: 'none',
            }}
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} style={{ width: 22, height: 2, background: '#dc2626', borderRadius: 2, transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: open ? 0 : 1 }} style={{ width: 22, height: 2, background: '#dc2626', borderRadius: 2 }} />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} style={{ width: 22, height: 2, background: '#dc2626', borderRadius: 2, transformOrigin: 'center' }} />
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: 10,
            borderRadius: 20,
            background: 'rgba(5,0,0,0.95)',
            border: '1px solid rgba(220,38,38,0.15)',
            backdropFilter: 'blur(16px)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            boxShadow: '0 0 40px rgba(220,38,38,0.08)',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  color: isActive ? '#dc2626' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  textTransform: 'uppercase',
                }}
              >
                {isActive && (
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#dc2626',
                    boxShadow: '0 0 10px rgba(220,38,38,0.6)',
                  }} />
                )}
                {item.label}
              </a>
            )
          })}
        </motion.div>
      )}
    </motion.nav>
  )
}