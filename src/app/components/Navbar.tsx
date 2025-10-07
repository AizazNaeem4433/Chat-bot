import React from 'react'
import Logo from './Logo'

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-30">
      <div
        className="
          max-w-7xl mx-auto px-4 py-3
          flex items-center gap-4
          bg-white/20
          backdrop-blur-xl
          border border-white/30
          shadow-[0_4px_30px_rgba(0,0,0,0.1)]
          rounded-b-2xl
          transition-all duration-500
          hover:bg-white/30 hover:border-white/40

        "
      >
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <div className="font-semibold text-gray-900 drop-shadow-sm">
              Account Assistant
            </div>
            <div className="text-xs text-gray-700/80">
              Automation • Sheets • Insights
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
