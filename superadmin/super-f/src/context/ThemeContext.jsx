import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_KEY = 'app-theme'
const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
}

const ThemeContext = createContext(undefined)

const resolveInitialTheme = () => {
  if (typeof window === 'undefined') {
    return THEMES.DARK
  }

  const savedTheme = window.localStorage.getItem(THEME_KEY)
  if (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT) {
    return savedTheme
  }

  return THEMES.DARK
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(resolveInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle(THEMES.DARK, theme === THEMES.DARK)
    root.classList.add('transition-colors', 'duration-300')
    document.body.classList.add('transition-colors', 'duration-300')
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const setDark = () => setTheme(THEMES.DARK)
  const setLight = () => setTheme(THEMES.LIGHT)
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK,
    )
  }

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === THEMES.DARK,
      isLight: theme === THEMES.LIGHT,
      setTheme,
      setDark,
      setLight,
      toggleTheme,
      themes: THEMES,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export const ThemeToggleButton = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 ${className}`}
    >
      {isDark ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  )
}

export default ThemeContext
