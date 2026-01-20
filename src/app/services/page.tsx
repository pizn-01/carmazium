"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Truck, ClipboardCheck, Shield, Wallet, Wrench, FileText, Search, PlusCircle, Briefcase } from "lucide-react"

export default function ServicesPage() {
    const [activeTab, setActiveTab] = React.useState<'browse' | 'post'>('browse')

    const services = [
        {
            title: "Vehicle Delivery",
            icon: Truck,
            desc: "Professional vehicle delivery services ensure your car is transported safely and securely between locations. Ideal for buyers, sellers, dealerships, and relocations.",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            title: "Car Inspection",
            icon: ClipboardCheck,
            desc: "Access certified inspectors who conduct detailed vehicle evaluations covering mechanical condition, bodywork, safety systems, and overall performance.",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Warranty Coverage",
            icon: Shield,
            desc: "Extended warranty services provide protection against unexpected mechanical and electrical failures. These plans help reduce long-term ownership costs.",
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },
        {
            title: "Vehicle Financing",
            icon: Wallet,
            desc: "Connect with financing providers offering structured and flexible payment solutions. Financing services support a wide range of vehicle purchases.",
            color: "text-amber-400",
            bg: "bg-amber-500/10"
        },
        {
            title: "Maintenance",
            icon: Wrench,
            desc: "Routine and specialized vehicle maintenance services designed to keep your car operating at optimal performance, from scheduled servicing to advanced repairs.",
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            title: "Insurance",
            icon: FileText,
            desc: "Comprehensive vehicle insurance services offer coverage options to protect against accidents, theft, and unforeseen risks tailored to your needs.",
            color: "text-cyan-400",
            bg: "bg-cyan-500/10"
        }
    ]

    return (
        <div className="min-h-screen pt-24 pb-20 bg-slate-900">
            {/* Hero Section */}
            <div className="container mx-auto px-5 mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">Carmazium Service Hub</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                    Find trusted automotive professionals for inspections, transport, warranty, detailing, and more.
                </p>

                {/* Toggle Buttons */}
                <div className="flex justify-center mb-10">
                    <div className="bg-slate-800 p-1 rounded-full inline-flex border border-white/10">
                        <button
                            onClick={() => setActiveTab('browse')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'browse' ? 'bg-primary text-white shadow-neon' : 'text-gray-400 hover:text-white'}`}
                        >
                            <span className="flex items-center gap-2"><Briefcase size={16} /> BROWSE JOBS</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('post')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeTab === 'post' ? 'bg-primary text-white shadow-neon' : 'text-gray-400 hover:text-white'}`}
                        >
                            <span className="flex items-center gap-2"><PlusCircle size={16} /> POST A JOB</span>
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto glass-strong p-2 rounded-xl flex items-center gap-2 border border-white/10 relative z-10">
                    <Search className="text-gray-400 ml-4" />
                    <input
                        type="text"
                        placeholder="Search for services (e.g., 'Detailing in London')..."
                        className="bg-transparent border-none text-white w-full h-12 focus:outline-none placeholder:text-gray-500"
                    />
                    <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-4">
                        <select className="bg-transparent text-sm font-bold text-gray-300 focus:outline-none cursor-pointer">
                            <option className="bg-slate-800">All Services</option>
                            <option className="bg-slate-800">Inspections</option>
                            <option className="bg-slate-800">Transport</option>
                        </select>
                    </div>
                    <Button size="lg" className="shrink-0 h-10 px-6">Search</Button>
                </div>
            </div>

            {/* Service Grid Section */}
            <section className="container mx-auto px-5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-heading text-white mb-4">Explore Automotive Services</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Carmazium Service Hub brings together trusted automotive professionals offering end-to-end vehicle services. Whether you are purchasing a car, managing ownership, or protecting your investment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {services.map((service, i) => (
                        <div key={i} className="glass-card p-8 group hover:bg-white/5 transition-colors duration-300 flex flex-col h-full">
                            <div className={`w-14 h-14 ${service.bg} ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>

                            <div className="pt-6 border-t border-white/5 mt-auto">
                                <Button variant="link" className="p-0 h-auto text-sm font-bold text-primary group-hover:underline">
                                    Find Providers &rarr;
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Featured Jobs Section */}
                <div className="mb-20">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold font-heading text-white mb-2">Featured Jobs</h2>
                            <p className="text-gray-400">Latest opportunities from car owners and dealers.</p>
                        </div>
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">View All Jobs</Button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: "Vehicle Transport for BMW M4", loc: "London → Manchester", budget: "£350", time: "Urgent", type: "Transport" },
                            { title: "Pre-Purchase Inspection: Audi RS6", loc: "Birmingham", budget: "£150", time: "2 days left", type: "Inspection" },
                            { title: "Detailing & Ceramic Coating", loc: "Leeds", budget: "£600", time: "Flexible", type: "Detailing" },
                        ].map((job, i) => (
                            <div key={i} className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-primary/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 font-bold border border-white/5">
                                        {job.title.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{job.title}</h4>
                                        <div className="flex gap-4 text-sm text-gray-400 mt-1">
                                            <span>📍 {job.loc}</span>
                                            <span>⏱ {job.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                    <span className="font-bold text-emerald-400 text-xl">{job.budget}</span>
                                    <Button size="sm" className="px-6">Apply</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Join as Pro CTA */}
                <div className="glass-strong p-12 rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">Are you an Automotive Professional?</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">Join CarMazium's network of verified providers. Connect with thousands of car owners, get paid securely, and grow your business.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="shadow-neon px-8">Join as a Provider</Button>
                            <Button variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white/10">How it Works</Button>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
