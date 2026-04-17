import { create } from 'zustand'

export type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggle: () => void
  set: (t: Theme) => void
  init: () => void
}

const STORAGE_KEY = 'mesa-ads.theme'

function applyTheme(t: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = t
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', t === 'dark' ? '#040405' : '#F5F5F3')
  // color-scheme pra scrollbars/inputs nativos
  document.documentElement.style.colorScheme = t
}

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: initialTheme(),
  toggle: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
    set({ theme: next })
  },
  set: (t) => {
    localStorage.setItem(STORAGE_KEY, t)
    applyTheme(t)
    set({ theme: t })
  },
  init: () => {
    applyTheme(get().theme)
  },
}))
