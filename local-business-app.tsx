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
} from "lucide-react"

export default function LocalBusinessApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

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
          // Ubicación por defecto (CDMX)
          setUserLocation({ lat: 19.4326, lng: -99.1332 })
        },
      )
    }
  }, [])

  const categories = [
    { id: "all", name: "Todos", icon: "🏪", count: 1247 },
    { id: "food", name: "Comida", icon: "🍕", count: 324 },
    { id: "retail", name: "Retail", icon: "👕", count: 189 },
    { id: "services", name: "Servicios", icon: "🔧", count: 156 },
    { id: "health", name: "Salud", icon: "🏥", count: 98 },
    { id: "beauty", name: "Belleza", icon: "💄", count: 87 },
    { id: "automotive", name: "Automotriz", icon: "🚗", count: 76 },
    { id: "education", name: "Educación", icon: "📚", count: 65 },
    { id: "entertainment", name: "Entretenimiento", icon: "🎬", count: 54 },
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
      coordinates: { lat: 19.4326, lng: -99.1332 },
      owner: "Roberto González",
      whatsapp: "+52 55 1234-5678",
      instagram: "@tacoselguero",
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
      description: "Ropa femenina única y accesorios exclusivos. Diseños originales y tendencias actuales.",
      verified: false,
      featured: false,
      coordinates: { lat: 19.4284, lng: -99.1276 },
      owner: "María Luna",
      whatsapp: "+52 55 2345-6789",
      instagram: "@boutiqueluna",
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
      coordinates: { lat: 19.4269, lng: -99.1276 },
      owner: "Carlos Méndez",
      whatsapp: "+52 55 3456-7890",
      instagram: "@mecanicaexpress",
      specialties: ["Transmisiones", "Frenos", "Afinaciones"],
    },
    {
      id: 4,
      name: "Salón Bella Vista",
      category: "beauty",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
      reviews: 203,
      address: "Av. Chapultepec 345, Juárez",
      phone: "+52 55 4567-8901",
      hours: "Mar-Dom 9:00-19:00",
      distance: 0.9,
      description: "Salón de belleza integral. Cortes, color, tratamientos faciales y manicure.",
      verified: true,
      featured: false,
      coordinates: { lat: 19.4338, lng: -99.1269 },
      owner: "Ana Bellavista",
      whatsapp: "+52 55 4567-8901",
      instagram: "@salonbellavista",
      specialties: ["Cortes", "Color", "Tratamientos"],
    },
    {
      id: 5,
      name: "Farmacia San Rafael",
      category: "health",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      reviews: 67,
      address: "Calle San Rafael 123, Doctores",
      phone: "+52 55 5678-9012",
      hours: "Lun-Dom 7:00-23:00",
      distance: 1.8,
      description: "Farmacia de barrio con servicio personalizado. Medicamentos y productos de salud.",
      verified: false,
      featured: false,
      coordinates: { lat: 19.4205, lng: -99.1438 },
      owner: "Dr. Rafael Sánchez",
      whatsapp: "+52 55 5678-9012",
      instagram: "@farmaciasanrafael",
      specialties: ["Medicamentos", "Consultas", "Productos Naturales"],
    },
    {
      id: 6,
      name: "Café Literario",
      category: "food",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      reviews: 145,
      address: "Calle Orizaba 87, Roma Norte",
      phone: "+52 55 6789-0123",
      hours: "Lun-Dom 7:00-22:00",
      distance: 0.5,
      description: "Café de especialidad con ambiente literario. WiFi gratis y eventos culturales.",
      verified: true,
      featured: true,
      coordinates: { lat: 19.4326, lng: -99.1276 },
      owner: "Elena Morales",
      whatsapp: "+52 55 6789-0123",
      instagram: "@cafeliterario",
      specialties: ["Café de Especialidad", "Postres", "Eventos"],
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Store className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">LocalBiz</h1>
              </div>
              <Badge variant="secondary" className="hidden md:block">
                📍 {userLocation ? "Ubicación detectada" : "Detectando ubicación..."}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Registrar Negocio
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar negocios, productos o servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Store className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Negocios</p>
                  <p className="text-2xl font-bold">{stats.totalBusinesses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Nuevos</p>
                  <p className="text-2xl font-bold">+{stats.newThisWeek}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Vistas</p>
                  <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Usuarios</p>
                  <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Categorías</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex-shrink-0"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="businesses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="businesses">🏪 Negocios</TabsTrigger>
            <TabsTrigger value="map">🗺️ Mapa</TabsTrigger>
            <TabsTrigger value="featured">⭐ Destacados</TabsTrigger>
          </TabsList>

          <TabsContent value="businesses" className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {filteredBusinesses.length} negocios encontrados
                {userLocation && " cerca de ti"}
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Distancia
                </Button>
                <Button variant="outline" size="sm">
                  Calificación
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <Card key={business.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {business.featured && <Badge className="absolute top-2 left-2 bg-yellow-500">⭐ Destacado</Badge>}
                    {business.verified && <Badge className="absolute top-2 right-2 bg-blue-500">✓ Verificado</Badge>}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      📍 {business.distance} km
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{business.name}</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{business.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({business.reviews} reseñas)</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{business.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{business.address}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{business.hours}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {business.specialties.slice(0, 2).map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {business.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{business.specialties.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Llamar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button variant="outline" size="icon">
                        <Navigation className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Mapa Interactivo</h3>
                    <p className="text-gray-500 mb-4">
                      Aquí se mostraría un mapa interactivo con la ubicación de todos los negocios
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>🗺️ Integración con Google Maps / OpenStreetMap</p>
                      <p>📍 Marcadores personalizados por categoría</p>
                      <p>🔍 Zoom automático según búsqueda</p>
                      <p>📱 Navegación GPS integrada</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Funcionalidades del Mapa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        ✓
                      </Badge>
                      Geolocalización en tiempo real
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        ✓
                      </Badge>
                      Filtros por categoría y distancia
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        ✓
                      </Badge>
                      Rutas optimizadas
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        ✓
                      </Badge>
                      Vista satelital y callejera
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 Estadísticas de Ubicación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Radio de búsqueda:</span>
                      <span className="font-semibold">5 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Negocios cercanos:</span>
                      <span className="font-semibold">{filteredBusinesses.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo promedio:</span>
                      <span className="font-semibold">8 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Zona más activa:</span>
                      <span className="font-semibold">Roma Norte</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businesses
                .filter((b) => b.featured)
                .map((business) => (
                  <Card key={business.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <img
                        src={business.image || "/placeholder.svg"}
                        alt={business.name}
                        className="w-32 h-32 object-cover rounded-l-lg"
                      />
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{business.name}</h3>
                          <Badge className="bg-yellow-500">⭐ Destacado</Badge>
                        </div>

                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">{business.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({business.reviews})</span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{business.description}</p>

                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="truncate">{business.address}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm">
                            <Phone className="h-4 w-4 mr-1" />
                            Llamar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Navigation className="h-4 w-4 mr-1" />
                            Ir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>🎯 ¿Por qué destacar tu negocio?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Mayor Visibilidad</h4>
                    <p className="text-sm text-gray-600">Aparece en los primeros resultados</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Más Clientes</h4>
                    <p className="text-sm text-gray-600">Incrementa tus ventas hasta 300%</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Badge Especial</h4>
                    <p className="text-sm text-gray-600">Distintivo de negocio destacado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Business Registration Modal Placeholder */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full shadow-lg">
          <Plus className="h-5 w-5 mr-2" />
          Registrar mi Negocio
        </Button>
      </div>
    </div>
  )
}
