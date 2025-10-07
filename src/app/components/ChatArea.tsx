'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatBubble from './ChatBubble'
import InputBox from './InputBox'
import QuickButtons from './QuickButtons'
import TypingDots from './TypingDots'

type Message = { id: string; from: 'bot' | 'user'; text: string }

const cryptoRandomId = () => crypto.randomUUID()
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      from: 'bot',
      text: "Hey! I'm Account Assistant 👋 Upload your Excel sheet or ask me something about your accounts.",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  // 💾 Load previous chat on mount
  useEffect(() => {
    const saved = localStorage.getItem('chatHistory')
    if (saved) setMessages(JSON.parse(saved))
  }, [])

  // 💽 Save chat every time it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages))
  }, [messages])

  function pushMessage(m: Message) {
    setMessages((s) => [...s, m])
  }

  async function handleSend(text: string) {
    if (!text.trim()) return
    const userMsg = { id: cryptoRandomId(), from: 'user' as const, text }
    pushMessage(userMsg)
    await handleBotResponse(text)
  }

  // 🚀 UPDATED: Real file upload integration
  async function handleFile(file: File) {
    const uploadingMsg = {
      id: cryptoRandomId(),
      from: 'user' as const,
      text: `📎 Uploading file: ${file.name}...`,
    }
    pushMessage(uploadingMsg)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Upload failed')

      // 🎉 Show confirmation message in chat
      pushMessage({
        id: cryptoRandomId(),
        from: 'bot',
        text: `✅ File "${file.name}" uploaded successfully!`,
      })

      // Optionally let the bot process it right after upload
      await handleBotResponse(`User uploaded file: ${file.name}`)
    } catch (err: any) {
      console.error('Upload error:', err)
      pushMessage({
        id: cryptoRandomId(),
        from: 'bot',
        text: `⚠️ Upload failed: ${err.message || 'Something went wrong.'}`,
      })
    }
  }

  function handleQuick(q: string) {
    handleSend(q)
  }

  async function handleBotResponse(userText: string) {
    const botTyping = { id: 'typing', from: 'bot' as const, text: '__TYPING__' }
    pushMessage(botTyping)
    setIsLoading(true)

    try {
      await sleep(500 + Math.min(1500, userText.length * 25))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userText }),
      })
      const data = await res.json()

      setMessages((s) => s.filter((m) => m.id !== botTyping.id))
      const reply =
        data.reply ||
        "Hmm, I couldn’t get a response from the server. Check your n8n connection 🔌"
      pushMessage({ id: cryptoRandomId(), from: 'bot', text: reply })
    } catch (err) {
      console.error('Bot error:', err)
      setMessages((s) => s.filter((m) => m.id !== botTyping.id))
      pushMessage({
        id: cryptoRandomId(),
        from: 'bot',
        text: '⚠️ Something went wrong while contacting n8n.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="
  relative
  bg-white/10
  backdrop-blur-2xl
  border border-white/20
  rounded-3xl
  p-6
  shadow-[0_8px_32px_rgba(0,0,0,0.2)]
  overflow-hidden
  transition-all duration-500
  hover:bg-white/15
  hover:shadow-[0_8px_40px_rgba(0,0,0,0.25)]
  before:content-['']
  before:absolute before:inset-0 before:rounded-3xl
  before:p-[1px]
  before:bg-gradient-to-r before:from-[#7dd3fc]/40 before:to-[#c084fc]/40
  before:blur before:opacity-60
  before:-z-10
"
      >
        <div className="h-[45vh] sm:h-[50vh] overflow-y-auto pr-2 scroll-smooth pb-2">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {m.text === '__TYPING__' ? (
                  <TypingDots />
                ) : (
                  <ChatBubble from={m.from}>{m.text}</ChatBubble>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ✅ InputBox with built-in attach button + QuickButtons */}
        <div className="mt-4 space-y-3">
          <InputBox
            onSend={handleSend}
            onFileSelect={handleFile}
            disabled={isLoading}
          />
          <QuickButtons onQuick={handleQuick} />
        </div>
      </motion.div>
    </div>
  )
}
