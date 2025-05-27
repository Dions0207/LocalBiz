import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get("businessId")
    const customerId = searchParams.get("customerId")
    const status = searchParams.get("status")

    let query = supabase.from("orders").select("*")

    if (businessId) {
      query = query.eq("business_id", businessId)
    }

    if (customerId) {
      query = query.eq("customer_id", customerId)
    }

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data: orders, error } = await query.order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ orders, success: true })
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const { data: order, error } = await supabase
      .from("orders")
      .insert([
        {
          ...orderData,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    // Calculate commission if customer was referred
    if (orderData.customer_id) {
      await calculateCommission(orderData.customer_id, orderData.business_id, order.id, orderData.total)
    }

    return NextResponse.json({ order, success: true })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    const { data: order, error } = await supabase
      .from("orders")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ order, success: true })
  } catch (error) {
    console.error("Update order error:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

async function calculateCommission(customerId: string, businessId: string, orderId: string, amount: number) {
  try {
    // Get customer's referrer
    const { data: customer } = await supabase.from("users").select("referred_by").eq("id", customerId).single()

    if (customer?.referred_by) {
      // Get commission rate from config
      const { data: config } = await supabase.from("app_config").select("value").eq("key", "commission_rate").single()

      const commissionRate = config?.value || 0.1 // Default 10%
      const commissionAmount = amount * commissionRate

      // Create commission record
      await supabase.from("commissions").insert([
        {
          affiliate_id: customer.referred_by,
          business_id: businessId,
          order_id: orderId,
          amount: commissionAmount,
          currency: "USDT",
          status: "pending",
        },
      ])
    }
  } catch (error) {
    console.error("Commission calculation error:", error)
  }
}
