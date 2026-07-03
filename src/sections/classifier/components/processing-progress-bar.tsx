"use client"

import { motion } from "framer-motion"

interface ProcessingProgressBarProps {
  percent: number
  eta: string
}

export function ProcessingProgressBar({
  percent,
  eta,
}: ProcessingProgressBarProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-end text-[12px] text-muted-foreground">
        {percent}% ({eta})
      </span>
      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="relative h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Shimmer overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
