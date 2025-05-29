import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  user_type: "customer" | "business" | "affiliate" | "admin"
  status: "active" | "pending" | "suspended"
  avatar?: string
  location?: string
  referral_code: string
  referred_by?: string
  verified: boolean
  kyc_status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
}

export interface Business {
  id: string
  owner_id: string
  name: string
  category: string
  description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  instagram?: string
  facebook?: string
  images?: string[]
  verified: boolean
  featured: boolean
  rating: number
  review_count: number
  subscription_plan: "free" | "basic" | "premium" | "enterprise"
  subscription_expiry?: string
  accepts_crypto: boolean
  accepts_cards: boolean
  status: "pending" | "active" | "suspended"
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  business_id: string
  customer_id: string
  customer_name: string
  customer_phone?: string
  items: any[]
  total: number
  currency: "USD" | "USDT" | "MXN"
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  payment_method: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Commission {
  id: string
  affiliate_id: string
  business_id: string
  order_id?: string
  amount: number
  currency: string
  status: "pending" | "paid" | "cancelled"
  paid_at?: string
  created_at: string
}
