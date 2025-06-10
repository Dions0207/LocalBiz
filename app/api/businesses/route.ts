import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const userId = searchParams.get("userId")

    let query = supabase.from("businesses").select("*")

    // Filter by user if provided
    if (userId) {
      query = query.eq("owner_id", userId)
    } else {
      // Only show active businesses for public view
      query = query.eq("status", "active")
    }

    // Filter by category
    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    // Search functionality
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Order by featured first, then by rating
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

    const { data: business, error } = await supabase
      .from("businesses")
      .insert([
        {
          ...businessData,
          status: "pending",
          verified: false,
          featured: false,
          rating: 0,
          review_count: 0,
          subscription_plan: "free",
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
