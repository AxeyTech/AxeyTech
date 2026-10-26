'use client'

import { useEffect, useState } from 'react'
import {
  fetchCertificates,
  fetchProjects,
  fetchTechStacks,
} from '@/lib/portfolioService'

export default function usePortfolio() {
  const [projects, setProjects] = useState<any[]>([])
  const [certificates, setCertificates] =
    useState<any[]>([])
  const [techStacks, setTechStacks] =
    useState<any[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPortfolio()
  }, [])

  const loadPortfolio = async () => {
    try {
      const cachedProjects = sessionStorage.getItem('portfolioProjects')
      if (cachedProjects) setProjects(JSON.parse(cachedProjects))
    } catch {}

    try {
      const cachedCertificates = sessionStorage.getItem('portfolioCertificates')
      if (cachedCertificates) setCertificates(JSON.parse(cachedCertificates))
    } catch {}

    try {
      const cachedTechStacks = sessionStorage.getItem('portfolioTechStacks')
      if (cachedTechStacks) setTechStacks(JSON.parse(cachedTechStacks))
    } catch {}

    const [
      projectsData,
      certificatesData,
      techStacksData,
    ] = await Promise.all([
      fetchProjects(),
      fetchCertificates(),
      fetchTechStacks(),
    ])

    setProjects(projectsData || [])
    setCertificates(certificatesData || [])
    setTechStacks(techStacksData || [])

    try {
      sessionStorage.setItem(
        'portfolioProjects',
        JSON.stringify(projectsData || [])
      )
      sessionStorage.setItem(
        'portfolioCertificates',
        JSON.stringify(certificatesData || [])
      )
      sessionStorage.setItem(
        'portfolioTechStacks',
        JSON.stringify(techStacksData || [])
      )
    } catch {}

    setLoading(false)
  }

  return {
    projects,
    certificates,
    techStacks,
    loading,
  }
}