"use client"

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

export default function StaffManagement() {
  const [veterinarians, setVeterinarians] = useState([
    { name: 'Dr. Emily Carter, DVM', specialties: 'Feline Medicine, Orthopedic Surgery', acceptingNewPatients: true, services: [] },
    { name: 'Dr. Michael Rodriguez, DVM', specialties: 'Canine Cardiology, Internal Medicine', acceptingNewPatients: false, services: [] }
  ])

  const [practiceLeaders, setPracticeLeaders] = useState([
    { name: 'Sarah Johnson', role: 'Practice Manager' },
    { name: 'Lisa Chen', role: 'Head RVT' }
  ])

  const [technicians, setTechnicians] = useState([
    { name: 'Jane Doe, RVT', specialties: 'Dentistry, Anesthesia', services: [] }
  ])

  const [otherStaff, setOtherStaff] = useState({
    receptionStaff: 'Alice Smith, Bob Wilson, Carol Davis',
    veterinaryAssistants: 'David Lee, Emma Martinez',
    kennelAttendants: 'Frank Garcia, Grace Kim'
  })

  const addVeterinarian = () => {
    setVeterinarians([...veterinarians, { name: '', specialties: '', acceptingNewPatients: true, services: [] }])
  }

  const removeVeterinarian = (index: number) => {
    setVeterinarians(veterinarians.filter((_, i) => i !== index))
  }

  const updateVeterinarian = (index: number, field: string, value: any) => {
    const updated = [...veterinarians]
    updated[index] = { ...updated[index], [field]: value }
    setVeterinarians(updated)
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8 space-y-8">
      {/* Veterinarians */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">1. Veterinarians</h3>
          <p className="text-sm text-gray-400">Used for scheduling appointments</p>
        </div>
        <div className="space-y-4">
          {veterinarians.map((vet, index) => (
            <div key={index} className="border border-gray-800 rounded-lg p-4 bg-gray-950">
                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Name & Credentials *
                  </label>
                  <input
                    type="text"
                    value={vet.name}
                    onChange={(e) => updateVeterinarian(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Dr. John Smith, DVM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Specialties
                  </label>
                  <input
                    type="text"
                    value={vet.specialties}
                    onChange={(e) => updateVeterinarian(index, 'specialties', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Canine Surgery, Internal Medicine"
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={vet.acceptingNewPatients}
                    onChange={(e) => updateVeterinarian(index, 'acceptingNewPatients', e.target.checked)}
                    className="rounded border-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-white">Accepting New Patients?</span>
                </label>
                <button
                  onClick={() => removeVeterinarian(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-white mb-2">
                  Services Offered (Multi-select)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 text-blue-600" />
                    <span className="text-sm text-white">Preventive Medicine</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 text-blue-600" />
                    <span className="text-sm text-white">Diagnostic Services</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 text-blue-600" />
                    <span className="text-sm text-white">Medical Services</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 text-blue-600" />
                    <span className="text-sm text-white">Surgical Services</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 text-blue-600" />
                    <span className="text-sm text-white">Urgent & Emergency Care</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 text-blue-600" />
                    <span className="text-sm text-white">Alternative Medicine</span>
                  </label>
                  <label className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800">
                    <input type="checkbox" className="rounded border-gray-700 text-blue-600" />
                    <span className="text-sm text-white">End-of-Life Services</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addVeterinarian}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Veterinarian</span>
          </button>
        </div>
      </div>

      {/* Practice Leaders */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">2. Practice Leaders</h3>
        <div className="space-y-4">
          {practiceLeaders.map((leader, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Name</label>
                <input
                  type="text"
                  value={leader.name}
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Role</label>
                <select className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Practice Manager</option>
                  <option>Head RVT</option>
                  <option>Inventory Manager</option>
                  <option>Shift Manager</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          ))}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Practice Leader</span>
          </button>
        </div>
      </div>

      {/* RVTs */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">3. Registered Veterinary Technicians (RVTs)</h3>
        <div className="space-y-4">
          {technicians.map((tech, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Specialties</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Dentistry, Anesthesia"
                />
              </div>
            </div>
          ))}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add RVT</span>
          </button>
        </div>
      </div>

      {/* Other Staff */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            4. Reception Staff
          </label>
          <textarea
            value={otherStaff.receptionStaff}
            onChange={(e) => setOtherStaff({ ...otherStaff, receptionStaff: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="List names, one per line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            5. Veterinary Assistants
          </label>
          <textarea
            value={otherStaff.veterinaryAssistants}
            onChange={(e) => setOtherStaff({ ...otherStaff, veterinaryAssistants: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="List names, one per line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            6. Kennel Attendants
          </label>
          <textarea
            value={otherStaff.kennelAttendants}
            onChange={(e) => setOtherStaff({ ...otherStaff, kennelAttendants: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="List names, one per line"
          />
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

