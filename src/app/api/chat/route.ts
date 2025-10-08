//the file updated sheezatanveer
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, fileUrl } = await req.json();

    const N8N_WEBHOOK_URL =
      process.env.N8N_WEBHOOK_URL ||
      "https://sheezatanveer.app.n8n.cloud/webhook/612c51cc-6307-4c52-80ac-53bb62679ae9";

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: text, fileUrl }),
    }); 

    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n error:", errorText);
      return NextResponse.json(
        { error: "No valid response from server" },
        { status: 500 }
      );
    }

    let data;
    try {
      data = await response.json();
    } catch {
      const textResponse = await response.text();
      data = { reply: textResponse };
    }

    console.log("✅ Response from n8n:", data);

    // Handle different possible keys from n8n
    const reply =
      data.reply ||
      data.text ||
      data.output ||
      data.message ||
      "No response from n8n";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API Error:", err);
    return NextResponse.json(
      { error: "Failed to reach n8n webhook" },
      { status: 500 }
    );
  }
}
