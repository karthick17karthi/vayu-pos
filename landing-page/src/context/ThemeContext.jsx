import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_KEY = 'app-theme'
const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
}

const ThemeContext = createContext(undefined)

const resolveInitialTheme = () => {
  return THEMES.LIGHT
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(resolveInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove(THEMES.DARK)
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
      className={`rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 ${className}`}
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default ThemeContext
