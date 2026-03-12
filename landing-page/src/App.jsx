import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Home from './pages/Home'
import posImage from './assets/pos-machine.png'

const App = () => {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 900], [0, -130])
  const imageScale = useTransform(scrollY, [0, 900], [1, 1.12])
  const imageOpacity = useTransform(scrollY, [0, 600], [0.7, 0.25])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.img
          style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
          src={posImage}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[92vh] w-auto max-w-[78vw] object-contain"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/62 via-slate-100/52 to-slate-200/62 dark:from-[#0f2027]/72 dark:via-[#203a43]/68 dark:to-[#2c5364]/72" />
      <div className="relative z-20 text-white">
        <Home />
      </div>
    </div>
  )
}

export default App
