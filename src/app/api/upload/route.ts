import { NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/account-assistant';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert the uploaded file into a Blob or Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🧠 Create a FormData to send to n8n (so it behaves like a real browser upload)
    const n8nForm = new FormData();
    n8nForm.append('file', new Blob([buffer]), file.name);
    n8nForm.append('filename', file.name);

    // Send to n8n
    const uploadRes = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      body: n8nForm,
    });

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      console.error('n8n upload failed:', errorText);
      return NextResponse.json({ error: 'Failed to send file to n8n', details: errorText }, { status: 500 });
    }

    const result = await uploadRes.text();
    return NextResponse.json({ success: true, message: `Uploaded ${file.name}`, n8nResponse: result });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
