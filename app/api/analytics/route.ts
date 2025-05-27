import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get("businessId")
    const period = searchParams.get("period") || "30" // days

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - Number.parseInt(period))

    let analytics: any = {}

    if (businessId) {
      // Business analytics
      analytics = await getBusinessAnalytics(businessId, startDate)
    } else {
      // Platform analytics (admin)
      analytics = await getPlatformAnalytics(startDate)
    }

    return NextResponse.json({ analytics, success: true })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

async function getBusinessAnalytics(businessId: string, startDate: Date) {
  // Get orders for the business
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("business_id", businessId)
    .gte("created_at", startDate.toISOString())

  // Calculate metrics
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0
  const totalOrders = orders?.length || 0
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Get orders by status
  const ordersByStatus =
    orders?.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  // Get daily revenue
  const dailyRevenue =
    orders?.reduce(
      (acc, order) => {
        const date = new Date(order.created_at).toISOString().split("T")[0]
        acc[date] = (acc[date] || 0) + order.total
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    ordersByStatus,
    dailyRevenue,
  }
}

async function getPlatformAnalytics(startDate: Date) {
  // Get all orders
  const { data: orders } = await supabase.from("orders").select("*").gte("created_at", startDate.toISOString())

  // Get all businesses
  const { data: businesses } = await supabase.from("businesses").select("*")

  // Get all users
  const { data: users } = await supabase.from("users").select("*")

  // Get all commissions
  const { data: commissions } = await supabase
    .from("commissions")
    .select("*")
    .gte("created_at", startDate.toISOString())

  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0
  const totalOrders = orders?.length || 0
  const totalBusinesses = businesses?.length || 0
  const totalUsers = users?.length || 0
  const totalCommissions = commissions?.reduce((sum, comm) => sum + comm.amount, 0) || 0

  return {
    totalRevenue,
    totalOrders,
    totalBusinesses,
    totalUsers,
    totalCommissions,
    activeBusinesses: businesses?.filter((b) => b.status === "active").length || 0,
    pendingBusinesses: businesses?.filter((b) => b.status === "pending").length || 0,
    usersByType:
      users?.reduce(
        (acc, user) => {
          acc[user.user_type] = (acc[user.user_type] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ) || {},
  }
}
