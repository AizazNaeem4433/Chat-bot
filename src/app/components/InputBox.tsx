'use client'
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Paperclip, SendHorizonal } from 'lucide-react'

type InputBoxProps = {
  onSend: (text: string) => void
  disabled?: boolean
  onFileSelect?: (file: File) => void
}

export default function InputBox({ onSend, disabled, onFileSelect }: InputBoxProps) {
  const [text, setText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file && onFileSelect) {
      onFileSelect(file)
      e.target.value = '' // reset input
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white/90 backdrop-blur-md rounded-xl shadow-md p-2 border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-300"
    >
      {/* 📎 File Upload Icon */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Paperclip size={20} className="text-gray-500" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* ✍️ Text Field */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        placeholder="Type a message..."
        className="flex-1 bg-transparent outline-none px-2 text-gray-800"
      />

      {/* 🚀 Send Button */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.9 }}
        disabled={disabled}
        className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition disabled:opacity-50"
      >
        <SendHorizonal size={20} className="text-white" />
      </motion.button>
    </form>
  )
}
