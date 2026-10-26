'use client'

import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import CommentsSection from './CommentsSection'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full max-w-[1500px] mx-auto 
      px-5 sm:px-6 md:px-10 lg:px-20
      pt-20 sm:pt-24 lg:pt-28 
      pb-24 sm:pb-28 lg:pb-36 
      text-white"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          ease: smoothEase,
        }}
        className="text-center mb-12 sm:mb-14 lg:mb-16"
      >
        {/* Subtle Cyber Tag matching About section */}
        <div className="mb-3.5 flex justify-center">
          <span className="font-mono text-xs text-[#a08080] tracking-[0.2em] inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(220,38,38,0.06)] border border-[rgba(220,38,38,0.2)] shadow-[0_0_15px_rgba(220,38,38,0.08)]">
            <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
            GET IN TOUCH
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4 text-white">
          Contact <span className="red-gradient-text">Me</span>
        </h1>

        <p className="text-white/65 text-sm sm:text-base max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
          Have something in mind? Send a message and let&apos;s connect.
        </p>
      </motion.div>

      {/* CONTENT */}
      <div
        className="
        grid 
        grid-cols-1 
        md:grid-cols-1 
        lg:grid-cols-[420px_1fr] 
        gap-6 sm:gap-8 md:gap-10 lg:gap-12
      "
      >
        {/* FORM */}
        <div className="w-full">
          <ContactForm />
        </div>

        {/* COMMENTS */}
        <div className="w-full">
          <CommentsSection />
        </div>
      </div>
 {/* COPYRIGHT */}
<div className="mt-20 text-center text-xs text-white/35">
  © 2026 Akshay Sharma — All rights reserved.
</div>
    </section>
  )
}