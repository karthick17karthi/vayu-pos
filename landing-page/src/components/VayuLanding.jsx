import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Package, FileText, Building2, Headphones, BarChart3, Shield, Settings, Menu, X, Check } from 'lucide-react'
import emailjs from '@emailjs/browser'

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV
  ? 'http://localhost:8000'
  : 'https://vayu-backend-o4xa.onrender.com')

const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '')

// Icon mapping for dynamic features
const FEATURE_ICONS = {
  billing: { icon: CreditCard, color: 'from-blue-500 to-blue-600', blur: 'from-blue-400 to-blue-600' },
  inventory: { icon: Package, color: 'from-green-500 to-green-600', blur: 'from-green-400 to-green-600' },
  reports: { icon: FileText, color: 'from-orange-500 to-orange-600', blur: 'from-orange-400 to-orange-600' },
  branch: { icon: Building2, color: 'from-purple-500 to-purple-600', blur: 'from-purple-400 to-purple-600' },
  support: { icon: Headphones, color: 'from-pink-500 to-pink-600', blur: 'from-pink-400 to-pink-600' },
  analytics: { icon: BarChart3, color: 'from-cyan-500 to-cyan-600', blur: 'from-cyan-400 to-cyan-600' },
  security: { icon: Shield, color: 'from-red-500 to-red-600', blur: 'from-red-400 to-red-600' },
  settings: { icon: Settings, color: 'from-slate-500 to-slate-600', blur: 'from-slate-400 to-slate-600' },
};

const getIconConfig = (key) => FEATURE_ICONS[key] || FEATURE_ICONS.billing;

const VayuLanding = () => {
  // State for dynamic landing data
  const [landingData, setLandingData] = useState(null)
  const [features, setFeatures] = useState([])

  // State to manage form data
  const [formData, setFormData] = useState({
    owner_name: '',
    hotel_name: '',
    license_number: '',
    phone: '',
    email: '',
    city: '',
    branches: '',
    message: ''
  })

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false)
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Fetch landing data on mount
  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/landing`)
        if (response.ok) {
          const data = await response.json()
          console.log('Fetched landing data:', data)
          console.log('Features with icons:', data.features)
          setLandingData(data)
          // Filter only active features
          setFeatures((data.features || []).filter(f => f.active))
        }
      } catch (error) {
        console.error('Failed to fetch landing data:', error)
      }
    }
    fetchLandingData()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/demo-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      let responseBody = null
      try {
        responseBody = await response.json()
      } catch (parseError) {
        responseBody = null
      }

      console.log('📨 Backend response:', {
        status: response.status,
        ok: response.ok,
        body: responseBody
      })

      if (!response.ok) {
        throw new Error(responseBody?.message || 'Request failed')
      }

      alert('Demo Request Submitted Successfully!')

      setFormData({
        owner_name: '',
        hotel_name: '',
        license_number: '',
        phone: '',
        email: '',
        city: '',
        branches: '',
        message: ''
      })
    } catch (error) {
      console.error('❌ Frontend submit error:', error)
      alert('Failed to submit demo request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-white min-h-screen scroll-smooth">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vayu POS
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('demo')} 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 font-semibold shadow-md"
              >
                Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-indigo-600"
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
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('demo')} 
                className="block w-full text-left px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition"
              >
                Demo
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-700 pt-16">
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
          className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Vayu POS - Smart Restaurant<br />Billing Solution
            </h1>
            <p className="text-xl sm:text-2xl text-blue-50 mb-10 max-w-3xl mx-auto leading-relaxed">
              Streamline your restaurant operations with our intelligent POS system. 
              Manage billing, inventory, GST compliance, and multiple branches - all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('demo')}
                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition duration-300 w-full sm:w-auto"
              >
                Request Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('pricing')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition duration-300 w-full sm:w-auto"
              >
                View Pricing
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Powerful Features for Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to run a modern restaurant efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const iconKey = feature.icon || 'billing';
              const iconConfig = getIconConfig(iconKey);
              const IconComponent = iconConfig.icon;
              console.log(`Feature ${feature.title}: icon key = ${iconKey}, IconComponent = ${IconComponent?.name || IconComponent}`);
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${iconConfig.blur} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300`}></div>
                  <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 h-full">
                    <div className={`bg-gradient-to-br ${iconConfig.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            {features.length === 0 && (
              <p className="col-span-4 text-center text-gray-500 py-8">Loading features...</p>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your restaurant
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-extrabold text-gray-900">₹5,999</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600">Perfect for single outlet</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">1 Branch</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Basic Billing</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Inventory Management</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">GST Reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Email Support</span>
                </li>
              </ul>
              <button
                onClick={() => scrollToSection('demo')}
                className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition duration-300"
              >
                Get Started
              </button>
            </motion.div>

            {/* Pro Plan (Highlighted) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-2xl shadow-2xl transform md:scale-105 relative"
            >
              <div className="absolute top-0 right-8 -translate-y-1/2">
                <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-extrabold text-white">₹12,999</span>
                  <span className="text-indigo-100 ml-2">/month</span>
                </div>
                <p className="text-indigo-100">For growing businesses</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Up to 5 Branches</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Advanced Billing</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Full Inventory Control</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Advanced GST Reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Priority Support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-white">Analytics Dashboard</span>
                </li>
              </ul>
              <button
                onClick={() => scrollToSection('demo')}
                className="w-full bg-white text-indigo-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Get Started
              </button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-extrabold text-gray-900">Custom</span>
                </div>
                <p className="text-gray-600">For large chains</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited Branches</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Custom Features</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">API Access</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Dedicated Support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Custom Integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">On-site Training</span>
                </li>
              </ul>
              <button
                onClick={() => scrollToSection('demo')}
                className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition duration-300"
              >
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Request Form Section */}
      <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900">
              Request Your Free Demo
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See Vayu POS in action. Fill out the form below and our team will get in touch with you shortly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 sm:p-10 lg:p-12 rounded-xl shadow-lg border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Owner Name and Hotel Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="owner_name" className="block text-sm font-semibold text-gray-800 mb-2">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="owner_name"
                    name="owner_name"
                    value={formData.owner_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="hotel_name" className="block text-sm font-semibold text-gray-800 mb-2">
                    Hotel Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="hotel_name"
                    name="hotel_name"
                    value={formData.hotel_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your restaurant/hotel name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              {/* Row 2: License Number and Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="license_number" className="block text-sm font-semibold text-gray-800 mb-2">
                    Hotel License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="license_number"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleChange}
                    required
                    placeholder="Enter license number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              {/* Row 3: Email and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-800 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  />
                </div>
              </div>

              {/* Number of Branches */}
              <div>
                <label htmlFor="branches" className="block text-sm font-semibold text-gray-800 mb-2">
                  Number of Branches <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="branches"
                  name="branches"
                  value={formData.branches}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter number of branches"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                  Message <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us more about your requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Demo Request'
                  )}
                </button>
              </div>

              <p className="text-sm text-gray-600 text-center pt-2">
                <span className="text-red-500">*</span> Required fields
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Vayu POS
          </div>
          <p className="mb-2 text-gray-300">&copy; 2026 Vayu POS. All rights reserved.</p>
          <p className="text-gray-400">Smart Restaurant Billing Solution</p>
        </div>
      </footer>
    </div>
  )
}

export default VayuLanding
