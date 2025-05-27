"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Search,
  Phone,
  Star,
  Clock,
  Filter,
  Plus,
  Navigation,
  Heart,
  Share2,
  MessageCircle,
  Store,
  Users,
  TrendingUp,
  Eye,
  Zap,
  Gift,
  CreditCard,
  Coins,
  ArrowUpDown,
  Wallet,
  DollarSign,
  Bitcoin,
  Bot,
  Brain,
  Target,
  Lightbulb,
  Shield,
} from "lucide-react"
import AIAutomationSystem from "./ai-automation-system"

export default function EnhancedLocalBusinessWithAI() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [currentAd, setCurrentAd] = useState(0)
  const [usdtPrice, setUsdtPrice] = useState(1.0)
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([])
  const [aiInsights, setAiInsights] = useState<any[]>([])

  // Simular recomendaciones de IA
  useEffect(() => {
    const recommendations = [
      {
        business: "Tacos El Güero",
        reason: "Basado en tu historial de comida mexicana",
        confidence: 94,
        discount: "20% OFF con USDT",
      },
      {
        business: "Café Literario",
        reason: "Usuarios similares también visitaron",
        confidence: 87,
        discount: "Café gratis en segunda visita",
      },
      {
        business: "Mecánica Express",
        reason: "Tu auto necesita mantenimiento pronto",
        confidence: 76,
        discount: "Diagnóstico gratuito",
      },
    ]
    setAiRecommendations(recommendations)

    const insights = [
      {
        type: "trend",
        message: "45% más búsquedas de comida saludable en tu zona",
        action: "Ver opciones saludables",
      },
      {
        type: "price",
        message: "Precios de servicios automotrices 12% más bajos hoy",
        action: "Buscar talleres",
      },
      {
        type: "promo",
        message: "3 negocios cerca ofrecen descuentos crypto",
        action: "Ver promociones",
      },
    ]
    setAiInsights(insights)
  }, [])

  // Simular precio USDT en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setUsdtPrice(0.998 + Math.random() * 0.004)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Rotar anuncios
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % featuredAds.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Simular geolocalización
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        () => {
          setUserLocation({ lat: 19.4326, lng: -99.1332 })
        },
      )
    }
  }, [])

  const featuredAds = [
    {
      id: 1,
      title: "🍕 Pizza Palace - 50% OFF",
      subtitle: "Ordena ahora y paga con USDT",
      image: "/placeholder.svg?height=200&width=400",
      cta: "Ordenar Ahora",
      gradient: "from-red-500 to-orange-500",
      business: "Pizza Palace",
    },
    {
      id: 2,
      title: "💄 Salón Glamour - Promoción",
      subtitle: "Corte + Color por solo $299 USDT",
      image: "/placeholder.svg?height=200&width=400",
      cta: "Reservar Cita",
      gradient: "from-pink-500 to-purple-500",
      business: "Salón Glamour",
    },
    {
      id: 3,
      title: "🚗 AutoService Express",
      subtitle: "Afinación completa - Acepta crypto",
      image: "/placeholder.svg?height=200&width=400",
      cta: "Agendar",
      gradient: "from-blue-500 to-cyan-500",
      business: "AutoService Express",
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
      owner: "Roberto González",
      whatsapp: "+52 55 1234-5678",
      instagram: "@tacoselguero",
      specialties: ["Tacos al Pastor", "Quesadillas", "Salsas Caseras"],
      promotion: "🔥 20% OFF pagando con USDT",
      avgPrice: "$150 MXN / $8 USDT",
      aiScore: 94,
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
      description: "Ropa femenina única y accesorios exclusivos. Diseños originales y tendencias actuales.",
      verified: false,
      featured: false,
      acceptsCrypto: true,
      acceptsCards: true,
      coordinates: { lat: 19.4284, lng: -99.1276 },
      owner: "María Luna",
      whatsapp: "+52 55 2345-6789",
      instagram: "@boutiqueluna",
      specialties: ["Vestidos", "Accesorios", "Ropa Casual"],
      promotion: "💎 Envío gratis con compras >$50 USDT",
      avgPrice: "$500-2000 MXN / $25-100 USDT",
      aiScore: 87,
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
      owner: "Carlos Méndez",
      whatsapp: "+52 55 3456-7890",
      instagram: "@mecanicaexpress",
      specialties: ["Transmisiones", "Frenos", "Afinaciones"],
      promotion: "⚡ Diagnóstico gratis + 15% OFF",
      avgPrice: "$800-3000 MXN / $40-150 USDT",
      aiScore: 76,
    },
  ]

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || business.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalBusinesses: 1247,
    newThisWeek: 23,
    totalViews: 45678,
    activeUsers: 3456,
    cryptoTransactions: 892,
    p2pVolume: 125000,
    aiPredictions: 15678,
    automatedActions: 2847,
  }

  if (showAIPanel) {
    return (
      <div>
        <div className="fixed top-4 left-4 z-50">
          <Button variant="outline" onClick={() => setShowAIPanel(false)}>
            ← Volver a LocalBiz
          </Button>
        </div>
        <AIAutomationSystem />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header con gradiente llamativo */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-full p-2">
                  <Store className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">LocalBiz</h1>
                  <p className="text-xs text-purple-100">AI-Powered Business Hub</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Bitcoin className="h-3 w-3 mr-1" />
                  USDT: ${usdtPrice.toFixed(3)}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Brain className="h-3 w-3 mr-1" />
                  IA Activa
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  📍 {userLocation ? "Ubicación detectada" : "Detectando..."}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 text-white border-white/30"
                onClick={() => setShowAIPanel(true)}
              >
                <Brain className="h-4 w-4 mr-2" />
                Panel IA
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30">
                <Wallet className="h-4 w-4 mr-2" />
                P2P Exchange
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Negocio
              </Button>
            </div>
          </div>

          {/* Search Bar mejorado con IA */}
          <div className="mt-4 flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Bot className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
              <Input
                placeholder="Busca con IA: 'comida saludable cerca', 'acepta crypto', 'abierto ahora'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 bg-white/90 border-white/30"
              />
            </div>
            <Button variant="secondary" size="icon" className="bg-white/20 text-white border-white/30">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="bg-white/20 text-white border-white/30">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* AI Recommendations Panel */}
        <div className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-3" />
              <h2 className="text-xl font-bold">Recomendaciones de IA Personalizadas</h2>
            </div>
            <Badge className="bg-white/20 text-white">
              <Target className="h-3 w-3 mr-1" />
              Precisión 94%
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiRecommendations.map((rec, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{rec.business}</h3>
                  <Badge className="bg-green-500 text-white">{rec.confidence}%</Badge>
                </div>
                <p className="text-sm opacity-90 mb-2">{rec.reason}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded font-bold">{rec.discount}</span>
                  <Button size="sm" variant="secondary" className="bg-white text-purple-600">
                    Ver Negocio
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Bar */}
        <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center mb-3">
            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            <h3 className="font-semibold">Insights de IA en Tiempo Real</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{insight.message}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-3">
                  {insight.action}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Banner publicitario rotativo */}
        <div className="mb-6 relative overflow-hidden rounded-2xl shadow-2xl">
          <div
            className={`bg-gradient-to-r ${featuredAds[currentAd].gradient} p-8 text-white relative`}
            style={{ minHeight: "200px" }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Zap className="h-6 w-6 mr-2 text-yellow-300" />
                  <Badge className="bg-yellow-400 text-black font-bold">PROMOCIÓN ESPECIAL</Badge>
                </div>
                <h2 className="text-3xl font-bold mb-2">{featuredAds[currentAd].title}</h2>
                <p className="text-xl mb-4 opacity-90">{featuredAds[currentAd].subtitle}</p>
                <div className="flex items-center space-x-4">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-bold">
                    <Gift className="h-5 w-5 mr-2" />
                    {featuredAds[currentAd].cta}
                  </Button>
                  <div className="flex items-center space-x-2 text-sm">
                    <Bitcoin className="h-4 w-4" />
                    <span>Acepta USDT</span>
                    <CreditCard className="h-4 w-4 ml-2" />
                    <span>Tarjetas</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={featuredAds[currentAd].image || "/placeholder.svg"}
                  alt="Promoción"
                  className="w-64 h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            {/* Indicadores de banner */}
            <div className="absolute bottom-4 left-8 flex space-x-2">
              {featuredAds.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentAd ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Dashboard mejorado con IA */}
        <div className="grid grid-cols-2 md:grid-cols-8 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Store className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm opacity-90">Negocios</p>
                  <p className="text-2xl font-bold">{stats.totalBusinesses.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold">+{stats.newThisWeek}</p>
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
                  <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
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
                  <p className="text-2xl font-bold">{stats.cryptoTransactions}</p>
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
                  <p className="text-2xl font-bold">${stats.p2pVolume.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Brain className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm opacity-90">IA Predict</p>
                  <p className="text-2xl font-bold">{stats.aiPredictions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm opacity-90">Auto Actions</p>
                  <p className="text-2xl font-bold">{stats.automatedActions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories con colores */}
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

        <Tabs defaultValue="businesses" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-xl">
            <TabsTrigger
              value="businesses"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
            >
              🏪 Negocios
            </TabsTrigger>
            <TabsTrigger
              value="ai-recommendations"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
            >
              🤖 IA Recomendaciones
            </TabsTrigger>
            <TabsTrigger
              value="crypto"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
            >
              💰 Crypto Pay
            </TabsTrigger>
            <TabsTrigger
              value="p2p"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
            >
              🔄 P2P Exchange
            </TabsTrigger>
          </TabsList>

          <TabsContent value="businesses" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {filteredBusinesses.length} negocios encontrados
                {userLocation && " cerca de ti"}
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                  <Brain className="h-4 w-4 mr-1" />
                  IA Ordenar
                </Button>
                <Button variant="outline" size="sm" className="border-yellow-200 hover:bg-yellow-50">
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
                    <div className="absolute top-12 left-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 rounded text-xs font-bold">
                      <Brain className="h-3 w-3 inline mr-1" />
                      IA: {business.aiScore}%
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
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Llamar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                        <Navigation className="h-4 w-4 mr-2" />
                        Ir
                      </Button>
                      <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai-recommendations" className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Brain className="mr-3 h-8 w-8 text-indigo-600" />🤖 Recomendaciones Inteligentes
                </CardTitle>
                <p className="text-gray-600">IA analiza tu comportamiento para sugerir los mejores negocios</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredBusinesses.map((business) => (
                    <Card key={business.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={business.image || "/placeholder.svg"}
                            alt={business.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-lg">{business.name}</h3>
                              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                                <Target className="h-3 w-3 mr-1" />
                                {business.aiScore}% Match
                              </Badge>
                            </div>
                            <div className="flex items-center mb-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium ml-1">{business.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">({business.reviews})</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{business.description}</p>
                            <div className="space-y-2">
                              <div className="bg-blue-50 p-2 rounded text-sm">
                                <strong>🎯 Por qué te recomendamos:</strong>
                                <p className="text-blue-700">
                                  {business.aiScore > 90
                                    ? "Perfecto match con tus preferencias y ubicación"
                                    : business.aiScore > 80
                                      ? "Usuarios similares también visitaron este lugar"
                                      : "Buena opción basada en tu historial de búsquedas"}
                                </p>
                              </div>
                              {business.promotion && (
                                <div className="bg-yellow-50 p-2 rounded text-sm">
                                  <strong>🎁 Oferta especial:</strong>
                                  <p className="text-yellow-700">{business.promotion}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2 mt-3">
                              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                                Ver Detalles
                              </Button>
                              <Button size="sm" variant="outline">
                                <Navigation className="h-4 w-4 mr-1" />
                                Ir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-white">
                    <CardContent className="pt-6 text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <Target className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-bold mb-2">Precisión 94%</h3>
                      <p className="text-sm text-gray-600">Nuestras recomendaciones aciertan en el 94% de los casos</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="pt-6 text-center">
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <Brain className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-bold mb-2">Aprendizaje Continuo</h3>
                      <p className="text-sm text-gray-600">La IA mejora con cada interacción que realizas</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white">
                    <CardContent className="pt-6 text-center">
                      <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="font-bold mb-2">Privacidad Protegida</h3>
                      <p className="text-sm text-gray-600">Tus datos están seguros y encriptados</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-6">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
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
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Agregar USDT a Wallet
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Conectar Tarjeta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="p2p" className="space-y-6">
            <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200">
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
                      <Button className="w-full bg-green-600 hover:bg-green-700">Comprar USDT</Button>
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
                      <Button className="w-full bg-red-600 hover:bg-red-700">Vender USDT</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <Button
          size="lg"
          className="rounded-full shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-110 transition-all"
          onClick={() => setShowAIPanel(true)}
        >
          <Brain className="h-5 w-5 mr-2" />
          Panel IA
        </Button>
        <Button
          size="lg"
          className="rounded-full shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-110 transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          Registrar Negocio
        </Button>
      </div>

      {/* AI Assistant Chat Bubble */}
      <div className="fixed bottom-6 left-6 z-50">
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none shadow-2xl">
          <CardContent className="pt-3 pb-3">
            <div className="flex items-center space-x-2 text-sm">
              <Bot className="h-4 w-4 text-white animate-pulse" />
              <span>IA Assistant activo</span>
              <Badge className="bg-white/20 text-white">
                <Target className="h-3 w-3 mr-1" />
                94% precisión
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crypto Price Ticker */}
      <div className="fixed top-20 right-6 z-40">
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
