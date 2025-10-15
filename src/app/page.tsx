"use client"

import { ArrowRight, Phone, Calendar, MessageCircle, Shield, Zap, Star, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingForm from '../components/OnboardingForm'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gray-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gray-200 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gray-100 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gray-200 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white backdrop-blur-md border-b border-black z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-7 h-7 border-3 border-black rounded-full"></div>
                <div className="absolute top-4 left-4 w-3 h-1 bg-black transform rotate-45 origin-left"></div>
              </div>
              <span className="text-xl font-bold text-black tracking-wide">DialIQ</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-black hover:text-gray-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-black hover:text-gray-600 transition-colors">Testimonials</a>
              <button 
                onClick={() => setIsOnboardingOpen(true)}
                className="text-black hover:text-gray-600 transition-colors"
              >
                Onboarding
              </button>
              <button 
                onClick={handleLogin}
                className="text-black hover:text-gray-600 transition-colors"
              >
                Login
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left side - Hero content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-black text-sm font-medium mb-8">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Veterinary Reception
                </span>
                <h1 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight">
                  Never miss another
                  <span className="text-blue-600"> appointment</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      DialIQ&apos;s AI receptionist handles calls, schedules appointments, and provides instant support 
                      for your veterinary practice 24/7. Focus on what matters most - caring for pets.
                </p>
              </motion.div>
              
              {/* Primary CTA - More prominent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                  <button 
                    onClick={() => setIsContactFormOpen(true)}
                    className="bg-black text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center group"
                  >
                    Get Started Now
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="border border-black text-black px-10 py-5 rounded-xl text-xl font-semibold hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300">
                    Schedule a Live Demo
                  </button>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0"
              >
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-black mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-black mb-2">24/7</div>
                  <div className="text-gray-600">Available</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-black mb-2">&lt;1 week</div>
                  <div className="text-gray-600">Setup</div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Live AI Demo */}
            <div className="flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden w-full max-w-lg"
              >
                {/* Sinusoidal wave background */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                    <path
                      d="M0,150 Q100,50 200,150 T400,150"
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M0,180 Q100,80 200,180 T400,180"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M0,120 Q100,20 200,120 T400,120"
                      stroke="black"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
                
                {/* Demo Card */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 border-3 border-black rounded-full"></div>
                        <div className="absolute top-4 left-4 w-3 h-1 bg-black transform rotate-45 origin-left"></div>
                      </div>
                      <span className="text-xl font-bold text-black">DialIQ AI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600 font-medium">Live</span>
                    </div>
                  </div>
                  
                  {/* AI Message */}
                  <div className="bg-gray-50 rounded-xl p-8 mb-8">
                    <p className="text-gray-800 italic text-xl leading-relaxed">
                        &quot;Hello! Thank you for calling Valley Pet Clinic. I&apos;m your AI assistant. 
                        How can I help you and your pet today?&quot;
                    </p>
                  </div>
                  
                  {/* Demo Button */}
                  <div className="text-center">
                    <button className="bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-black hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center mx-auto group">
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent"></div>
                      </div>
                      Experience a Demo now
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 text-center lg:text-left"
              >
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Enterprise Ready
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom Integrations
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Receptionist Introduction */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 border border-white rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Revolutionary AI Technology
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Meet your new
              <span className="block text-blue-400">AI receptionist</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              DialIQ introduces the world&apos;s first AI receptionist specifically designed for veterinary practices. 
              Our intelligent system understands the unique needs of pet care, handles complex scheduling, 
              and provides compassionate support to pet owners 24/7.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Natural Conversations</h3>
                <p className="text-gray-300 leading-relaxed">
                  Speaks naturally with pet owners, understanding context, emotions, and veterinary terminology with human-like empathy.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Veterinary Expertise</h3>
                <p className="text-gray-300 leading-relaxed">
                  Trained specifically on veterinary terminology, common pet health issues, and practice management workflows.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Always Available</h3>
                <p className="text-gray-300 leading-relaxed">
                  Never misses a call, even during emergencies, after hours, or peak times. Your practice is always accessible.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Everything your practice needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI features designed specifically for veterinary practices
            </p>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Phone className="w-12 h-12 text-black mb-6" />
              <h3 className="text-xl font-semibold text-black mb-4">Smart Call Handling</h3>
              <p className="text-gray-600 mb-6">
                AI answers calls naturally, understands context, and routes urgent cases appropriately.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-black mr-2" />
                  Emergency triage
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-black mr-2" />
                  Appointment scheduling
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-black mr-2" />
                  Prescription refills
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Automated Scheduling</h3>
              <p className="text-slate-600 mb-6">
                Seamlessly integrates with your existing calendar system for instant appointment booking.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Calendar sync
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Reminder calls
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Waitlist management
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <MessageCircle className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Multi-Channel Support</h3>
              <p className="text-slate-600 mb-6">
                Handle calls, texts, and online chats with the same intelligent AI assistant.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Voice calls
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  SMS messaging
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Live chat
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Star className="w-12 h-12 text-teal-600 mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Analytics & Insights</h3>
              <p className="text-slate-600 mb-6">
                Track performance, patient satisfaction, and optimize your practice operations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Call analytics
                </li>
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Patient feedback
          </li>
                <li className="flex items-center text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Performance reports
          </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trusted by veterinary practices nationwide
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers are saying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6">
                &quot;DialIQ has transformed our practice. We never miss calls anymore, and our patients love the instant responses. Setup was incredibly easy.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  DR
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-slate-900">Dr. Sarah Johnson</div>
                  <div className="text-slate-600 text-sm">Paws & Claws Veterinary</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6">
                &quot;The AI understands our scheduling perfectly and handles complex requests. Our staff can focus on patient care instead of phone management.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  MR
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-slate-900">Mike Rodriguez</div>
                  <div className="text-slate-600 text-sm">Animal Care Center</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6">
                &quot;Best investment we&apos;ve made. DialIQ handles after-hours calls perfectly and our emergency cases are never missed. Highly recommended!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  LW
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-slate-900">Lisa Wang</div>
                  <div className="text-slate-600 text-sm">Pet Wellness Clinic</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform your practice?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of veterinary practices already using DialIQ to provide better patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactFormOpen(true)}
              className="bg-white text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-200">
              Schedule a Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-7 h-7 border-3 border-white rounded-full"></div>
                  <div className="absolute top-4 left-4 w-3 h-1 bg-white transform rotate-45 origin-left"></div>
                </div>
                <span className="text-xl font-bold text-white tracking-wide">DialIQ</span>
              </div>
              <p className="text-gray-400 mb-4">
                AI-powered receptionist for veterinary practices. Never miss another appointment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DialIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Onboarding Form Modal */}
      <OnboardingForm 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
      />
      
      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)} 
      />
    </div>
  )
}