import { useEffect, useMemo, useState } from 'react'
import { Plus, Eye, CheckCircle2, XCircle, Trash2, X, Pencil } from 'lucide-react'
import Card from '../components/ui/Card'
import { API_BASE_URL as BASE_URL } from '../config/api.js'

const initialFormState = {
  hotelName: '',
  ownerName: '',
  mobile: '',
  email: '',
  hotelAddress: {
    doorNumber: '',
    street: '',
    area: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  },
  ownerAddress: {
    doorNumber: '',
    street: '',
    area: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
  },
  businessDetails: {
    gstNumber: '',
    panNumber: '',
    hotelLicenseNumber: '',
    extraLicense: '',
    aadharNumber: '',
  },
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobileRegex = /^[6-9]\d{9}$/
const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
const pincodeRegex = /^\d{6}$/
const aadharRegex = /^\d{12}$/

const addressFields = [
  { key: 'doorNumber', label: 'Door Number' },
  { key: 'street', label: 'Street' },
  { key: 'area', label: 'Area' },
  { key: 'city', label: 'City' },
  { key: 'district', label: 'District' },
  { key: 'state', label: 'State' },
  { key: 'pincode', label: 'Pincode' },
]

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:border-white/10 dark:bg-[#0b1f2a] dark:text-white'

const API_BASE_URL = `${BASE_URL}/api/customers`

const statusStyles = {
  'Pending Verification': 'border border-yellow-400/40 bg-yellow-100 text-yellow-700 dark:border-yellow-400/30 dark:bg-yellow-500/20 dark:text-yellow-200',
  Verified: 'border border-emerald-400/40 bg-emerald-100 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/20 dark:text-emerald-200',
  Rejected: 'border border-red-400/40 bg-red-100 text-red-700 dark:border-red-400/30 dark:bg-red-500/20 dark:text-red-200',
}

const emptyAddressErrors = (prefix) =>
  addressFields.reduce((acc, field) => {
    acc[`${prefix}.${field.key}`] = ''
    return acc
  }, {})

const createInitialErrors = () => ({
  hotelName: '',
  ownerName: '',
  mobile: '',
  email: '',
  ...emptyAddressErrors('hotelAddress'),
  ...emptyAddressErrors('ownerAddress'),
  'businessDetails.gstNumber': '',
  'businessDetails.panNumber': '',
  'businessDetails.hotelLicenseNumber': '',
  'businessDetails.extraLicense': '',
})

const validateCustomerForm = (formData) => {
  const nextErrors = createInitialErrors()

  if (!formData.hotelName.trim()) nextErrors.hotelName = 'Hotel Name is required'
  if (!formData.ownerName.trim()) nextErrors.ownerName = 'Owner Name is required'

  if (!formData.mobile.trim()) {
    nextErrors.mobile = 'Mobile Number is required'
  } else if (!mobileRegex.test(formData.mobile.trim())) {
    nextErrors.mobile = 'Enter valid 10-digit mobile number'
  }

  if (!formData.email.trim()) {
    nextErrors.email = 'Email is required'
  } else if (!emailRegex.test(formData.email.trim())) {
    nextErrors.email = 'Enter a valid email address'
  }

  addressFields.forEach((field) => {
    if (!formData.hotelAddress[field.key].trim()) {
      nextErrors[`hotelAddress.${field.key}`] = `${field.label} is required`
    } else if (field.key === 'pincode' && !pincodeRegex.test(formData.hotelAddress[field.key].trim())) {
      nextErrors[`hotelAddress.${field.key}`] = 'Pincode must be exactly 6 digits'
    }
    if (!formData.ownerAddress[field.key].trim()) {
      nextErrors[`ownerAddress.${field.key}`] = `${field.label} is required`
    } else if (field.key === 'pincode' && !pincodeRegex.test(formData.ownerAddress[field.key].trim())) {
      nextErrors[`ownerAddress.${field.key}`] = 'Pincode must be exactly 6 digits'
    }
  })

  if (!formData.businessDetails.gstNumber.trim()) {
    nextErrors['businessDetails.gstNumber'] = 'GST Number is required'
  } else if (!gstRegex.test(formData.businessDetails.gstNumber.trim().toUpperCase())) {
    nextErrors['businessDetails.gstNumber'] = 'Enter valid GST format (e.g. 22AAAAA0000A1Z5)'
  }

  if (!formData.businessDetails.panNumber.trim()) {
    nextErrors['businessDetails.panNumber'] = 'PAN Number is required'
  } else if (!panRegex.test(formData.businessDetails.panNumber.trim().toUpperCase())) {
    nextErrors['businessDetails.panNumber'] = 'Enter valid PAN format (e.g. ABCDE1234F)'
  }

  if (!formData.businessDetails.hotelLicenseNumber.trim()) {
    nextErrors['businessDetails.hotelLicenseNumber'] = 'Hotel License Number is required'
  }

  if (!formData.businessDetails.extraLicense.trim()) {
    nextErrors['businessDetails.extraLicense'] = 'Extra License is required'
  }

  return nextErrors
}

const hasValidationErrors = (errors) => Object.values(errors).some(Boolean)

const getAddressSummary = (address) =>
  `${address.doorNumber}, ${address.street}, ${address.area}, ${address.city}, ${address.district}, ${address.state} - ${address.pincode}`

const toUiStatus = (status) => (status === 'Pending' ? 'Pending Verification' : status)

const mapApiToUiCustomer = (customer) => ({
  id: customer.id,
  hotelName: customer.hotel_name,
  ownerName: customer.owner_name,
  mobile: customer.mobile,
  email: customer.email,
  hotelAddress: {
    doorNumber: customer.hotel_door_no,
    street: customer.hotel_street,
    area: customer.hotel_area,
    city: customer.hotel_city,
    district: customer.hotel_district,
    state: customer.hotel_state,
    pincode: customer.hotel_pincode,
  },
  ownerAddress: {
    doorNumber: customer.owner_door_no,
    street: customer.owner_street,
    area: customer.owner_area,
    city: customer.owner_city,
    district: customer.owner_district,
    state: customer.owner_state,
    pincode: customer.owner_pincode,
  },
  businessDetails: {
    gstNumber: customer.gst_number,
    panNumber: customer.pan_number,
    hotelLicenseNumber: customer.hotel_license_number,
    extraLicense: customer.extra_license,
    aadharNumber: customer.aadhar_number ?? '',
  },
  status: toUiStatus(customer.status),
  createdAt: customer.created_at,
})

const mapFormToApiPayload = (formData) => ({
  hotel_name: formData.hotelName.trim(),
  owner_name: formData.ownerName.trim(),
  mobile: formData.mobile.trim(),
  email: formData.email.trim().toLowerCase(),
  hotel_door_no: formData.hotelAddress.doorNumber.trim(),
  hotel_street: formData.hotelAddress.street.trim(),
  hotel_area: formData.hotelAddress.area.trim(),
  hotel_city: formData.hotelAddress.city.trim(),
  hotel_district: formData.hotelAddress.district.trim(),
  hotel_state: formData.hotelAddress.state.trim(),
  hotel_pincode: formData.hotelAddress.pincode.trim(),
  owner_door_no: formData.ownerAddress.doorNumber.trim(),
  owner_street: formData.ownerAddress.street.trim(),
  owner_area: formData.ownerAddress.area.trim(),
  owner_city: formData.ownerAddress.city.trim(),
  owner_district: formData.ownerAddress.district.trim(),
  owner_state: formData.ownerAddress.state.trim(),
  owner_pincode: formData.ownerAddress.pincode.trim(),
  gst_number: formData.businessDetails.gstNumber.trim().toUpperCase(),
  pan_number: formData.businessDetails.panNumber.trim().toUpperCase(),
  hotel_license_number: formData.businessDetails.hotelLicenseNumber.trim(),
  extra_license: formData.businessDetails.extraLicense.trim(),
  aadhar_number: formData.businessDetails.aadharNumber.trim() || null,
})

const ClientOnboarding = () => {
  const [customers, setCustomers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [editingCustomerId, setEditingCustomerId] = useState(null)
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState(createInitialErrors())
  
  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState(null) // { type: 'verify' | 'reject' | 'delete', customer: {...} }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const totalCustomers = customers.length
  const pendingCustomers = useMemo(
    () => customers.filter((customer) => customer.status === 'Pending Verification').length,
    [customers],
  )

  const fetchCustomers = async () => {
    try {
      const response = await fetch(API_BASE_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch customers')
      }
      const data = await response.json()
      setCustomers(Array.isArray(data) ? data.map(mapApiToUiCustomer) : [])
    } catch (error) {
      console.error(error)
      setCustomers([])
    }
  }

  const resetForm = () => {
    setFormData(initialFormState)
    setErrors(createInitialErrors())
  }

  const openModal = () => {
    resetForm()
    setEditingCustomerId(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingCustomerId(null)
    resetForm()
  }

  const handleEditCustomer = (customer) => {
    setEditingCustomerId(customer.id)
    setErrors(createInitialErrors())
    setFormData({
      hotelName: customer.hotelName,
      ownerName: customer.ownerName,
      mobile: customer.mobile,
      email: customer.email,
      hotelAddress: { ...customer.hotelAddress },
      ownerAddress: { ...customer.ownerAddress },
      businessDetails: { ...customer.businessDetails },
    })
    setIsModalOpen(true)
  }

  const updateRootField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const updateNestedField = (group, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: value,
      },
    }))
    setErrors((prev) => ({ ...prev, [`${group}.${key}`]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validateCustomerForm(formData)
    setErrors(validationErrors)

    if (hasValidationErrors(validationErrors)) return

    const payload = mapFormToApiPayload(formData)

    try {
      if (editingCustomerId) {
        const response = await fetch(`${API_BASE_URL}/${editingCustomerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          throw new Error('Failed to update customer')
        }
        const updated = mapApiToUiCustomer(await response.json())
        setCustomers((prev) => prev.map((customer) => (customer.id === updated.id ? updated : customer)))
        if (selectedCustomer?.id === updated.id) {
          setSelectedCustomer(updated)
        }
      } else {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) {
          throw new Error('Failed to create customer')
        }
        const created = mapApiToUiCustomer(await response.json())
        setCustomers((prev) => [created, ...prev])
      }
      closeModal()
    } catch (error) {
      console.error(error)
      alert('Unable to save customer. Please try again.')
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      const endpoint = status === 'Verified' ? 'verify' : 'reject'
      const response = await fetch(`${API_BASE_URL}/${id}/${endpoint}`, {
        method: 'PATCH',
      })
      if (!response.ok) {
        throw new Error(`Failed to mark customer as ${status}`)
      }
      const updated = mapApiToUiCustomer(await response.json())
      setCustomers((prev) => prev.map((customer) => (customer.id === id ? updated : customer)))
      if (selectedCustomer?.id === id) {
        setSelectedCustomer(updated)
      }
    } catch (error) {
      console.error(error)
      alert('Unable to update customer status. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete customer')
      }
      setCustomers((prev) => prev.filter((customer) => customer.id !== id))
      if (selectedCustomer?.id === id) {
        setSelectedCustomer(null)
      }
    } catch (error) {
      console.error(error)
      alert('Unable to delete customer. Please try again.')
    }
  }

  // Confirmation modal handlers
  const openConfirmation = (type, customer) => {
    setConfirmAction({ type, customer })
  }

  const closeConfirmation = () => {
    setConfirmAction(null)
  }

  const handleConfirmAction = async () => {
    if (!confirmAction) return
    
    const { type, customer } = confirmAction
    closeConfirmation()
    
    if (type === 'verify') {
      await handleStatusUpdate(customer.id, 'Verified')
    } else if (type === 'reject') {
      await handleStatusUpdate(customer.id, 'Rejected')
    } else if (type === 'delete') {
      await handleDelete(customer.id)
    }
  }

  const getConfirmationMessage = () => {
    if (!confirmAction) return {}
    const { type, customer } = confirmAction
    switch (type) {
      case 'verify':
        return {
          title: 'Confirm Verification',
          message: `Are you sure you want to verify "${customer.hotelName}"?`,
          confirmText: 'Verify',
          confirmStyle: 'bg-emerald-500 hover:bg-emerald-600 text-white',
        }
      case 'reject':
        return {
          title: 'Confirm Rejection',
          message: `Are you sure you want to reject "${customer.hotelName}"?`,
          confirmText: 'Reject',
          confirmStyle: 'bg-red-500 hover:bg-red-600 text-white',
        }
      case 'delete':
        return {
          title: 'Confirm Delete',
          message: `Are you sure you want to delete "${customer.hotelName}"? This action cannot be undone.`,
          confirmText: 'Delete',
          confirmStyle: 'bg-red-500 hover:bg-red-600 text-white',
        }
      default:
        return {}
    }
  }

  return (
    <div className="space-y-6">
        <Card
          title="POS Customer Management"
          actions={
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-110"
            >
              <Plus size={16} />
              Add Customer
            </button>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0b1f2a]">
              <p className="text-sm text-slate-600 dark:text-slate-300">Total Customers</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{totalCustomers}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0b1f2a]">
              <p className="text-sm text-slate-600 dark:text-slate-300">Pending Verification</p>
              <p className="mt-1 text-2xl font-bold text-yellow-300">{pendingCustomers}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#0b1f2a]">
              <p className="text-sm text-slate-600 dark:text-slate-300">Verified Customers</p>
              <p className="mt-1 text-2xl font-bold text-emerald-300">
                {customers.filter((customer) => customer.status === 'Verified').length}
              </p>
            </div>
          </div>
        </Card>

        <Card title="Customer List">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
            <table className="min-w-full text-left">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600 dark:bg-white/5 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-3">Hotel Name</th>
                  <th className="px-4 py-3">Owner Name</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">GST</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:divide-white/10 dark:bg-[#0b1f2a]/70">
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-600 dark:text-slate-300">
                      No customers added yet. Click "+ Add Customer" to start onboarding.
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-100 dark:hover:bg-white/5">
                      <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">{customer.hotelName}</td>
                      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{customer.ownerName}</td>
                      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{customer.mobile}</td>
                      <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{customer.businessDetails.gstNumber}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[customer.status]}`}
                        >
                          {customer.status === 'Pending Verification' ? 'Pending' : customer.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedCustomer(customer)}
                            className="inline-flex items-center gap-1 rounded-lg border border-cyan-400/40 bg-cyan-100 px-2.5 py-1.5 text-xs font-medium text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-200 dark:hover:bg-cyan-500/20"
                          >
                            <Eye size={14} />
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEditCustomer(customer)}
                            className="inline-flex items-center gap-1 rounded-lg border border-blue-400/40 bg-blue-100 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:hover:bg-blue-500/20"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => openConfirmation('verify', customer)}
                            disabled={customer.status !== 'Pending Verification'}
                            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                              customer.status === 'Pending Verification'
                                ? 'border border-emerald-400/40 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:bg-emerald-500/20'
                                : 'cursor-not-allowed border border-slate-300 bg-slate-100 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400'
                            }`}
                          >
                            <CheckCircle2 size={14} />
                            Verify
                          </button>

                          <button
                            type="button"
                            onClick={() => openConfirmation('reject', customer)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-400/40 bg-red-100 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-500/10 dark:text-red-200 dark:hover:bg-red-500/20"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>

                          <button
                            type="button"
                            onClick={() => openConfirmation('delete', customer)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0e2a33]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {editingCustomerId ? 'Edit Customer' : 'Add Customer'}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">Capture customer and business details for POS onboarding.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-200 bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <section className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Basic Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Hotel Name *</label>
                    <input
                      type="text"
                      value={formData.hotelName}
                      onChange={(e) => updateRootField('hotelName', e.target.value)}
                      className={inputClass}
                    />
                    {errors.hotelName && <p className="mt-1 text-xs text-red-300">{errors.hotelName}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Owner Name *</label>
                    <input
                      type="text"
                      value={formData.ownerName}
                      onChange={(e) => updateRootField('ownerName', e.target.value)}
                      className={inputClass}
                    />
                    {errors.ownerName && <p className="mt-1 text-xs text-red-300">{errors.ownerName}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Mobile Number *</label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                        updateRootField('mobile', value)
                      }}
                      maxLength={10}
                      placeholder="Enter 10-digit mobile number"
                      className={inputClass}
                    />
                    {errors.mobile && <p className="mt-1 text-xs text-red-300">{errors.mobile}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateRootField('email', e.target.value.toLowerCase())}
                      placeholder="example@email.com"
                      className={inputClass}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Hotel Address</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {addressFields.map((field) => (
                    <div key={`hotel-${field.key}`}>
                      <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">{field.label} *</label>
                      <input
                        type="text"
                        value={formData.hotelAddress[field.key]}
                        onChange={(e) => {
                          let value = e.target.value
                          if (field.key === 'pincode') {
                            value = value.replace(/\D/g, '').slice(0, 6)
                          }
                          updateNestedField('hotelAddress', field.key, value)
                        }}
                        maxLength={field.key === 'pincode' ? 6 : undefined}
                        placeholder={field.key === 'pincode' ? 'Enter 6-digit pincode' : ''}
                        className={inputClass}
                      />
                      {errors[`hotelAddress.${field.key}`] && (
                        <p className="mt-1 text-xs text-red-300">{errors[`hotelAddress.${field.key}`]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Owner Address</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {addressFields.map((field) => (
                    <div key={`owner-${field.key}`}>
                      <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">{field.label} *</label>
                      <input
                        type="text"
                        value={formData.ownerAddress[field.key]}
                        onChange={(e) => {
                          let value = e.target.value
                          if (field.key === 'pincode') {
                            value = value.replace(/\D/g, '').slice(0, 6)
                          }
                          updateNestedField('ownerAddress', field.key, value)
                        }}
                        maxLength={field.key === 'pincode' ? 6 : undefined}
                        placeholder={field.key === 'pincode' ? 'Enter 6-digit pincode' : ''}
                        className={inputClass}
                      />
                      {errors[`ownerAddress.${field.key}`] && (
                        <p className="mt-1 text-xs text-red-300">{errors[`ownerAddress.${field.key}`]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Business Details</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">GST Number *</label>
                    <input
                      type="text"
                      value={formData.businessDetails.gstNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 15)
                        updateNestedField('businessDetails', 'gstNumber', value)
                      }}
                      maxLength={15}
                      placeholder="e.g. 22AAAAA0000A1Z5"
                      className={inputClass}
                    />
                    {errors['businessDetails.gstNumber'] && (
                      <p className="mt-1 text-xs text-red-300">{errors['businessDetails.gstNumber']}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">PAN Number *</label>
                    <input
                      type="text"
                      value={formData.businessDetails.panNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10)
                        updateNestedField('businessDetails', 'panNumber', value)
                      }}
                      maxLength={10}
                      placeholder="e.g. ABCDE1234F"
                      className={inputClass}
                    />
                    {errors['businessDetails.panNumber'] && (
                      <p className="mt-1 text-xs text-red-300">{errors['businessDetails.panNumber']}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Hotel License Number *</label>
                    <input
                      type="text"
                      value={formData.businessDetails.hotelLicenseNumber}
                      onChange={(e) => updateNestedField('businessDetails', 'hotelLicenseNumber', e.target.value)}
                      className={inputClass}
                    />
                    {errors['businessDetails.hotelLicenseNumber'] && (
                      <p className="mt-1 text-xs text-red-300">{errors['businessDetails.hotelLicenseNumber']}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Extra License *</label>
                    <input
                      type="text"
                      value={formData.businessDetails.extraLicense}
                      onChange={(e) => updateNestedField('businessDetails', 'extraLicense', e.target.value)}
                      className={inputClass}
                    />
                    {errors['businessDetails.extraLicense'] && (
                      <p className="mt-1 text-xs text-red-300">{errors['businessDetails.extraLicense']}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Aadhar Number (Optional)</label>
                    <input
                      type="text"
                      value={formData.businessDetails.aadharNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 12)
                        updateNestedField('businessDetails', 'aadharNumber', value)
                      }}
                      maxLength={12}
                      placeholder="Enter 12-digit Aadhar number"
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 dark:border-white/10 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-300 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:brightness-110"
                >
                  {editingCustomerId ? 'Update Customer' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedCustomer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0e2a33]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Customer Details</h3>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg border border-slate-200 bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm text-slate-700 dark:text-slate-200 md:grid-cols-2">
              <div>
                <p className="text-slate-500 dark:text-slate-400">Hotel Name</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.hotelName}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Owner Name</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.ownerName}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Mobile</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.mobile}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Email</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.email}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-slate-500 dark:text-slate-400">Hotel Address</p>
                <p className="font-medium text-slate-900 dark:text-white">{getAddressSummary(selectedCustomer.hotelAddress)}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-slate-500 dark:text-slate-400">Owner Address</p>
                <p className="font-medium text-slate-900 dark:text-white">{getAddressSummary(selectedCustomer.ownerAddress)}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">GST Number</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.businessDetails.gstNumber}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">PAN Number</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.businessDetails.panNumber}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Hotel License Number</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.businessDetails.hotelLicenseNumber}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Extra License</p>
                <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.businessDetails.extraLicense}</p>
              </div>
              {selectedCustomer.businessDetails.aadharNumber && (
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Aadhar Number</p>
                  <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.businessDetails.aadharNumber}</p>
                </div>
              )}
              <div>
                <p className="text-slate-400">Status</p>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedCustomer.status]}`}>
                  {selectedCustomer.status === 'Pending Verification' ? 'Pending' : selectedCustomer.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0e2a33]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {getConfirmationMessage().title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {getConfirmationMessage().message}
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeConfirmation}
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`rounded-xl px-4 py-2 text-sm font-medium ${getConfirmationMessage().confirmStyle}`}
              >
                {getConfirmationMessage().confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientOnboarding
