"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Settings,
  BarChart3,
  Mic,
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
  User,
  MapPin,
  Users,
  Shield,
  FileText,
  MessageCircle,
  Edit
} from 'lucide-react'

// Mock data for demonstration
const mockActiveCalls = [
  {
    id: 1,
    callerName: "Sarah Johnson",
    callerPhone: "(555) 123-4567",
    petName: "Buddy",
    reason: "Annual check-up",
    duration: "2:34",
    status: "in-progress",
    transcription: "Hello, I'd like to schedule an appointment for my dog Buddy. He's due for his annual check-up and vaccinations."
  },
  {
    id: 2,
    callerName: "Mike Chen",
    callerPhone: "(555) 987-6543",
    petName: "Whiskers",
    reason: "Emergency - not eating",
    duration: "0:45",
    status: "in-progress",
    transcription: "Hi, I'm calling about my cat Whiskers. She hasn't eaten anything in two days and seems very lethargic."
  }
]

const mockCallLogs = [
  {
    id: 1,
    callerName: "Emily Davis",
    callerPhone: "(555) 234-5678",
    petName: "Max",
    reason: "Vaccination appointment",
    duration: "3:12",
    timestamp: "2024-01-15 10:30 AM",
    status: "successful",
    category: "Appointment Booking",
    aiHandled: true
  },
  {
    id: 2,
    callerName: "Robert Wilson",
    callerPhone: "(555) 345-6789",
    petName: "Luna",
    reason: "Emergency - difficulty breathing",
    duration: "1:23",
    timestamp: "2024-01-15 09:15 AM",
    status: "transferred",
    category: "Emergency",
    aiHandled: false
  },
  {
    id: 3,
    callerName: "Lisa Brown",
    callerPhone: "(555) 456-7890",
    petName: "Charlie",
    reason: "Prescription refill",
    duration: "2:45",
    timestamp: "2024-01-15 08:45 AM",
    status: "successful",
    category: "Prescription",
    aiHandled: true
  },
  {
    id: 4,
    callerName: "David Miller",
    callerPhone: "(555) 567-8901",
    petName: "Bella",
    reason: "General inquiry",
    duration: "0:30",
    timestamp: "2024-01-14 4:20 PM",
    status: "dropped",
    category: "General",
    aiHandled: false
  }
]

