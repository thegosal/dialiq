"use client"

import { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  Building2, 
  Users, 
  ClipboardList, 
  Calendar,
  Shield,
  AlertTriangle,
  FileText,
  Bot
} from 'lucide-react'
import ClinicFundamentals from '@/components/dashboard/settings/ClinicFundamentals'
import StaffManagement from '@/components/dashboard/settings/StaffManagement'
import ServicesOffered from '@/components/dashboard/settings/ServicesOffered'
import BookingEngine from '@/components/dashboard/settings/BookingEngine'
import TriageAndEmergency from '@/components/dashboard/settings/TriageAndEmergency'
import AIOverrideRules from '@/components/dashboard/settings/AIOverrideRules'
import PoliciesAndFAQs from '@/components/dashboard/settings/PoliciesAndFAQs'
import AIPersona from '@/components/dashboard/settings/AIPersona'

const tabs = [
  { id: 'fundamentals', name: 'Clinic Fundamentals', icon: Building2, component: ClinicFundamentals },
  { id: 'staff', name: 'Staff Management', icon: Users, component: StaffManagement },
  { id: 'services', name: 'Services Offered', icon: ClipboardList, component: ServicesOffered },
  { id: 'booking', name: 'Booking Engine', icon: Calendar, component: BookingEngine },
  { id: 'triage', name: 'Triage & Emergency', icon: Shield, component: TriageAndEmergency },
  { id: 'override', name: 'AI Override Rules', icon: AlertTriangle, component: AIOverrideRules },
  { id: 'policies', name: 'Policies & FAQs', icon: FileText, component: PoliciesAndFAQs },
  { id: 'persona', name: 'AI Persona', icon: Bot, component: AIPersona },
]

export default function ClinicSettingsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const ActiveComponent = tabs[activeTab].component

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sub-Navigation */}
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Clinic Settings</h2>
          </div>
        </div>
        <nav className="p-2">
          {tabs.map((tab, index) => {
            const isActive = index === activeTab
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors flex items-center space-x-3 ${
                  isActive
                    ? 'bg-gray-800 text-white font-medium'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-950">
        <header className="bg-gray-900 shadow-sm border-b border-gray-800 px-8 py-4">
          <h1 className="text-2xl font-bold text-white">{tabs[activeTab].name}</h1>
          <p className="text-sm text-gray-400">Configure your clinic&apos;s AI settings and preferences</p>
        </header>

        <main className="p-8">
          <ActiveComponent />
        </main>
      </div>
    </div>
  )
}
