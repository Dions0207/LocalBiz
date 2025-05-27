"use client"

import { useEffect, useState } from "react"

interface GeofenceZone {
  id: string
  name: string
  lat: number
  lng: number
  radius: number
  offer: string
  discount: number
  businessId: string
  active: boolean
}

export default function GeofencingService() {
  const [geofences, setGeofences] = useState<GeofenceZone[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [activeZones, setActiveZones] = useState<GeofenceZone[]>([])

  useEffect(() => {
    // Configurar geofences predefinidas
    const predefinedGeofences: GeofenceZone[] = [
      {
        id: "tacos-el-guero",
        name: "Tacos El Güero",
        lat: 19.4326,
        lng: -99.1332,
        radius: 100,
        offer: "🌮 20% OFF en tacos al pastor + Bebida gratis",
        discount: 20,
        businessId: "1",
        active: true,
      },
      {
        id: "cafe-literario",
        name: "Café Literario",
        lat: 19.4284,
        lng: -99.1276,
        radius: 150,
        offer: "☕ Café americano gratis con cualquier postre",
        discount: 100,
        businessId: "2",
        active: true,
      },
      {
        id: "boutique-luna",
        name: "Boutique Luna",
        lat: 19.4269,
        lng: -99.1276,
        radius: 80,
        offer: "👗 30% OFF en toda la tienda + Envío gratis",
        discount: 30,
        businessId: "3",
        active: true,
      },
      {
        id: "mecanica-express",
        name: "Mecánica Express",
        lat: 19.425,
        lng: -99.13,
        radius: 120,
        offer: "🔧 Diagnóstico gratis + 15% OFF en reparaciones",
        discount: 15,
        businessId: "4",
        active: true,
      },
      {
        id: "salon-glamour",
        name: "Salón Glamour",
        lat: 19.431,
        lng: -99.135,
        radius: 90,
        offer: "💄 Corte + Peinado por $299 USDT (50% OFF)",
        discount: 50,
        businessId: "5",
        active: true,
      },
    ]

    setGeofences(predefinedGeofences)
  }, [])

  useEffect(() => {
    // Monitoreo continuo de ubicación
    let watchId: number

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(newLocation)
          checkGeofences(newLocation)
        },
        (error) => {
          console.error("Geolocation error:", error)
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 15000,
        },
      )
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [geofences])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3 // Radio de la Tierra en metros
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lng2 - lng1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const checkGeofences = (location: { lat: number; lng: number }) => {
    const enteredZones = geofences.filter((fence) => {
      if (!fence.active) return false
      const distance = calculateDistance(location.lat, location.lng, fence.lat, fence.lng)
      return distance <= fence.radius
    })

    // Detectar nuevas zonas
    const newZones = enteredZones.filter((zone) => !activeZones.find((active) => active.id === zone.id))

    if (newZones.length > 0) {
      setActiveZones(enteredZones)
      // Enviar notificaciones para nuevas zonas
      newZones.forEach((zone) => {
        sendGeofenceNotification(zone)
        trackGeofenceEntry(zone, location)
      })
    } else if (enteredZones.length === 0 && activeZones.length > 0) {
      // Usuario salió de todas las zonas
      setActiveZones([])
    }
  }

  const sendGeofenceNotification = (zone: GeofenceZone) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(`🎯 ¡Oferta cerca de ti!`, {
        body: `${zone.name}: ${zone.offer}`,
        icon: "/placeholder.svg?height=64&width=64",
        badge: "/placeholder.svg?height=32&width=32",
        tag: `geofence-${zone.id}`,
        requireInteraction: true,
        actions: [
          { action: "view", title: "Ver Oferta" },
          { action: "navigate", title: "Ir al Local" },
          { action: "share", title: "Compartir" },
        ],
        data: {
          zoneId: zone.id,
          businessId: zone.businessId,
          offer: zone.offer,
          discount: zone.discount,
        },
      })

      notification.onclick = () => {
        window.focus()
        // Navegar a la página del negocio
        window.location.href = `/?business=${zone.businessId}&offer=${zone.id}`
      }

      // Auto-cerrar después de 10 segundos
      setTimeout(() => {
        notification.close()
      }, 10000)
    }

    // También enviar evento personalizado para la UI
    window.dispatchEvent(
      new CustomEvent("geofenceEntered", {
        detail: zone,
      }),
    )
  }

  const trackGeofenceEntry = (zone: GeofenceZone, location: { lat: number; lng: number }) => {
    // Analytics de geofencing
    const eventData = {
      event: "geofence_entered",
      zone_id: zone.id,
      zone_name: zone.name,
      business_id: zone.businessId,
      user_lat: location.lat,
      user_lng: location.lng,
      timestamp: new Date().toISOString(),
      offer: zone.offer,
      discount: zone.discount,
    }

    // Enviar a analytics
    console.log("Geofence Analytics:", eventData)

    // Aquí se enviaría a tu servicio de analytics
    // analytics.track('geofence_entered', eventData)
  }

  // Función para agregar nuevas geofences dinámicamente
  const addGeofence = (newGeofence: Omit<GeofenceZone, "id">) => {
    const geofence: GeofenceZone = {
      ...newGeofence,
      id: `geofence-${Date.now()}`,
    }
    setGeofences((prev) => [...prev, geofence])
  }

  // Función para desactivar geofence
  const deactivateGeofence = (zoneId: string) => {
    setGeofences((prev) => prev.map((fence) => (fence.id === zoneId ? { ...fence, active: false } : fence)))
  }

  return {
    geofences,
    activeZones,
    userLocation,
    addGeofence,
    deactivateGeofence,
  }
}
