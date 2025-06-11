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
      // Si Supabase devuelve un error, lo registramos y devolvemos una respuesta JSON de error.
      console.error("Supabase GET businesses error details:", error)
      // Aseguramos que el mensaje de error sea siempre una cadena, incluso si el objeto 'error' de Supabase no es un Error estándar.
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : JSON.stringify(error) // Intentamos stringificar el objeto completo si no tiene 'message'

      return NextResponse.json({ error: `Failed to fetch businesses from Supabase: ${errorMessage}` }, { status: 500 })
    }

    return NextResponse.json({ businesses, success: true })
  } catch (e: any) {
    // Capturamos cualquier error inesperado durante la ejecución de la ruta API.
    console.error("Get businesses API route unexpected error:", e)
    // Aseguramos que el mensaje de error sea siempre una cadena.
    const errorMessage = e instanceof Error ? e.message : String(e)
    return NextResponse.json(
      { error: `An unexpected error occurred in the API route: ${errorMessage}` },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const businessData = await request.json()

    // IMPORTANTE: Debes obtener el ID de usuario real del contexto de sesión/autenticación aquí.
    // Por ahora, estoy usando un marcador de posición. En una aplicación real, lo obtendrías de un JWT o sesión.
    // Ejemplo (si usas una librería de gestión de sesiones o autenticación de Next.js):
    // const { user } = await getSession(); // O similar
    // if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // const owner_id = user.id;

    const owner_id = businessData.owner_id || "dummy_owner_id_123" // Reemplazar con la lógica real del ID de usuario

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
          logo_url: businessData.logoUrl, // Mapear campo del frontend al campo de la DB
          cover_image_url: businessData.coverImageUrl, // Mapear campo del frontend al campo de la DB
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Supabase POST business error details:", error)
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : JSON.stringify(error)
      return NextResponse.json({ error: `Failed to create business in Supabase: ${errorMessage}` }, { status: 500 })
    }

    return NextResponse.json({ business, success: true })
  } catch (e: any) {
    console.error("Create business API route unexpected error:", e)
    const errorMessage = e instanceof Error ? e.message : String(e)
    return NextResponse.json(
      { error: `An unexpected error occurred in the API route: ${errorMessage}` },
      { status: 500 },
    )
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
      console.error("Supabase PUT business error details:", error)
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : JSON.stringify(error)
      return NextResponse.json({ error: `Failed to update business in Supabase: ${errorMessage}` }, { status: 500 })
    }

    return NextResponse.json({ business, success: true })
  } catch (e: any) {
    console.error("Update business API route unexpected error:", e)
    const errorMessage = e instanceof Error ? e.message : String(e)
    return NextResponse.json(
      { error: `An unexpected error occurred in the API route: ${errorMessage}` },
      { status: 500 },
    )
  }
}
