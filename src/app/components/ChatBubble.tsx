'use client'
import React from 'react'


export default function ChatBubble({ children, from = 'bot' }: { children: React.ReactNode; from?: 'bot' | 'user' }) {
const isUser = from === 'user'
return (
<div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
<div className={`max-w-[80%] px-4 py-2 rounded-2xl ${isUser ? 'bg-blue-600 text-white' : 'bg-white shadow-sm'} `}>
{children}
</div>
</div>
)
}