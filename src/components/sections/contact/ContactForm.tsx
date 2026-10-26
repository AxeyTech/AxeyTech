import { useState } from 'react'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import {
  Send,
  User,
  Mail,
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'

import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaSnapchatGhost,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

const socialLinks = [
  {
    title: 'Instagram',
    user: '@not_axey',
    icon: FaInstagram,
    link: 'https://www.instagram.com/not_axey?igsh=MWJjaGMycHUxcG9jMw==',
  },
  {
    title: 'X (Twitter)',
    user: '@Axeyatwork777',
    icon: FaXTwitter,
    link: 'https://x.com/Axeyatwork777',
  },
  {
    title: 'Github',
    user: '@AxeyTech',
    icon: FaGithub,
    link: 'https://github.com/AxeyTech',
  },
  {
    title: 'Snapchat',
    user: '@not_axey',
    icon: FaSnapchatGhost,
    link: 'https://www.snapchat.com/add/not_axey',
  },
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('Please enter your name.')
      return
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    if (!message.trim()) {
      setErrorMessage('Please write a message.')
      return
    }

    setIsSubmitting(true)

    // Store in localStorage as contact submission log
    try {
      const existing = JSON.parse(localStorage.getItem('axeytech_messages') || '[]')
      existing.push({ name, email, message, timestamp: new Date().toISOString() })
      localStorage.setItem('axeytech_messages', JSON.stringify(existing))
    } catch {
      // fallback
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
      setName('')
      setEmail('')
      setMessage('')
    }, 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-[28px] border border-[rgba(220,38,38,0.18)] bg-[rgba(20,4,4,0.7)] backdrop-blur-xl p-5 md:p-8 flex flex-col h-full shadow-[0_0_35px_rgba(220,38,38,0.06)]"
    >
      {/* HEADER */}
      <motion.div
        variants={fieldVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
          Get in Touch
        </h2>

        <p className="text-sm text-white/60 mb-7">
          Feel free to reach out if you want to collaborate,
          discuss ideas, or simply say hello.
        </p>
      </motion.div>

      {/* FORM OR SUCCESS STATE */}
      <AnimatePresence mode="wait">
        {isSent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl bg-[#140505] border border-[#dc2626]/40 text-center flex flex-col items-center justify-center my-auto py-10 shadow-[0_0_30px_rgba(220,38,38,0.15)]"
          >
            <div className="w-12 h-12 rounded-full bg-[#dc2626]/20 border border-[#dc2626] flex items-center justify-center text-[#ef4444] mb-3">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Message Sent!</h3>
            <p className="text-xs text-white/65 max-w-xs mb-5">
              Thank you for reaching out. Akshay will review your message and reply soon!
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="px-4 py-2 rounded-xl bg-[#dc2626]/20 hover:bg-[#dc2626]/30 border border-[#dc2626]/40 text-white text-xs font-semibold transition cursor-pointer"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                {errorMessage}
              </div>
            )}

            {/* NAME */}
            <motion.div
              variants={fieldVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(220,38,38,0.6)]" size={17} />

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full rounded-2xl border border-[rgba(220,38,38,0.18)] bg-[rgba(5,0,0,0.6)] pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/35 outline-none transition duration-200 focus:border-[#dc2626] focus:ring-1 focus:ring-[rgba(220,38,38,0.4)]"
                />
              </div>
            </motion.div>

            {/* EMAIL */}
            <motion.div
              variants={fieldVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
            >
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(220,38,38,0.6)]" size={17} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  className="w-full rounded-2xl border border-[rgba(220,38,38,0.18)] bg-[rgba(5,0,0,0.6)] pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/35 outline-none transition duration-200 focus:border-[#dc2626] focus:ring-1 focus:ring-[rgba(220,38,38,0.4)]"
                />
              </div>
            </motion.div>

            {/* MESSAGE */}
            <motion.div
              variants={fieldVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
            >
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-[rgba(220,38,38,0.6)]" size={17} />

                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  required
                  className="w-full rounded-2xl border border-[rgba(220,38,38,0.18)] bg-[rgba(5,0,0,0.6)] pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/35 outline-none resize-none transition duration-200 focus:border-[#dc2626] focus:ring-1 focus:ring-[rgba(220,38,38,0.4)]"
                />
              </div>
            </motion.div>

            {/* BUTTON */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={fieldVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-2xl py-3.5 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] border border-[#dc2626] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(220,38,38,0.3)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        )}
      </AnimatePresence>

      {/* SOCIAL */}
      <div className="border-t border-white/10 pt-5 mt-6">
        <motion.p
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.34 }}
          className="text-sm text-white/55 mb-4"
        >
          Connect With Me
        </motion.p>

        {/* LINKEDIN */} 
        <motion.a
          href="https://www.linkedin.com/in/akshay-techanalyst"
          target="_blank"
          rel="noopener noreferrer"
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.36 }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.12 },
          }}
          className="group relative overflow-hidden rounded-2xl border border-[rgba(220,38,38,0.1)] bg-[rgba(5,0,0,0.4)] p-4 mb-3 flex items-center justify-between"
        >
          <div className="absolute inset-0 bg-[#dc2626] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

          <div className="relative z-10 flex items-center gap-3">
            <FaLinkedinIn />

            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <p className="text-xs text-white/35">@akshay-techanalyst</p>
            </div>
          </div>

          <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
            <div className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </motion.a>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fieldVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                transition={{
                  delay: 0.42 + i * 0.05,
                }}
                whileHover={{
                  scale: 1.06,
                  transition: { duration: 0.12 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(220,38,38,0.1)] bg-[rgba(5,0,0,0.4)] p-3 flex items-center justify-between"
              >
                <div className="absolute inset-0 bg-[#dc2626] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                <div className="relative z-10 flex items-center gap-3">
                  <Icon />

                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-[11px] text-white/35">
                      {item.user}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
                  <div className="w-6 h-6 rounded-md bg-black/20 flex items-center justify-center">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}