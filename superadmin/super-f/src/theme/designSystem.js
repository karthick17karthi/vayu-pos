export const THEME_MODE = {
  DARK: 'dark',
  LIGHT: 'light',
}

const colorTokens = {
  [THEME_MODE.DARK]: {
    'bg-primary': 'bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]',
    'card-bg': 'bg-[#0e2a33]',
    'sidebar-bg': 'bg-[#0b1f2a]',
    accent: 'bg-[#14b8a6]',
    'accent-light': 'bg-[#22d3ee]',
    'text-primary': 'text-white',
    border: 'border-white/10',
  },
  [THEME_MODE.LIGHT]: {
    'bg-primary': 'bg-gradient-to-br from-slate-100 via-white to-slate-200',
    'card-bg': 'bg-white',
    'sidebar-bg': 'bg-white',
    accent: 'bg-sky-500',
    'accent-light': 'bg-cyan-400',
    'text-primary': 'text-slate-800',
    border: 'border-slate-200',
  },
}

const utilityClasses = {
  [THEME_MODE.DARK]: {
    card: 'rounded-2xl border border-white/10 bg-[#0e2a33] text-white shadow-xl',
    sidebar: 'border-r border-white/10 bg-[#0b1f2a] text-white',
    'primary-button': 'inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 px-4 py-2 font-medium text-white transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.45)] focus:outline-none focus:ring-2 focus:ring-cyan-300/60',
    'glass-card': 'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white shadow-xl',
    'input-field': 'w-full rounded-xl border border-white/10 bg-[#0f2530] px-3 py-2 text-white placeholder:text-slate-400 focus:border-[#22d3ee] focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/30',
    'table-style': 'w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0e2a33] text-white',
  },
  [THEME_MODE.LIGHT]: {
    card: 'rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm',
    sidebar: 'border-r border-slate-200 bg-white text-slate-800',
    'primary-button': 'inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 px-4 py-2 font-medium text-white transition-all hover:shadow-[0_0_18px_rgba(34,211,238,0.45)] focus:outline-none focus:ring-2 focus:ring-cyan-400/60',
    'glass-card': 'rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md text-slate-800 shadow-sm',
    'input-field': 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30',
    'table-style': 'w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-800',
  },
}

export const getThemeConfig = (mode = THEME_MODE.DARK) => {
  const resolvedMode = mode === THEME_MODE.LIGHT ? THEME_MODE.LIGHT : THEME_MODE.DARK

  return {
    mode: resolvedMode,
    colors: colorTokens[resolvedMode],
    classes: utilityClasses[resolvedMode],
  }
}

const designSystem = {
  modes: THEME_MODE,
  colors: colorTokens,
  utilities: utilityClasses,
  getThemeConfig,
}

export default designSystem
