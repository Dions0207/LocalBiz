import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const FAL_API_KEY = process.env.FAL_API_KEY

    if (!FAL_API_KEY) {
      console.error("FAL_API_KEY is not set.")
      return NextResponse.json({ error: "Server configuration error: FAL_API_KEY missing" }, { status: 500 })
    }

    console.log(`Generating banner for prompt: "${prompt}" using direct Fal AI API call.`)

    const falResponse = await fetch("https://api.fal.ai/sdxl/text-to-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${FAL_API_KEY}`, // Use your Fal AI API Key here
      },
      body: JSON.stringify({
        prompt: `High-quality advertising banner for a local business: ${prompt}. Professional, eye-catching, modern design.`,
        negative_prompt:
          "blurry, low resolution, bad quality, text, watermark, signature, ugly, deformed, disfigured, poor quality, low contrast, dull, dark, unappealing",
        width: 1024,
        height: 576,
        num_inference_steps: 25,
        guidance_scale: 7.5,
      }),
    })

    if (!falResponse.ok) {
      const errorText = await falResponse.text()
      console.error("Fal AI API error response:", errorText)
      throw new Error(`Fal AI API returned an error: ${falResponse.status} - ${errorText}`)
    }

    const falData = await falResponse.json()

    if (falData.images && falData.images.length > 0) {
      const imageUrl = falData.images[0].url
      console.log("Generated image URL:", imageUrl)
      return NextResponse.json({ imageUrl, success: true })
    } else {
      console.error("Fal AI did not return any images:", falData)
      return NextResponse.json({ error: "Failed to generate image with AI" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error generating banner with AI:", error)
    return NextResponse.json({ error: `Failed to generate banner with AI: ${error.message}` }, { status: 500 })
  }
}
