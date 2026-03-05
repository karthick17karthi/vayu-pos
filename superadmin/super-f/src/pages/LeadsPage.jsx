import React, { useEffect, useState } from 'react'
import Card from '../components/ui/Card'
import { useTheme } from '../context/ThemeContext.jsx'
import { getThemeConfig } from '../theme/designSystem.js'

const LeadsPage = () => {
	const [leads, setLeads] = useState([])
	const [selectedLead, setSelectedLead] = useState(null)
	const { theme } = useTheme()
	const themeConfig = getThemeConfig(theme)

	useEffect(() => {
		const fetchLeads = async () => {
			try {
				const response = await fetch('http://localhost:8000/api/demo-request')
				if (!response.ok) {
					throw new Error(`Failed to fetch leads: ${response.status}`)
				}
				const data = await response.json()
				setLeads(Array.isArray(data) ? data : [])
			} catch (error) {
				console.error('Failed to fetch leads:', error)
				setLeads([])
			}
		}

		fetchLeads()
	}, [])

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Leads</h1>
			</div>

			{leads.length === 0 ? (
				<Card>
					<p className="text-center text-slate-600 dark:text-slate-200">No Leads Available</p>
				</Card>
			) : (
				<Card title="All Leads">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="border-b border-slate-200 text-left text-xs font-semibold uppercase text-slate-600 dark:border-white/10 dark:text-slate-200">
								<tr>
									<th className="px-4 py-3">Owner Name</th>
									<th className="px-4 py-3">Hotel Name</th>
									<th className="px-4 py-3">Phone</th>
									<th className="px-4 py-3">Email</th>
									<th className="px-4 py-3">City</th>
									<th className="px-4 py-3">Branches</th>
									<th className="px-4 py-3">Action</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-200 dark:divide-white/10">
								{leads.map((lead, index) => (
									<tr key={`${lead.email || 'lead'}-${index}`} className="hover:bg-slate-100 dark:hover:bg-white/5">
										<td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{lead.ownerName || '-'}</td>
										<td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{lead.hotelName || '-'}</td>
										<td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{lead.phone || '-'}</td>
										<td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{lead.email || '-'}</td>
										<td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{lead.city || '-'}</td>
										<td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">{lead.branches ?? '-'}</td>
										<td className="px-4 py-3 text-sm">
											<button
												onClick={() => setSelectedLead(lead)}
												className={themeConfig.classes['primary-button']}
											>
												View
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Card>
			)}

			{selectedLead && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="max-w-lg w-full rounded-lg border border-slate-200 bg-white p-6 text-slate-800 shadow-xl dark:border-white/10 dark:bg-[#0e2a33] dark:text-white">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-slate-900 dark:text-white">Lead Details</h2>
							<button
								onClick={() => setSelectedLead(null)}
								className="text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white"
							>
								✕
							</button>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-slate-500 dark:text-slate-300">Owner Name</p>
								<p className="font-medium text-slate-800 dark:text-white">{selectedLead.ownerName || '-'}</p>
							</div>
							<div>
								<p className="text-slate-500 dark:text-slate-300">Hotel Name</p>
								<p className="font-medium text-slate-800 dark:text-white">{selectedLead.hotelName || '-'}</p>
							</div>
							<div>
								<p className="text-slate-500 dark:text-slate-300">License Number</p>
								<p className="font-medium text-slate-800 dark:text-white">{selectedLead.licenseNumber || '-'}</p>
							</div>
							<div>
								<p className="text-slate-500 dark:text-slate-300">Phone</p>
								<p className="font-medium text-slate-800 dark:text-white">{selectedLead.phone || '-'}</p>
							</div>
							<div>
								<p className="text-slate-500 dark:text-slate-300">Email</p>
								<p className="font-medium text-slate-800 dark:text-white">{selectedLead.email || '-'}</p>
							</div>
							<div>
								<p className="text-slate-500 dark:text-slate-300">City</p>
								<p className="font-medium text-slate-800 dark:text-white">{selectedLead.city || '-'}</p>
							</div>
							<div>
								<p className="text-slate-500 dark:text-slate-300">Branches</p>
								<p className="font-medium text-slate-800 dark:text-white">{selectedLead.branches ?? '-'}</p>
							</div>
							<div>
								<p className="text-slate-500 dark:text-slate-300">Created At</p>
								<p className="font-medium text-slate-800 dark:text-white">
									{selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleString() : '-'}
								</p>
							</div>
							<div className="sm:col-span-2">
								<p className="text-slate-500 dark:text-slate-300">Message</p>
								<p className="font-medium whitespace-pre-wrap text-slate-800 dark:text-white">
									{selectedLead.message || '-'}
								</p>
							</div>
							{selectedLead.extraFields && Object.keys(selectedLead.extraFields).length > 0 && (
								<div className="sm:col-span-2">
									<p className="text-slate-500 dark:text-slate-300">Extra Fields</p>
									<div className="mt-2 space-y-1">
										{Object.entries(selectedLead.extraFields).map(([key, value]) => (
											<div key={key} className="text-slate-800 dark:text-white">
												<span className="font-medium">{key}:</span> {value || '-'}
											</div>
										))}
									</div>
								</div>
							)}
						</div>
						<div className="mt-6 flex justify-end">
							<button
								onClick={() => setSelectedLead(null)}
								className={themeConfig.classes['primary-button']}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default LeadsPage
