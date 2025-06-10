"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton({ href, children }: { href?: string; children?: React.ReactNode }) {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button variant="ghost" onClick={handleBack}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      {children || "Atrás"}
    </Button>
  )
}
