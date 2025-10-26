"use client"

import { useState } from 'react'
import { Plus, Trash2, AlertCircle } from 'lucide-react'

export default function TriageAndEmergency() {
  const [criticalKeywords, setCriticalKeywords] = useState([
    'can\'t breathe', 'poison', 'seizing', 'hit by car', 'gasping', 
    'collapse', 'unconscious', 'ate chocolate', 'ate rat poison', 'major bleeding'
  ])
  const [urgentKeywords, setUrgentKeywords] = useState([
    'vomiting', 'diarrhea', 'lethargic', 'not eating', 'limping', 
    'coughing', 'allergic reaction', 'in pain', 'urinary blockage', 'eye injury'
  ])
  const [hospitals, setHospitals] = useState([
    { name: 'BluePearl Pet Hospital', phone: '(555) 999-8888', address: '456 Emergency Way, Sunnyvale, CA', intro: 'A trusted 24/7 hospital' }
  ])
  const [useCustomTriageHours, setUseCustomTriageHours] = useState(false)
  const [customTriageHours, setCustomTriageHours] = useState({
    monday: { enabled: true, start: '08:00', end: '17:00' },
    tuesday: { enabled: true, start: '08:00', end: '17:00' },
    wednesday: { enabled: true, start: '08:00', end: '17:00' },
    thursday: { enabled: true, start: '08:00', end: '17:00' },
    friday: { enabled: true, start: '08:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '13:00' },
    sunday: { enabled: false, start: '10:00', end: '14:00' }
  })

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8 space-y-8">
      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
        <div>
          <h4 className="font-medium text-red-900">Important</h4>
          <p className="text-sm text-red-800 mt-1">
            The AI will follow these rules exactly. Please be very specific with your emergency protocols.
          </p>
        </div>
      </div>

      {/* Triage Keywords */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">
          5.1 Triage Keyword Configuration
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-red-300 mb-2">
              Critical Keywords (Tier 1)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {criticalKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-500/20 text-red-200 border border-red-500/50 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{keyword}</span>
                  <button
                    onClick={() => setCriticalKeywords(criticalKeywords.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-200 ml-2"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add custom keyword..."
                className="flex-1 px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement
                    if (target.value.trim()) {
                      setCriticalKeywords([...criticalKeywords, target.value.trim()])
                      target.value = ''
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Add custom keyword..."]') as HTMLInputElement
                  if (input && input.value.trim()) {
                    setCriticalKeywords([...criticalKeywords, input.value.trim()])
                    input.value = ''
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-orange-300 mb-2">
              Urgent Keywords (Tier 2)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {urgentKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500/20 text-orange-200 border border-orange-500/50 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{keyword}</span>
                  <button
                    onClick={() => setUrgentKeywords(urgentKeywords.filter((_, i) => i !== index))}
                    className="text-orange-400 hover:text-orange-200 ml-2"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Add custom keyword..."
                className="flex-1 px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement
                    if (target.value.trim()) {
                      setUrgentKeywords([...urgentKeywords, target.value.trim()])
                      target.value = ''
                    }
                  }
                }}
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Triage Handling Logic */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          5.2 Triage Handling Logic (Time-of-Day Rules)
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-white mb-2">A) Primary Triage Hours (&quot;In-Hours&quot;)</h4>
            <div className="space-y-2 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="triageHours" 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                  checked={!useCustomTriageHours}
                  onChange={() => setUseCustomTriageHours(false)}
                />
                <span className="text-sm text-white">Use Clinic Business Hours (from Section 1)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="triageHours" 
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  checked={useCustomTriageHours}
                  onChange={() => setUseCustomTriageHours(true)}
                />
                <span className="text-sm text-white">Use Custom Triage Hours</span>
              </label>
            </div>
            
            {useCustomTriageHours && (
              <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
                <h5 className="text-sm font-medium text-white mb-3">Custom Triage Hours</h5>
                <div className="space-y-3">
                  {Object.entries(customTriageHours).map(([day, config]) => (
                    <div key={day} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 w-32">
                        <input
                          type="checkbox"
                          checked={config.enabled}
                          onChange={(e) => {
                            setCustomTriageHours({
                              ...customTriageHours,
                              [day]: { ...config, enabled: e.target.checked }
                            })
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-700 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-white capitalize">{day}</span>
                      </div>
                      {config.enabled && (
                        <>
                          <input
                            type="time"
                            value={config.start}
                            onChange={(e) => {
                              setCustomTriageHours({
                                ...customTriageHours,
                                [day]: { ...config, start: e.target.value }
                              })
                            }}
                            className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <span className="text-sm text-gray-400">to</span>
                          <input
                            type="time"
                            value={config.end}
                            onChange={(e) => {
                              setCustomTriageHours({
                                ...customTriageHours,
                                [day]: { ...config, end: e.target.value }
                              })
                            }}
                            className="px-3 py-1.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  When a &quot;Critical (Tier 1)&quot; call is detected during these hours:
                </label>
                <div className="flex items-center space-x-3">
                  <select className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option className="bg-gray-800 text-white">Immediately transfer to a human</option>
                    <option className="bg-gray-800 text-white">Refer to emergency hospital</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Transfer phone number"
                    className="px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  When an &quot;Urgent (Tier 2)&quot; call is detected during these hours:
                </label>
                <div className="flex items-center space-x-3">
                  <select className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option className="bg-gray-800 text-white">Attempt to book &quot;Urgent Care&quot; appointment</option>
                    <option className="bg-gray-800 text-white">Immediately transfer to a human</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Transfer phone number"
                    className="px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">B) Secondary Triage Hours (&quot;After-Hours&quot;)</h4>
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  When a &quot;Critical (Tier 1)&quot; call is detected:
                </label>
                <div className="flex items-center space-x-3">
                  <select className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option className="bg-gray-800 text-white">Refer to designated 24/7 hospital(s)</option>
                    <option className="bg-gray-800 text-white">Transfer to an answering service</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  When an &quot;Urgent (Tier 2)&quot; call is detected:
                </label>
                <div className="flex items-center space-x-3">
                  <select className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option className="bg-gray-800 text-white">Refer to designated 24/7 hospital(s)</option>
                    <option className="bg-gray-800 text-white">Transfer to an answering service</option>
                    <option className="bg-gray-800 text-white">Instruct caller to call back during primary hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referred Emergency Hospitals */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          5.3 Referred Emergency Hospitals
        </h3>
        <div className="space-y-4">
          {hospitals.map((hospital, index) => (
            <div key={index} className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-white">Hospital {index + 1}</h4>
                {hospitals.length > 1 && (
                  <button
                    onClick={() => setHospitals(hospitals.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-300 text-sm flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Hospital Name</label>
                  <input
                    type="text"
                    defaultValue={hospital.name}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={hospital.phone}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue={hospital.address}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">AI Intro</label>
                <textarea
                  rows={2}
                  defaultValue={hospital.intro}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="This is a 24/7 hospital..."
                />
              </div>
            </div>
          ))}
          <button 
            onClick={() => setHospitals([...hospitals, { name: '', phone: '', address: '', intro: '' }])}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Hospital</span>
          </button>
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

