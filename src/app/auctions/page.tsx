"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { CarCard } from "@/components/features/CarCard"
import { CountdownTimer } from "@/components/features/CountdownTimer"
import { Timer, Gavel, Calendar } from "lucide-react"

export default function AuctionsPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero for Auctions */}
            <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/images/hero-bg.png')] bg-cover opacity-20" />
                <div className="container mx-auto px-5 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Live Car Auctions</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">Bid on exclusive luxury and performance vehicles in real-time. Secure, transparent, and exciting.</p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="px-8 shadow-[0_4px_15px_rgba(237,28,36,0.4)]">View Live Now</Button>
                        <Button variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white/10">How It Works</Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-5 py-12">
                {/* Live Now Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold font-heading flex items-center gap-3">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            Live Auctions
                        </h2>
                        <Link href="#" className="text-primary font-bold hover:underline">View All Live ({3})</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative group">
                                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded shadow-lg flex items-center gap-2 text-sm font-bold animate-pulse">
                                    <Gavel size={16} /> Live: £{(35000 + i * 5000).toLocaleString()}
                                </div>
                                <CarCard
                                    title={`Porsche 911 GT${i} RS`}
                                    price={`Current Bid: £${35000 + i * 5000}`}
                                    image={`/assets/images/featured-sports.png`}
                                    href={`/auctions/live/auction-${i}`}
                                />
                                <div className="mt-2 bg-slate-900 text-white p-3 rounded-b-lg flexjustify-between items-center text-sm font-mono mx-1 -mt-2 relative z-0">
                                    <div className="flex items-center gap-2 mx-auto justify-center">
                                        <Timer size={14} className="text-primary" /> Ends in: <CountdownTimer targetDate={new Date(Date.now() + 5000000 + i * 100000)} minimal={true} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Section */}
                <div>
                    <h2 className="text-3xl font-bold font-heading mb-8 flex items-center gap-3">
                        <Calendar className="text-primary" /> Upcoming Auctions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                <div className="relative h-48">
                                    <Image src="/assets/images/featured-suv.png" alt="Car" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <Button variant="outline" className="border-white text-white">Remind Me</Button>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                        Starts {i + 10} Oct
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1 truncate">Mercedes-Benz G63 AMG</h3>
                                    <p className="text-gray-500 text-sm mb-3">2023 • 5,000 miles</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Est. £120k - £140k</span>
                                        <Button size="sm" variant="ghost" className="text-primary p-0 h-auto">Details</Button>
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