const mockPreferences = {
  // Section 1: Clinic Fundamentals
  clinicName: "Sunnyvale Pet Hospital",
  fullAddress: "123 Main Street, Sunnyvale, CA 94086",
  mainPhone: "(555) 123-4567",
  clinicWebsite: "https://www.sunnyvalepet.com",
  generalEmail: "info@sunnyvalepet.com",
  businessHours: {
    Monday: "8:00 AM - 6:00 PM",
    Tuesday: "8:00 AM - 6:00 PM",
    Wednesday: "8:00 AM - 6:00 PM",
    Thursday: "8:00 AM - 6:00 PM",
    Friday: "8:00 AM - 6:00 PM",
    Saturday: "9:00 AM - 4:00 PM",
    Sunday: "Closed"
  },
  holidayClosures: "Closed for Thanksgiving, Nov 28th. Closed at 12 PM on Dec 24th.",
  
  // Section 2: Staff & Services
  veterinarians: [
    { name: "Dr. Emily Carter, DVM", specialties: "Feline medicine, Orthopedic Surgery", acceptingNewPatients: true },
    { name: "Dr. Michael Rodriguez, DVM", specialties: "Canine cardiology, Internal medicine", acceptingNewPatients: false }
  ],
  practiceManager: "Sarah Johnson",
  headTechnician: "Lisa Chen",
  servicesOffered: [
    "Wellness & Preventive Exams",
    "Vaccinations", 
    "Spay & Neuter",
    "Dental Cleaning & Care",
    "General Surgery",
    "Orthopedic Surgery",
    "In-House Diagnostics (X-ray, bloodwork)",
    "Microchipping",
    "Emergency Care (during business hours)"
  ],
  servicesNotOffered: "Boarding, Grooming, Mobile Visits",
  speciesTreated: ["Dogs", "Cats", "Rabbits", "Birds"],
  
  // Section 3: Appointment Booking Engine
  appointmentTypes: [
    { name: "Annual Wellness Exam", duration: "30 min", description: "For existing patients for their yearly check-up and vaccinations.", canBookNewClients: true },
    { name: "New Patient Visit", duration: "45 min", description: "First visit for a new pet or client.", canBookNewClients: true },
    { name: "Sick Pet Visit", duration: "30 min", description: "For pets experiencing symptoms like vomiting, lethargy, etc.", canBookNewClients: true }
  ],
  leadTime: "24 hours",
  bookingHorizon: "3 months",
  bufferTime: "10 min",
  preAppointmentInstructions: "Please arrive 15 minutes early to fill out paperwork. Please bring any previous medical records for your pet.",
  
  // Section 4: Triage & Emergency Protocol
  emergencyHospital: {
    name: "BluePearl Pet Hospital",
    address: "456 Emergency Way, Sunnyvale, CA 94086",
    phone: "(555) 999-8888"
  },
  tier1Keywords: ["hit by car", "can't breathe", "seizure", "collapse", "ate poison", "uncontrolled bleeding"],
  tier2Keywords: ["not eating for a day", "vomiting multiple times", "diarrhea for 24 hours", "limping", "painful"],
  tier3Keywords: ["check-up", "vaccines", "itchy skin", "ear cleaning", "nail trim", "follow-up"],
  
  // Section 5: Clinic Policies & FAQs
  paymentMethods: ["Visa", "MasterCard", "Amex", "CareCredit", "Cash", "Check"],
  paymentRequiredAtService: true,
  petInsurancePolicy: "We do not bill insurance companies directly. Clients pay us at the time of service, and we provide them with a detailed invoice to submit to their insurance provider for reimbursement.",
  prescriptionRefillPolicy: "Please call the clinic directly for all prescription refills. Please allow 24 hours for our team to process the request. We will call you when it is ready for pickup.",
  cancellationPolicy: "We require 24 hours' notice for all cancellations. A fee of $50 may be charged for late cancellations or no-shows.",
  
  // Section 6: AI Persona & Communication Style
  aiName: "Penny",
  toneOfVoice: "Warm & Empathetic",
  openingGreeting: "Thank you for contacting Sunnyvale Pet Hospital. This is Penny, the virtual assistant. How can I help you and your pet today?",
  closingMessage: "Thank you, and we look forward to seeing you and your pet soon!",
  
  // Section 7: Technical Integration
  pims: "ezyVet",
  calendarSystem: "Google Calendar",
  apiCredentials: "API credentials configured and connected successfully."
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('realtime')
  const [isIntercepting, setIsIntercepting] = useState(false)
  const handleIntercept = () => {
    setIsIntercepting(true)
    // Simulate intercept process
    setTimeout(() => {
      setIsIntercepting(false)
      alert('Call intercepted successfully!')
    }, 2000)
  }

  const handleTransfer = () => {
    alert('Call transferred to human staff')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'successful':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'transferred':
        return <ArrowRight className="w-4 h-4 text-blue-500" />
      case 'dropped':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'in-progress':
        return <PhoneCall className="w-4 h-4 text-green-500 animate-pulse" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'successful':
        return 'bg-green-100 text-green-800'
      case 'transferred':
        return 'bg-blue-100 text-blue-800'
      case 'dropped':
        return 'bg-red-100 text-red-800'
      case 'in-progress':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 border-3 border-black rounded-full"></div>
                <div className="absolute top-4 left-4 w-3 h-1 bg-black transform rotate-45 origin-left"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">DialIQ Dashboard</h1>
                <p className="text-sm text-gray-600">{mockPreferences.clinicName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>AI Active</span>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'realtime', label: 'Real-time Information', icon: PhoneCall },
              { id: 'logs', label: 'Call Logs', icon: BarChart3 },
              { id: 'preferences', label: 'Preferences', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Real-time Information Tab */}
          {activeTab === 'realtime' && (
            <motion.div
              key="realtime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Active Calls</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <RefreshCw className="w-4 h-4" />
                  <span>Live updates</span>
                </div>
              </div>

              {mockActiveCalls.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <PhoneOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Calls</h3>
                  <p className="text-gray-600">All lines are currently available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockActiveCalls.map((call) => (
                    <div key={call.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{call.callerName}</h3>
                          <p className="text-sm text-gray-600">{call.callerPhone}</p>
                          <p className="text-sm text-gray-500">Pet: {call.petName}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-600">{call.duration}</span>
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Reason:</strong> {call.reason}
                        </p>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Mic className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium text-gray-700">Live Transcription</span>
                          </div>
                          <p className="text-sm text-gray-600 italic">&quot;{call.transcription}&quot;</p>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleIntercept()}
                          disabled={isIntercepting}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                          {isIntercepting ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Intercepting...
                            </div>
                          ) : (
                            <>
                              <Phone className="w-4 h-4 mr-2" />
                              Intercept Call
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleTransfer()}
                          className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                        >
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Transfer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Call Logs Tab */}
          {activeTab === 'logs' && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Call History</h2>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search calls..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Caller
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pet/Reason
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Handled By
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockCallLogs.map((call) => (
                        <tr key={call.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{call.callerName}</div>
                              <div className="text-sm text-gray-500">{call.callerPhone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{call.petName}</div>
                            <div className="text-sm text-gray-500">{call.reason}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {call.duration}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(call.status)}
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(call.status)}`}>
                                {call.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {call.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {call.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {call.aiHandled ? (
                                <>
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span className="text-sm text-gray-900">AI</span>
                                </>
                              ) : (
                                <>
                                  <User className="w-4 h-4 text-blue-500" />
                                  <span className="text-sm text-gray-900">Human</span>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Clinic Preferences</h2>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Preferences
                </button>
              </div>

              {/* Section 1: Clinic Fundamentals */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Clinic Fundamentals</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.clinicName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Phone</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.mainPhone}</div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.fullAddress}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.clinicWebsite}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">General Email</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.generalEmail}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(mockPreferences.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                        <span className="font-medium text-gray-700">{day}:</span>
                        <span className="text-gray-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Holiday & Special Closures</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.holidayClosures}</div>
                </div>
              </div>

              {/* Section 2: Staff & Services */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Staff & Services</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Veterinarians on Staff</h4>
                  <div className="space-y-4">
                    {mockPreferences.veterinarians.map((vet, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-900">{vet.name}</div>
                            <div className="text-sm text-gray-600 mt-1">{vet.specialties}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            vet.acceptingNewPatients 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {vet.acceptingNewPatients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Practice Manager</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.practiceManager}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Head Technician</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.headTechnician}</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mockPreferences.servicesOffered.map((service, index) => (
                      <div key={index} className="flex items-center p-2 bg-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Services NOT Offered</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.servicesNotOffered}</div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Species Treated</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockPreferences.speciesTreated.map((species, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {species}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Appointment Booking Engine */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Appointment Booking Engine</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types</h4>
                  <div className="space-y-4">
                    {mockPreferences.appointmentTypes.map((apt, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-gray-900">{apt.name}</div>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                            {apt.duration}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{apt.description}</div>
                        <div className={`inline-block px-2 py-1 rounded text-xs ${
                          apt.canBookNewClients 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {apt.canBookNewClients ? 'New clients allowed' : 'Existing clients only'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Time</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.leadTime}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Booking Horizon</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.bookingHorizon}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Buffer Time</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.bufferTime}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pre-appointment Instructions</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.preAppointmentInstructions}</div>
                </div>
              </div>

              {/* Section 4: Triage & Emergency Protocol */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Triage & Emergency Protocol</h3>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 text-sm font-medium">
                    ⚠️ The AI will follow these rules exactly. Please be very specific with your emergency protocols.
                  </p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Designated 24/7 Emergency Hospital</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.emergencyHospital.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.emergencyHospital.address}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.emergencyHospital.phone}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-red-300 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-red-800 mb-3">Tier 1: IMMEDIATE EMERGENCY</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      AI Action: &quot;This sounds like a critical emergency. Do not book an appointment. Please go immediately to [Emergency Hospital Name] at [Emergency Hospital Address] or call them at [Emergency Hospital Phone]. They are open 24/7.&quot;
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mockPreferences.tier1Keywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border border-orange-300 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Tier 2: URGENT - BOOK SAME/NEXT DAY</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      AI Action: &quot;Based on what you&apos;ve described, it&apos;s important that your pet is seen very soon. I will look for the next available urgent care appointment.&quot;
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mockPreferences.tier2Keywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border border-green-300 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Tier 3: NON-URGENT - STANDARD APPOINTMENT</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      AI Action: &quot;Okay, I can help you book a standard appointment for that. I have openings starting on [Date]. What day and time works best for you?&quot;
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mockPreferences.tier3Keywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Clinic Policies & FAQs */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 text-indigo-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Clinic Policies & FAQs</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockPreferences.paymentMethods.map((method, index) => (
                      <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {method}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      mockPreferences.paymentRequiredAtService 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      Payment {mockPreferences.paymentRequiredAtService ? 'Required' : 'Not Required'} at Time of Service
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pet Insurance Policy</label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-sm">{mockPreferences.petInsurancePolicy}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Refill Policy & Procedure</label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-sm">{mockPreferences.prescriptionRefillPolicy}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation/No-Show Policy</label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-sm">{mockPreferences.cancellationPolicy}</div>
                  </div>
                </div>
              </div>

              {/* Section 6: AI Persona & Communication Style */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-6 h-6 text-pink-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">AI Persona & Communication Style</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">AI Name</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.aiName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tone of Voice</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.toneOfVoice}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Opening Greeting (Phone/Chat)</label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-sm">{mockPreferences.openingGreeting}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Closing Message</label>
                    <div className="p-3 bg-gray-50 rounded-lg border text-sm">{mockPreferences.closingMessage}</div>
                  </div>
                </div>
              </div>

              {/* Section 7: Technical Integration */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <Settings className="w-6 h-6 text-gray-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Technical Integration</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Practice Management System (PIMS)</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.pims}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Calendar System</label>
                    <div className="p-3 bg-gray-50 rounded-lg border">{mockPreferences.calendarSystem}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Credentials / Access Instructions</label>
                  <div className="p-3 bg-gray-50 rounded-lg border text-sm">{mockPreferences.apiCredentials}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
