import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Initialize Supabase client for server-side operations
// Use SUPABASE_SERVICE_ROLE_KEY for secure server-side uploads
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase URL or Service Role Key environment variables.")
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const folder = formData.get("folder") as string | null // e.g., 'logos', 'cover-images'

  if (!file) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 })
  }
  if (!folder) {
    return NextResponse.json({ error: "Folder is required." }, { status: 400 })
  }

  const fileExtension = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`
  const filePath = `${folder}/${fileName}`

  try {
    const { data, error } = await supabase.storage
      .from("business-images") // This is the bucket name, we'll create it later
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false, // Do not overwrite if file exists
      })

    if (error) {
      console.error("Supabase upload error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to upload file to Supabase Storage." },
        { status: 500 },
      )
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage.from("business-images").getPublicUrl(filePath)

    if (!publicUrlData || !publicUrlData.publicUrl) {
      return NextResponse.json({ error: "Failed to get public URL for uploaded file." }, { status: 500 })
    }

    return NextResponse.json({ url: publicUrlData.publicUrl })
  } catch (error: any) {
    console.error("Error during Supabase file upload:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during file upload." },
      { status: 500 },
    )
  }
}
