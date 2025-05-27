"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation, X, Compass, MapPin, Target, Zap } from "lucide-react"

interface ARNavigationProps {
  destination: {
    name: string
    lat: number
    lng: number
    address: string
  }
  onClose: () => void
}

export default function ARNavigation({ destination, onClose }: ARNavigationProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [distance, setDistance] = useState<number>(0)
  const [bearing, setBearing] = useState<number>(0)
  const [deviceOrientation, setDeviceOrientation] = useState<number>(0)

  useEffect(() => {
    startARSession()
    return () => {
      stopARSession()
    }
  }, [])

  const startARSession = async () => {
    try {
      // Solicitar acceso a la cámara
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsActive(true)
      }

      // Solicitar orientación del dispositivo
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        if (permission === "granted") {
          window.addEventListener("deviceorientation", handleDeviceOrientation)
        }
      } else {
        window.addEventListener("deviceorientation", handleDeviceOrientation)
      }

      // Monitorear ubicación
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setUserLocation(location)
            updateNavigation(location)
          },
          (error) => console.error("Geolocation error:", error),
          { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 },
        )
      }
    } catch (error) {
      console.error("Error starting AR session:", error)
      alert("No se pudo acceder a la cámara. Verifica los permisos.")
    }
  }

  const stopARSession = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    window.removeEventListener("deviceorientation", handleDeviceOrientation)
    setIsActive(false)
  }

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setDeviceOrientation(event.alpha)
    }
  }

  const updateNavigation = (location: { lat: number; lng: number }) => {
    const dist = calculateDistance(location.lat, location.lng, destination.lat, destination.lng)
    const bear = calculateBearing(location.lat, location.lng, destination.lat, destination.lng)

    setDistance(dist)
    setBearing(bear)
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lng2 - lng1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const calculateBearing = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δλ = ((lng2 - lng1) * Math.PI) / 180

    const y = Math.sin(Δλ) * Math.cos(φ2)
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)

    const θ = Math.atan2(y, x)
    return ((θ * 180) / Math.PI + 360) % 360
  }

  const getDirectionInstruction = (): string => {
    if (!userLocation) return "Obteniendo ubicación..."

    const relativeBearing = (bearing - deviceOrientation + 360) % 360

    if (distance < 10) {
      return "🎯 ¡Has llegado a tu destino!"
    } else if (distance < 50) {
      return "📍 Muy cerca, busca el local"
    } else if (relativeBearing < 30 || relativeBearing > 330) {
      return "⬆️ Continúa derecho"
    } else if (relativeBearing >= 30 && relativeBearing < 150) {
      return "➡️ Gira a la derecha"
    } else if (relativeBearing >= 150 && relativeBearing < 210) {
      return "⬇️ Da la vuelta"
    } else {
      return "⬅️ Gira a la izquierda"
    }
  }

  const formatDistance = (dist: number): string => {
    if (dist < 1000) {
      return `${Math.round(dist)}m`
    } else {
      return `${(dist / 1000).toFixed(1)}km`
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* AR Overlay Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" width="1280" height="720" />

      {/* AR UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Info Bar */}
        <div className="absolute top-4 left-4 right-4">
          <Card className="bg-black/80 text-white border-none backdrop-blur-sm">
            <CardContent className="pt-3 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-bold text-sm">{destination.name}</p>
                    <p className="text-xs text-gray-300">{destination.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-400">{formatDistance(distance)}</p>
                  <p className="text-xs text-gray-300">distancia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Direction Arrow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="text-6xl animate-pulse"
            style={{
              transform: `rotate(${bearing - deviceOrientation}deg)`,
              transition: "transform 0.3s ease",
            }}
          >
            ⬆️
          </div>
        </div>

        {/* Direction Instruction */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
          <Card className="bg-blue-600/90 text-white border-none backdrop-blur-sm">
            <CardContent className="pt-3 pb-3">
              <div className="text-center">
                <p className="font-bold text-lg">{getDirectionInstruction()}</p>
                {distance > 10 && <p className="text-sm opacity-90">en {formatDistance(distance)}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compass */}
        <div className="absolute top-20 right-4">
          <div className="bg-black/80 rounded-full p-3 backdrop-blur-sm">
            <Compass
              className="h-8 w-8 text-white"
              style={{
                transform: `rotate(${-deviceOrientation}deg)`,
                transition: "transform 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Speed/Accuracy Indicators */}
        <div className="absolute bottom-20 left-4 right-4">
          <div className="flex justify-between">
            <Badge className="bg-green-600/90 text-white">
              <Target className="h-3 w-3 mr-1" />
              GPS: Alta precisión
            </Badge>
            <Badge className="bg-purple-600/90 text-white">
              <Zap className="h-3 w-3 mr-1" />
              AR: Activo
            </Badge>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="flex space-x-4">
          <Button onClick={onClose} className="bg-red-600 hover:bg-red-700 rounded-full px-6">
            <X className="h-5 w-5 mr-2" />
            Cerrar AR
          </Button>
          <Button variant="outline" className="bg-white/20 border-white/30 text-white rounded-full px-6">
            <MapPin className="h-5 w-5 mr-2" />
            Mapa
          </Button>
        </div>
      </div>
    </div>
  )
}
