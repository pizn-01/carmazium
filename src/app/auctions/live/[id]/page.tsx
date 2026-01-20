"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { ArrowLeft, MessageSquare, Heart, Share2, Timer, Gavel, User, AlertCircle, CheckCircle, Flame, ShieldCheck, FileText, Info, Send, ChevronDown, ChevronUp } from "lucide-react"
import { CountdownTimer } from "@/components/features/CountdownTimer"

export default function LiveAuctionPage({ params }: { params: { id: string } }) {
    // Game State
    const [currentBid, setCurrentBid] = React.useState(135000)
    const [bidAmount, setBidAmount] = React.useState("")
    const [activeTab, setActiveTab] = React.useState<"details" | "history" | "seller">("details")
    const [watchers, setWatchers] = React.useState(142)
    const [isWinning, setIsWinning] = React.useState(false)

    // Simulation Refs
    const bidInterval = React.useRef<NodeJS.Timeout | null>(null)
    const chatInterval = React.useRef<NodeJS.Timeout | null>(null)
    const chatContainerRef = React.useRef<HTMLDivElement>(null)

    // Mock Data - Chat
    const [messages, setMessages] = React.useState([
        { user: "System", text: "Auction started at £120,000", type: "system" },
        { user: "911Fan_UK", text: "That Manthey kit looks incredible.", type: "chat" },
        { user: "TrackDayHero", text: "Is the ceramic brake upgrade included?", type: "chat" },
        { user: "Admin", text: "Yes, PCCB are standard on this spec.", type: "admin" },
        { user: "Collector88", text: "New Bid: £132,000", type: "bid" },
    ])

    // Mock Data - Bids History
    const [bidHistory, setBidHistory] = React.useState([
        { user: "Collector88", amount: 132000, time: "10:42:15" },
        { user: "SpeedFreak", amount: 130000, time: "10:41:50" },
        { user: "InvestorX", amount: 128500, time: "10:40:22" },
        { user: "AutoMotive", amount: 125000, time: "10:38:10" },
    ])

    // Effect: Scroll chat to bottom
    React.useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    // Effect: Simulate Random Events
    React.useEffect(() => {
        // Random Watcher Fluctuation
        const watcherInt = setInterval(() => {
            setWatchers(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3))
        }, 3000)

        // Random Chat Messages
        const randomChats = [
            "What a spec!", "Reserve met?", "Viewing available tomorrow?", "Those wheels...", "Bid strong everyone!", "Does it have front lift?", "Shipping to US available?"
        ]
        const randomUsers = ["PorscheGuy", "DriftKing", "InvestCars", "LondonSupercars", "V8_Lover", "ElectricDreams"]

        chatInterval.current = setInterval(() => {
            if (Math.random() > 0.7) {
                const text = randomChats[Math.floor(Math.random() * randomChats.length)]
                const user = randomUsers[Math.floor(Math.random() * randomUsers.length)]
                addMessage(user, text, "chat")
            }
        }, 4000)

        // Random Bids (Opponents)
        bidInterval.current = setInterval(() => {
            if (Math.random() > 0.85 && !isWinning) { // Only bid if user isn't winning immediately
                setCurrentBid(prev => {
                    const newBid = prev + 1000
                    addMessage(randomUsers[Math.floor(Math.random() * randomUsers.length)], `New Bid: £${newBid.toLocaleString()}`, "bid")
                    setBidHistory(prevHist => [{ user: randomUsers[Math.floor(Math.random() * randomUsers.length)], amount: newBid, time: new Date().toLocaleTimeString('en-GB') }, ...prevHist])
                    setIsWinning(false) // User lost lead
                    return newBid
                })
            }
        }, 8000)

        return () => {
            clearInterval(watcherInt)
            if (chatInterval.current) clearInterval(chatInterval.current)
            if (bidInterval.current) clearInterval(bidInterval.current)
        }
    }, [isWinning])

    const addMessage = (user: string, text: string, type: string) => {
        setMessages(prev => [...prev, { user, text, type }])
    }

    const handleBid = (amount: number) => {
        if (amount <= currentBid) return
        setCurrentBid(amount)
        addMessage("You", `New Bid: £${amount.toLocaleString()}`, "bid")
        setBidHistory(prev => [{ user: "You", amount: amount, time: new Date().toLocaleTimeString('en-GB') }, ...prev])
        setIsWinning(true)
        setBidAmount("")
    }

    return (
        <div className="bg-slate-950 min-h-screen flex flex-col">
            {/* Top Bar - Now Sticky */}
            <header className="sticky top-20 bg-slate-900/90 backdrop-blur-md border-b border-white/5 px-4 h-16 flex justify-between items-center z-30 shadow-md">
                <div className="flex items-center gap-3">
                    <Link href="/auctions" className="text-slate-400 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-full"><ArrowLeft size={18} /></Link>
                    <div>
                        <h1 className="text-white font-bold text-sm md:text-base uppercase tracking-wider truncate max-w-[200px] md:max-w-none">2024 Porsche 911 GT3 RS</h1>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-red-600/20 text-red-500 text-[10px] font-bold tracking-wider">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> LIVE
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-center hidden sm:block">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Ends In</p>
                        <CountdownTimer targetDate={new Date(Date.now() + 5 * 60 * 60 * 1000)} minimal={true} />
                    </div>
                    <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                    <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-white/5">
                        <User size={12} className="text-primary" />
                        <span className="text-xs font-bold text-white">{watchers}</span>
                        <span className="text-[10px] text-slate-500 hidden sm:inline">Watching</span>
                    </div>
                </div>
            </header>

            {/* Main Content: Standard Scrolling Layout */}
            <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 align-start">

                {/* Left: Video Steam & Details */}
                <div className="flex-1 space-y-6 min-w-0">

                    {/* Video Section - Cinematic Card */}
                    <div className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                        <div className="aspect-video relative w-full bg-black">
                            <Image src="/assets/images/featured-sports.png" alt="Live Stream" fill className="object-contain" />

                            {/* Gradient Overlay for Controls */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <p className="text-xs font-bold text-white/50 tracking-widest uppercase">Live Feed • <span className="text-white">HD</span></p>
                            </div>
                        </div>

                        {/* Status Bar */}
                        <div className="bg-slate-900 border-t border-white/5 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="bg-slate-800 p-3 rounded-lg border border-white/5 min-w-[140px] text-center">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Current Bid</p>
                                    <p className="text-2xl font-bold text-white font-mono">£{currentBid.toLocaleString()}</p>
                                </div>
                                <div>
                                    {isWinning ? (
                                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                                            <CheckCircle size={18} />
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wide">Winning</p>
                                                <p className="text-[10px] opacity-70">You hold the highest bid</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20 animate-pulse">
                                            <AlertCircle size={18} />
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wide">Outbid</p>
                                                <p className="text-[10px] opacity-70">Place a bid to reclaim lead</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-500/5 px-3 py-1 rounded border border-emerald-500/10">
                                <ShieldCheck size={14} /> Reserve Price Met
                            </div>
                        </div>
                    </div>

                    {/* Tabbed Info Section */}
                    <div className="bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden">
                        {/* Tabs Header */}
                        <div className="flex border-b border-white/5 bg-slate-900/50">
                            {[
                                { id: "details", label: "Overview", icon: Info },
                                { id: "history", label: "History", icon: Timer },
                                { id: "seller", label: "Seller", icon: User }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-8 py-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all relative ${activeTab === tab.id ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
                                >
                                    <tab.icon size={14} /> {tab.label}
                                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_-2px_8px_rgba(237,28,36,0.5)]"></div>}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            {activeTab === "details" && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {[
                                            { label: "Mileage", value: "1,200 mi" },
                                            { label: "Engine", value: "4.0L Flat-6" },
                                            { label: "Transmission", value: "PDK" },
                                            { label: "Drivetrain", value: "RWD" },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-center group hover:border-white/10 transition-colors">
                                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                                <p className="text-lg font-bold text-white">{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2"><CheckCircle size={14} className="text-primary" /> Key Features</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-slate-400 text-sm">
                                            {[
                                                "Weissach Package", "Porsche Ceramic Composite Brakes (PCCB)", "Front Axle Lift System",
                                                "Carbon Fibre Bucket Seats", "Bose Surround Sound", "LED Matrix Headlights (PDLS+)",
                                                "Chrono Package", "Magnesium Wheels"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-2"><div className="w-1 h-1 bg-slate-600 rounded-full"></div> {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 flex gap-3 text-orange-200/80 text-xs leading-relaxed">
                                        <Info size={16} className="shrink-0 mt-0.5" />
                                        <p>This vehicle is sold with a 12-month Porsche Approved Warranty. Please review the full condition report in the documents section before placing a bid.</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === "history" && (
                                <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest px-4 pb-2 border-b border-white/5">
                                        <span>Bidder</span>
                                        <span>Amount</span>
                                    </div>
                                    {bidHistory.map((bid, i) => (
                                        <div key={i} className={`flex justify-between items-center p-3 rounded-lg ${i === 0 ? "bg-slate-800/50 border border-white/5" : "hover:bg-white/5 border border-transparent"}`}>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs font-bold ${i === 0 ? "text-white" : "text-slate-400"}`}>{bid.user}</span>
                                                {i === 0 && <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">Leading</span>}
                                            </div>
                                            <div className="text-right">
                                                <div className="font-mono font-bold text-white text-sm">£{bid.amount.toLocaleString()}</div>
                                                <div className="text-[10px] text-slate-600">{bid.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "seller" && (
                                <div className="flex items-center gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300 bg-slate-900/50 p-6 rounded-xl border border-white/5">
                                    <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center text-white text-xl font-bold border border-white/10 shadow-lg">LM</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">Luxury Motors London</h3>
                                                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mt-1">
                                                    <ShieldCheck size={12} /> Verified Dealer
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-xs h-8">View Inventory</Button>
                                        </div>
                                        <p className="text-slate-400 text-xs leading-relaxed mt-3">
                                            Specializing in high-performance and luxury vehicles for over 15 years.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Bidding & Chat Sidebar - Now a Card */}
                <aside className="lg:w-[380px] shrink-0 space-y-4">
                    <div className="bg-slate-900 rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col h-[600px]">
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
                            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Feed</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] text-slate-500">Active</span>
                            </div>
                        </div>

                        {/* Chat Feed */}
                        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800 hover:scrollbar-thumb-slate-700 bg-slate-950/30">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`text-sm animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                    {msg.type === 'system' && (
                                        <div className="flex justify-center my-2">
                                            <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full border border-white/5">{msg.text}</span>
                                        </div>
                                    )}
                                    {msg.type === 'admin' && (
                                        <div className="bg-primary/5 p-2 rounded-lg border border-primary/10 mb-1">
                                            <span className="font-bold text-primary text-[10px] uppercase tracking-wider block mb-0.5">Moderator</span>
                                            <span className="text-slate-300 text-xs block">{msg.text}</span>
                                        </div>
                                    )}
                                    {msg.type === 'bid' && (
                                        <div className="flex items-center gap-2 py-1 px-2 -mx-2 hover:bg-white/5 rounded transition-colors group">
                                            <Flame size={12} className="text-orange-500 group-hover:scale-110 transition-transform" />
                                            <span className="font-bold text-orange-400 text-xs">{msg.user}</span>
                                            <span className="text-slate-400 text-xs">bid</span>
                                            <span className="text-white font-mono font-bold text-xs">{msg.text.split('£')[1] ? '£' + msg.text.split('£')[1] : msg.text}</span>
                                        </div>
                                    )}
                                    {msg.type === 'chat' && (
                                        <div className="flex gap-2 items-start py-0.5 opacity-80 hover:opacity-100 transition-opacity">
                                            <span className="font-bold text-slate-500 text-xs whitespace-nowrap pt-0.5">{msg.user}:</span>
                                            <span className="text-slate-300 text-xs leading-snug">{msg.text}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-3 bg-slate-900 border-t border-white/5 relative z-20">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Message room..."
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-full pl-4 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-white/20 transition-colors placeholder:text-slate-600 focus:bg-slate-800"
                                />
                                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-white hover:bg-primary rounded-full transition-all">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Bidding Controls */}
                        <div className="bg-slate-800 border-t border-white/10 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.4)] z-30">
                            <div className="grid grid-cols-4 gap-2 mb-3">
                                {[500, 1000, 2000, 5000].map(inc => (
                                    <button
                                        key={inc}
                                        onClick={() => handleBid(currentBid + inc)}
                                        className="bg-slate-700/50 hover:bg-slate-700 border border-white/5 hover:border-white/20 rounded py-2 flex flex-col items-center justify-center transition-all active:scale-95 group"
                                    >
                                        <span className="text-[10px] text-slate-400 group-hover:text-white">+{inc / 1000}k</span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <div className="relative w-24 shrink-0">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">£</span>
                                    <Input
                                        type="number"
                                        placeholder="Custom"
                                        className="bg-slate-900 border-slate-600 text-white pl-6 h-10 font-mono font-bold text-sm focus:border-primary"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={() => handleBid(Number(bidAmount) || currentBid + 500)}
                                    className="flex-1 h-10 bg-primary hover:bg-red-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-red-900/20"
                                >
                                    Place Bid
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
