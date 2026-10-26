'use client'

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { Terminal, Zap, Crosshair, Orbit, Cpu, Sparkles } from 'lucide-react'

type TransitionContextType = {
  transitionTo: (url: string, label?: string) => void
  triggerQuantumWarp: (onMidpoint?: () => void) => void
  isReturningFromDetails: boolean
  setIsReturningFromDetails: (val: boolean) => void
}

const TransitionContext = createContext<TransitionContextType>({
  transitionTo: () => {},
  triggerQuantumWarp: () => {},
  isReturningFromDetails: false,
  setIsReturningFromDetails: () => {},
})

export const useCyberTransition = () => useContext(TransitionContext)

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)
  const [loadingText, setLoadingText] = useState('ACCESSING SYSTEM')
  const [isWarpActive, setIsWarpActive] = useState(false)
  const [isReturningFromDetails, setIsReturningFromDetails] = useState(false)

  const targetPathRef = useRef<string | null>(null)
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isNavigatingRef = useRef<boolean>(false)

  // Automatically dismiss transition once Next.js renders the destination route
  useEffect(() => {
    if (isActive) {
      const dismissTimer = setTimeout(() => {
        setIsActive(false)
        targetPathRef.current = null
        isNavigatingRef.current = false
      }, 150)

      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current)
        safetyTimerRef.current = null
      }

      return () => clearTimeout(dismissTimer)
    }
  }, [pathname, isActive])

  const transitionTo = (url: string, label?: string) => {
    targetPathRef.current = url
    setLoadingText(label || 'INITIALIZING SECURE LINK')
    setIsActive(true)

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('fromDetailPage', 'true')
      sessionStorage.setItem('skipIntroOnce', 'true')
      sessionStorage.setItem('heroPlayed', 'true')
    }

    // Directly push without artificial setTimeout delays
    try {
      router.push(url)
    } catch {
      if (typeof window !== 'undefined') {
        window.location.href = url
      }
    }

    // Clear any prior safety fallback
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current)
    }

    // Safety fallback: Dismiss after 800ms so screen is NEVER stuck
    safetyTimerRef.current = setTimeout(() => {
      setIsActive(false)
      targetPathRef.current = null
      isNavigatingRef.current = false
    }, 800)
  }

  const triggerQuantumWarp = (onMidpoint?: () => void) => {
    if (isActive || isWarpActive) return

    setIsWarpActive(true)

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('fromDetailPage', 'true')
      sessionStorage.setItem('skipIntroOnce', 'true')
      sessionStorage.setItem('heroPlayed', 'true')
    }

    // Midpoint: screen is 100% sealed by dual blast shutters
    setTimeout(() => {
      if (onMidpoint) {
        onMidpoint()
      } else if (pathname !== '/') {
        router.push('/')
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }

      // Smooth shutter retract
      setTimeout(() => {
        setIsWarpActive(false)
      }, 340)
    }, 380)
  }

  return (
    <TransitionContext.Provider
      value={{
        transitionTo,
        triggerQuantumWarp,
        isReturningFromDetails,
        setIsReturningFromDetails,
      }}
    >
      {children}

      {/* STANDARD PAGE CYBER WIPE TRANSITION */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ willChange: 'transform' }}
            className="fixed inset-0 z-[99999] bg-[#050000] flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Top Leading Edge Laser Beam */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_0_25px_#dc2626,0_0_50px_#ef4444]" />

            {/* Hardware-accelerated radial background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(220,38,38,0.15),transparent_70%)] pointer-events-none" />

            {/* Cyber Terminal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm"
            >
              {/* Spinning Cyber Red Ring */}
              <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[#dc2626]/20 border-t-[#dc2626] animate-spin" />
                <div className="w-8 h-8 rounded-full bg-[#dc2626]/10 border border-[#dc2626]/40 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  <Terminal size={15} className="text-[#ef4444]" />
                </div>
              </div>

              {/* System Tag */}
              <p className="text-[11px] font-mono tracking-[0.25em] text-[#dc2626] uppercase font-bold mb-1">
                AxeyTech System
              </p>

              {/* Action Title */}
              <h4 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase mb-3">
                {loadingText}
              </h4>

              {/* Progress Line */}
              <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 0.65, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_0_10px_#dc2626]"
                />
              </div>
            </motion.div>

            {/* Bottom Edge Laser Beam */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_0_25px_#dc2626,0_0_50px_#ef4444]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ULTRA LEGENDARY QUANTUM HYPER-WARP TRANSITION */}
      <AnimatePresence>
        {isWarpActive && (
          <div className="fixed inset-0 z-[999999] pointer-events-auto overflow-hidden">
            {/* TOP SHUTTER BLADE */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform' }}
              className="absolute top-0 left-0 right-0 h-1/2 bg-[#050000] border-b border-[#dc2626]/60 flex flex-col justify-end shadow-[0_15px_40px_rgba(220,38,38,0.3)]"
            >
              {/* Laser Seam Line */}
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_0_30px_#ef4444,0_0_60px_#dc2626]" />
            </motion.div>

            {/* BOTTOM SHUTTER BLADE */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform' }}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050000] border-t border-[#dc2626]/60 flex flex-col justify-start shadow-[0_-15px_40px_rgba(220,38,38,0.3)]"
            >
              {/* Laser Seam Line */}
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent shadow-[0_0_30px_#ef4444,0_0_60px_#dc2626]" />
            </motion.div>

            {/* CENTER HOLOGRAPHIC QUANTUM HUD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.28, delay: 0.08 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none p-6 text-center"
            >
              {/* Ambient Red Glow Core */}
              <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.22)_0%,transparent_70%)] pointer-events-none" />

              {/* Reactor Core Hologram */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 sm:mb-5 flex items-center justify-center">
                {/* Outer Dashed Techno Ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#dc2626]/50 animate-spin [animation-duration:8s]" />

                {/* Inner Counter-Rotating Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-[#dc2626] border-t-transparent border-b-transparent animate-spin [animation-direction:reverse] [animation-duration:3s]" />

                {/* Center Core Glass Hexagon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-[#dc2626]/30 to-[#ef4444]/10 border border-[#dc2626] flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] backdrop-blur-md overflow-hidden p-2.5">
                  <img
                    src="/assets/website_icon_a.png"
                    alt="AxeyTech Core"
                    className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(220,38,38,0.9)] animate-pulse"
                  />
                </div>
              </div>

              {/* BRAND LOGO BADGE */}
              <div className="relative mb-2">
                <span className="font-mono text-2xl sm:text-3xl font-black tracking-[0.25em] uppercase text-white drop-shadow-[0_0_20px_rgba(220,38,38,0.9)]">
                  <span className="text-[#dc2626]">AXEY</span>TECH
                </span>
              </div>

              {/* SYSTEM TAG */}
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#dc2626]/15 border border-[#dc2626]/40 text-[#ef4444] font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-3 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                <Sparkles size={12} className="animate-spin [animation-duration:4s]" />
                <span>QUANTUM HYPER-WARP // NEXUS PRIME</span>
              </div>

              {/* TELEMETRY READOUT */}
              <div className="font-mono text-[10px] sm:text-xs text-white/80 space-y-1.5 mb-4">
                <p className="tracking-[0.2em] text-white font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                  [WARP DRIVE ENGAGED • TRANSCENDING DIGITAL REALITY]
                </p>
                <p className="text-[#ef4444] tracking-[0.18em] text-[10px] sm:text-[11px] font-bold drop-shadow-[0_0_15px_rgba(220,38,38,0.9)]">
                  ENTERING AXEYTECH NEXUS // WHERE CODE MEETS THE COSMOS
                </p>
              </div>

              {/* WARP PROGRESS BAR */}
              <div className="w-44 sm:w-60 h-[3px] bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/10">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.32, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-[#dc2626] via-[#ef4444] to-[#ffffff] shadow-[0_0_15px_#dc2626]"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  )
}
