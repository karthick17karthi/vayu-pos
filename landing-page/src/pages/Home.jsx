import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useMotionValue, useTransform, useInView } from 'framer-motion'
import { CreditCard, Package, FileText, Building2, Headphones, BarChart3, Shield, Settings, Menu, X, Check, LayoutGrid, Phone, Mail, MapPin, Link2, Instagram, Facebook, Youtube, Linkedin, Twitter, Globe, MessageCircle } from 'lucide-react'


const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV
  ? 'http://localhost:8000'
  : 'https://vayu-backend-o4xa.onrender.com')

const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '')

const FEATURE_VISUALS = {
  billing: { icon: CreditCard, from: 'from-blue-500', to: 'to-blue-600', bg: 'from-blue-400 to-blue-600' },
  inventory: { icon: Package, from: 'from-green-500', to: 'to-green-600', bg: 'from-green-400 to-green-600' },
  reports: { icon: FileText, from: 'from-orange-500', to: 'to-orange-600', bg: 'from-orange-400 to-orange-600' },
  branch: { icon: Building2, from: 'from-purple-500', to: 'to-purple-600', bg: 'from-purple-400 to-purple-600' },
  support: { icon: Headphones, from: 'from-pink-500', to: 'to-pink-600', bg: 'from-pink-400 to-pink-600' },
  analytics: { icon: BarChart3, from: 'from-cyan-500', to: 'to-cyan-600', bg: 'from-cyan-400 to-cyan-600' },
  security: { icon: Shield, from: 'from-red-500', to: 'to-red-600', bg: 'from-red-400 to-red-600' },
  settings: { icon: Settings, from: 'from-slate-500', to: 'to-slate-600', bg: 'from-slate-400 to-slate-600' },
}

const getFeatureVisual = (iconKey) => FEATURE_VISUALS[iconKey] || FEATURE_VISUALS.billing

const getFooterContactIcon = (type) => {
  const normalized = String(type || '').toLowerCase()
  if (normalized === 'phone') return Phone
  if (normalized === 'email') return Mail
  if (normalized === 'location') return MapPin
  return Link2
}

const SOCIAL_LINK_VISUALS = {
  instagram: { icon: Instagram, label: 'Instagram' },
  facebook: { icon: Facebook, label: 'Facebook' },
  youtube: { icon: Youtube, label: 'YouTube' },
  linkedin: { icon: Linkedin, label: 'LinkedIn' },
  twitter: { icon: Twitter, label: 'X / Twitter' },
  whatsapp: { icon: MessageCircle, label: 'WhatsApp' },
  website: { icon: Globe, label: 'Website' },
}

const getSocialLinkVisual = (platform) => SOCIAL_LINK_VISUALS[String(platform || '').toLowerCase()] || SOCIAL_LINK_VISUALS.website

// ── Animation helpers ────────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const CountUp = ({ target, duration = 1.4 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView || typeof target !== 'number') return
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])
  return <span ref={ref}>{count.toLocaleString()}</span>
}

