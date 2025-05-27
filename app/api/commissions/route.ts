import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const affiliateId = searchParams.get("affiliateId")
    const status = searchParams.get("status")

    let query = supabase.from("commissions").select(`
        *,
        businesses(name),
        orders(total, currency)
      `)

    if (affiliateId) {
      query = query.eq("affiliate_id", affiliateId)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data: commissions, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ commissions, success: true })
  } catch (error) {
    console.error("Get commissions error:", error)
    return NextResponse.json({ error: "Failed to fetch commissions" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { ids, status } = await request.json()

    const updateData: any = { status }
    if (status === "paid") {
      updateData.paid_at = new Date().toISOString()
    }

    const { data: commissions, error } = await supabase.from("commissions").update(updateData).in("id", ids).select()

    if (error) {
      throw error
    }

    return NextResponse.json({ commissions, success: true })
  } catch (error) {
    console.error("Update commissions error:", error)
    return NextResponse.json({ error: "Failed to update commissions" }, { status: 500 })
  }
}
