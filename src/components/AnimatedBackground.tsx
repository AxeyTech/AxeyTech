'use client'

import React, { useEffect, useState } from 'react'

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        transform: 'translate3d(0, 0, 0)',
        contain: 'strict',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* Dark vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #050000 70%)',
        }}
      />

      {/* Red ambient glow orbs — GPU-accelerated CSS animations, 0 blur reflow overhead */}
      <div className="absolute inset-0">
        <div
          className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] rounded-full animate-float opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.16) 0%, transparent 70%)',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute top-[25%] right-[-10%] w-[520px] h-[520px] rounded-full animate-float opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)',
            animationDelay: '3s',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute bottom-[15%] left-[15%] w-[480px] h-[480px] rounded-full animate-float opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.13) 0%, transparent 70%)',
            animationDelay: '1.5s',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full animate-float opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)',
            animationDelay: '4.5s',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Floating ember particles — GPU transformed */}
      <div className="absolute inset-0">
        {mounted &&
          Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-ember"
              style={{
                width: `${(i % 3) * 1.5 + 2}px`,
                height: `${(i % 3) * 1.5 + 2}px`,
                left: `${(i * 7.14) % 100}%`,
                bottom: `${(i * 5) % 20 - 10}%`,
                background:
                  i % 3 === 0
                    ? 'rgba(220, 38, 38, 0.75)'
                    : i % 3 === 1
                    ? 'rgba(239, 68, 68, 0.55)'
                    : 'rgba(248, 113, 113, 0.35)',
                boxShadow: `0 0 6px rgba(220, 38, 38, 0.4)`,
                animationDuration: `${(i % 5) + 7}s`,
                animationDelay: `${(i * 0.4) % 4}s`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
      </div>

      {/* Subtle cyber red grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(220,38,38,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(220,38,38,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}

export default AnimatedBackground
