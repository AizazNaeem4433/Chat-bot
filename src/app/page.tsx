'use client'
import React from 'react'
import ChatArea from './components/ChatArea'
import Navbar from './components/Navbar'

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 🌈 Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e0e7ff] via-[#f0f4ff] to-[#e8f0fe] animate-gradient" />

      {/* 💨 Optional blur overlay to deepen the glass effect */}
      <div className="absolute inset-0 backdrop-blur-[60px] opacity-60" />

      {/* 🔝 Foreground content */}
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-start justify-center px-4 py-12">
          <div className="w-full max-w-4xl">
            <section className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 motion-safe:animate-fadeInUp text-gray-900 drop-shadow-sm">
                Account Assistant
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 opacity-90">
                Your AI-powered finance tracker — smarter sheets, simpler business.
              </p>
            </section>
            <ChatArea  />
          </div>
        </main>
      </div>
    </div>
  )
}
