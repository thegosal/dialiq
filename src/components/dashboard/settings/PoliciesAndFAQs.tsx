"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function PoliciesAndFAQs() {
  const [paymentMethods, setPaymentMethods] = useState([
    { name: 'Visa', enabled: true },
    { name: 'MasterCard', enabled: true },
    { name: 'Amex', enabled: true },
    { name: 'Discover', enabled: false },
    { name: 'CareCredit', enabled: true },
    { name: 'Scratchpay', enabled: false },
    { name: 'Cash', enabled: true },
    { name: 'Check', enabled: true }
  ])

  const [customQuestions, setCustomQuestions] = useState([
    { question: 'Do you offer grooming?', answer: 'We do not offer grooming, but we can recommend several great local groomers.' }
  ])

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8 space-y-8">
      {/* Prescription Refills */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">6.1 Prescription Refills</h3>
        <p className="text-sm text-gray-400 mb-4">Keywords: &quot;refill&quot;, &quot;prescription&quot;, &quot;medication&quot;, &quot;renew&quot;</p>
        
        <label className="block text-sm font-medium text-white mb-2">
          AI Handling Logic
        </label>
        <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4">
          <option className="bg-gray-800 text-white">Take a message & create PIMS task (Recommended)</option>
          <option className="bg-gray-800 text-white">Immediately transfer to a human</option>
          <option className="bg-gray-800 text-white">Attempt to auto-approve if PIMS shows refills remaining</option>
        </select>

        <label className="block text-sm font-medium text-white mb-2">
          AI Script (If taking a message)
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue="I can certainly help with that. Please note that all prescription requests require 24 hours for review by a veterinarian."
        />
      </div>

      {/* General & Administrative FAQs */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">6.2 General & Administrative Questions (FAQs)</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-white mb-3">Payment Policy</h4>
            <label className="block text-sm font-medium text-white mb-2">
              Accepted Forms of Payment
            </label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={method.enabled}
                    onChange={(e) => {
                      const updated = [...paymentMethods]
                      updated[index].enabled = e.target.checked
                      setPaymentMethods(updated)
                    }}
                    className="rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-white">{method.name}</span>
                </label>
              ))}
            </div>
            
            <label className="block text-sm font-medium text-white mb-2 mt-4">
              Payment Due
            </label>
            <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option className="bg-gray-800 text-white">Payment is required at time of service</option>
              <option className="bg-gray-800 text-white">Payment plans are available</option>
              <option className="bg-gray-800 text-white">We offer financing options</option>
            </select>
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Pet Insurance</h4>
            <label className="block text-sm font-medium text-white mb-2">
              How do you handle insurance?
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="We do not bill insurance companies directly. Clients pay us at the time of service, and we provide them with a detailed invoice to submit to their insurance provider for reimbursement."
            />
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Cancellation/No-Show Policy</h4>
            <label className="block text-sm font-medium text-white mb-2">
              Policy Details
            </label>
            <textarea
              rows={2}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="We require 24 hours' notice for all cancellations. A fee of $50 may be charged for late cancellations or no-shows."
            />
          </div>

          <div>
            <h4 className="font-medium text-white mb-3">Add Custom Q&A</h4>
            <div className="space-y-4">
              {customQuestions.map((qa, index) => (
                <div key={index} className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Question?"
                    defaultValue={qa.question}
                  />
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Answer..."
                    defaultValue={qa.answer}
                  />
                </div>
              ))}
              <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
                <Plus className="w-4 h-4" />
                <span>Add Another Q&A</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Questions */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">6.3 Pricing Questions</h3>
        <p className="text-sm text-gray-400 mb-4">Keywords: &quot;how much&quot;, &quot;cost&quot;, &quot;price&quot;, &quot;estimate&quot;</p>
        
        <label className="block text-sm font-medium text-white mb-2">
          AI Handling Logic
        </label>
        <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4">
          <option className="bg-gray-800 text-white">State that an exam is required for an estimate (Recommended)</option>
          <option className="bg-gray-800 text-white">Immediately transfer to a human</option>
        </select>

        <label className="block text-sm font-medium text-white mb-2">
          AI Script
        </label>
        <textarea
          rows={3}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue="I am not able to provide pricing over the phone, as the cost can vary depending on what the veterinarian finds during the exam."
        />
      </div>

      {/* Callback Requests */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">6.4 Callback Requests</h3>
        <p className="text-sm text-gray-400 mb-4">Keywords: &quot;talk to a doctor&quot;, &quot;call me back&quot;, &quot;speak to a tech&quot;</p>
        
        <label className="block text-sm font-medium text-white mb-2">
          AI Handling Logic
        </label>
        <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4">
          <option className="bg-gray-800 text-white">Take a message & create PIMS task (Recommended)</option>
          <option className="bg-gray-800 text-white">Immediately transfer to a human</option>
        </select>

        <label className="block text-sm font-medium text-white mb-2">
          AI Script
        </label>
        <textarea
          rows={2}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          defaultValue="Our medical team is currently with patients, but I would be happy to take a detailed message."
        />
      </div>

      <div className="flex justify-end mt-8">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Changes
        </button>
      </div>
    </div>
  )
}