const TiltCard = ({ children, className, initial, whileInView, viewport, transition }) => {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-60, 60], [7, -7])
  const rotateY = useTransform(mx, [-60, 60], [-7, 7])
  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left - r.width / 2)
        my.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const Home = () => {
  // CMS Data State
  const [landingData, setLandingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30 })

  // Fetch landing data on mount
  useEffect(() => {
    fetchLandingData()
  }, [])

  const fetchLandingData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/api/landing`)
      if (!response.ok) {
        throw new Error(`Failed to fetch landing data: ${response.status}`)
      }
      const data = await response.json()
      setLandingData(data)
      const initialData = {}
      data.demoForm.fields.forEach((field) => {
        initialData[field.key] = ''
      })
      setFormData(initialData)
    } catch (err) {
      console.error('Error fetching landing data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const standardKeys = [
      'ownerName',
      'hotelName',
      'licenseNumber',
      'phone',
      'email',
      'city',
      'branches',
      'message'
    ]

    const extraFields = {}
    Object.entries(formData).forEach(([key, value]) => {
      if (!standardKeys.includes(key)) {
        extraFields[key] = String(value ?? '')
      }
    })

    const payload = {
      ownerName: formData.ownerName || '',
      hotelName: formData.hotelName || '',
      licenseNumber: formData.licenseNumber || '',
      phone: formData.phone || '',
      email: formData.email || '',
      city: formData.city || '',
      branches: Number(formData.branches) || 0,
      message: formData.message || '',
      extraFields: Object.keys(extraFields).length > 0 ? extraFields : null
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'Request failed')
      }

      alert('Demo Request Submitted Successfully!')
      const resetData = {}
      landingData.demoForm.fields.forEach((field) => {
        resetData[field.key] = ''
      })
      setFormData(resetData)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to submit demo request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] transition-colors duration-300">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-slate-300 dark:border-white mb-4"></div>
          <p className="text-slate-700 dark:text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0e2a33] px-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-[#0e2a33] border border-slate-200 dark:border-white/10 rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Failed to Load Content</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">{error}</p>
            <button
              onClick={fetchLandingData}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen scroll-smooth bg-transparent text-slate-100 dark:text-white transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 origin-left z-[60] shadow-[0_0_8px_rgba(34,211,238,0.75)]"
      />
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="rounded-md border border-slate-200 bg-white/70 p-1.5 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <LayoutGrid size={18} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                  Vayu POS
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-300">Management System</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-slate-700 dark:text-slate-200 hover:text-teal-500 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-slate-700 dark:text-slate-200 hover:text-teal-500 dark:hover:text-cyan-300 font-medium transition-colors duration-200"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('demo')}
                className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]"
              >
                Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden transition-colors duration-200 text-slate-700 hover:text-teal-500"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden py-4 space-y-3"
            >
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-slate-700 dark:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-white/10 hover:text-teal-500"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-slate-700 dark:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-white/10 hover:text-teal-500"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('demo')} 
                className="block w-full text-left px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-400 text-white rounded-lg transition-all duration-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]"
              >
                Demo
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section - DYNAMIC */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-16 transition-colors duration-300">
        {/* Animated Background Shapes */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-cyan-400/10 dark:bg-white/10"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-teal-400/10 dark:bg-white/10"
        />
        <motion.div
          animate={{ x: [0, 18, 0], y: [0, -22, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute top-1/2 left-1/4 w-52 h-52 rounded-full blur-3xl bg-teal-300/8 pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -14, 0], y: [0, 16, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/3 right-1/3 w-60 h-60 rounded-full blur-3xl bg-cyan-300/8 pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white text-center mb-6 leading-[1.2] md:leading-[1.25] transition-colors duration-300">
              {landingData.hero.title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.09, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {word}{'\u00A0'}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-slate-200 transition-colors duration-300"
            >
              {landingData.hero.subtitle}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('demo')}
                className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 hover:shadow-[0_0_22px_rgba(34,211,238,0.5)] w-full sm:w-auto"
              >
                {landingData.hero.requestBtn}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('pricing')}
                className="bg-transparent border-2 border-slate-300 dark:border-white/70 text-slate-800 dark:text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors duration-300 hover:bg-slate-100/70 dark:hover:bg-white/10 w-full sm:w-auto"
              >
                {landingData.hero.pricingBtn}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - DYNAMIC */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300 bg-white/24 dark:bg-slate-950/22 border-y border-white/35 dark:border-white/10 backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
              Powerful Features for Your Business
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
              Everything you need to run a modern restaurant efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {landingData.features
              .filter(feature => feature.active)
              .map((feature, index) => {
                const visual = getFeatureVisual(feature.icon)
                const FeatureIcon = visual.icon
                
                return (
                  <TiltCard
                    key={feature.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${visual.bg} rounded-2xl blur opacity-20 group-hover:opacity-70 transition duration-300`}></div>
                    <div className="relative bg-white dark:bg-[#0e2a33] backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 h-full transition-colors duration-300">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 320 }}
                        className={`bg-gradient-to-br ${visual.from} ${visual.to} w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <FeatureIcon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </TiltCard>
                )
              })}
          </div>
        </div>
      </section>

      {/* Pricing Section - DYNAMIC */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 bg-white/44 dark:bg-slate-950/34 border-y border-white/45 dark:border-white/10 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-br from-white/24 via-slate-100/12 to-slate-200/30 dark:from-black/25 dark:via-black/10 dark:to-black/30"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
              Choose the perfect plan for your restaurant
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {landingData.pricing.map((plan, index) => {
              const isPopular = plan.popular
              
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`${
                    isPopular
                      ? 'bg-white dark:bg-[#0e2a33] border border-slate-200 dark:border-white/10 ring-2 ring-cyan-400/40 transform md:scale-105'
                      : 'bg-white dark:bg-[#0e2a33] border border-slate-200 dark:border-white/10'
                  } p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 relative`}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                        POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline mb-4">
                      <span className={`text-5xl font-extrabold ${isPopular ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                        {typeof plan.price === 'number' ? <>₹<CountUp target={plan.price} /></> : plan.price}
                      </span>
                      {typeof plan.price === 'number' && (
                        <span className={`ml-2 ${isPopular ? 'text-slate-600 dark:text-cyan-100' : 'text-slate-600 dark:text-slate-300'}`}>
                          /month
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((featureText, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                          isPopular ? 'text-teal-500 dark:text-white' : 'text-teal-500'
                        }`} />
                        <span className={isPopular ? 'text-slate-700 dark:text-white' : 'text-slate-700 dark:text-slate-300'}>
                          {featureText}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => scrollToSection('demo')}
                    className="w-full py-3 px-6 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-cyan-400 text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                  >
                    {typeof plan.price === 'number' ? 'Get Started' : 'Contact Sales'}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Demo Request Form Section */}
      <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-white/24 dark:bg-slate-950/20 border-y border-white/35 dark:border-white/10 backdrop-blur-[2px]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white transition-colors duration-300">
              {landingData.demoForm.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto transition-colors duration-300">
              {landingData.demoForm.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-[#0e2a33] p-8 sm:p-10 lg:p-12 rounded-xl shadow-lg border border-slate-200 dark:border-white/10 transition-colors duration-300"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Owner Name and Hotel Name */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {landingData.demoForm.fields.map((field) => (
                  <motion.div variants={staggerItem} key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <label htmlFor={field.key} className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2 transition-colors duration-300">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.key}
                        name={field.key}
                        value={formData[field.key] || ''}
                        onChange={handleChange}
                        rows="4"
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#0e2a33] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-200 resize-none"
                      />
                    ) : (
                      <input
                        type={field.type || 'text'}
                        id={field.key}
                        name={field.key}
                        value={formData[field.key] || ''}
                        onChange={handleChange}
                        required={field.required}
                        min={field.type === 'number' ? '1' : undefined}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#0e2a33] text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition duration-200"
                      />
                    )}
                    </motion.div>
                ))}
                </motion.div>

              {/* Submit Button */}
                <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 text-white py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_22px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : landingData.demoForm.submitText}
                  </button>
                </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 border-t border-[#164d5b] bg-[linear-gradient(90deg,#0a3a49_0%,#072f3b_55%,#062734_100%)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <motion.div variants={staggerItem}>
              <div className="flex items-start gap-3">
                <div className="rounded-md border border-white/20 bg-white/10 p-2 text-[#42b2ff]">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white tracking-[0.01em] leading-tight">
                    {landingData.footer?.brandTitle || 'Vayu POS'}
                  </div>
                  <p className="mt-1 text-[#42b2ff] text-base font-medium leading-tight">
                    {landingData.footer?.brandSubtitle || 'Restaurant Management Made Easy'}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[#d2e0e7] leading-relaxed text-base font-medium">
                {landingData.footer?.description || 'Efficient restaurant management in one platform.'}
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <h3 className="text-white text-lg font-bold mb-3">{landingData.footer?.socialLinksTitle || 'Follow Us'}</h3>
              <div className="flex flex-wrap gap-4">
                {(landingData.footer?.socialLinks || []).map((link, index) => {
                  const socialVisual = getSocialLinkVisual(link.platform)
                  const Icon = socialVisual.icon

                  return (
                    <a
                      key={`footer-social-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={socialVisual.label}
                      title={socialVisual.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#b9cad5] transition-all hover:-translate-y-1 hover:border-[#42b2ff] hover:bg-[#42b2ff]/10 hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <h3 className="text-white text-lg font-bold mb-3">{landingData.footer?.contactTitle || 'Contact Info'}</h3>
              <div className="space-y-3">
                {(landingData.footer?.contacts || []).map((item, index) => {
                  const Icon = getFooterContactIcon(item.type)
                  return (
                    <div key={`footer-contact-${index}`} className="flex items-start gap-3 text-[#b9cad5]">
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#42b2ff]" />
                      <span className="text-sm leading-snug">{item.value}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          <div className="border-t border-[#2c5967] mt-6 pt-4 text-center">
            <p className="text-[#c3d4dc] text-sm">
              {landingData.footer?.copyrightText || '© 2026 Vayu POS. All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
