"use client"

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export default function WatchlistPage() {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-900">
            <div className="container mx-auto px-5 flex flex-col lg:flex-row gap-8">
                <DashboardSidebar role="buyer" userName="John Doe" />
                <main className="lg:w-3/4 space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold font-heading text-white">Watchlist</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Mock data reusing existing assets */}
                        <div className="glass-card overflow-hidden group">
                            <div className="relative h-48 w-full">
                                <img src="/assets/images/featured-sports.png" alt="Car" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-slate-900/80 p-2 rounded-full text-primary cursor-pointer hover:bg-slate-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white border border-white/10">Ends in 2d 5h</div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mb-1">2024 Porsche 911 GT3 RS</h3>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-400">Current Bid</p>
                                        <p className="text-xl font-bold text-emerald-400">£215,000</p>
                                    </div>
                                    <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded shadow-neon hover:bg-red-600 transition-colors">Bid Now</button>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card overflow-hidden group">
                            <div className="relative h-48 w-full">
                                <img src="/assets/images/featured-suv.png" alt="Car" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-slate-900/80 p-2 rounded-full text-primary cursor-pointer hover:bg-slate-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white border border-white/10">Ends in 5h 20m</div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-white mb-1">2023 BMW X5 M</h3>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-400">Buy It Now</p>
                                        <p className="text-xl font-bold text-white">£89,000</p>
                                    </div>
                                    <button className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-bold rounded">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
