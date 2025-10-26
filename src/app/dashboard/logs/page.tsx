"use client"

import { Search, Filter, Download, Eye } from 'lucide-react'
import { useState } from 'react'

const mockCallLogs = [
  {
    id: 1,
    date: "2024-01-15",
    time: "10:30 AM",
    phone: "(555) 234-5678",
    clientName: "Emily Davis",
    petName: "Max",
    callType: "Wellness Exam",
    status: "Booked",
    summary: "Scheduled annual wellness exam for Max on 01/20/2024 at 2:00 PM"
  },
  {
    id: 2,
    time: "09:15 AM",
    date: "2024-01-15",
    phone: "(555) 345-6789",
    clientName: "Robert Wilson",
    petName: "Luna",
    callType: "Emergency Triage",
    status: "Transferred",
    summary: "Transferred to on-call vet for breathing difficulties - identified as Tier 1 emergency"
  },
  {
    id: 3,
    time: "08:45 AM",
    date: "2024-01-15",
    phone: "(555) 456-7890",
    clientName: "Lisa Brown",
    petName: "Charlie",
    callType: "Refill Request",
    status: "Task Created",
    summary: "Created PIMS task for Charlie's monthly heart medication refill"
  },
  {
    id: 4,
    time: "4:20 PM",
    date: "2024-01-14",
    phone: "(555) 567-8901",
    clientName: "David Miller",
    petName: "Bella",
    callType: "FAQ",
    status: "Answered",
    summary: "Provided information about vaccination schedule"
  },
]

export default function CallLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm border-b border-gray-800 px-8 py-4">
        <h1 className="text-2xl font-bold text-white">Call Logs</h1>
        <p className="text-sm text-gray-400">Review and analyze all calls handled by the AI</p>
      </header>

      <main className="p-8">
        {/* Filters */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Call Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Call Type</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-950 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>All</option>
                <option>Appointment Booked</option>
                <option>Triage</option>
                <option>Refill Request</option>
                <option>FAQ</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Phone, Name, Keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-950 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call Log Table */}
        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-950">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Caller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Call Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Summary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {mockCallLogs.map((call) => (
                  <tr key={call.id} className="hover:bg-gray-950">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{call.date}</div>
                      <div className="text-sm text-gray-500">{call.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{call.clientName}</div>
                      <div className="text-sm text-gray-500">{call.phone}</div>
                      {call.petName && (
                        <div className="text-sm text-gray-400">Pet: {call.petName}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                        {call.callType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        call.status === 'Booked' ? 'bg-green-500/20 text-green-400' :
                        call.status === 'Transferred' ? 'bg-orange-500/20 text-orange-400' :
                        call.status === 'Task Created' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 max-w-xs">{call.summary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">4</span> of{' '}
              <span className="font-medium text-white">24</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

