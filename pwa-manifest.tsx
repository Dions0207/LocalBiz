"use client"

import { useEffect } from "react"

export default function PWAManifest() {
  useEffect(() => {
    // Registrar Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }

    // Configurar manifest dinámicamente
    const manifest = {
      name: "LocalBiz - Mobile First Business Hub",
      short_name: "LocalBiz",
      description: "Encuentra negocios locales con IA, AR y pagos crypto",
      start_url: "/",
      display: "standalone",
      background_color: "#6366f1",
      theme_color: "#6366f1",
      orientation: "portrait",
      scope: "/",
      icons: [
        {
          src: "/placeholder.svg?height=192&width=192",
          sizes: "192x192",
          type: "image/svg+xml",
          purpose: "any maskable",
        },
        {
          src: "/placeholder.svg?height=512&width=512",
          sizes: "512x512",
          type: "image/svg+xml",
          purpose: "any maskable",
        },
      ],
      categories: ["business", "shopping", "navigation"],
      screenshots: [
        {
          src: "/placeholder.svg?height=640&width=360",
          sizes: "360x640",
          type: "image/svg+xml",
          form_factor: "narrow",
        },
        {
          src: "/placeholder.svg?height=800&width=1280",
          sizes: "1280x800",
          type: "image/svg+xml",
          form_factor: "wide",
        },
      ],
      shortcuts: [
        {
          name: "Buscar Negocios",
          short_name: "Buscar",
          description: "Encuentra negocios cerca de ti",
          url: "/?action=search",
          icons: [{ src: "/placeholder.svg?height=96&width=96", sizes: "96x96" }],
        },
        {
          name: "Navegación AR",
          short_name: "AR Nav",
          description: "Navega con realidad aumentada",
          url: "/?action=ar",
          icons: [{ src: "/placeholder.svg?height=96&width=96", sizes: "96x96" }],
        },
        {
          name: "Afiliados",
          short_name: "Afiliados",
          description: "Ver ganancias de afiliados",
          url: "/?action=affiliate",
          icons: [{ src: "/placeholder.svg?height=96&width=96", sizes: "96x96" }],
        },
      ],
      related_applications: [
        {
          platform: "play",
          url: "https://play.google.com/store/apps/details?id=com.localbiz.app",
          id: "com.localbiz.app",
        },
        {
          platform: "itunes",
          url: "https://apps.apple.com/app/localbiz/id123456789",
          id: "123456789",
        },
      ],
      prefer_related_applications: false,
    }

    // Crear y agregar el manifest
    const manifestBlob = new Blob([JSON.stringify(manifest)], { type: "application/json" })
    const manifestURL = URL.createObjectURL(manifestBlob)
    const link = document.createElement("link")
    link.rel = "manifest"
    link.href = manifestURL
    document.head.appendChild(link)

    return () => {
      URL.revokeObjectURL(manifestURL)
      document.head.removeChild(link)
    }
  }, [])

  return null
}
