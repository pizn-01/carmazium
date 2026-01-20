"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { LayoutDashboard, Wrench, Calendar, Settings, LogOut, CheckCircle, XCircle, Clock } from "lucide-react"

export default function ServiceDashboard() {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-900">
            <div className="container mx-auto px-5 flex flex-col lg:flex-row gap-8">

                {/* Sidebar Navigation - Dark Glass */}
                <aside className="lg:w-1/4">
                    <div className="glass-card p-6 sticky top-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl border border-primary/50 shadow-neon">SP</div>
                            <div>
                                <h3 className="font-bold text-lg text-white">Apex Customs</h3>
                                <p className="text-xs text-gray-400">Service Provider</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <Link href="/dashboard/service" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium border border-primary/20">
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg hover:text-white transition-colors">
                                <Wrench size={20} /> Service Requests
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg hover:text-white transition-colors">
                                <Calendar size={20} /> Schedule
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg hover:text-white transition-colors">
                                <Settings size={20} /> Settings
                            </Link>
                            <div className="pt-4 mt-4 border-t border-white/10">
                                <Link href="/auth/login" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <LogOut size={20} /> Sign Out
                                </Link>
                            </div>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:w-3/4 space-y-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-card p-6">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide">Pending Requests</p>
                            <h3 className="text-3xl font-bold font-heading text-white">8</h3>
                        </div>
                        <div className="glass-card p-6">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide">Active Jobs</p>
                            <h3 className="text-3xl font-bold font-heading text-white">3</h3>
                        </div>
                        <div className="glass-card p-6">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide">Monthly Revenue</p>
                            <h3 className="text-3xl font-bold font-heading text-emerald-400">£12,450</h3>
                        </div>
                    </div>

                    {/* Pending Requests Table */}
                    <div className="glass-card overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold font-heading text-white">New Service Requests</h2>
                            <Link href="#" className="text-primary hover:text-white text-sm font-bold transition-colors">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800/50 text-gray-400 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Client / Vehicle</th>
                                        <th className="px-6 py-4">Service Type</th>
                                        <th className="px-6 py-4">Requested Date</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-white">
                                    <tr>
                                        <td className="px-6 py-4">
                                            <div className="font-bold">Michael Knight</div>
                                            <div className="text-xs text-gray-400">Pontiac Firebird Trans Am</div>
                                        </td>
                                        <td className="px-6 py-4">Full Restoration</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">Jan 24, 2026</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"><Clock size={10} /> Pending</span></td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <Button size="icon" className="h-8 w-8 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/20"><CheckCircle size={16} /></Button>
                                            <Button size="icon" variant="outline" className="h-8 w-8 border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400"><XCircle size={16} /></Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4">
                                            <div className="font-bold">Bruce Wayne</div>
                                            <div className="text-xs text-gray-400">Lamborghini Murciélago</div>
                                        </td>
                                        <td className="px-6 py-4">Performance Tuning</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">Jan 25, 2026</td>
                                        <td className="px-6 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20"><CheckCircle size={10} /> Contacted</span></td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <Button size="icon" className="h-8 w-8 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white border border-emerald-500/20"><CheckCircle size={16} /></Button>
                                            <Button size="icon" variant="outline" className="h-8 w-8 border-red-500/20 text-red-500 hover:bg-red-500/10 hover:text-red-400"><XCircle size={16} /></Button>
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
