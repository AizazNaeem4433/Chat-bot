import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, fileUrl } = await req.json();

    // Replace this with your n8n webhook URL
    const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!;

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: text, fileUrl }),
    });

    const data = await response.json();

    return NextResponse.json({ reply: data.reply || "No response from n8n" });
  } catch (err) {
    console.error("Chat API Error:", err);
    return NextResponse.json(
      { error: "Failed to reach n8n webhook" },
      { status: 500 }
    );
  }
}
