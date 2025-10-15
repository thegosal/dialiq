"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, Users, Calendar, Shield, MessageCircle, Settings, FileText, MapPin, Clock } from 'lucide-react'

interface OnboardingData {
  // Section 1: Clinic Fundamentals
  clinicName: string
  fullAddress: string
  mainPhone: string
  clinicWebsite: string
  generalEmail: string
  businessHours: {
    [key: string]: string
  }
  holidayClosures: string
  
  // Section 2: Staff & Services
  veterinarians: Array<{
    name: string
    specialties: string
    acceptingNewPatients: boolean
  }>
  practiceManager: string
  headTechnician: string
  servicesOffered: string[]
  servicesNotOffered: string
  speciesTreated: string[]
  
  // Section 3: Appointment Booking Engine
  appointmentTypes: Array<{
    name: string
    duration: string
    description: string
    infoToCollect: string[]
    canBookNewClients: boolean
  }>
  leadTime: string
  bookingHorizon: string
  bufferTime: string
  newClientInfo: string[]
  preAppointmentInstructions: string
  
  // Section 4: Triage & Emergency Protocol
  emergencyHospital: {
    name: string
    address: string
    phone: string
  }
  tier1Keywords: string[]
  tier2Keywords: string[]
  tier3Keywords: string[]
  
  // Section 5: Clinic Policies & FAQs
  paymentMethods: string[]
  paymentRequiredAtService: boolean
  petInsurancePolicy: string
  prescriptionRefillPolicy: string
  cancellationPolicy: string
  
  // Section 6: AI Persona & Communication Style
  aiName: string
  toneOfVoice: string
  openingGreeting: string
  closingMessage: string
  
  // Section 7: Technical Integration
  pims: string
  calendarSystem: string
  apiCredentials: string
  
  // Section 8: Review
  representativeName: string
  approved: boolean
}

const initialData: OnboardingData = {
  clinicName: '',
  fullAddress: '',
  mainPhone: '',
  clinicWebsite: '',
  generalEmail: '',
  businessHours: {
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: ''
  },
  holidayClosures: '',
  veterinarians: [],
  practiceManager: '',
  headTechnician: '',
  servicesOffered: [],
  servicesNotOffered: '',
  speciesTreated: [],
  appointmentTypes: [],
  leadTime: '',
  bookingHorizon: '',
  bufferTime: '',
  newClientInfo: [],
  preAppointmentInstructions: '',
  emergencyHospital: {
    name: '',
    address: '',
    phone: ''
  },
  tier1Keywords: [],
  tier2Keywords: [],
  tier3Keywords: [],
  paymentMethods: [],
  paymentRequiredAtService: false,
  petInsurancePolicy: '',
  prescriptionRefillPolicy: '',
  cancellationPolicy: '',
  aiName: '',
  toneOfVoice: '',
  openingGreeting: '',
  closingMessage: '',
  pims: '',
  calendarSystem: '',
  apiCredentials: '',
  representativeName: '',
  approved: false
}

const steps = [
  { id: 1, title: 'Clinic Fundamentals', icon: MapPin, description: 'Basic clinic information' },
  { id: 2, title: 'Staff & Services', icon: Users, description: 'Team and services offered' },
  { id: 3, title: 'Appointment Booking', icon: Calendar, description: 'Scheduling configuration' },
  { id: 4, title: 'Emergency Protocol', icon: Shield, description: 'Critical safety protocols' },
  { id: 5, title: 'Clinic Policies', icon: FileText, description: 'Policies and procedures' },
  { id: 6, title: 'AI Persona', icon: MessageCircle, description: 'Communication style' },
  { id: 7, title: 'Technical Integration', icon: Settings, description: 'System connections' },
  { id: 8, title: 'Review & Confirm', icon: Check, description: 'Final confirmation' }
]

