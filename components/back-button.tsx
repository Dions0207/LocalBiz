"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  const router = useRouter()
  return (
    <Button variant="ghost" size="icon" className="text-white" onClick={() => router.back()} aria-label="Volver atrás">
      <ArrowLeft className="h-5 w-5" />
    </Button>
  )
}
