'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useCyberTransition } from '@/context/TransitionContext'

type Props = {
  title: string
  description: string
  index: number
  id?: string
  image?: string
  live_url?: string
}

export default function PortfolioCard({ title, description, index, id, image, live_url }: Props) {
  const router = useRouter()
  const { transitionTo } = useCyberTransition()

  // Proactively prefetch project detail chunks as soon as the card mounts
  useEffect(() => {
    if (id) {
      router.prefetch(`/portfolio/${id}`)
    }
  }, [id, router])

  const handleOpenDetails = (e?: React.MouseEvent) => {
    if (!id) return
    if (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return
      e.preventDefault()
    }
    transitionTo(`/portfolio/${id}`, `INITIALIZING ${title.toUpperCase()}`)
  }

  return (
    <div
      onMouseEnter={() => {
        if (id) router.prefetch(`/portfolio/${id}`)
      }}
      onTouchStart={() => {
        if (id) router.prefetch(`/portfolio/${id}`)
      }}
      className="group relative rounded-[26px] border border-[rgba(220,38,38,0.18)] bg-[rgba(20,4,4,0.7)] p-4 backdrop-blur-xl flex flex-col min-h-[270px] overflow-hidden transition-all duration-300 hover:border-[rgba(220,38,38,0.45)] hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(220,38,38,0.2)]"
    >
      {/* Image — Clickable to open details */}
      <div
        onClick={handleOpenDetails}
        className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-[rgba(220,38,38,0.15)] bg-[rgba(220,38,38,0.02)] mb-3 relative group/img cursor-pointer"
      >
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-top group-hover/img:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[rgba(220,38,38,0.03)]" />
        )}
      </div>

      <h3
        onClick={handleOpenDetails}
        className="text-[17px] font-semibold mb-2 leading-tight text-white hover:text-[#ef4444] transition-colors cursor-pointer"
      >
        {title}
      </h3>
      <p className="text-[13px] text-white/65 leading-relaxed line-clamp-2 min-h-[38px]">{description}</p>

      <div className="mt-auto pt-4 flex items-center justify-between">
        {live_url ? (
          <a
            href={live_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-[13px] text-[#dc2626] hover:text-[#ef4444] transition-colors font-medium group/link"
          >
            <span>Live Demo</span>
            <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <div className="text-[13px] text-white/35">No Link</div>
        )}

        {id && (
          <Link
            href={`/portfolio/${id}`}
            prefetch={true}
            onClick={handleOpenDetails}
            onMouseEnter={() => router.prefetch(`/portfolio/${id}`)}
            onTouchStart={() => router.prefetch(`/portfolio/${id}`)}
            className="px-4 py-2 rounded-full bg-[rgba(220,38,38,0.12)] hover:bg-[rgba(220,38,38,0.22)] border border-[rgba(220,38,38,0.25)] hover:border-[#dc2626] transition-all flex items-center gap-2 text-[13px] text-white shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] cursor-pointer group/btn active:scale-95"
          >
            <span>Details</span>
            <ArrowRight size={13} className="text-[#dc2626] group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  )
}

