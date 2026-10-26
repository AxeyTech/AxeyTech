// In-memory session tracking that resets ONLY on full page reload/refresh or new tab.
// Persists across all SPA client navigations (e.g. Details -> Back to Portfolio).
let hasPlayedIntroInMemory = false

export const hasPlayedIntro = (): boolean => {
  return hasPlayedIntroInMemory
}

export const setIntroPlayed = () => {
  hasPlayedIntroInMemory = true
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('heroPlayed', 'true')
    sessionStorage.setItem('navbarPlayed', 'true')
  }
}

export const resetIntro = () => {
  hasPlayedIntroInMemory = false
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('heroPlayed')
    sessionStorage.removeItem('navbarPlayed')
  }
}
