"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Note: Radix UI is standard but I don't have it installed. I'll simulate Slot or just use simple button.
// User requested "Next.js & Tailwind". I'll keep it simple without extra deps if possible, or use standard props.
// Actually, standard Shadcn pattern uses Radix. I'll simpler generic component for now.

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-white hover:bg-[#c3141b] shadow-lg shadow-primary/40", // Carmazium Red
                outline:
                    "border border-primary text-primary hover:bg-primary hover:text-white bg-transparent",
                dark: "bg-slate-800/60 border border-white/20 text-white hover:bg-slate-800/90 backdrop-blur-sm",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 px-3",
                lg: "h-14 px-8 text-base",
                icon: "h-10 w-10",
            },
            shape: {
                default: "rounded-none clip-path-carmazium", // Custom class for the polygon
                pill: "rounded-full",
                square: "rounded-md",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            shape: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        // If it's a Slot (asChild), we can't easily wrap it with motion without breaking layout or ref forwarding chains easily in this setup.
        // So we apply motion only if it's a standard button, OR we accept that asChild components might handle their own motion.
        // For this project, most buttons are standard.

        const ButtonElement = (
            <Comp
                className={cn(buttonVariants({ variant, size, shape, className }))}
                ref={ref}
                {...props}
            />
        )

        if (asChild) {
            return ButtonElement
        }

        const MotionButton = motion(Comp as any)

        return (
            <MotionButton
                className={cn(buttonVariants({ variant, size, shape, className }))}
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
