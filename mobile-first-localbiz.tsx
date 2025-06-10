"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  MapPin,
  QrCode,
  Crown,
  Megaphone,
  ArrowUpDown,
  DollarSign,
  Bitcoin,
  Search,
  Users,
  Eye,
  TrendingUp,
  CreditCard,
  Plus,
  Store,
  Wallet,
  Settings,
  Bell,
  User,
  LogOut,
  Filter,
  Heart,
  Clock,
  Phone,
  Navigation,
  Share2,
  MessageCircle,
  Zap,
  Gift,
  Coins,
  Star,
} from "lucide-react"
import AffiliateSystem from "./affiliate-system" // Asegúrate de que este componente exista y sea funcional
import { useAuth } from "./auth-system" // Tu sistema de autenticación

// Componente BackButton (asegúrate de que este archivo también esté en components/back-button.tsx)
import { BackButton } from "@/components/back-button"

export default function MobileFirstLocalBiz() {
  const router = useRouter()
  const { user, login, logout, register, isLoadingAuth, switchToBusinessMode, switchToCustomerMode } = useAuth() // Asume que useAuth proporciona estas funciones
  const [activeTab, setActiveTab] = useState("home") // Controla la navegación principal
  const [secondaryView, setSecondaryView] = useState<string | null>(null) // Para vistas anidadas como "Crear Anuncio"
  const [usdtPrice, setUsdtPrice] = useState(1.0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [favorites, setFavorites] = useState<string[]>([])
  const [affiliateEarnings, setAffiliateEarnings] = useState(247.85)
  const [referralCount, setReferralCount] = useState(8)
  const [copiedCode, setCopiedCode] = useState(false)

  // Simular precio USDT en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setUsdtPrice(0.998 + Math.random() * 0.004) // Simular fluctuación
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Simulación de negocios y categorías (puedes unificar con customer-dashboard.tsx o centralizar en un API)
  const businesses = [
    {
      id: "biz_001",
      name: "Tacos El Güero",
      category: "food",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 234,
      address: "Av. Insurgentes Sur 1234, Roma Norte",
      phone: "+52 55 1234-5678",
      distance: 0.3,
      description: "Los mejores tacos al pastor de la zona. Más de 20 años sirviendo sabor auténtico.",
      verified: true,
      featured: true,
      acceptsCrypto: true,
      promotion: "🔥 20% OFF pagando con USDT",
      avgPrice: "$150 MXN / $8 USDT",
      hours: "Lun-Dom 8:00-22:00",
      specialties: ["Tacos al Pastor", "Quesadillas", "Salsas Caseras"],
    },
    {
      id: "biz_002",
      name: "Boutique Luna",
      category: "retail",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      reviews: 89,
      address: "Calle Álvaro Obregón 567, Condesa",
      phone: "+52 55 2345-6789",
      distance: 0.7,
      description: "Ropa femenina única y accesorios exclusivos.",
      verified: false,
      featured: false,
      acceptsCrypto: true,
      promotion: "💎 Envío gratis con compras >$50 USDT",
      avgPrice: "$500-2000 MXN / $25-100 USDT",
      hours: "Lun-Sáb 10:00-20:00",
      specialties: ["Vestidos", "Accesorios", "Ropa Casual"],
    },
    {
      id: "biz_003",
      name: "Café Literario",
      category: "food",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      reviews: 156,
      address: "Calle Roma Norte 123, Roma Norte",
      phone: "+52 55 3456-7890",
      distance: 0.5,
      description: "Café de especialidad con ambiente literario. WiFi gratis y eventos culturales.",
      verified: true,
      featured: true,
      acceptsCrypto: true,
      promotion: "☕ 2x1 en cafés de 3-5 PM",
      avgPrice: "$80-200 MXN / $4-10 USDT",
      hours: "Lun-Dom 7:00-23:00",
      specialties: ["Café de Especialidad", "Postres", "Libros"],
    },
  ]

  const categories = [
    { id: "all", name: "Todos", icon: "🏪", count: 1247, color: "bg-gray-100" },
    { id: "food", name: "Comida", icon: "🍕", count: 324, color: "bg-red-100" },
    { id: "retail", name: "Retail", icon: "👕", count: 189, color: "bg-blue-100" },
    { id: "services", name: "Servicios", icon: "🔧", count: 156, color: "bg-green-100" },
    { id: "health", name: "Salud", icon: "🏥", count: 98, color: "bg-purple-100" },
    { id: "beauty", name: "Belleza", icon: "💄", count: 87, color: "bg-pink-100" },
    { id: "automotive", name: "Auto", icon: "🚗", count: 76, color: "bg-yellow-100" },
    { id: "education", name: "Educación", icon: "📚", count: 65, color: "bg-indigo-100" },
  ]

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || business.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Funciones de manejo para los botones de negocio (simuladas)
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleNavigate = (address: string) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, "_blank")
  }

  const handleOrder = (businessName: string) => {
    alert(`Iniciando pedido para ${businessName}. Funcionalidad de carrito y pago en desarrollo.`)
  }

  const handleShare = (business: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Descubre ${business.name} en LocalBiz`,
        text: business.description,
        url: `https://localbiz.app/business/${business.id}`, // Placeholder URL
      })
    } else {
      alert(`Link de ${business.name} copiado: https://localbiz.app/business/${business.id}`)
      navigator.clipboard.writeText(`https://localbiz.app/business/${business.id}`)
    }
  }

  // Renderizado condicional de contenido basado en la pestaña activa
  const renderContent = () => {
    if (!user) {
      // Si el usuario no está autenticado, muestra el sistema de autenticación
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4">
          <h2 className="text-2xl font-bold mb-4">Bienvenido a LocalBiz</h2>
          <p className="text-center text-gray-600 mb-6">
            Inicia sesión o regístrate para acceder a todas las funciones.
          </p>
          {/* Aquí podrías renderizar tu componente de autenticación */}
          <Button onClick={() => alert("Simulando inicio de sesión/registro")}>Iniciar Sesión / Registrarse</Button>
          {/* O directamente el AuthSystem si lo expones así */}
          {/* <AuthSystem onLoginSuccess={() => router.push('/')} /> */}
        </div>
      )
    }

    if (secondaryView === "create-ad") {
      return (
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <BackButton onClick={() => setSecondaryView(null)} />
            <h2 className="text-xl font-bold">Crear Nueva Campaña de Anuncio</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Crea una nueva campaña publicitaria para tu negocio y llega a más clientes.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título del Anuncio</label>
              <Input placeholder="Descuento especial de verano" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción del Anuncio</label>
              <Input placeholder="Obtén un 20% de descuento en todos los servicios de barbería." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Presupuesto (USDT)</label>
              <Input type="number" placeholder="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duración (días)</label>
              <Input type="number" placeholder="7" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
              <select className="w-full p-2 border rounded-md">
                <option>USDT Wallet</option>
                <option>Crédito/Débito</option>
              </select>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => alert("Anuncio creado (simulado).")}
            >
              Publicar Anuncio
            </Button>
          </div>
        </Card>
      )
    }

    switch (activeTab) {
      case "home":
        // El contenido de la pestaña de inicio se renderiza aquí
        return (
          <div className="space-y-6">
            {/* Banner publicitario rotativo (del EnhancedLocalBusinessApp) */}
            <Card className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <div className="flex items-center mb-2">
                  <Zap className="h-6 w-6 mr-2 text-yellow-300" />
                  <Badge className="bg-yellow-400 text-black font-bold">PROMOCIÓN ESPECIAL</Badge>
                </div>
                <h2 className="text-3xl font-bold mb-2">🍕 Pizza Palace - 50% OFF</h2>
                <p className="text-xl mb-4 opacity-90">Ordena ahora y paga con USDT</p>
                <div className="flex items-center space-x-4">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-100 font-bold"
                    onClick={() => handleOrder("Pizza Palace")}
                  >
                    <Gift className="h-5 w-5 mr-2" />
                    Ordenar Ahora
                  </Button>
                  <div className="flex items-center space-x-2 text-sm">
                    <Bitcoin className="h-4 w-4" />
                    <span>Acepta USDT</span>
                    <CreditCard className="h-4 w-4 ml-2" />
                    <span>Tarjetas</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Dashboard mejorado (del EnhancedLocalBusinessApp) */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Store className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">Negocios</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">Nuevos</p>
                      <p className="text-2xl font-bold">+23</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Eye className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">Vistas</p>
                      <p className="text-2xl font-bold">45,678</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">Usuarios</p>
                      <p className="text-2xl font-bold">3,456</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Bitcoin className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">Crypto TX</p>
                      <p className="text-2xl font-bold">892</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <ArrowUpDown className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">P2P Vol</p>
                      <p className="text-2xl font-bold">${(125000).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Categorías */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Categorías</h2>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex-shrink-0 ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : `${category.color} border-2 hover:scale-105 transition-transform`
                    }`}
                  >
                    <span className="mr-2 text-lg">{category.icon}</span>
                    {category.name}
                    <Badge variant="secondary" className="ml-2 bg-white/80">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Lista de Negocios */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">{filteredBusinesses.length} negocios encontrados</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                  <Bitcoin className="h-4 w-4 mr-1" />
                  Solo Crypto
                </Button>
                <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                  Distancia
                </Button>
                <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                  Calificación
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <Card
                  key={business.id}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white border-2 border-transparent hover:border-purple-200"
                >
                  <div className="relative">
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {business.featured && (
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                        ⭐ Destacado
                      </Badge>
                    )}
                    {business.verified && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        ✓ Verificado
                      </Badge>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      📍 {business.distance} km
                    </div>
                    {business.promotion && (
                      <div className="absolute bottom-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {business.promotion}
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-gray-800">{business.name}</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{business.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({business.reviews} reseñas)</span>
                      <div className="flex items-center space-x-1 ml-auto">
                        {business.acceptsCrypto && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 border-yellow-200 text-yellow-700">
                            <Bitcoin className="h-3 w-3 mr-1" />
                            USDT
                          </Badge>
                        )}
                        {business.acceptsCards && (
                          <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                            <CreditCard className="h-3 w-3 mr-1" />
                            USD
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{business.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-purple-500" />
                        <span className="truncate">{business.address}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-green-500" />
                        <span>{business.hours}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
                        <span>{business.avgPrice}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {business.specialties.slice(0, 2).map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-purple-50 border-purple-200">
                          {specialty}
                        </Badge>
                      ))}
                      {business.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          +{business.specialties.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        onClick={() => handleCall(business.phone)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Llamar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        onClick={() => handleShare(business)} // Podría ser un link de WhatsApp si el negocio lo tiene
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50"
                        onClick={() => handleNavigate(business.address)}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Ir
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-200 hover:bg-orange-50"
                        onClick={() => handleShare(business)}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case "map":
        return (
          <Card className="p-4">
            <h2 className="text-2xl font-bold mb-4">🗺️ Vista de Mapa</h2>
            <p className="text-gray-600 mb-4">Aquí se mostrarían los negocios en un mapa interactivo.</p>
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
              {"{"} {`<MapComponent />`} {"}"} (Mapa interactivo)
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Funcionalidad avanzada de geolocalización y visualización de negocios en desarrollo.
            </p>
          </Card>
        )
      case "qr":
        return (
          <Card className="p-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold mb-4">💳 Pagar con QR</h2>
            <p className="text-gray-600 mb-4">Escanea el código QR de un negocio para pagar al instante con USDT.</p>
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-6">
              {"{"} {`<QRCodeScanner />`} {"}"} (Escáner de QR)
            </div>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Bitcoin className="mr-2 h-5 w-5" />
              Escanear QR
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Asegúrate de tener USDT en tu wallet de LocalBiz para una transacción rápida.
            </p>
          </Card>
        )
      case "affiliate":
        return <AffiliateSystem /> // Usa tu componente de sistema de afiliados
      case "advertiser":
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Megaphone className="mr-2 h-6 w-6" />
                  Dashboard de Anunciantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Publica anuncios destacados y promociones para llegar a miles de usuarios.
                </p>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => setSecondaryView("create-ad")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Nueva Campaña
                </Button>

                <h3 className="font-bold text-lg mt-6">Mis Campañas Activas</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                    <div>
                      <p className="font-semibold">🍕 Pizza Palace - 50% OFF</p>
                      <p className="text-sm text-gray-600">Presupuesto: $100 USDT | Restante: $75 USDT</p>
                    </div>
                    <Badge className="bg-green-500">Activa</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                    <div>
                      <p className="font-semibold">💄 Salón Glamour - Promo</p>
                      <p className="text-sm text-gray-600">Presupuesto: $50 USDT | Restante: $10 USDT</p>
                    </div>
                    <Badge className="bg-blue-500">Activa</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "p2p":
        return (
          <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 p-4">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <ArrowUpDown className="mr-3 h-8 w-8 text-cyan-600" />🔄 P2P Exchange
              </CardTitle>
              <p className="text-gray-600">Intercambia USDT ↔ USD con otros usuarios de forma segura</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Comprar USDT */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-green-600 flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Comprar USDT
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cantidad USD</label>
                      <Input placeholder="100.00" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Recibirás USDT</label>
                      <Input placeholder="99.80" disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Método de pago</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Transferencia bancaria</option>
                        <option>Tarjeta de crédito</option>
                        <option>PayPal</option>
                      </select>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => alert("Simulando compra de USDT.")}
                    >
                      Comprar USDT
                    </Button>
                  </CardContent>
                </Card>

                {/* Vender USDT */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 rotate-180" />
                      Vender USDT
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cantidad USDT</label>
                      <Input placeholder="100.00" type="number" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Recibirás USD</label>
                      <Input placeholder="99.50" disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Método de cobro</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Transferencia bancaria</option>
                        <option>PayPal</option>
                        <option>Zelle</option>
                      </select>
                    </div>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => alert("Simulando venta de USDT.")}
                    >
                      Vender USDT
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Órdenes P2P */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>📋 Órdenes P2P Activas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { user: "CryptoTrader123", amount: "500 USDT", rate: "0.998", method: "Banco", type: "buy" },
                      { user: "LocalExchange", amount: "1000 USDT", rate: "0.999", method: "PayPal", type: "sell" },
                      { user: "FastCrypto", amount: "250 USDT", rate: "0.997", method: "Zelle", type: "buy" },
                    ].map((order, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge variant={order.type === "buy" ? "default" : "destructive"}>
                            {order.type === "buy" ? "COMPRA" : "VENDE"}
                          </Badge>
                          <div>
                            <p className="font-semibold">{order.user}</p>
                            <p className="text-sm text-gray-600">
                              {order.amount} • ${order.rate}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{order.method}</p>
                          <Button size="sm" variant="outline" onClick={() => alert(`Intercambiando con ${order.user}`)}>
                            Intercambiar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )
      case "crypto":
        return (
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 p-4">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Bitcoin className="mr-3 h-8 w-8 text-yellow-600" />💰 Crypto Payment Hub
              </CardTitle>
              <p className="text-gray-600">Paga en tus negocios favoritos con criptomonedas</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Coins className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">USDT Payments</h3>
                    <p className="text-sm text-gray-600 mb-4">Paga con Tether (USDT) en cualquier negocio afiliado</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tasa actual:</span>
                        <span className="font-bold">${usdtPrice.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comisión:</span>
                        <span className="font-bold text-green-600">0.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Card Payments</h3>
                    <p className="text-sm text-gray-600 mb-4">Paga con tarjeta de crédito/débito en USD</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Visa/Mastercard:</span>
                        <span className="font-bold">✅</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comisión:</span>
                        <span className="font-bold text-blue-600">2.9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Wallet className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">LocalBiz Wallet</h3>
                    <p className="text-sm text-gray-600 mb-4">Wallet integrado para pagos rápidos</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Balance USDT:</span>
                        <span className="font-bold">$0.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Balance USD:</span>
                        <span className="font-bold">$0.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  onClick={() => alert("Simulando agregar USDT a la Wallet.")}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Agregar USDT a Wallet
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={() => alert("Simulando conectar tarjeta.")}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Conectar Tarjeta
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      case "settings":
        return (
          <Card className="p-4">
            <h2 className="text-2xl font-bold mb-4">⚙️ Configuración</h2>
            <p className="text-gray-600 mb-4">Gestiona tu perfil y preferencias de la aplicación.</p>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => alert("Funcionalidad de Configuración de Cuenta en desarrollo.")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración de Cuenta
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => alert("Funcionalidad de Notificaciones en desarrollo.")}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => alert("Funcionalidad de Métodos de Pago en desarrollo.")}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Métodos de Pago
              </Button>
              {user &&
                user.role === "customer" && ( // Solo si es cliente, mostrar opción de pasar a negocio
                  <Button
                    variant="outline"
                    className="w-full justify-start text-orange-600 border-orange-200 hover:bg-orange-50"
                    onClick={switchToBusinessMode}
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Modo Negocio
                  </Button>
                )}
              {user &&
                user.role === "business" && ( // Solo si es negocio, mostrar opción de pasar a cliente
                  <Button
                    variant="outline"
                    className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={switchToCustomerMode}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Modo Cliente
                  </Button>
                )}
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </Card>
        )
      default:
        return (
          <Card className="p-4">
            <h2 className="text-2xl font-bold mb-4">Contenido de {activeTab}</h2>
            <p className="text-gray-600">Este es un marcador de posición para la pestaña "{activeTab}".</p>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Encabezado */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {secondaryView && <BackButton onClick={() => setSecondaryView(null)} />} {/* Botón Atrás condicional */}
            <div className="bg-white rounded-full p-2">
              <Store className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">LocalBiz</h1>
              <p className="text-xs text-purple-100">Crypto-Friendly Business Hub</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Bitcoin className="h-3 w-3 mr-1" />
              USDT: ${usdtPrice.toFixed(3)}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="text-white relative"
              onClick={() => alert("Gestionando notificaciones...")}
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setActiveTab("settings")}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {activeTab === "home" && (
          <div className="max-w-7xl mx-auto px-4 pb-4 pt-2">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar negocios que acepten crypto, productos o servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/90 border-white/30"
                />
              </div>
              <Button variant="outline" size="icon" className="bg-white/20 text-white border-white/30">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white/20 text-white border-white/30">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-20">{renderContent()}</div>

      {/* Navegación inferior flotante */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
        <div className="grid grid-cols-5 py-2">
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${activeTab === "home" ? "text-purple-600" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("home")
              setSecondaryView(null)
            }}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Inicio</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${activeTab === "map" ? "text-purple-600" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("map")
              setSecondaryView(null)
            }}
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs mt-1">Mapa</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${activeTab === "qr" ? "text-purple-600" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("qr")
              setSecondaryView(null)
            }}
          >
            <QrCode className="h-6 w-6" />
            <span className="text-xs mt-1">QR</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${activeTab === "affiliate" ? "text-purple-600" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("affiliate")
              setSecondaryView(null)
            }}
          >
            <Crown className="h-6 w-6" />
            <span className="text-xs mt-1">Afiliados</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${activeTab === "advertiser" ? "text-purple-600" : "text-gray-500"}`}
            onClick={() => {
              setActiveTab("advertiser")
              setSecondaryView(null)
            }}
          >
            <Megaphone className="h-6 w-6" />
            <span className="text-xs mt-1">Anuncios</span>
          </Button>
          {/* Se pueden añadir más pestañas aquí si es necesario, como P2P o Crypto */}
        </div>
      </div>

      {/* Botón flotante para registrar negocio (siempre visible, menos en advertiser view) */}
      {activeTab !== "advertiser" && (
        <div className="fixed bottom-20 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-110 transition-all"
            onClick={() => alert("Redirigiendo a registro de negocio...")} // O directamente setSecondaryView("register-business") si tienes un componente para eso
          >
            <Plus className="h-5 w-5 mr-2" />
            Registrar Negocio
          </Button>
        </div>
      )}

      {/* Ticker de precio de Crypto */}
      <div className="fixed bottom-20 left-6 z-50">
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
