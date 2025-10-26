"use client"

import { useState } from 'react'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function ClinicFundamentals() {
  const [formData, setFormData] = useState({
    clinicName: 'Sunnyvale Pet Hospital',
    fullAddress: '123 Main Street, Sunnyvale, CA 94086',
    mainPhone: '(555) 123-4567',
    clinicWebsite: 'https://www.sunnyvalepet.com',
    generalEmail: 'info@sunnyvalepet.com',
    lunchBreak: { start: '12:00 PM', end: '1:00 PM' },
    holidayClosures: 'Thanksgiving (Nov 28th), Christmas Eve (close at 12 PM), Christmas Day',
    businessHours: {
      Monday: { start: '8:00 AM', end: '6:00 PM', closed: false },
      Tuesday: { start: '8:00 AM', end: '6:00 PM', closed: false },
      Wednesday: { start: '8:00 AM', end: '6:00 PM', closed: false },
      Thursday: { start: '8:00 AM', end: '6:00 PM', closed: false },
      Friday: { start: '8:00 AM', end: '6:00 PM', closed: false },
      Saturday: { start: '9:00 AM', end: '4:00 PM', closed: false },
      Sunday: { start: '', end: '', closed: true },
    }
  })

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateHours = (day: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }))
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8">
      <h3 className="text-lg font-semibold text-white mb-6">Basic Information</h3>

      <div className="space-y-6">
        {/* Clinic Name */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Clinic Name *
          </label>
          <input
            type="text"
            value={formData.clinicName}
            onChange={(e) => updateField('clinicName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Sunnyvale Pet Hospital"
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Full Address *
          </label>
          <input
            type="text"
            value={formData.fullAddress}
            onChange={(e) => updateField('fullAddress', e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Street, City, State, ZIP Code"
          />
        </div>

        {/* Main Phone */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Main Phone Number *
          </label>
          <input
            type="tel"
            value={formData.mainPhone}
            onChange={(e) => updateField('mainPhone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Clinic Website */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Clinic Website
          </label>
          <input
            type="url"
            value={formData.clinicWebsite}
            onChange={(e) => updateField('clinicWebsite', e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://www.yourclinic.com"
          />
        </div>

        {/* General Email */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            General Inquiry Email *
          </label>
          <input
            type="email"
            value={formData.generalEmail}
            onChange={(e) => updateField('generalEmail', e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="info@yourclinic.com"
          />
        </div>
      </div>

      {/* Business Hours */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
        <div className="space-y-3">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-32 font-medium text-white">{day}:</div>
              <div className="flex-1 flex items-center space-x-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.businessHours[day].closed}
                    onChange={(e) => updateHours(day, 'closed', e.target.checked)}
                    className="rounded border-gray-700 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-400">Closed</span>
                </label>
              </div>
              {!formData.businessHours[day].closed && (
                <>
                  <input
                    type="time"
                    value={formData.businessHours[day].start}
                    onChange={(e) => updateHours(day, 'start', e.target.value)}
                    className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="time"
                    value={formData.businessHours[day].end}
                    onChange={(e) => updateHours(day, 'end', e.target.value)}
                    className="px-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lunch Break */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lunch Break</h3>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded border-gray-700 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-white">Closed for lunch</span>
          </label>
        </div>
        <div className="flex items-center space-x-2 mt-3">
          <input
            type="time"
            className="px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-gray-400">to</span>
          <input
            type="time"
            className="px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Holiday & Special Closures */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-white mb-2">
          Holiday & Special Closures
        </label>
        <textarea
          value={formData.holidayClosures}
          onChange={(e) => updateField('holidayClosures', e.target.value)}
          rows={4}
            className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="List all holidays and special closures..."
          />
        <p className="text-sm text-gray-400 mt-2">
          Include national holidays and any additional closures (e.g., &quot;Closed for Thanksgiving, Nov 28th&quot;)
        </p>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Changes
        </button>
      </div>
    </div>
  )
}

