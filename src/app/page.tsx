'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import AnimatedBackground from '@/components/AnimatedBackground'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'
import ContactSection from '@/components/sections/contact/ContactSection'
import WelcomeScreen from '@/components/WelcomeScreen'
import { hasPlayedIntro, setIntroPlayed } from '@/lib/introState'

export default function Home() {
  // If intro has already played in this page session (e.g. user returning from details page),
  // showWelcome is FALSE immediately!
  // If opening website directly or refreshing (reloading), hasPlayedIntro() is FALSE, so showWelcome is TRUE!
  const [showWelcome, setShowWelcome] = useState(() => !hasPlayedIntro())
  const [showApp, setShowApp] = useState(() => hasPlayedIntro())

  useEffect(() => {
    // If intro has already played in this page session (e.g. returning from project details):
    if (hasPlayedIntro()) {
      setShowWelcome(false)
      setShowApp(true)

      const targetHash = window.location.hash
        ? window.location.hash.replace('#', '')
        : 'portfolio'

      if (targetHash) {
        setTimeout(() => {
          const el = document.getElementById(targetHash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 120)
      }
      return
    }

    // DIRECT OPEN OR REFRESH: ALWAYS PLAY THE FULL "WELCOME TO MY PORTFOLIO WEBSITE" TRANSITION!
    setIntroPlayed()
    setShowWelcome(true)
    setShowApp(false)

    // Clean up hash from URL bar so it doesn't anchor-jump during intro
    if (window.location.hash) {
      try {
        history.replaceState(null, '', window.location.pathname)
      } catch {}
    }

    const timer = setTimeout(() => {
      setShowWelcome(false)
      setShowApp(true)
    }, 2800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatedBackground />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <Hero showApp={showApp} />
        <About />
        <PortfolioShowcase />
        <ContactSection />
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            onAnimationStart={(definition) => {
              if (definition === 'exit') {
                setShowApp(true)
              }
            }}
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
            }}
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}