"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Phone,
  Star,
  Clock,
  Navigation,
  Share2,
  Store,
  Zap,
  CreditCard,
  Bitcoin,
  Bell,
  Camera,
  Download,
  Smartphone,
  Volume2,
  VolumeX,
  Settings,
  Menu,
  X,
  Home,
  Map,
  QrCode,
  UserPlus,
  Crown,
  Banknote,
  MapPin,
  Plus,
  Users,
  TrendingUp,
  ArrowUpDown,
  Shield,
  Gift,
  Megaphone,
  BarChart3,
  Scan,
  Copy,
  Check,
  Send,
  Edit,
  Play,
  Pause,
  ShoppingCart,
  Building,
  Globe,
  HelpCircle,
  Link,
  Wallet,
} from "lucide-react"

export default function MobileFirstLocalBiz() {
  const [currentPage, setCurrentPage] = useState("home")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [currentAd, setCurrentAd] = useState(0)
  const [usdtPrice, setUsdtPrice] = useState(1.0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isAppInstalled, setIsAppInstalled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [geofenceActive, setGeofenceActive] = useState(false)
  const [arMode, setArMode] = useState(false)
  const [nearbyOffers, setNearbyOffers] = useState<any[]>([])
  const [affiliateEarnings, setAffiliateEarnings] = useState(0)
  const [affiliateCode, setAffiliateCode] = useState("LOCALBIZ2024")
  const [referredUsers, setReferredUsers] = useState(0)
  const [qrScanning, setQrScanning] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [adCampaigns, setAdCampaigns] = useState<any[]>([])
  const [p2pOrders, setP2pOrders] = useState<any[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Detectar si es PWA o app nativa
  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isInWebAppiOS = (window.navigator as any).standalone === true
    const isInWebAppChrome = window.matchMedia("(display-mode: standalone)").matches
    setIsAppInstalled(isStandalone || isInWebAppiOS || isInWebAppChrome)
  }, [])

  // Simular datos de anuncios
  useEffect(() => {
    const campaigns = [
      {
        id: 1,
        business: "Pizza Palace",
        title: "🍕 Pizza Palace - 50% OFF",
        subtitle: "Ordena ahora y paga con USDT",
        image: "/placeholder.svg?height=200&width=400",
        cta: "Ordenar Ahora",
        gradient: "from-red-500 to-orange-500",
        budget: 500,
        spent: 234,
        clicks: 1247,
        impressions: 15678,
        ctr: 7.95,
        active: true,
        duration: "7 días restantes",
      },
      {
        id: 2,
        business: "Salón Glamour",
        title: "💄 Salón Glamour - Promoción",
        subtitle: "Corte + Color por solo $299 USDT",
        image: "/placeholder.svg?height=200&width=400",
        cta: "Reservar Cita",
        gradient: "from-pink-500 to-purple-500",
        budget: 300,
        spent: 156,
        clicks: 892,
        impressions: 12456,
        ctr: 7.16,
        active: true,
        duration: "3 días restantes",
      },
      {
        id: 3,
        business: "AutoService Express",
        title: "🚗 AutoService Express",
        subtitle: "Afinación completa - Acepta crypto",
        image: "/placeholder.svg?height=200&width=400",
        cta: "Agendar",
        gradient: "from-blue-500 to-cyan-500",
        budget: 750,
        spent: 445,
        clicks: 1567,
        impressions: 18923,
        ctr: 8.28,
        active: true,
        duration: "12 días restantes",
      },
    ]
    setAdCampaigns(campaigns)

    // Simular órdenes P2P
    const orders = [
      {
        id: 1,
        user: "CryptoTrader123",
        amount: "500 USDT",
        rate: "0.998",
        method: "Banco",
        type: "buy",
        status: "active",
        time: "2 min",
        rating: 4.9,
        trades: 234,
      },
      {
        id: 2,
        user: "LocalExchange",
        amount: "1000 USDT",
        rate: "0.999",
        method: "PayPal",
        type: "sell",
        status: "active",
        time: "5 min",
        rating: 4.8,
        trades: 567,
      },
      {
        id: 3,
        user: "FastCrypto",
        amount: "250 USDT",
        rate: "0.997",
        method: "Zelle",
        type: "buy",
        status: "active",
        time: "1 min",
        rating: 5.0,
        trades: 89,
      },
    ]
    setP2pOrders(orders)
  }, [])

  // Geolocalización y Geofencing
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(newLocation)
          checkGeofences(newLocation)
        },
        (error) => {
          console.log("Geolocation error:", error)
          setUserLocation({ lat: 19.4326, lng: -99.1332 })
        },
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 },
      )
    }
  }, [])

  // Rotar anuncios automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adCampaigns.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [adCampaigns.length])

  // Simular precio USDT
  useEffect(() => {
    const interval = setInterval(() => {
      setUsdtPrice(0.998 + Math.random() * 0.004)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Sistema de Afiliados
  useEffect(() => {
    const interval = setInterval(() => {
      setAffiliateEarnings((prev) => prev + Math.random() * 5)
      if (Math.random() > 0.7) {
        setReferredUsers((prev) => prev + 1)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Función de Geofencing
  const checkGeofences = (location: { lat: number; lng: number }) => {
    const geofences = [
      {
        id: 1,
        name: "Tacos El Güero",
        lat: 19.4326,
        lng: -99.1332,
        radius: 100,
        offer: "🌮 20% OFF en tacos al pastor - Solo por estar cerca!",
        discount: 20,
      },
      {
        id: 2,
        name: "Café Literario",
        lat: 19.4284,
        lng: -99.1276,
        radius: 150,
        offer: "☕ Café gratis con cualquier postre - Geolocalización activa!",
        discount: 100,
      },
    ]

    const activeOffers = geofences.filter((fence) => {
      const distance = calculateDistance(location.lat, location.lng, fence.lat, fence.lng)
      return distance <= fence.radius
    })

    if (activeOffers.length > 0) {
      setNearbyOffers(activeOffers)
      setGeofenceActive(true)
      if (notificationsEnabled) {
        sendPushNotification(activeOffers[0])
      }
    } else {
      setGeofenceActive(false)
      setNearbyOffers([])
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lng2 - lng1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationsEnabled(permission === "granted")
      return permission === "granted"
    }
    return false
  }

  const sendPushNotification = (offer: any) => {
    if (notificationsEnabled && "Notification" in window) {
      new Notification(`🎯 Oferta cerca de ti!`, {
        body: `${offer.name}: ${offer.offer}`,
        icon: "/placeholder.svg?height=64&width=64",
        badge: "/placeholder.svg?height=32&width=32",
        tag: `offer-${offer.id}`,
        requireInteraction: true,
      })
    }
  }

  const startARNavigation = async (business: any) => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setArMode(true)
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("No se pudo acceder a la cámara para AR")
    }
  }

  const stopARNavigation = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setArMode(false)
  }

  const startQRScanning = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setQrScanning(true)
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("No se pudo acceder a la cámara para escanear QR")
    }
  }

  const stopQRScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setQrScanning(false)
  }

  const copyAffiliateCode = () => {
    navigator.clipboard.writeText(affiliateCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const installPWA = () => {
    alert("🚀 LocalBiz se está instalando en tu dispositivo...")
    setTimeout(() => {
      setIsAppInstalled(true)
      alert("✅ ¡App instalada! Ahora puedes acceder desde tu pantalla de inicio")
    }, 2000)
  }

  const handleAdClick = (ad: any) => {
    // Incrementar clicks del anuncio
    setAdCampaigns((prev) =>
      prev.map((campaign) => (campaign.id === ad.id ? { ...campaign, clicks: campaign.clicks + 1 } : campaign)),
    )
    alert(`🎯 Redirigiendo a ${ad.business}...`)
  }

  const businesses = [
    {
      id: 1,
      name: "Tacos El Güero",
      category: "food",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 234,
      address: "Av. Insurgentes Sur 1234, Roma Norte",
      phone: "+52 55 1234-5678",
      hours: "Lun-Dom 8:00-22:00",
      distance: 0.3,
      description: "Los mejores tacos al pastor de la zona. Más de 20 años sirviendo sabor auténtico.",
      verified: true,
      featured: true,
      acceptsCrypto: true,
      acceptsCards: true,
      coordinates: { lat: 19.4326, lng: -99.1332 },
      promotion: "🔥 20% OFF pagando con USDT",
      avgPrice: "$150 MXN / $8 USDT",
      aiScore: 94,
      geofenceActive: true,
      specialties: ["Tacos al Pastor", "Quesadillas", "Salsas Caseras"],
    },
    {
      id: 2,
      name: "Boutique Luna",
      category: "retail",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      reviews: 89,
      address: "Calle Álvaro Obregón 567, Condesa",
      phone: "+52 55 2345-6789",
      hours: "Lun-Sáb 10:00-20:00",
      distance: 0.7,
      description: "Ropa femenina única y accesorios exclusivos.",
      verified: false,
      featured: false,
      acceptsCrypto: true,
      acceptsCards: true,
      coordinates: { lat: 19.4284, lng: -99.1276 },
      promotion: "💎 Envío gratis con compras >$50 USDT",
      avgPrice: "$500-2000 MXN / $25-100 USDT",
      aiScore: 87,
      geofenceActive: false,
      specialties: ["Vestidos", "Accesorios", "Ropa Casual"],
    },
    {
      id: 3,
      name: "Mecánica Express",
      category: "automotive",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      reviews: 156,
      address: "Eje Central Lázaro Cárdenas 890, Centro",
      phone: "+52 55 3456-7890",
      hours: "Lun-Vie 8:00-18:00, Sáb 8:00-14:00",
      distance: 1.2,
      description: "Servicio automotriz completo. Especialistas en transmisiones y frenos.",
      verified: true,
      featured: true,
      acceptsCrypto: true,
      acceptsCards: true,
      coordinates: { lat: 19.4269, lng: -99.1276 },
      promotion: "⚡ Diagnóstico gratis + 15% OFF",
      avgPrice: "$800-3000 MXN / $40-150 USDT",
      aiScore: 76,
      geofenceActive: false,
      specialties: ["Transmisiones", "Frenos", "Afinaciones"],
    },
  ]

  const categories = [
    { id: "all", name: "Todos", icon: "🏪", count: 1247 },
    { id: "food", name: "Comida", icon: "🍕", count: 324 },
    { id: "retail", name: "Retail", icon: "👕", count: 189 },
    { id: "services", name: "Servicios", icon: "🔧", count: 156 },
    { id: "beauty", name: "Belleza", icon: "💄", count: 87 },
    { id: "automotive", name: "Auto", icon: "🚗", count: 76 },
  ]

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || business.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Renderizar páginas según currentPage
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return renderHomePage()
      case "map":
        return renderMapPage()
      case "qr":
        return renderQRPage()
      case "affiliate":
        return renderAffiliatePage()
      case "settings":
        return renderSettingsPage()
      case "advertiser":
        return renderAdvertiserPage()
      case "p2p":
        return renderP2PPage()
      case "crypto":
        return renderCryptoPage()
      default:
        return renderHomePage()
    }
  }

  const renderHomePage = () => (
    <div className="space-y-4">
      {/* Banner publicitario rotativo FUNCIONAL */}
      {adCampaigns.length > 0 && (
        <div
          className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
          onClick={() => handleAdClick(adCampaigns[currentAd])}
        >
          <div
            className={`bg-gradient-to-r ${adCampaigns[currentAd].gradient} p-6 text-white relative`}
            style={{ minHeight: "180px" }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 mr-2 text-yellow-300" />
                <Badge className="bg-yellow-400 text-black font-bold text-xs">PROMOCIÓN ESPECIAL</Badge>
              </div>
              <h2 className="text-xl font-bold mb-2">{adCampaigns[currentAd].title}</h2>
              <p className="text-sm mb-3 opacity-90">{adCampaigns[currentAd].subtitle}</p>
              <div className="flex items-center justify-between">
                <Button size="sm" className="bg-white text-black hover:bg-gray-100 font-bold">
                  <Gift className="h-4 w-4 mr-2" />
                  {adCampaigns[currentAd].cta}
                </Button>
                <div className="text-xs">
                  <p>👆 {adCampaigns[currentAd].clicks.toLocaleString()} clicks</p>
                  <p>👁️ {adCampaigns[currentAd].impressions.toLocaleString()} vistas</p>
                </div>
              </div>
            </div>
            {/* Indicadores de banner */}
            <div className="absolute bottom-3 left-6 flex space-x-1">
              {adCampaigns.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentAd ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
            {/* Badge de anuncio */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-black/50 text-white text-xs">
                <Megaphone className="h-3 w-3 mr-1" />
                Anuncio
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Stats rápidos */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-xs opacity-90">Negocios</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <p className="text-2xl font-bold">+23</p>
              <p className="text-xs opacity-90">Nuevos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categorías */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex-shrink-0 text-sm ${
              selectedCategory === category.id ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "bg-white"
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>

      {/* Lista de negocios */}
      <div className="space-y-4">
        {filteredBusinesses.map((business) => (
          <Card
            key={business.id}
            className="hover:shadow-lg transition-all duration-300 bg-white border-2 border-transparent hover:border-purple-200 cursor-pointer"
            onClick={() => setSelectedBusiness(business)}
          >
            <div className="relative">
              <img
                src={business.image || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              {business.geofenceActive && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                  🎯 Cerca de ti
                </Badge>
              )}
              {business.featured && (
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                  ⭐ Destacado
                </Badge>
              )}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                📍 {business.distance} km
              </div>
            </div>

            <CardContent className="p-3">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{business.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{business.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{business.description}</p>

              {business.promotion && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-2 mb-3">
                  <p className="text-sm font-bold text-red-700">{business.promotion}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Abierto</span>
                </div>
                <div className="flex items-center space-x-2">
                  {business.acceptsCrypto && (
                    <Badge variant="outline" className="text-xs bg-yellow-50">
                      <Bitcoin className="h-3 w-3 mr-1" />
                      USDT
                    </Badge>
                  )}
                  {business.acceptsCards && (
                    <Badge variant="outline" className="text-xs bg-blue-50">
                      <CreditCard className="h-3 w-3 mr-1" />
                      USD
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                  <Phone className="h-3 w-3 mr-1" />
                  Llamar
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    startARNavigation(business)
                  }}
                >
                  <Camera className="h-3 w-3 mr-1" />
                  AR Nav
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Share2 className="h-3 w-3 mr-1" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMapPage = () => (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="mr-2 h-6 w-6 text-green-600" />
            Mapa Interactivo
          </CardTitle>
          <p className="text-sm text-gray-600">Encuentra negocios cerca de ti</p>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 opacity-20"></div>
            <div className="text-center z-10">
              <MapPin className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Mapa en Desarrollo</h3>
              <p className="text-sm text-gray-600 mb-4">Integración con Google Maps próximamente</p>
              <Button className="bg-green-600 hover:bg-green-700">
                <Navigation className="h-4 w-4 mr-2" />
                Activar GPS
              </Button>
            </div>
            {/* Simular pins en el mapa */}
            <div className="absolute top-4 left-4 bg-red-500 rounded-full w-4 h-4 animate-pulse"></div>
            <div className="absolute top-12 right-8 bg-blue-500 rounded-full w-4 h-4 animate-pulse"></div>
            <div className="absolute bottom-8 left-12 bg-yellow-500 rounded-full w-4 h-4 animate-pulse"></div>
            <div className="absolute bottom-4 right-4 bg-purple-500 rounded-full w-4 h-4 animate-pulse"></div>
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="font-bold">Negocios Cercanos</h3>
            {businesses.slice(0, 3).map((business) => (
              <div key={business.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Store className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{business.name}</p>
                    <p className="text-xs text-gray-600">
                      {business.distance} km • {business.category}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Navigation className="h-3 w-3 mr-1" />
                  Ir
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderQRPage = () => (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="mr-2 h-6 w-6 text-purple-600" />
            Escáner QR
          </CardTitle>
          <p className="text-sm text-gray-600">Escanea códigos QR de negocios para ofertas exclusivas</p>
        </CardHeader>
        <CardContent>
          {qrScanning ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover rounded-lg"
                style={{ transform: "scaleX(-1)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-4 border-white rounded-lg w-48 h-48 relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500"></div>
                </div>
              </div>
              <Button
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700"
                onClick={stopQRScanning}
              >
                <X className="h-4 w-4 mr-2" />
                Detener
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Scan className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Escanear Código QR</h3>
              <p className="text-sm text-gray-600 mb-6">
                Apunta tu cámara al código QR del negocio para acceder a ofertas exclusivas
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={startQRScanning}>
                <Camera className="h-4 w-4 mr-2" />
                Iniciar Escáner
              </Button>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <h3 className="font-bold">Códigos Escaneados Recientemente</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <QrCode className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-sm">Tacos El Güero</p>
                    <p className="text-xs text-gray-600">Hace 2 horas • 20% OFF</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Usado</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <QrCode className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-sm">Café Literario</p>
                    <p className="text-xs text-gray-600">Ayer • Café gratis</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAffiliatePage = () => (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="mr-2 h-6 w-6 text-yellow-600" />
            Programa de Afiliados
          </CardTitle>
          <p className="text-sm text-gray-600">Gana 20% de comisión infinita por cada referido</p>
        </CardHeader>
        <CardContent>
          {/* Dashboard de ganancias */}
          <div className="bg-white rounded-lg p-4 border mb-4">
            <h3 className="font-bold mb-3 flex items-center">
              <Banknote className="h-5 w-5 mr-2 text-green-600" />
              Resumen de Ganancias
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">${affiliateEarnings.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Total USDT</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{referredUsers}</p>
                <p className="text-sm text-gray-600">Referidos Activos</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">20%</p>
                <p className="text-xs text-gray-600">Comisión</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-orange-600">♾️</p>
                <p className="text-xs text-gray-600">Duración</p>
              </div>
            </div>
          </div>

          {/* Código de referido */}
          <div className="bg-white rounded-lg p-4 border mb-4">
            <h3 className="font-bold mb-3 flex items-center">
              <Link className="h-5 w-5 mr-2 text-blue-600" />
              Tu Código de Referido
            </h3>
            <div className="bg-gray-50 p-3 rounded border-2 border-dashed flex items-center justify-between">
              <p className="font-mono text-lg font-bold">{affiliateCode}</p>
              <Button size="sm" variant="outline" onClick={copyAffiliateCode}>
                {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir Código
            </Button>
          </div>

          {/* Estructura de comisiones */}
          <div className="bg-white rounded-lg p-4 border mb-4">
            <h3 className="font-bold mb-3 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
              Estructura de Comisiones
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm">Por cada compra de referido:</span>
                <Badge className="bg-green-600">20% USDT</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm">Duración de comisión:</span>
                <Badge className="bg-blue-600">♾️ Infinita</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                <span className="text-sm">Pago mínimo:</span>
                <Badge className="bg-purple-600">$10 USDT</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <span className="text-sm">Bono de registro:</span>
                <Badge className="bg-orange-600">$5 USDT</Badge>
              </div>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-lg p-4 border mb-4">
            <h3 className="font-bold mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Actividad Reciente
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border-l-4 border-green-500 bg-green-50">
                <div>
                  <p className="text-sm font-medium">Nuevo referido</p>
                  <p className="text-xs text-gray-600">Usuario registrado con tu código</p>
                </div>
                <span className="text-green-600 font-bold">+$5.00</span>
              </div>
              <div className="flex items-center justify-between p-2 border-l-4 border-blue-500 bg-blue-50">
                <div>
                  <p className="text-sm font-medium">Comisión ganada</p>
                  <p className="text-xs text-gray-600">Compra en Tacos El Güero</p>
                </div>
                <span className="text-blue-600 font-bold">+$1.60</span>
              </div>
              <div className="flex items-center justify-between p-2 border-l-4 border-purple-500 bg-purple-50">
                <div>
                  <p className="text-sm font-medium">Pago procesado</p>
                  <p className="text-xs text-gray-600">Retiro a wallet USDT</p>
                </div>
                <span className="text-purple-600 font-bold">-$25.00</span>
              </div>
            </div>
          </div>

          {/* Botón de retiro */}
          <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
            <Banknote className="h-4 w-4 mr-2" />
            Retirar Ganancias (${affiliateEarnings.toFixed(2)} USDT)
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderAdvertiserPage = () => (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Megaphone className="mr-2 h-6 w-6 text-indigo-600" />
            Dashboard de Anunciantes
          </CardTitle>
          <p className="text-sm text-gray-600">Gestiona tus campañas publicitarias</p>
        </CardHeader>
        <CardContent>
          {/* Estadísticas de campaña */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="bg-white">
              <CardContent className="pt-4 pb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {adCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Total Clicks</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-4 pb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {adCampaigns.reduce((sum, campaign) => sum + campaign.impressions, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Impresiones</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campañas activas */}
          <div className="space-y-3 mb-4">
            <h3 className="font-bold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Campañas Activas
            </h3>
            {adCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-white">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{campaign.business}</h4>
                      <p className="text-sm text-gray-600">{campaign.duration}</p>
                    </div>
                    <Badge className={campaign.active ? "bg-green-600" : "bg-gray-600"}>
                      {campaign.active ? "Activa" : "Pausada"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{campaign.clicks.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Clicks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">{campaign.impressions.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Vistas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{campaign.ctr}%</p>
                      <p className="text-xs text-gray-600">CTR</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Presupuesto usado</span>
                      <span>
                        ${campaign.spent} / ${campaign.budget} USDT
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      {campaign.active ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                      {campaign.active ? "Pausar" : "Reanudar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Crear nueva campaña */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg">Crear Nueva Campaña</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Título del Anuncio</label>
                <Input placeholder="Ej: 50% OFF en toda la tienda" />
              </div>
              <div>
                <label className="text-sm font-medium">Descripción</label>
                <Textarea placeholder="Describe tu promoción..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Presupuesto (USDT)</label>
                  <Input placeholder="100" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Duración (días)</label>
                  <Input placeholder="7" type="number" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Método de Pago</label>
                <select className="w-full p-2 border rounded-md">
                  <option>USDT (Tether)</option>
                  <option>Tarjeta de Crédito</option>
                  <option>PayPal</option>
                </select>
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                Crear Campaña ($50 USDT)
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )

  const renderP2PPage = () => (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowUpDown className="mr-2 h-6 w-6 text-cyan-600" />
            P2P Exchange
          </CardTitle>
          <p className="text-sm text-gray-600">Intercambia USDT ↔ USD con otros usuarios</p>
        </CardHeader>
        <CardContent>
          {/* Precio actual */}
          <div className="bg-white rounded-lg p-4 border mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Precio USDT</p>
                <p className="text-2xl font-bold">${usdtPrice.toFixed(3)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Cambio 24h</p>
                <p className="text-lg font-bold text-green-600">+0.02%</p>
              </div>
            </div>
          </div>

          {/* Formularios de compra/venta */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center text-lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Comprar USDT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Cantidad USD</label>
                  <Input placeholder="100.00" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Recibirás USDT</label>
                  <Input placeholder="99.80" disabled className="bg-gray-50" />
                </div>
                <div>
                  <label className="text-sm font-medium">Método de pago</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Transferencia bancaria</option>
                    <option>Tarjeta de crédito</option>
                    <option>PayPal</option>
                    <option>Zelle</option>
                  </select>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Comprar USDT
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center text-lg">
                  <TrendingUp className="mr-2 h-5 w-5 rotate-180" />
                  Vender USDT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Cantidad USDT</label>
                  <Input placeholder="100.00" type="number" />
                </div>
                <div>
                  <label className="text-sm font-medium">Recibirás USD</label>
                  <Input placeholder="99.50" disabled className="bg-gray-50" />
                </div>
                <div>
                  <label className="text-sm font-medium">Método de cobro</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Transferencia bancaria</option>
                    <option>PayPal</option>
                    <option>Zelle</option>
                    <option>Wise</option>
                  </select>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Send className="h-4 w-4 mr-2" />
                  Vender USDT
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Órdenes P2P activas */}
          <div className="space-y-3">
            <h3 className="font-bold flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Órdenes P2P Activas
            </h3>
            {p2pOrders.map((order) => (
              <Card key={order.id} className="bg-white">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant={order.type === "buy" ? "default" : "destructive"} className="text-xs">
                        {order.type === "buy" ? "COMPRA" : "VENDE"}
                      </Badge>
                      <div>
                        <p className="font-semibold text-sm">{order.user}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <span>⭐ {order.rating}</span>
                          <span>• {order.trades} trades</span>
                          <span>• {order.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{order.amount}</p>
                      <p className="text-sm text-gray-600">
                        ${order.rate} • {order.method}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700">
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    Intercambiar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Crear orden */}
          <Card className="bg-white mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Crear Orden P2P</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-green-500 text-green-600">
                  Comprar USDT
                </Button>
                <Button variant="outline" className="border-red-500 text-red-600">
                  Vender USDT
                </Button>
              </div>
              <div>
                <label className="text-sm font-medium">Cantidad</label>
                <Input placeholder="100.00" type="number" />
              </div>
              <div>
                <label className="text-sm font-medium">Precio por USDT</label>
                <Input placeholder="0.998" type="number" step="0.001" />
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                <Plus className="h-4 w-4 mr-2" />
                Publicar Orden
              </Button>
            </CardContent>
          </CardContent>
      </Card>
    </div>
  )

  const renderCryptoPage = () => (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bitcoin className="mr-2 h-6 w-6 text-yellow-600" />
            Crypto Payment Hub
          </CardTitle>
          <p className="text-sm text-gray-600">Gestionaestiona tus pagos en criptomonedas</p>
        </CardHeader>
        <CardContent>
          {/* Wallet Balance */}
          <div className="bg-white rounded-lg p-4 border mb-4">
            <h3 className="font-bold mb-3 flex items-center">
              <Wallet className="h-5 w-5 mr-2" />
              LocalBiz Wallet
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">0.00</p>
                <p className="text-sm text-gray-600">USDT</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">$0.00</p>
                <p className="text-sm text-gray-600">USD</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                <Plus className="h-3 w-3 mr-1" />
                Agregar USDT
              </Button>
              <Button size="sm" variant="outline">
                <Send className="h-3 w-3 mr-1" />
                Enviar
              </Button>
            </div>
          </div>

          {/* Métodos de pago */}
          <div className="space-y-3 mb-4">
            <h3 className="font-bold">Métodos de Pago Disponibles</h3>
            <div className="space-y-2">
              <Card className="bg-white">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-100 rounded-full p-2">
                        <Bitcoin className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold">USDT (Tether)</p>
                        <p className="text-sm text-gray-600">Comisión: 0.5%</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Activo</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-2">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Tarjetas USD</p>
                        <p className="text-sm text-gray-600">Visa/Mastercard • 2.9%</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600">Activo</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 rounded-full p-2">
                        <Building className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold">Transferencia Bancaria</p>
                        <p className="text-sm text-gray-600">ACH/Wire • 1.5%</p>
                      </div>
                    </div>
                    <Badge variant="outline">Próximamente</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Historial de transacciones */}
          <div className="space-y-3">
            <h3 className="font-bold flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Historial de Transacciones
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <ShoppingCart className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Tacos El Güero</p>
                    <p className="text-xs text-gray-600">Hace 2 horas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">-8.00 USDT</p>
                  <Badge className="bg-green-100 text-green-800 text-xs">Completado</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Recarga Wallet</p>
                    <p className="text-xs text-gray-600">Ayer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">+50.00 USDT</p>
                  <Badge className="bg-green-100 text-green-800 text-xs">Completado</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <Crown className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Comisión Afiliado</p>
                    <p className="text-xs text-gray-600">Hace 3 días</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">+1.60 USDT</p>
                  <Badge className="bg-green-100 text-green-800 text-xs">Completado</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettingsPage = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-6 w-6" />
            Configuración
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Notificaciones */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Notificaciones Push</p>
              <p className="text-sm text-gray-600">Ofertas y promociones cercanas</p>
            </div>
            <Button
              variant={notificationsEnabled ? "default" : "outline"}
              size="sm"
              onClick={requestNotificationPermission}
            >
              {notificationsEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>

          {/* Geolocalización */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Geolocalización</p>
              <p className="text-sm text-gray-600">Ofertas basadas en ubicación</p>
            </div>
            <Badge variant={userLocation ? "default" : "secondary"}>{userLocation ? "Activa" : "Inactiva"}</Badge>
          </div>

          {/* App Installation */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">App Nativa</p>
              <p className="text-sm text-gray-600">Instalar en dispositivo</p>
            </div>
            <Button variant={isAppInstalled ? "default" : "outline"} size="sm" onClick={installPWA}>
              {isAppInstalled ? <Smartphone className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            </Button>
          </div>

          {/* AR Settings */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Navegación AR</p>
              <p className="text-sm text-gray-600">Realidad aumentada disponible</p>
            </div>
            <Badge variant="default" className="bg-indigo-600">
              <Camera className="h-3 w-3 mr-1" />
              Disponible
            </Badge>
          </div>

          {/* Crypto Settings */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Pagos Crypto</p>
              <p className="text-sm text-gray-600">USDT habilitado</p>
            </div>
            <Badge variant="default" className="bg-yellow-600">
              <Bitcoin className="h-3 w-3 mr-1" />
              USDT
            </Badge>
          </div>

          {/* Idioma */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Idioma</p>
              <p className="text-sm text-gray-600">Español (México)</p>
            </div>
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4" />
            </Button>
          </div>

          {/* Privacidad */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Privacidad</p>
              <p className="text-sm text-gray-600">Gestionar datos personales</p>
            </div>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4" />
            </Button>
          </div>

          {/* Soporte */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Soporte</p>
              <p className="text-sm text-gray-600">Ayuda y contacto</p>
            </div>
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Cerrar sesión */}
          <Button variant="destructive" className="w-full">
            <X className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* AR Mode Overlay */}
      {arMode && (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg animate-pulse">
                <div className="flex items-center mb-2">
                  <Navigation className="h-6 w-6 mr-2" />
                  <span className="font-bold">Navegación AR</span>
                </div>
                <p className="text-sm">📍 Tacos El Güero - 50m adelante</p>
                <p className="text-xs">🎯 Gira a la derecha en 30m</p>
              </div>
            </div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
              <div className="text-6xl animate-bounce">⬆️</div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <Button onClick={stopARNavigation} className="bg-red-600 hover:bg-red-700 rounded-full">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 shadow-lg sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-full p-2">
                  <Store className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">LocalBiz</h1>
                  <p className="text-xs text-purple-100">Mobile First</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white relative"
                onClick={requestNotificationPermission}
              >
                <Bell className="h-5 w-5" />
                {geofenceActive && (
                  <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 animate-ping" />
                )}
              </Button>

              {!isAppInstalled && (
                <Button variant="ghost" size="icon" className="text-white" onClick={installPWA}>
                  <Download className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {currentPage === "home" && (
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar negocios cerca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-white/30 text-sm"
              />
            </div>
          )}
        </div>

        {showMobileMenu && (
          <div className="bg-white border-t border-purple-200 md:hidden">
            <div className="p-4 space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPage("home")
                  setShowMobileMenu(false)
                }}
              >
                <Home className="h-5 w-5 mr-3" />
                Inicio
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPage("map")
                  setShowMobileMenu(false)
                }}
              >
                <Map className="h-5 w-5 mr-3" />
                Mapa
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPage("qr")
                  setShowMobileMenu(false)
                }}
              >
                <QrCode className="h-5 w-5 mr-3" />
                Escanear QR
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPage("affiliate")
                  setShowMobileMenu(false)
                }}
              >
                <UserPlus className="h-5 w-5 mr-3" />
                Afiliados
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPage("advertiser")
                  setShowMobileMenu(false)
                }}
              >
                <Megaphone className="h-5 w-5 mr-3" />
                Anunciantes
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setCurrentPage("settings")
                  setShowMobileMenu(false)
                }}
              >
                <Settings className="h-5 w-5 mr-3" />
                Configuración
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Geofence Alerts */}
      {geofenceActive && nearbyOffers.length > 0 && (
        <div className="px-4 py-2">
          <Alert className="border-2 border-orange-400 bg-gradient-to-r from-orange-50 to-yellow-50 animate-pulse">
            <Zap className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-orange-800">🎯 ¡Oferta cerca!</strong>
                  <p className="text-sm text-orange-700">{nearbyOffers[0].offer}</p>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Ver
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* App Install Banner */}
      {!isAppInstalled && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-6 w-6" />
              <div>
                <p className="font-semibold text-sm">¡Instala la App!</p>
                <p className="text-xs opacity-90">Acceso rápido y notificaciones</p>
              </div>
            </div>
            <Button size="sm" variant="secondary" onClick={installPWA}>
              Instalar
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-4 pb-20">{renderPage()}</div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-5 py-2">
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentPage === "home" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentPage("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Inicio</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentPage === "map" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentPage("map")}
          >
            <Map className="h-5 w-5" />
            <span className="text-xs mt-1">Mapa</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentPage === "qr" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentPage("qr")}
          >
            <QrCode className="h-5 w-5" />
            <span className="text-xs mt-1">QR</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentPage === "affiliate" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentPage("affiliate")}
          >
            <Crown className="h-5 w-5" />
            <span className="text-xs mt-1">Afiliados</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentPage === "settings" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentPage("settings")}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Config</span>
          </Button>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col space-y-3">
        <Button
          size="lg"
          className="rounded-full shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-110 transition-all"
          onClick={() => startARNavigation(businesses[0])}
        >
          <Camera className="h-6 w-6" />
        </Button>
        <Button
          size="lg"
          className="rounded-full shadow-2xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-110 transition-all"
          onClick={() => setCurrentPage("advertiser")}
        >
          <Megaphone className="h-6 w-6" />
        </Button>
      </div>

      {/* Crypto Price Ticker */}
      <div className="fixed top-20 right-4 z-40">
        <Card className="bg-black/80 text-white border-none">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center space-x-2 text-sm">
              <Bitcoin className="h-4 w-4 text-yellow-400" />
              <span>USDT: ${usdtPrice.toFixed(3)}</span>
              <span className="text-green-400">+0.02%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
