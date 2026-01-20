"use client"

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export default function MyListingsPage() {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-900">
            <div className="container mx-auto px-5 flex flex-col lg:flex-row gap-8">
                <DashboardSidebar role="seller" userName="John Doe" />
                <main className="lg:w-3/4 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold font-heading text-white">My Listings</h1>
                        <button className="bg-primary text-white font-bold py-2 px-6 rounded shadow-neon hover:bg-red-600 transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                            Create New Listing
                        </button>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800/50 text-gray-400 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Vehicle</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Price / Bid</th>
                                        <th className="px-6 py-4">Views</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-white">
                                    {[
                                        { car: "2023 Mercedes-Benz G63", status: "Active", price: "£135,000", views: 842, date: "Jan 12, 2026" },
                                        { car: "2020 BMW M2 Competition", status: "Draft", price: "-", views: 0, date: "Jan 05, 2026" },
                                        { car: "2019 Porsche 911 Carrera 4S", status: "Sold", price: "£98,500", views: 2450, date: "Dec 15, 2025" },
                                    ].map((item, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white">{item.car}</div>
                                                <div className="text-xs text-gray-400">Listed on {item.date}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                        item.status === "Sold" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                            "bg-slate-700/50 text-gray-400 border-slate-600"
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono font-bold line-through- decoration-red-500">{item.price}</td>
                                            <td className="px-6 py-4">{item.views}</td>
                                            <td className="px-6 py-4 flex gap-3">
                                                <button className="text-gray-400 hover:text-white transition-colors text-xs uppercase font-bold tracking-wider">Edit</button>
                                                {item.status === "Draft" ? (
                                                    <button className="text-primary hover:text-red-400 transition-colors text-xs uppercase font-bold tracking-wider">Resume</button>
                                                ) : <button className="text-gray-400 hover:text-white transition-colors text-xs uppercase font-bold tracking-wider">View</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
