"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'

interface Rule {
  id: string
  ifCondition: string
  operator: string
  value: string
  thenAction: string
}

export default function AIOverrideRules() {
  const [rules, setRules] = useState<Rule[]>([])

  const addRule = () => {
    setRules([...rules, {
      id: Date.now().toString(),
      ifCondition: '',
      operator: '',
      value: '',
      thenAction: ''
    }])
  }

  const updateRule = (id: string, field: keyof Rule, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ))
  }

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id))
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">AI Override Rules</h3>
        <p className="text-sm text-gray-400">
          Create custom rules that override the AI&apos;s default behavior. These take precedence over all other settings.
        </p>
      </div>

      {/* Example Rule */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800 mb-2">
          <strong>Example:</strong> IF Call intent is &quot;Euthanasia&quot; THEN Immediately transfer to human
        </p>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg">
            <p className="text-gray-400">No override rules configured</p>
            <p className="text-sm text-gray-400 mt-1">Click &quot;Add Rule&quot; to create one</p>
          </div>
        ) : (
          rules.map((rule) => (
            <div key={rule.id} className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">IF</label>
                  <select
                    value={rule.ifCondition}
                    onChange={(e) => updateRule(rule.id, 'ifCondition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select condition...</option>
                    <option>Call intent is</option>
                    <option>Caller phone is</option>
                    <option>Caller says phrase</option>
                    <option>Call duration exceeds</option>
                    <option>Pet name contains</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Operator</label>
                  <select
                    value={rule.operator}
                    onChange={(e) => updateRule(rule.id, 'operator', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select operator...</option>
                    <option>IS</option>
                    <option>CONTAINS</option>
                    <option>IS NOT</option>
                    <option>STARTS WITH</option>
                    <option>ENDS WITH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Value</label>
                  <input
                    type="text"
                    value={rule.value}
                    onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter value..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">THEN</label>
                  <select
                    value={rule.thenAction}
                    onChange={(e) => updateRule(rule.id, 'thenAction', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select action...</option>
                    <option>Immediately transfer to human</option>
                    <option>Block caller</option>
                    <option>Tag as VIP</option>
                    <option>Escalate to manager</option>
                    <option>Play custom message</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => removeRule(rule.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove Rule
                </button>
              </div>
            </div>
          ))
        )}

        <button
          onClick={addRule}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Rule</span>
        </button>
      </div>

      <div className="flex justify-end mt-8">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Changes
        </button>
      </div>
    </div>
  )
}

