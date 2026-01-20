"use client"

import Image from "next/image"
import { Users, Globe, Award, TrendingUp } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-5">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">Redefining Luxury Car Trading</h1>
                        <div className="w-20 h-1 bg-primary mb-8 ml-0 shadow-neon"></div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            CarMazium was founded in 2024 with a singular vision: to bring transparency, speed, and trust to the luxury automotive market. We believe that buying a high-performance vehicle should be as exhilarating as driving one.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Our platform combines cutting-edge technology with deep automotive expertise to offer real-time auctions, verified listings, and a seamless digital experience.
                        </p>
                    </div>
                    <div className="lg:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden glass-card p-2 group">
                        <div className="relative h-full w-full rounded-xl overflow-hidden">
                            <Image src="/assets/images/hero-bg.png" alt="About Us" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {[
                        { icon: Users, value: "50k+", label: "Active Users" },
                        { icon: Globe, value: "12", label: "Countries Served" },
                        { icon: TrendingUp, value: "£200M+", label: "Volume Traded" },
                        { icon: Award, value: "#1", label: "Customer Satisfaction" },
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-6 text-center hover:bg-white/5 transition-colors">
                            <stat.icon className="mx-auto text-primary mb-3 h-8 w-8" />
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-white mb-4">Meet The Team</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The best minds in automotive and technology working together to serve you.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass-card p-4 text-center group">
                                <div className="relative h-64 w-full bg-slate-800 rounded-lg mb-4 overflow-hidden">
                                    {/* Placeholder for team images */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                                        <Users className="text-white/20 h-16 w-16" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white">Alex Morgan</h3>
                                <p className="text-primary font-medium text-sm mb-3">Chief Executive Officer</p>
                                <p className="text-gray-400 text-sm">Former F1 strategist turned tech entrepreneur with a passion for classic 911s.</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="glass-card p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                    <h2 className="text-3xl font-bold text-white mb-8">Ready to start your journey?</h2>
                    <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors shadow-neon">
                        Browse Inventory
                    </button>
                    <p className="mt-6 text-sm text-gray-500">Join our exclusive community of enthusiasts today.</p>
                </div>
            </div>
        </div>
    )
}
