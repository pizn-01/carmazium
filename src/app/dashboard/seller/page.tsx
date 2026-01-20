"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { LayoutDashboard, Car, DollarSign, Settings, LogOut, PlusCircle } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export default function SellerDashboard() {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-900">
            <div className="container mx-auto px-5 flex flex-col lg:flex-row gap-8">

                {/* Sidebar Navigation */}
                <DashboardSidebar role="seller" userName="John Doe">
                    <Link href="/sell">
                        <Button className="w-full flex items-center gap-2 shadow-neon h-12" shape="default"><PlusCircle size={18} /> Create New Listing</Button>
                    </Link>
                </DashboardSidebar>

                {/* Main Content */}
                <main className="lg:w-3/4 space-y-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-card p-6">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide">Active Listings</p>
                            <h3 className="text-3xl font-bold font-heading text-white">2</h3>
                        </div>
                        <div className="glass-card p-6">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide">Total Views</p>
                            <h3 className="text-3xl font-bold font-heading text-white">1,240</h3>
                        </div>
                        <div className="glass-card p-6">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide">Pending Enquiries</p>
                            <h3 className="text-3xl font-bold font-heading text-emerald-400">5</h3>
                        </div>
                    </div>

                    {/* Active Listings Table */}
                    <div className="glass-card overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold font-heading text-white">Your Inventory</h2>
                            <Link href="#" className="text-primary hover:text-white text-sm font-bold transition-colors">Manage All</Link>
                        </div>
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
                                <tbody className="divide-y divide-white/10 text-white">
                                    <tr>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">2023 Mercedes-Benz G63</div>
                                            <div className="text-xs text-gray-400">Listed on Jan 12, 2026</div>
                                        </td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Active</span></td>
                                        <td className="px-6 py-4 font-mono font-bold">£135,000</td>
                                        <td className="px-6 py-4">842</td>
                                        <td className="px-6 py-4">
                                            <Button size="sm" variant="ghost" className="text-primary hover:text-white hover:bg-primary/20">Edit</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white">2020 BMW M2 Competition</div>
                                            <div className="text-xs text-gray-400">Listed on Jan 05, 2026</div>
                                        </td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Draft</span></td>
                                        <td className="px-6 py-4 font-mono font-bold">-</td>
                                        <td className="px-6 py-4">0</td>
                                        <td className="px-6 py-4">
                                            <Button size="sm" variant="ghost" className="text-primary hover:text-white hover:bg-primary/20">Resume</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
