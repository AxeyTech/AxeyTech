'use client'

import { motion } from 'framer-motion'
import { Code2, User, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function WelcomeScreen() {
  const icons = [Code2, User, Globe]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#050000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      {/* Red glow background pulse */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Ember particles */}
      {mounted && Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -300 - Math.random() * 200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            bottom: '30%',
            left: `${20 + Math.random() * 60}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            borderRadius: '50%',
            background: '#dc2626',
            boxShadow: '0 0 8px rgba(220,38,38,0.6)',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: 'center',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: '360px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Icons with red glow */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.3, rotate: -140, y: 60 },
                visible: { opacity: 1, scale: 1, rotate: 0, y: 0 },
              }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                border: '1px solid rgba(220,38,38,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(220,38,38,0.08)',
                boxShadow: '0 0 20px rgba(220,38,38,0.15)',
              }}
            >
              <Icon size={20} color="#dc2626" />
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <motion.span
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(20px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.05em' }}
            >
              Welcome
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(20px, 3.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.05em' }}
            >
              to my
            </motion.span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="red-gradient-text"
            style={{
              fontSize: 'clamp(22px, 4vw, 38px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1.15,
              margin: 0,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Portfolio Website
          </motion.h1>
        </div>

        {/* Domain capsule with red glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '8px 20px',
            borderRadius: '999px',
            border: '1px solid rgba(220,38,38,0.25)',
            background: 'rgba(220,38,38,0.06)',
            fontSize: '12px',
            letterSpacing: '0.15em',
            color: '#dc2626',
            boxShadow: '0 0 25px rgba(220,38,38,0.1)',
          }}
        >
          AxeyTech
        </motion.div>
      </motion.div>
    </div>
  )
}