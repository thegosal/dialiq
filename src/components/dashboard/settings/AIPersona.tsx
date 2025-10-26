"use client"

import { useState } from 'react'

export default function AIPersona() {
  const [formData, setFormData] = useState({
    aiName: 'Penny',
    toneOfVoice: 'Warm & Empathetic',
    openingGreeting: 'Thank you for contacting Sunnyvale Pet Hospital. This is Penny, the virtual assistant. How can I help you and your pet today?',
    closingMessage: 'Thank you, and we look forward to seeing you and your pet soon!'
  })

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">AI Persona & Communication Style</h3>
        <p className="text-sm text-gray-400">
          Define how you want your AI to interact with clients
        </p>
      </div>

      <div className="space-y-6">
        {/* AI Name */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            AI Name *
          </label>
          <input
            type="text"
            value={formData.aiName}
            onChange={(e) => updateField('aiName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Penny"
          />
          <p className="text-xs text-gray-400 mt-1">
            This is how the AI will introduce itself to callers
          </p>
        </div>

        {/* Tone of Voice */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Tone of Voice *
          </label>
          <select
            value={formData.toneOfVoice}
            onChange={(e) => updateField('toneOfVoice', e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Professional & Efficient">Professional & Efficient</option>
            <option value="Warm & Empathetic">Warm & Empathetic (Recommended)</option>
            <option value="Friendly & Casual">Friendly & Casual</option>
          </select>
          <div className="mt-2 text-xs text-gray-400">
            <p className="font-medium mb-1">Tone descriptions:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Professional & Efficient:</strong> Clear, concise, and direct</li>
              <li><strong>Warm & Empathetic:</strong> Uses phrases like &quot;I understand this must be worrying&quot;</li>
              <li><strong>Friendly & Casual:</strong> More conversational and relaxed</li>
            </ul>
          </div>
        </div>

        {/* Opening Greeting */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Opening Greeting (Phone/Chat) *
          </label>
          <textarea
            value={formData.openingGreeting}
            onChange={(e) => updateField('openingGreeting', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Thank you for contacting [Clinic Name]. This is [AI Name], the virtual assistant..."
          />
          <p className="text-xs text-gray-400 mt-1">
            Use [Clinic Name] and [AI Name] as placeholders
          </p>
        </div>

        {/* Closing Message */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Closing *
          </label>
          <textarea
            value={formData.closingMessage}
            onChange={(e) => updateField('closingMessage', e.target.value)}
            rows={2}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Thank you, and we look forward to seeing you and your pet soon!"
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

