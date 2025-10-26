"use client"

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

export default function BookingEngine() {
  const [resources, setResources] = useState([
    { name: 'Exam Room 1', pimsCode: 'ROOM1', type: 'Veterinarian', staff: [] },
    { name: 'Tech Station', pimsCode: 'TECH', type: 'RVT/Technician', staff: [] }
  ])

  const addResource = () => {
    setResources([...resources, { name: '', pimsCode: '', type: 'Veterinarian', staff: [] }])
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8 space-y-8">
      {/* Clinic Resources */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">
          1. Clinic Resources (PIMS &quot;Rooms&quot;)
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          List all schedule-able resources or rooms as they appear in your PIMS.
        </p>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Resource / Room Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Exam Room 1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    PIMS Mapping Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ROOM1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Resource Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Veterinarian</option>
                    <option>RVT/Technician</option>
                    <option>General Use</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-white mb-2">
                  Link to Staff
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                    <span className="text-sm text-white">Dr. Emily Carter, DVM</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                    <span className="text-sm text-white">Dr. Michael Rodriguez, DVM</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                    <span className="text-sm text-white">Jane Doe, RVT</span>
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Select the staff member(s) who use this resource
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={addResource}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
        </div>
      </div>

      {/* Service Configuration */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          2. Service Configuration & Appointment Mapping
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Services are pre-populated from Section 3. Use &quot;Bulk-Set&quot; for each category or edit line by line.
        </p>
        
        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-950">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Service Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Default Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Map to Resource(s)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">AI Triage Keywords</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">New Clients?</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {/* Preventive Medicine */}
              <tr>
                <td className="px-4 py-3 text-sm text-white">Wellness & Preventive Exams</td>
                <td className="px-4 py-3">
                  <select className="text-sm border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white">
                    <option>30 min</option>
                    <option>45 min</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select className="text-sm border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white">
                    <option>Select...</option>
                    <option>Exam Room 1</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    className="text-sm border border-gray-700 rounded px-2 py-1 w-full bg-gray-800 text-white placeholder-gray-500"
                    defaultValue="check-up, annual"
                  />
                </td>
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" checked />
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-white">Vaccinations & Titers</td>
                <td className="px-4 py-3">
                  <select className="text-sm border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white">
                    <option>15 min</option>
                    <option>30 min</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select className="text-sm border border-gray-700 rounded px-2 py-1 bg-gray-800 text-white">
                    <option>Select...</option>
                    <option>Exam Room 1</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    className="text-sm border border-gray-700 rounded px-2 py-1 w-full bg-gray-800 text-white placeholder-gray-500"
                    defaultValue="shots, vaccines, booster"
                  />
                </td>
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" checked />
                </td>
              </tr>
              {/* Add more services as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* General Scheduling Rules */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          3. General Scheduling Rules
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Booking Lead Time
            </label>
            <select className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>1 hour</option>
              <option>4 hours</option>
              <option>24 hours</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">Do not allow AI to book appointments less than X in advance</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Booking Horizon
            </label>
            <select className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">Book appointments no more than X days in advance</p>
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-700 text-blue-600" />
            <span className="text-sm text-white">Send automated SMS confirmation to client upon booking</span>
          </label>
        </div>
      </div>

      {/* Patient-Specific Booking Logic */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          4. Patient-Specific Booking Logic
        </h3>
        <div className="space-y-4">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-medium text-blue-300 mb-2">Established Patient Workflow (Primary)</h4>
            <p className="text-sm text-blue-200 mb-3">
              AI Script: &quot;Thank you for calling [Clinic Name]. Am I speaking with [Client Name]?&quot;
            </p>
            <p className="text-sm text-blue-300">
              If match found in PIMS, the AI will skip re-collecting client information.
            </p>
          </div>
          
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <h4 className="font-medium text-green-300 mb-2">New Client Protocol (Fallback)</h4>
            <label className="block text-sm font-medium text-white mb-2">Information to Collect</label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                <span className="text-white">Owner Full Name</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                <span className="text-white">Phone</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                <span className="text-white">Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                <span className="text-white">Pet Name</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                <span className="text-white">Breed</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-400" />
                <span className="text-white">Age</span>
              </label>
            </div>
            <label className="block text-sm font-medium text-white mb-2 mt-4">
              Pre-appointment Instructions
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 text-sm"
              placeholder="Please arrive 15 minutes early..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Changes
        </button>
      </div>
    </div>
  )
}

