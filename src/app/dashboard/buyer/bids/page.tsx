"use client"

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export default function MyBidsPage() {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-900">
            <div className="container mx-auto px-5 flex flex-col lg:flex-row gap-8">
                <DashboardSidebar role="buyer" userName="John Doe" />
                <main className="lg:w-3/4 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold font-heading text-white">My Bids</h1>
                        <div className="flex gap-2">
                            <select className="bg-slate-800 border border-white/10 text-white rounded px-3 py-2 text-sm outline-none focus:border-primary/50 transition-colors">
                                <option>All Bids</option>
                                <option>Active</option>
                                <option>Won</option>
                                <option>Lost</option>
                            </select>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-800/50 text-gray-400 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Vehicle</th>
                                        <th className="px-6 py-4">Your Max Bid</th>
                                        <th className="px-6 py-4">Highest Bid</th>
                                        <th className="px-6 py-4">End Date</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-white">
                                    {[
                                        { car: "2024 Porsche 911 GT3 RS", myBid: 42500, highest: 42500, end: "2h 15m", status: "Winning", date: "Jan 24, 2026" },
                                        { car: "2023 BMW M4 CSL", myBid: 115000, highest: 118000, end: "4h 30m", status: "Outbid", date: "Jan 24, 2026" },
                                        { car: "2022 Audi RS6 Avant", myBid: 89000, highest: 89000, end: "Ended", status: "Won", date: "Jan 20, 2026" },
                                        { car: "2021 Mercedes-AMG G63", myBid: 145000, highest: 152000, end: "Ended", status: "Lost", date: "Jan 18, 2026" },
                                    ].map((bid, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white">{bid.car}</div>
                                                <div className="text-xs text-gray-400">{bid.date}</div>
                                            </td>
                                            <td className="px-6 py-4 font-mono font-medium">£{bid.myBid.toLocaleString()}</td>
                                            <td className="px-6 py-4 font-mono font-bold">£{bid.highest.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-sm text-gray-300">{bid.end}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bid.status === "Winning" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                        bid.status === "Won" ? "bg-primary/10 text-primary border-primary/20" :
                                                            bid.status === "Outbid" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                                "bg-slate-700 text-gray-400 border-slate-600"
                                                    }`}>
                                                    {bid.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-primary hover:text-white text-sm font-bold transition-colors">View</button>
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
