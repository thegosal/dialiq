"use client"

import { CreditCard, UserPlus, FileText } from 'lucide-react'

export default function AccountBillingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-800 px-8 py-4">
        <h1 className="text-2xl font-bold text-white">Account & Billing</h1>
        <p className="text-sm text-gray-400">Manage your subscription and billing information</p>
      </header>

      <main className="p-8 space-y-6">
        {/* Current Plan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              Upgrade Plan
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">Professional Plan</p>
              <p className="text-sm text-gray-600">$299/month • Next billing date: Jan 30, 2024</p>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Invite User</span>
            </button>
          </div>
          <p className="text-sm text-gray-600">
            User management interface will be implemented here.
          </p>
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No billing history available</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

