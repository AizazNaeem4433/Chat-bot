'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function TypingDots() {
  const dotVariants = {
    start: { y: 0 },
    bounce: { y: -4 },
  }

  return (
    <div className="flex items-center gap-1 px-4 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-gray-500 rounded-full"
          variants={dotVariants}
          initial="start"
          animate="bounce"
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  )
}
