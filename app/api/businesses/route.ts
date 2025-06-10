import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const userId = searchParams.get("userId")

    let query = supabase.from("businesses").select("*")

    if (userId) {
      query = query.eq("owner_id", userId)
    } else {
      query = query.eq("status", "active")
    }

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    query = query.order("featured", { ascending: false }).order("rating", { ascending: false })

    const { data: businesses, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({ businesses, success: true })
  } catch (error) {
    console.error("Get businesses error:", error)
    return NextResponse.json({ error: "Failed to fetch businesses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const businessData = await request.json()

    // IMPORTANT: You need to get the actual user ID from the session/auth context here.
    // For now, I'm using a placeholder. In a real app, you'd get it from a JWT or session.
    // Example (if using a session management library or Next.js auth):
    // const { user } = await getSession(); // Or similar
    // if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // const owner_id = user.id;

    const owner_id = businessData.owner_id || "dummy_owner_id_123" // Replace with actual user ID logic

    const { data: business, error } = await supabase
      .from("businesses")
      .insert([
        {
          ...businessData,
          owner_id: owner_id,
          status: "pending",
          verified: false,
          featured: false,
          rating: 0,
          review_count: 0,
          subscription_plan: "free",
          logo_url: businessData.logoUrl, // Map frontend field to DB field
          cover_image_url: businessData.coverImageUrl, // Map frontend field to DB field
        },
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ business, success: true })
  } catch (error) {
    console.error("Create business error:", error)
    return NextResponse.json({ error: "Failed to create business" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()

    const { data: business, error } = await supabase
      .from("businesses")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ business, success: true })
  } catch (error) {
    console.error("Update business error:", error)
    return NextResponse.json({ error: "Failed to update business" }, { status: 500 })
  }
}