interface OnboardingFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function OnboardingForm({ isOpen, onClose }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<OnboardingData>(initialData)

  // Auto-load saved data when component mounts
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('dialiq-onboarding-data')
      if (saved) {
        try {
          const savedData = JSON.parse(saved)
          setData(savedData)
        } catch (error) {
          console.error('Error loading saved data:', error)
        }
      }
    }
  }, [isOpen])

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveProgress = () => {
    // Save to localStorage for persistence
    localStorage.setItem('dialiq-onboarding-data', JSON.stringify(data))
    alert('Progress saved! You can continue later.')
  }

  const loadProgress = () => {
    const saved = localStorage.getItem('dialiq-onboarding-data')
    if (saved) {
      try {
        const savedData = JSON.parse(saved)
        setData(savedData)
        alert('Previous progress loaded!')
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Onboarding data:', data)
    
    // Save final data
    localStorage.setItem('dialiq-onboarding-data', JSON.stringify(data))
    
    // Clear saved data after successful submission
    localStorage.removeItem('dialiq-onboarding-data')
    
    alert('Configuration submitted successfully! We&apos;ll be in touch soon.')
    onClose()
  }

  const updateData = (section: keyof OnboardingData, value: string | object | boolean | string[]) => {
    setData(prev => ({
      ...prev,
      [section]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="h-full flex flex-col"
      >
        {/* Header */}
        <div className="bg-black text-white p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Configure Your AI Receptionist</h2>
              <p className="text-gray-300 mt-1">Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
          
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  step.id === currentStep 
                    ? 'bg-white text-black' 
                    : step.id < currentStep 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300'
                }`}>
                  <step.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-1" />
                )}
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="bg-gray-700 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Clinic Fundamentals</h3>
                    <p className="text-gray-600">Let&apos;s start with your basic clinic information</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinic Name *
                      </label>
                      <input
                        type="text"
                        value={data.clinicName}
                        onChange={(e) => updateData('clinicName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="e.g., Sunnyvale Pet Hospital"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Main Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={data.mainPhone}
                        onChange={(e) => updateData('mainPhone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address *
                      </label>
                      <input
                        type="text"
                        value={data.fullAddress}
                        onChange={(e) => updateData('fullAddress', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Street, City, State, ZIP Code"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinic Website
                      </label>
                      <input
                        type="url"
                        value={data.clinicWebsite}
                        onChange={(e) => updateData('clinicWebsite', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="https://www.yourclinic.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        General Inquiry Email *
                      </label>
                      <input
                        type="email"
                        value={data.generalEmail}
                        onChange={(e) => updateData('generalEmail', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="info@yourclinic.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(data.businessHours).map(day => (
                        <div key={day} className="flex items-center space-x-3">
                          <label className="w-20 text-sm font-medium text-gray-700">{day}:</label>
                          <input
                            type="text"
                            value={data.businessHours[day]}
                            onChange={(e) => updateData('businessHours', {
                              ...data.businessHours,
                              [day]: e.target.value
                            })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                            placeholder="8:00 AM - 6:00 PM or Closed"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Holiday & Special Closures
                    </label>
                    <textarea
                      value={data.holidayClosures}
                      onChange={(e) => updateData('holidayClosures', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      rows={3}
                      placeholder="e.g., Closed for Thanksgiving, Nov 28th. Closed at 12 PM on Dec 24th."
                    />
                  </div>
                </div>
              )}
              
              {/* Section 2: Staff & Services */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Staff & Services</h3>
                    <p className="text-gray-600">Tell us about your team and what services you offer</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Veterinarians on Staff</h4>
                    <div className="space-y-4">
                      {data.veterinarians.map((vet, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name & Credentials *
                              </label>
                              <input
                                type="text"
                                value={vet.name}
                                onChange={(e) => {
                                  const newVets = [...data.veterinarians]
                                  newVets[index] = { ...vet, name: e.target.value }
                                  updateData('veterinarians', newVets)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                placeholder="e.g., Dr. Emily Carter, DVM"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specialties
                              </label>
                              <input
                                type="text"
                                value={vet.specialties}
                                onChange={(e) => {
                                  const newVets = [...data.veterinarians]
                                  newVets[index] = { ...vet, specialties: e.target.value }
                                  updateData('veterinarians', newVets)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                placeholder="e.g., Feline medicine, Orthopedic Surgery"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={vet.acceptingNewPatients}
                                  onChange={(e) => {
                                    const newVets = [...data.veterinarians]
                                    newVets[index] = { ...vet, acceptingNewPatients: e.target.checked }
                                    updateData('veterinarians', newVets)
                                  }}
                                  className="mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">Accepting New Patients</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => updateData('veterinarians', [...data.veterinarians, { name: '', specialties: '', acceptingNewPatients: true }])}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                      >
                        + Add Veterinarian
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Practice Manager
                      </label>
                      <input
                        type="text"
                        value={data.practiceManager}
                        onChange={(e) => updateData('practiceManager', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Head Technician
                      </label>
                      <input
                        type="text"
                        value={data.headTechnician}
                        onChange={(e) => updateData('headTechnician', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Wellness & Preventive Exams',
                        'Vaccinations',
                        'Spay & Neuter',
                        'Dental Cleaning & Care',
                        'General Surgery',
                        'Orthopedic Surgery',
                        'In-House Diagnostics (X-ray, bloodwork)',
                        'Microchipping',
                        'Euthanasia Services',
                        'Emergency Care (during business hours)',
                        'Exotic Pet Care'
                      ].map(service => (
                        <label key={service} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={data.servicesOffered.includes(service)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateData('servicesOffered', [...data.servicesOffered, service])
                              } else {
                                updateData('servicesOffered', data.servicesOffered.filter(s => s !== service))
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services NOT Offered
                    </label>
                    <input
                      type="text"
                      value={data.servicesNotOffered}
                      onChange={(e) => updateData('servicesNotOffered', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., Boarding, Grooming, Mobile Visits"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Species Treated</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Dogs',
                        'Cats',
                        'Rabbits',
                        'Birds',
                        'Reptiles',
                        'Other Small Mammals (Ferrets, Guinea Pigs, etc.)'
                      ].map(species => (
                        <label key={species} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={data.speciesTreated.includes(species)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateData('speciesTreated', [...data.speciesTreated, species])
                              } else {
                                updateData('speciesTreated', data.speciesTreated.filter(s => s !== species))
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{species}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Section 3: Appointment Booking Engine */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booking Engine</h3>
                    <p className="text-gray-600">Configure your scheduling system</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types</h4>
                    <div className="space-y-4">
                      {data.appointmentTypes.map((apt, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name of Appointment *
                              </label>
                              <input
                                type="text"
                                value={apt.name}
                                onChange={(e) => {
                                  const newApts = [...data.appointmentTypes]
                                  newApts[index] = { ...apt, name: e.target.value }
                                  updateData('appointmentTypes', newApts)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                placeholder="e.g., Annual Wellness Exam"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Default Duration *
                              </label>
                              <select
                                value={apt.duration}
                                onChange={(e) => {
                                  const newApts = [...data.appointmentTypes]
                                  newApts[index] = { ...apt, duration: e.target.value }
                                  updateData('appointmentTypes', newApts)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                              >
                                <option value="">Select Duration</option>
                                <option value="15 min">15 min</option>
                                <option value="30 min">30 min</option>
                                <option value="45 min">45 min</option>
                                <option value="60 min">60 min</option>
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description for AI *
                              </label>
                              <input
                                type="text"
                                value={apt.description}
                                onChange={(e) => {
                                  const newApts = [...data.appointmentTypes]
                                  newApts[index] = { ...apt, description: e.target.value }
                                  updateData('appointmentTypes', newApts)
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                placeholder="e.g., For existing patients for their yearly check-up and vaccinations."
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={apt.canBookNewClients}
                                  onChange={(e) => {
                                    const newApts = [...data.appointmentTypes]
                                    newApts[index] = { ...apt, canBookNewClients: e.target.checked }
                                    updateData('appointmentTypes', newApts)
                                  }}
                                  className="mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">Can be booked by new clients?</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => updateData('appointmentTypes', [...data.appointmentTypes, { name: '', duration: '', description: '', infoToCollect: [], canBookNewClients: true }])}
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                      >
                        + Add Appointment Type
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lead Time *
                      </label>
                      <select
                        value={data.leadTime}
                        onChange={(e) => updateData('leadTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="">Select Lead Time</option>
                        <option value="Immediately">Immediately</option>
                        <option value="2 hours">2 hours</option>
                        <option value="24 hours">24 hours in advance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Booking Horizon *
                      </label>
                      <select
                        value={data.bookingHorizon}
                        onChange={(e) => updateData('bookingHorizon', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="">Select Horizon</option>
                        <option value="1 month">1 month</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buffer Time *
                      </label>
                      <select
                        value={data.bufferTime}
                        onChange={(e) => updateData('bufferTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="">Select Buffer</option>
                        <option value="None">None</option>
                        <option value="5 min">5 min</option>
                        <option value="10 min">10 min</option>
                        <option value="15 min">15 min</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pre-appointment Instructions
                    </label>
                    <textarea
                      value={data.preAppointmentInstructions}
                      onChange={(e) => updateData('preAppointmentInstructions', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      rows={3}
                      placeholder="e.g., Please arrive 15 minutes early to fill out paperwork. Please bring any previous medical records for your pet."
                    />
                  </div>
                </div>
              )}
              
              {/* Section 4: Triage & Emergency Protocol */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Triage & Emergency Protocol</h3>
                    <p className="text-gray-600 text-sm">⚠️ This section is critical for patient safety</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <p className="text-red-800 text-sm font-medium">
                      ⚠️ The AI will follow these rules exactly. Please be very specific with your emergency protocols.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Designated 24/7 Emergency Hospital</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={data.emergencyHospital.name}
                          onChange={(e) => updateData('emergencyHospital', { ...data.emergencyHospital, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          placeholder="e.g., BluePearl Pet Hospital"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          value={data.emergencyHospital.address}
                          onChange={(e) => updateData('emergencyHospital', { ...data.emergencyHospital, address: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          placeholder="Full address"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={data.emergencyHospital.phone}
                          onChange={(e) => updateData('emergencyHospital', { ...data.emergencyHospital, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border border-red-300 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-red-800 mb-3">Tier 1: IMMEDIATE EMERGENCY</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        AI Action: &quot;This sounds like a critical emergency. Do not book an appointment. Please go immediately to [Emergency Hospital Name] at [Emergency Hospital Address] or call them at [Emergency Hospital Phone]. They are open 24/7.&quot;
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Trigger Keywords/Phrases (one per line)
                        </label>
                        <textarea
                          value={data.tier1Keywords.join('\n')}
                          onChange={(e) => updateData('tier1Keywords', e.target.value.split('\n').filter(k => k.trim()))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          rows={4}
                          placeholder="hit by car&#10;can't breathe&#10;seizure&#10;collapse&#10;ate poison&#10;rat poison&#10;antifreeze&#10;uncontrolled bleeding&#10;pale gums&#10;bloated stomach&#10;straining to urinate (especially male cats)"
                        />
                      </div>
                    </div>
                    
                    <div className="border border-orange-300 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-orange-800 mb-3">Tier 2: URGENT - BOOK SAME/NEXT DAY</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        AI Action: &quot;Based on what you&apos;ve described, it&apos;s important that your pet is seen very soon. I will look for the next available urgent care appointment. I have an opening at [Time]. Should I book that for you?&quot;
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Trigger Keywords/Phrases (one per line)
                        </label>
                        <textarea
                          value={data.tier2Keywords.join('\n')}
                          onChange={(e) => updateData('tier2Keywords', e.target.value.split('\n').filter(k => k.trim()))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          rows={4}
                          placeholder="not eating for a day&#10;vomiting multiple times&#10;diarrhea for 24 hours&#10;limping&#10;allergic reaction (mild)&#10;painful&#10;crying out&#10;lethargic"
                        />
                      </div>
                    </div>
                    
                    <div className="border border-green-300 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-green-800 mb-3">Tier 3: NON-URGENT - STANDARD APPOINTMENT</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        AI Action: &quot;Okay, I can help you book a standard appointment for that. I have openings starting on [Date]. What day and time works best for you?&quot;
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Trigger Keywords/Phrases (one per line)
                        </label>
                        <textarea
                          value={data.tier3Keywords.join('\n')}
                          onChange={(e) => updateData('tier3Keywords', e.target.value.split('\n').filter(k => k.trim()))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                          rows={4}
                          placeholder="check-up&#10;vaccines&#10;itchy skin&#10;ear cleaning&#10;nail trim&#10;health certificate&#10;follow-up"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Section 5: Clinic Policies & FAQs */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Clinic Policies & FAQs</h3>
                    <p className="text-gray-600">Configure common policies and procedures</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {[
                        'Visa',
                        'MasterCard',
                        'Amex',
                        'Discover',
                        'CareCredit',
                        'Scratchpay',
                        'Cash',
                        'Check'
                      ].map(method => (
                        <label key={method} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={data.paymentMethods.includes(method)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateData('paymentMethods', [...data.paymentMethods, method])
                              } else {
                                updateData('paymentMethods', data.paymentMethods.filter(m => m !== method))
                              }
                            }}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">{method}</span>
                        </label>
                      ))}
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={data.paymentRequiredAtService}
                          onChange={(e) => updateData('paymentRequiredAtService', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Is payment required at time of service?</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pet Insurance Policy
                    </label>
                    <textarea
                      value={data.petInsurancePolicy}
                      onChange={(e) => updateData('petInsurancePolicy', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      rows={3}
                      placeholder="e.g., We do not bill insurance companies directly. Clients pay us at the time of service, and we provide them with a detailed invoice to submit to their insurance provider for reimbursement."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prescription Refill Policy & Procedure
                    </label>
                    <textarea
                      value={data.prescriptionRefillPolicy}
                      onChange={(e) => updateData('prescriptionRefillPolicy', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      rows={3}
                      placeholder="e.g., Please call the clinic directly for all prescription refills. Please allow 24 hours for our team to process the request. We will call you when it is ready for pickup."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cancellation/No-Show Policy
                    </label>
                    <textarea
                      value={data.cancellationPolicy}
                      onChange={(e) => updateData('cancellationPolicy', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      rows={3}
                      placeholder="e.g., We require 24 hours' notice for all cancellations. A fee of $50 may be charged for late cancellations or no-shows."
                    />
                  </div>
                </div>
              )}
              
              {/* Section 6: AI Persona & Communication Style */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Persona & Communication Style</h3>
                    <p className="text-gray-600">Define how your AI interacts with clients</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AI Name *
                      </label>
                      <input
                        type="text"
                        value={data.aiName}
                        onChange={(e) => updateData('aiName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="e.g., Penny, Your Virtual Assistant"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tone of Voice *
                      </label>
                      <select
                        value={data.toneOfVoice}
                        onChange={(e) => updateData('toneOfVoice', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        required
                      >
                        <option value="">Select Tone</option>
                        <option value="Professional & Efficient">Professional & Efficient (Clear, concise, and direct)</option>
                        <option value="Warm & Empathetic">Warm & Empathetic (Uses phrases like &quot;I understand this must be worrying&quot;)</option>
                        <option value="Friendly & Casual">Friendly & Casual (More conversational and relaxed)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Greeting (Phone/Chat) *
                    </label>
                    <input
                      type="text"
                      value={data.openingGreeting}
                      onChange={(e) => updateData('openingGreeting', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., Thank you for contacting Sunnyvale Pet Hospital. This is [AI Name], the virtual assistant. How can I help you and your pet today?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Message *
                    </label>
                    <input
                      type="text"
                      value={data.closingMessage}
                      onChange={(e) => updateData('closingMessage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="e.g., Thank you, and we look forward to seeing you and your pet soon!"
                      required
                    />
                  </div>
                </div>
              )}
              
              {/* Section 7: Technical Integration */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Technical Integration</h3>
                    <p className="text-gray-600">Connect to your existing systems</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Practice Management System (PIMS)
                      </label>
                      <select
                        value={data.pims}
                        onChange={(e) => updateData('pims', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="">Select PIMS</option>
                        <option value="ezyVet">ezyVet</option>
                        <option value="Cornerstone">Cornerstone</option>
                        <option value="Avimark">Avimark</option>
                        <option value="ImproMed">ImproMed</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Calendar System
                      </label>
                      <select
                        value={data.calendarSystem}
                        onChange={(e) => updateData('calendarSystem', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      >
                        <option value="">Select Calendar</option>
                        <option value="Google Calendar">Google Calendar</option>
                        <option value="Outlook Calendar">Outlook Calendar</option>
                        <option value="PIMS Calendar">PIMS Calendar</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Credentials / Access Instructions
                    </label>
                    <textarea
                      value={data.apiCredentials}
                      onChange={(e) => updateData('apiCredentials', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      rows={4}
                      placeholder="Please provide API keys or instructions on how to grant delegate access to your calendar system..."
                    />
                  </div>
                </div>
              )}
              
              {/* Section 8: Review & Final Confirmation */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Check className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Final Confirmation</h3>
                    <p className="text-gray-600">Please review all information for accuracy</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <p className="text-yellow-800 text-sm font-medium">
                      ⚠️ Pay special attention to the Triage & Emergency Protocol. The AI will act based on these rules.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Clinic Information</h4>
                      <p className="text-sm text-gray-600">
                        <strong>Name:</strong> {data.clinicName || 'Not provided'}<br/>
                        <strong>Address:</strong> {data.fullAddress || 'Not provided'}<br/>
                        <strong>Phone:</strong> {data.mainPhone || 'Not provided'}<br/>
                        <strong>Email:</strong> {data.generalEmail || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Emergency Protocol</h4>
                      <p className="text-sm text-gray-600">
                        <strong>Emergency Hospital:</strong> {data.emergencyHospital.name || 'Not provided'}<br/>
                        <strong>Address:</strong> {data.emergencyHospital.address || 'Not provided'}<br/>
                        <strong>Phone:</strong> {data.emergencyHospital.phone || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">AI Configuration</h4>
                      <p className="text-sm text-gray-600">
                        <strong>AI Name:</strong> {data.aiName || 'Not provided'}<br/>
                        <strong>Tone:</strong> {data.toneOfVoice || 'Not provided'}<br/>
                        <strong>Services:</strong> {data.servicesOffered.length} services selected<br/>
                        <strong>Appointment Types:</strong> {data.appointmentTypes.length} types configured
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinic Representative Name *
                      </label>
                      <input
                        type="text"
                        value={data.representativeName}
                        onChange={(e) => updateData('representativeName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={data.approved}
                          onChange={(e) => updateData('approved', e.target.checked)}
                          className="mr-2"
                          required
                        />
                        <span className="text-sm font-medium text-gray-700">
                          I have reviewed and approved all the information and protocols on this form. I understand that the AI will use this information to interact with clients on behalf of {data.clinicName || '[Clinic Name]'}.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            <button
              onClick={saveProgress}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Clock className="w-4 h-4 mr-2" />
              Save Progress
            </button>
            
            <button
              onClick={loadProgress}
              className="flex items-center px-4 py-2 text-green-600 hover:text-green-800 transition-colors"
            >
              <Check className="w-4 h-4 mr-2" />
              Load Saved
            </button>
          </div>
          
          <div className="flex space-x-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full ${
                  step.id === currentStep ? 'bg-blue-600' : 
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-colors flex items-center"
            >
              Submit Configuration
              <Check className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition-colors flex items-center"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
