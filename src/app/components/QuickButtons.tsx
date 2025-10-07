'use client'
import React from 'react'


export default function QuickButtons({ onQuick }: { onQuick: (q: string) => void }) {
const items = [
{ label: 'Total Sales (This Month)', q: 'total sales this month' },
{ label: 'Total Purchases', q: 'total purchases' },
{ label: 'Total Outstanding', q: 'total outstanding' },
{ label: 'Total Received', q: 'total received' },
{ label: 'Active Clients', q: 'active clients' },
]


return (
<div className="flex flex-wrap gap-3 mt-3">
{items.map((it) => (
<button
key={it.q}
onClick={() => onQuick(it.q)}
className="px-4 py-2 rounded-full border shadow-sm hover:scale-[1.02] transition-transform"
>
{it.label}
</button>
))}
</div>
)
}