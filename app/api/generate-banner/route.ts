import { type NextRequest, NextResponse } from "next/server"
import { fal } from "@fal-ai/serverless"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Ensure FAL_API_KEY is set in your environment variables
    if (!process.env.FAL_API_KEY) {
      console.error("FAL_API_KEY is not set.")
      return NextResponse.json({ error: "Server configuration error: FAL_API_KEY missing" }, { status: 500 })
    }

    console.log(`Generating banner for prompt: "${prompt}"`)

    // Call Fal AI to generate the image
    const result = await fal.subscribe("fal-ai/stable-diffusion-xl", {
      input: {
        prompt: `High-quality advertising banner for a local business: ${prompt}. Professional, eye-catching, modern design.`,
        negative_prompt:
          "blurry, low resolution, bad quality, text, watermark, signature, ugly, deformed, disfigured, poor quality, low contrast, dull, dark, unappealing",
        width: 1024,
        height: 576,
        num_inference_steps: 25,
        guidance_scale: 7.5,
      },
      logs: true,
      onResult: (r) => {
        console.log("Fal AI result:", r)
      },
    })

    if (result.images && result.images.length > 0) {
      const imageUrl = result.images[0].url
      console.log("Generated image URL:", imageUrl)
      return NextResponse.json({ imageUrl, success: true })
    } else {
      console.error("Fal AI did not return any images:", result)
      return NextResponse.json({ error: "Failed to generate image with AI" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error generating banner with AI:", error)
    return NextResponse.json({ error: "Failed to generate banner with AI" }, { status: 500 })
  }
}
