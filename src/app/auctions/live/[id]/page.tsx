"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { ArrowLeft, MessageSquare, Heart, Share2, Timer, Gavel, User, AlertCircle, CheckCircle } from "lucide-react"
import { CountdownTimer } from "@/components/features/CountdownTimer"

export default function LiveAuctionPage({ params }: { params: { id: string } }) {
    const [currentBid, setCurrentBid] = React.useState(35000)
    const [bidAmount, setBidAmount] = React.useState("")
    const [chatMessage, setChatMessage] = React.useState("")

    // Fake chat messages
    const [messages, setMessages] = React.useState([
        { user: "System", text: "Auction started at £28,000", type: "system" },
        { user: "CarLover99", text: "Is the service history partial or full?", type: "chat" },
        { user: "Admin", text: "Full dealer history attached in docs.", type: "admin" },
        { user: "BidBot", text: "New Bid: £32,000 by User882", type: "bid" },
    ])

    const handleBid = (amount: number) => {
        setCurrentBid(amount)
        setMessages(prev => [...prev, { user: "You", text: `New Bid: £${amount.toLocaleString()}`, type: "bid" }])
        setBidAmount("")
    }

    return (
        <div className="bg-slate-900 min-h-screen pt-20 pb-12 flex flex-col h-screen overflow-hidden">
            {/* Top Bar / Header */}
            <div className="bg-slate-800 border-b border-white/10 px-5 py-3 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/auctions" className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></Link>
                    <div>
                        <h1 className="text-white font-bold font-heading text-lg">2024 Porsche 911 GT3 RS</h1>
                        <p className="text-emerald-400 text-xs flex items-center gap-1"><span className="animate-pulse bg-emerald-500 rounded-full w-2 h-2"></span> LIVE AUCTION</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase">Time Remaining</p>
                        <CountdownTimer targetDate={new Date(Date.now() + 272000)} minimal={true} />
                    </div>
                    <div className="h-8 w-px bg-white/10 hidden md:block"></div>
                    <div className="text-center hidden md:block">
                        <p className="text-xs text-gray-400 uppercase">Watching</p>
                        <p className="text-white font-bold flex items-center gap-1 justify-center"><User size={14} /> 142</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

                {/* Left: Video/Image Stream & Details */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-black relative">
                    {/* Main Stream Area */}
                    <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                        <Image src="/assets/images/featured-sports.png" alt="Live Stream" fill className="object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 backdrop-blur px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                                <span className="text-white font-bold tracking-wider">LIVE FEED</span>
                            </div>
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                            <div className="bg-black/60 backdrop-blur p-4 rounded-xl border border-white/10">
                                <p className="text-gray-400 text-xs mb-1">Current Highest Bid</p>
                                <p className="text-4xl font-bold text-white">£{currentBid.toLocaleString()}</p>
                                <p className="text-xs text-gray-400 mt-1">Reserve Met <CheckCircle size={10} className="inline text-emerald-500" /></p>
                            </div>
                        </div>
                    </div>

                    {/* Car Info Scrollable */}
                    <div className="p-6 bg-slate-900 flex-1">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-xl font-bold text-white mb-4">Vehicle Highlights</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-slate-800 p-3 rounded border border-white/5">
                                    <p className="text-xs text-gray-500">Mileage</p>
                                    <p className="text-white font-semibold">1,200 mi</p>
                                </div>
                                <div className="bg-slate-800 p-3 rounded border border-white/5">
                                    <p className="text-xs text-gray-500">Engine</p>
                                    <p className="text-white font-semibold">4.0L F6</p>
                                </div>
                                <div className="bg-slate-800 p-3 rounded border border-white/5">
                                    <p className="text-xs text-gray-500">Transmission</p>
                                    <p className="text-white font-semibold">PDK</p>
                                </div>
                                <div className="bg-slate-800 p-3 rounded border border-white/5">
                                    <p className="text-xs text-gray-500">Location</p>
                                    <p className="text-white font-semibold">London, UK</p>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none text-gray-400 text-sm">
                                <p>Ideally, this section contains the full description of the vehicle. For this demo, we are focusing on the live auction interface. Imagine detailed specs, history, and condition reports here.</p>
                                <Link href={`/vehicle/${params.id}`} target="_blank" className="text-primary hover:underline flex items-center gap-1 mt-2">
                                    View Full Listing Details <Share2 size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Bidding & Chat Sidebar */}
                <div className="lg:w-[400px] bg-slate-800 border-l border-white/10 flex flex-col shrink-0">

                    {/* Feed / Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-600">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`p-3 rounded-lg text-sm ${msg.type === 'bid' ? 'bg-emerald-900/20 border border-emerald-500/30' : msg.type === 'system' ? 'bg-slate-700/50 text-center italic text-gray-400' : 'bg-slate-700/30'}`}>
                                {msg.type !== 'system' && <p className={`font-bold text-xs mb-1 ${msg.type === 'admin' ? 'text-primary' : 'text-gray-300'}`}>{msg.user}</p>}
                                <p className={`${msg.type === 'bid' ? 'text-emerald-400 font-bold' : 'text-gray-300'}`}>{msg.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bidding Controls */}
                    <div className="p-4 bg-slate-900 border-t border-white/10">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {[500, 1000, 2000].map(inc => (
                                <button
                                    key={inc}
                                    onClick={() => handleBid(currentBid + inc)}
                                    className="whitespace-nowrap px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-full text-xs text-white transition-colors"
                                >
                                    + £{inc.toLocaleString()}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Enter custom bid"
                                    className="bg-slate-800 border-slate-700 text-white"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                />
                                <Button onClick={() => handleBid(Number(bidAmount) || currentBid + 500)} className="w-1/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                                    BID
                                </Button>
                            </div>
                            <p className="text-xs text-center text-gray-500"><AlertCircle size={10} className="inline mr-1" /> All bids are legally binding.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
