
import { NextResponse } from 'next/server'

// ⚙️ Your n8n webhook endpoint
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/account-assistant'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Convert the uploaded file to a buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 🧠 Send the file to n8n
    const uploadRes = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Filename': encodeURIComponent(file.name),
      },
      body: buffer,
    })

    if (!uploadRes.ok) {
      console.error('n8n upload failed:', await uploadRes.text())
      return NextResponse.json({ error: 'Failed to send file to n8n' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: `Uploaded ${file.name}` })
  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
