"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { CarCard } from "@/components/features/CarCard"
import { CountdownTimer } from "@/components/features/CountdownTimer"
import { Timer, Gavel, Calendar, ArrowRight, Filter, Search, Flame, User } from "lucide-react"

export default function AuctionsPage() {
    return (
        <div className="bg-slate-950 min-h-screen pb-20">
            {/* Cinematic Hero */}
            <div className="relative min-h-[65vh] overflow-hidden flex items-center pt-20">
                <Image src="/assets/images/hero-bg.png" alt="Auctions Hero" fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest uppercase text-sm animate-in slide-in-from-left duration-700">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live Now
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading text-white leading-tight animate-in slide-in-from-bottom duration-700 delay-100">
                            The Gavel <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Drops Here.</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-lg leading-relaxed animate-in slide-in-from-bottom duration-700 delay-200">
                            Experience the thrill of real-time bidding on the world's most exclusive automotive inventory.
                        </p>
                        <div className="flex gap-4 pt-4 animate-in slide-in-from-bottom duration-700 delay-300">
                            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                                View Live Auctions <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="sticky top-20 z-30 bg-slate-900/80 backdrop-blur-md border-y border-white/5 py-4 mb-12">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        {["All Auctions", "Supercars", "Classics", "Track Cars", "SUVs"].map((filter, i) => (
                            <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${i === 0 ? "bg-white text-slate-950" : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative group w-full md:w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                className="w-full bg-slate-800 border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                            />
                        </div>
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white gap-2">
                            <Filter size={16} /> Filters
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 space-y-20">
                {/* Live Now Grid */}
                <div>
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                                <Flame className="text-red-500 fill-red-500" /> Live Auctions
                            </h2>
                            <p className="text-slate-400">HAPPENING NOW - Bids ending soon</p>
                        </div>
                        <Link href="/auctions/live" className="text-red-500 font-bold hover:text-red-400 flex items-center gap-1 transition-colors">
                            View All Live <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl opacity-20 group-hover:opacity-100 blur transition duration-500"></div>
                                <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-white/10">
                                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                                        <div className="bg-red-600 text-white px-3 py-1 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold animate-pulse">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
                                        </div>
                                        <div className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full border border-white/10 text-xs font-bold">
                                            <User size={12} className="inline mr-1" /> 14{i}
                                        </div>
                                    </div>

                                    <CarCard
                                        title={`Porsche 911 GT${i} RS`}
                                        price={`£${(135000 + i * 5000).toLocaleString()}`}
                                        image={`/assets/images/featured-sports.png`}
                                        href={`/auctions/live/auction-${i}`}
                                    />

                                    <div className="px-4 pb-4 -mt-4 relative z-20">
                                        <div className="bg-slate-800/80 backdrop-blur border border-white/5 rounded-xl p-3 flex justify-between items-center">
                                            <div>
                                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Current Bid</p>
                                                <p className="text-white font-mono font-bold">£{(135000 + i * 5000).toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Ends In</p>
                                                <div className="text-red-500 font-mono font-bold text-sm">
                                                    <CountdownTimer targetDate={new Date(Date.now() + 5000000 + i * 100000)} minimal={true} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Section */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <Calendar className="text-primary" /> Upcoming Calendar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden group hover:border-white/20 transition-all hover:-translate-y-1">
                                <div className="relative h-48 overflow-hidden">
                                    <Image src="/assets/images/featured-suv.png" alt="Car" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">Set Reminder</Button>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                                        STARTS OCT {10 + i}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white text-lg truncate flex-1">Mercedes-Benz G63 AMG</h3>
                                    </div>
                                    <p className="text-slate-500 text-xs mb-4">2023 • 5,000 miles • London</p>
                                    <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                        <span className="text-slate-400 text-xs font-mono">Est. £120k - £140k</span>
                                        <Link href="#" className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                                            Details <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
