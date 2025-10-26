"use client"

import { useState } from 'react'
import { Plug, CheckCircle, XCircle, ExternalLink } from 'lucide-react'

const pimsConnectors = [
  { name: 'Cornerstone', status: 'Connected', category: 'Veterinary' },
  { name: 'DaySmart Vet', status: 'Disconnected', category: 'Veterinary' },
  { name: 'ezyVet', status: 'Coming Soon', category: 'Veterinary' },
  { name: 'Avimark', status: 'Coming Soon', category: 'Veterinary' },
]

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-800 px-8 py-4">
        <h1 className="text-2xl font-bold text-white">Integrations</h1>
        <p className="text-sm text-gray-400">Manage your third-party connections and integrations</p>
      </header>

      <main className="p-8">
        {/* Sub-Navigation */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 mb-6">
          <div className="flex space-x-1 p-1">
            {['PIMS Connectors', 'Telephony (Twilio)'].map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 px-4 py-3 text-center font-medium rounded-lg transition-colors ${
                  activeTab === index
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* PIMS Connectors Tab */}
        {activeTab === 0 && (
          <div className="space-y-4">
            {pimsConnectors.map((pims, index) => (
              <div key={index} className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Plug className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{pims.name}</h3>
                      <p className="text-sm text-gray-400">{pims.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${
                      pims.status === 'Connected' ? 'text-green-400' :
                      pims.status === 'Coming Soon' ? 'text-gray-500' :
                      'text-red-400'
                    }`}>
                      {pims.status === 'Connected' ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">{pims.status}</span>
                        </>
                      ) : pims.status === 'Coming Soon' ? (
                        <span className="font-medium">{pims.status}</span>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5" />
                          <span className="font-medium">{pims.status}</span>
                        </>
                      )}
                    </div>
                    {pims.status !== 'Coming Soon' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Manage
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Twilio Tab */}
        {activeTab === 1 && (
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8">
            <h3 className="text-lg font-semibold text-white mb-6">Twilio Configuration</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Twilio Account SID
                  </label>
                  <input 
                    type="text"
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Twilio Auth Token
                  </label>
                  <input 
                    type="password"
                    placeholder="•••••••••••••••••••••••••"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-white">Phone Numbers</h4>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Add Number
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  Phone number management interface will be implemented here.
                </p>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

