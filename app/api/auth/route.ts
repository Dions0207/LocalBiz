import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json()

    switch (action) {
      case "login":
        return await handleLogin(data)
      case "register":
        return await handleRegister(data)
      case "logout":
        return await handleLogout()
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleLogin({ email, password }: { email: string; password: string }) {
  try {
    // Get user from database
    const { data: user, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error || !user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      success: true,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

async function handleRegister(userData: any) {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Generate referral code
    const referralCode = generateReferralCode(userData.name)

    // Create user
    const { data: user, error } = await supabase
      .from("users")
      .insert([
        {
          email: userData.email,
          password_hash: hashedPassword,
          name: userData.name,
          phone: userData.phone,
          user_type: userData.userType || "customer",
          location: userData.location,
          referral_code: referralCode,
          referred_by: userData.referralCode ? await getUserIdByReferralCode(userData.referralCode) : null,
          verified: false,
          kyc_status: "pending",
          status: "active",
        },
      ])
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return NextResponse.json({ error: "Email already exists" }, { status: 409 })
      }
      throw error
    }

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      success: true,
    })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}

async function handleLogout() {
  return NextResponse.json({ success: true })
}

function generateReferralCode(name: string): string {
  const prefix = name.substring(0, 3).toUpperCase()
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${suffix}`
}

async function getUserIdByReferralCode(referralCode: string): Promise<string | null> {
  const { data: user } = await supabase.from("users").select("id").eq("referral_code", referralCode).single()

  return user?.id || null
}
