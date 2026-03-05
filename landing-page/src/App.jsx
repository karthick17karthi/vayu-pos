import React from 'react'
import Home from './pages/Home'
import posImage from './assets/pos-machine.png'

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={posImage}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[92vh] w-auto max-w-[78vw] object-contain opacity-70"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027]/72 via-[#203a43]/68 to-[#2c5364]/72 z-10" />
      <div className="relative z-20 text-white">
        <Home />
      </div>
    </div>
  )
}

export default App
