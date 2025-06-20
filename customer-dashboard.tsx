"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "./auth-system"
import {
  Search,
  Store,
  Star,
  Phone,
  Navigation,
  Share2,
  Heart,
  ShoppingCart,
  Clock,
  CreditCard,
  Bitcoin,
  Crown,
  Bell,
  User,
  Settings,
  LogOut,
  ArrowRight,
  TrendingUp,
  Copy,
  Check,
  Map,
  List,
} from "lucide-react"

export default function CustomerDashboard() {
  const { user, switchToBusinessMode, logout } = useAuth()
  const [currentView, setCurrentView] = useState("home")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [favorites, setFavorites] = useState<string[]>([])
  const [cart, setCart] = useState<any[]>([])
  const [affiliateEarnings, setAffiliateEarnings] = useState(247.85)
  const [referralCount, setReferralCount] = useState(8)
  const [copiedCode, setCopiedCode] = useState(false)

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

  const toggleFavorite = (businessId: string) => {
    setFavorites((prev) => (prev.includes(businessId) ? prev.filter((id) => id !== businessId) : [...prev, businessId]))
  }

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const renderHeader = () => (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 shadow-lg sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <Store className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">LocalBiz</h1>
              <p className="text-xs text-purple-100">¡Hola, {user?.name}!</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3" />
            </Button>

            <Button variant="ghost" size="icon" className="text-white" onClick={() => setCurrentView("profile")}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {currentView === "home" && (
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
    </header>
  )

  const renderHome = () => (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <Crown className="h-6 w-6 mx-auto mb-1" />
              <p className="text-lg font-bold">${affiliateEarnings.toFixed(2)}</p>
              <p className="text-xs opacity-90">Ganancias Afiliado</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-1" />
              <p className="text-lg font-bold">{referralCount}</p>
              <p className="text-xs opacity-90">Referidos Activos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Switch to Business Mode */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 rounded-full p-2">
                <Store className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-orange-800">¿Tienes un negocio?</h3>
                <p className="text-sm text-orange-600">Regístralo y empieza a vender</p>
              </div>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={switchToBusinessMode}>
              <ArrowRight className="h-4 w-4 mr-2" />
              Crear Negocio
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 text-sm ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        <div className="flex space-x-1">
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "map" ? "default" : "outline"} size="sm" onClick={() => setViewMode("map")}>
            <Map className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Business List */}
      <div className="space-y-4">
        {filteredBusinesses.map((business) => (
          <Card
            key={business.id}
            className="hover:shadow-lg transition-all duration-300 bg-white border-2 border-transparent hover:border-purple-200"
          >
            <div className="relative">
              <img
                src={business.image || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              {business.featured && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                  ⭐ Destacado
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => toggleFavorite(business.id)}
              >
                <Heart
                  className={`h-4 w-4 ${favorites.includes(business.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                />
              </Button>
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
                  <span className="text-xs text-gray-500 ml-1">({business.reviews})</span>
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
                  <span>{business.hours}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {business.acceptsCrypto && (
                    <Badge variant="outline" className="text-xs bg-yellow-50">
                      <Bitcoin className="h-3 w-3 mr-1" />
                      USDT
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs bg-blue-50">
                    <CreditCard className="h-3 w-3 mr-1" />
                    USD
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                  <Phone className="h-3 w-3 mr-1" />
                  Llamar
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                  <Navigation className="h-3 w-3 mr-1" />
                  Ir
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Pedir
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

  const renderAffiliate = () => (
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
          {/* Earnings Summary */}
          <div className="bg-white rounded-lg p-4 border mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">${affiliateEarnings.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Total Ganado (USDT)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{referralCount}</p>
                <p className="text-sm text-gray-600">Referidos Activos</p>
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div className="bg-white rounded-lg p-4 border mb-4">
            <h3 className="font-bold mb-3">Tu Código de Referido</h3>
            <div className="bg-gray-50 p-3 rounded border-2 border-dashed flex items-center justify-between">
              <p className="font-mono text-lg font-bold">{user?.referralCode}</p>
              <Button size="sm" variant="outline" onClick={copyReferralCode}>
                {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir Código
            </Button>
          </div>

          {/* Commission Structure */}
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-bold mb-3">Estructura de Comisiones</h3>
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-6 w-6" />
            Mi Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src={user?.avatar || "/placeholder.svg"} alt={user?.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="font-bold text-lg">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className="bg-blue-600">Cliente</Badge>
                {user?.verified && <Badge className="bg-green-600">Verificado</Badge>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Teléfono</label>
              <p className="font-semibold">{user?.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Ubicación</label>
              <p className="font-semibold">{user?.location}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Código de Referido</label>
              <p className="font-semibold">{user?.referralCode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Miembro desde</label>
              <p className="font-semibold">{user?.createdAt.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Configuración de Cuenta
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Métodos de Pago
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return renderHome()
      case "affiliate":
        return renderAffiliate()
      case "profile":
        return renderProfile()
      default:
        return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {renderHeader()}

      <div className="px-4 py-4 pb-20">{renderContent()}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 py-2">
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentView === "home" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentView("home")}
          >
            <Store className="h-5 w-5" />
            <span className="text-xs mt-1">Inicio</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentView === "favorites" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentView("favorites")}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">Favoritos</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentView === "affiliate" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentView("affiliate")}
          >
            <Crown className="h-5 w-5" />
            <span className="text-xs mt-1">Afiliados</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentView === "profile" ? "text-purple-600" : ""}`}
            onClick={() => setCurrentView("profile")}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
