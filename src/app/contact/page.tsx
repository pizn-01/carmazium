"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="container mx-auto px-5">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-white text-center">Contact Us</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Contact Form */}
                    <div className="lg:w-2/3 glass-card p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-sm">Full Name</label>
                                    <Input className="bg-slate-900/50 border-white/10 text-white" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-sm">Email Address</label>
                                    <Input className="bg-slate-900/50 border-white/10 text-white" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-400 text-sm">Subject</label>
                                <Input className="bg-slate-900/50 border-white/10 text-white" placeholder="Inquiry about..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-400 text-sm">Message</label>
                                <textarea
                                    className="w-full min-h-[150px] bg-slate-900/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none resize-y"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="glass-card p-6 flex items-start gap-4">
                            <MapPin className="text-primary shrink-0" />
                            <div>
                                <h4 className="font-bold text-white mb-1">Visit Us</h4>
                                <p className="text-gray-400 text-sm">123 Luxury Lane<br />Mayfair, London<br />W1J 7NW, UK</p>
                            </div>
                        </div>
                        <div className="glass-card p-6 flex items-start gap-4">
                            <Phone className="text-primary shrink-0" />
                            <div>
                                <h4 className="font-bold text-white mb-1">Call Us</h4>
                                <p className="text-gray-400 text-sm">+44 (0) 20 1234 5678</p>
                                <p className="text-gray-500 text-xs mt-1">Mon - Fri: 9am - 6pm</p>
                            </div>
                        </div>
                        <div className="glass-card p-6 flex items-start gap-4">
                            <Mail className="text-primary shrink-0" />
                            <div>
                                <h4 className="font-bold text-white mb-1">Email Us</h4>
                                <p className="text-gray-400 text-sm">support@carmazium.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
