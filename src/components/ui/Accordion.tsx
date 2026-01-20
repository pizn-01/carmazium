"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
    title: React.ReactNode
    icon?: React.ReactNode
    children: React.ReactNode
    defaultOpen?: boolean
}

export function AccordionItem({ title, icon, children, defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen)

    return (
        <div className="bg-white/5 rounded-lg mb-2 overflow-hidden border border-white/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center gap-4 text-white font-medium">
                    {icon && <span className="text-gray-400 w-5 text-center">{icon}</span>}
                    {title}
                </div>
                <ChevronDown className={cn("text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} size={20} />
            </button>

            <div
                className={cn(
                    "text-gray-300 text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[500px] opacity-100 p-4 border-t border-white/10" : "max-h-0 opacity-0"
                )}
            >
                {children}
            </div>
        </div>
    )
}
