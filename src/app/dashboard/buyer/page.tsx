"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { CarCard } from "@/components/features/CarCard"
import { Gavel, Heart, Clock, Settings, LogOut, LayoutDashboard, TrendingUp } from "lucide-react"

export default function BuyerDashboard() {
    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-900">
            <div className="container mx-auto px-5 flex flex-col lg:flex-row gap-8">

                {/* Sidebar Navigation */}
                <aside className="lg:w-1/4">
                    <div className="glass-card p-6 sticky top-24 shadow-lg border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-900/40">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl border border-primary/50 shadow-neon">JD</div>
                            <div>
                                <h3 className="font-bold text-lg text-white">John Doe</h3>
                                <p className="text-xs text-gray-400">Buyer Account</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <Link href="/dashboard/buyer" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium border border-primary/20">
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg hover:text-white transition-colors">
                                <Gavel size={20} /> My Bids
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg hover:text-white transition-colors">
                                <Heart size={20} /> Watchlist
                            </Link>
                            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 rounded-lg hover:text-white transition-colors">
                                <Clock size={20} /> Order History
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
                        <div className="glass-card p-6 group hover:translate-y-[-2px] transition-transform">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide group-hover:text-primary transition-colors">Active Bids</p>
                            <h3 className="text-3xl font-bold font-heading text-white">4</h3>
                        </div>
                        <div className="glass-card p-6 group hover:translate-y-[-2px] transition-transform">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide group-hover:text-primary transition-colors">Watchlist Items</p>
                            <h3 className="text-3xl font-bold font-heading text-white">12</h3>
                        </div>
                        <div className="glass-card p-6 group hover:translate-y-[-2px] transition-transform">
                            <p className="text-gray-400 text-sm mb-1 uppercase tracking-wide group-hover:text-primary transition-colors">Total Spent</p>
                            <h3 className="text-3xl font-bold font-heading text-emerald-400">£0.00</h3>
                        </div>
                    </div>

                    {/* Recent Activity / Active Bids */}
                    <div>
                        <h2 className="text-2xl font-bold font-heading mb-6 text-white flex items-center gap-2"><TrendingUp size={24} className="text-primary" /> Active Bids</h2>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="glass-card p-4 flex flex-col md:flex-row gap-6 items-center group hover:bg-white/5 transition-colors">
                                    <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                                        <Image src="/assets/images/featured-sports.png" alt="Car" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 w-full text-center md:text-left">
                                        <h3 className="font-bold text-lg mb-1 text-white">2024 Porsche 911 GT3 RS</h3>
                                        <p className="text-gray-400 text-sm mb-3">Ends in: <span className="text-primary font-bold">01:45:20</span></p>
                                        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded text-sm font-medium border border-emerald-500/20">
                                            Highest Bidder
                                        </div>
                                    </div>
                                    <div className="text-right w-full md:w-auto flex flex-col items-center md:items-end gap-2">
                                        <p className="text-sm text-gray-400">Your Bid</p>
                                        <p className="text-2xl font-bold text-white">£42,500</p>
                                        <Button size="sm" className="shadow-neon">Increase Bid</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Watchlist Preview */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold font-heading text-white">Watchlist</h2>
                            <Link href="#" className="text-primary hover:text-white text-sm font-bold transition-colors">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <CarCard
                                title="BMW M4 Competition"
                                price="£55,000"
                                image="/assets/images/featured-suv.png"
                                href="#"
                            />
                            <CarCard
                                title="Audi RS E-Tron GT"
                                price="£85,000"
                                image="/assets/images/featured-sedan.png"
                                href="#"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
