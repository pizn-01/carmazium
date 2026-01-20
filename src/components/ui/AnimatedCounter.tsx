"use client"

import { motion, useSpring, useTransform, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimatedCounterProps {
    value: number
    duration?: number
    prefix?: string
    suffix?: string
    className?: string
}

export function AnimatedCounter({ value, duration = 2, prefix = "", suffix = "", className }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useSpring(0, { duration: duration * 1000, bounce: 0 })
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [motionValue, isInView, value])

    const displayValue = useTransform(motionValue, (latest) => {
        return `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
    })

    return <motion.span ref={ref} className={className}>{displayValue}</motion.span>
}
