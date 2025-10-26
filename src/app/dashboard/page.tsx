"use client"

import { PhoneCall, Calendar, ArrowRight, Activity, TrendingUp, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

// Mock data - these would come from your API
const mockStats = {
  totalCallsToday: 47,
  apptsBookedByAI: 32,
  transferToHuman: 8,
  pimsStatus: "Connected",
  pimsName: "Cornerstone"
}

const mockLiveCalls = [
  {
    id: 1,
    phoneNumber: "(555) 123-4567",
    status: "Identifying intent",
    duration: "0:45"
  },
  {
    id: 2,
    phoneNumber: "(555) 987-6543",
    status: "Booking appointment",
    duration: "2:12"
  }
]

const mockCallTrends = [
  { date: "Mon", handled: 12, transferred: 2 },
  { date: "Tue", handled: 15, transferred: 3 },
  { date: "Wed", handled: 14, transferred: 1 },
  { date: "Thu", handled: 18, transferred: 4 },
  { date: "Fri", handled: 16, transferred: 2 },
  { date: "Sat", handled: 10, transferred: 1 },
  { date: "Sun", handled: 8, transferred: 2 },
]

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-800 px-8 py-4">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400">Monitor your AI operations and key metrics</p>
      </header>

      <main className="p-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Calls Today */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Calls Today</p>
                <p className="text-3xl font-bold text-white mt-2">{mockStats.totalCallsToday}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <PhoneCall className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Appts Booked by AI */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Appts Booked by AI</p>
                <p className="text-3xl font-bold text-white mt-2">{mockStats.apptsBookedByAI}</p>
                <p className="text-sm text-green-400 mt-1">
                  {Math.round((mockStats.apptsBookedByAI / mockStats.totalCallsToday) * 100)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          {/* Transferred to Human */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Transferred to Human</p>
                <p className="text-3xl font-bold text-white mt-2">{mockStats.transferToHuman}</p>
                <p className="text-sm text-blue-400 mt-1">
                  {Math.round((mockStats.transferToHuman / mockStats.totalCallsToday) * 100)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          {/* PIMS Status */}
          <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">PIMS Status</p>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-lg font-semibold text-white">{mockStats.pimsStatus}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{mockStats.pimsName}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Call Monitoring */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800">
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="text-lg font-semibold text-white">Live Call Monitoring</h2>
              </div>
              <Clock key={refreshKey} className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="p-6">
            {mockLiveCalls.length === 0 ? (
              <div className="text-center py-12">
                <PhoneCall className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-400">No active calls</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mockLiveCalls.map((call) => (
                  <div key={call.id} className="border border-gray-800 rounded-lg p-4 bg-gray-950">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <PhoneCall className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{call.phoneNumber}</p>
                          <p className="text-sm text-gray-400">{call.status}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-300">{call.duration}</p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Listen
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        Take Over
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Call Trends Chart */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Call Volume & Outcomes (Last 7 Days)</h2>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {mockCallTrends.map((day, index) => {
                const total = day.handled + day.transferred
                const handledPercent = (day.handled / total) * 100
                const transferredPercent = (day.transferred / total) * 100

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-300 w-16">{day.date}</span>
                      <div className="flex-1 bg-gray-950 rounded-full h-6 flex overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full flex items-center pl-3 text-white text-xs font-medium"
                          style={{ width: `${handledPercent}%` }}
                        >
                          {day.handled > 0 && `${day.handled}`}
                        </div>
                        <div 
                          className="bg-orange-600 h-full flex items-center pl-3 text-white text-xs font-medium"
                          style={{ width: `${transferredPercent}%` }}
                        >
                          {day.transferred > 0 && `${day.transferred}`}
                        </div>
                      </div>
                      <span className="text-gray-400 w-16 text-right">{total}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm text-gray-300">Handled by AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-600 rounded"></div>
                <span className="text-sm text-gray-300">Transferred to Human</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
