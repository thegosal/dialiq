"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  PhoneIncoming, 
  Settings, 
  Plug, 
  CreditCard, 
  User,
  ChevronRight
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Call Logs', href: '/dashboard/logs', icon: PhoneIncoming },
  { name: 'Clinic Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Plug },
]

const bottomNavigation = [
  { name: 'Account & Billing', href: '/dashboard/billing', icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 flex flex-col bg-gray-900 border-r border-gray-800">
        {/* Logo */}
        <div className="flex items-center px-6 py-6 border-b border-gray-800">
          <div className="relative">
            <div className="w-8 h-8 border-3 border-white rounded-full"></div>
            <div className="absolute top-4 left-4 w-3 h-1 bg-white transform rotate-45 origin-left"></div>
          </div>
          <span className="ml-2 text-xl font-bold">DialIQ</span>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Separator */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom Navigation */}
        <nav className="px-4 py-4">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

