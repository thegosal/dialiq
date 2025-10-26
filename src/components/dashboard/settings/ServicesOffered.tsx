"use client"

import { useState } from 'react'

const serviceCategories = [
  {
    name: 'Preventive Medicine',
    services: [
      'Wellness & Preventive Exams',
      'Puppy & Kitten Care Programs',
      'Vaccinations & Titers',
      'Flea, Tick & Heartworm Prevention',
      'Microchipping',
      'Senior Pet Wellness',
      'Nutrition & Diet Counseling'
    ]
  },
  {
    name: 'Diagnostic Services',
    services: [
      'In-House Laboratory (Bloodwork, Urinalysis)',
      'Digital Radiology (X-ray)',
      'Ultrasound',
      'Allergy Testing',
      'Cytology (Ear, Skin)'
    ]
  },
  {
    name: 'Medical Services (Outpatient / Non-Urgent Care)',
    services: [
      'Sick Pet Examinations',
      'Dermatology (Skin & Allergies)',
      'Pain Management',
      'Internal Medicine Consults',
      'Behavioral Counseling'
    ]
  },
  {
    name: 'Surgical Services',
    services: [
      'Spay & Neuter',
      'Dental Cleaning, Polishing & Extractions',
      'Soft Tissue Surgery',
      'Orthopedic Surgery'
    ]
  },
  {
    name: 'Urgent & Emergency Care',
    services: [
      'Urgent Care Appointments (during business hours)',
      'Emergency Stabilization (during business hours)'
    ]
  },
  {
    name: 'Alternative & Complementary Medicine',
    services: [
      'Laser Therapy',
      'Acupuncture',
      'Physical Therapy / Rehabilitation',
      'Homeopathy'
    ]
  },
  {
    name: 'End-of-Life Services',
    services: [
      'Hospice & Palliative Care',
      'Humane Euthanasia Services'
    ]
  }
]

export default function ServicesOffered() {
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({})
  const [servicesNotOffered, setServicesNotOffered] = useState('Boarding, Grooming, Mobile Visits')

  const toggleService = (service: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }))
  }

  const toggleCategory = (category: typeof serviceCategories[0]) => {
    const allSelected = category.services.every(s => selectedServices[s])
    category.services.forEach(service => {
      setSelectedServices(prev => ({
        ...prev,
        [service]: !allSelected
      }))
    })
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Select Services Your Clinic Offers
        </h3>
        <p className="text-sm text-gray-400">
          Check the categories and individual services below. This teaches the AI what your clinic does.
        </p>
      </div>

      {/* Service Categories */}
      <div className="space-y-6">
        {serviceCategories.map((category, catIndex) => (
          <div key={catIndex} className="border border-gray-800 rounded-lg p-6 bg-gray-950">
            <label className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                checked={category.services.every(s => selectedServices[s])}
                onChange={() => toggleCategory(category)}
                className="rounded border-gray-600 bg-gray-800 text-blue-400 focus:ring-blue-500 w-5 h-5"
              />
              <span className="text-lg font-medium text-white">{category.name}</span>
            </label>
            
            <div className="ml-8 space-y-2">
              {category.services.map((service, serviceIndex) => (
                <label key={serviceIndex} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedServices[service] || false}
                    onChange={() => toggleService(service)}
                    className="rounded border-gray-600 bg-gray-800 text-blue-400 focus:ring-blue-500"
                  />
                  <span className="text-sm text-white">{service}</span>
                </label>
              ))}
            </div>

            {/* Add Custom Service */}
            <div className="mt-4 ml-8 flex space-x-2">
              <input
                type="text"
                placeholder="Add custom service..."
                className="flex-1 px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Services NOT Offered */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          8. Services NOT Offered
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          Clearly defining what you don&apos;t do is as important as what you do.
        </p>
        <input
          type="text"
          value={servicesNotOffered}
          onChange={(e) => setServicesNotOffered(e.target.value)}
          className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Boarding, Grooming, Mobile Visits, Exotic Pet Care"
        />
      </div>

      {/* Referral Services */}
      <div className="border-t border-gray-800 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          9. Referral Services
        </h3>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Specialty
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Ophthalmology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Referred To
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Veterinary Vision Center"
                />
              </div>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            + Add Another Referral Service
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

