"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "./auth-system"
import BusinessRegistration from "./business-registration" // Import the BusinessRegistration component
import {
  PlusCircle,
  Store,
  BarChart,
  DollarSign,
  Settings,
  ArrowLeft,
  BarChart3,
  Users,
  Star,
  TrendingUp,
  Edit,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Bell,
  CreditCard,
  Bitcoin,
  Megaphone,
  Package,
  Target,
  Award,
  User,
  LogOut,
  CheckCircle,
  Plus,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface BusinessData {
  id: string
  name: string
  category: string
  description: string
  status: "pending" | "active" | "rejected"
  verified: boolean
  featured: boolean
  rating: number
  review_count: number
  subscription_plan: string
  owner_id: string
  images: string[]
  address: string
  phone: string
  whatsapp: string
  email: string
  website: string
  instagram: string
  facebook: string
  hours: any // Consider defining a more specific type for hours
  monthlyRevenue: number
  totalOrders: number
  activePromotions: number
  subscriptionExpiry: Date
  paymentMethods: string[]
  acceptsCrypto: boolean
  acceptsCards: boolean
}

interface Order {
  id: string
  customerName: string
  items: string[]
  total: number
  currency: "USDT" | "USD" | "MXN"
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  orderDate: Date
  paymentMethod: string
  customerPhone: string
  notes: string
}

interface Analytics {
  todayRevenue: number
  todayOrders: number
  weekRevenue: number
  weekOrders: number
  monthRevenue: number
  monthOrders: number
  topProducts: { name: string; sales: number }[]
  customerSatisfaction: number
  repeatCustomers: number
}

// Mock Ad Campaign Type
interface AdCampaign {
  id: string
  title: string
  description: string
  budget: number
  duration: number
  status: "active" | "paused" | "completed"
  clicks: number
  impressions: number
}

export default function BusinessDashboard() {
  const { user, switchToCustomerMode, logout } = useAuth()
  const [userBusinesses, setUserBusinesses] = useState<BusinessData[]>([])
  const [loading, setLoading] = useState(true)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showAdCreationForm, setShowAdCreationForm] = useState(false) // New state for ad creation form
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessData | null>(null)
  const [currentView, setCurrentView] = useState("overview")
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>([]) // State for ad campaigns

  // Log para depurar el estado de showRegistrationForm
  useEffect(() => {
    console.log("BusinessDashboard: showRegistrationForm is now", showRegistrationForm)
  }, [showRegistrationForm])

  useEffect(() => {
    if (user?.id) {
      fetchUserBusinesses(user.id)
    }
  }, [user])

  const fetchUserBusinesses = async (userId: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data for demonstration
      const mockBusinesses: BusinessData[] = [
        {
          id: "biz_001",
          name: "Tacos El Güero",
          category: "food",
          description: "Los mejores tacos al pastor de la zona.",
          status: "active",
          verified: true,
          featured: true,
          rating: 4.8,
          review_count: 234,
          subscription_plan: "premium",
          owner_id: "usr_002", // This should match a test business user ID
          images: ["/placeholder.svg?height=200&width=300"],
          address: "Av. Insurgentes Sur 1234, Roma Norte, CDMX",
          phone: "+525512345678",
          whatsapp: "+525512345678",
          email: "tacos@elguero.com",
          website: "https://tacoselguero.com",
          instagram: "@tacoselguero",
          facebook: "TacosElGueroOficial",
          hours: {
            Lunes: { open: "08:00", close: "22:00", active: true },
            Martes: { open: "08:00", close: "22:00", active: true },
            Miércoles: { open: "08:00", close: "22:00", active: true },
            Jueves: { open: "08:00", close: "22:00", active: true },
            Viernes: { open: "08:00", close: "23:00", active: true },
            Sábado: { open: "09:00", close: "23:00", active: true },
            Domingo: { open: "09:00", close: "22:00", active: true },
          },
          monthlyRevenue: 15750.0,
          totalOrders: 456,
          activePromotions: 2,
          subscriptionExpiry: new Date("2024-12-31"),
          paymentMethods: ["USDT", "USD", "Cash", "Cards"],
          acceptsCrypto: true,
          acceptsCards: true,
        },
        // Add more mock businesses if needed for different user IDs
      ]

      // Filter mock businesses by owner_id
      const filteredBusinesses = mockBusinesses.filter((b) => b.owner_id === userId)
      setUserBusinesses(filteredBusinesses)

      // Mock ad campaigns
      const mockAdCampaigns: AdCampaign[] = [
        {
          id: "ad_001",
          title: "Gran Apertura - 20% OFF",
          description: "Descuento en todos los productos por inauguración.",
          budget: 200,
          duration: 7,
          status: "active",
          clicks: 150,
          impressions: 5000,
        },
        {
          id: "ad_002",
          title: "Happy Hour - 2x1 en Bebidas",
          description: "Promoción de bebidas de 5 PM a 7 PM.",
          budget: 100,
          duration: 5,
          status: "paused",
          clicks: 80,
          impressions: 3000,
        },
      ]
      setAdCampaigns(mockAdCampaigns)
    } catch (error) {
      console.error("Failed to fetch user businesses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBusinessRegistered = (newBusiness: BusinessData) => {
    console.log("handleBusinessRegistered called with:", newBusiness)
    setUserBusinesses((prev) => [...prev, newBusiness])
    setShowRegistrationForm(false)
    setSelectedBusiness(newBusiness) // Automatically select the newly registered business
    setCurrentView("overview") // Go to overview after registration
  }

  const handleAdCreated = (newAd: AdCampaign) => {
    setAdCampaigns((prev) => [...prev, newAd])
    setShowAdCreationForm(false)
    setCurrentView("ads") // Go to ads view after creation
  }

  // Simular datos del negocio (se ejecutará si userBusinesses tiene datos)
  useEffect(() => {
    if (userBusinesses.length > 0) {
      const sampleBusiness: BusinessData = userBusinesses[0]

      const sampleOrders: Order[] = [
        {
          id: "ord_001",
          customerName: "María González",
          items: ["3x Tacos al Pastor", "1x Quesadilla", "2x Refrescos"],
          total: 185.0,
          currency: "MXN",
          status: "preparing",
          orderDate: new Date(Date.now() - 1000 * 60 * 15),
          paymentMethod: "Efectivo",
          customerPhone: "+52 55 1111-1111",
          notes: "Sin cebolla en los tacos",
        },
        {
          id: "ord_002",
          customerName: "Carlos Mendoza",
          items: ["5x Tacos al Pastor", "1x Agua"],
          total: 8.5,
          currency: "USDT",
          status: "ready",
          orderDate: new Date(Date.now() - 1000 * 60 * 30),
          paymentMethod: "USDT",
          customerPhone: "+52 55 2222-2222",
          notes: "Para llevar",
        },
        {
          id: "ord_003",
          customerName: "Ana Rodríguez",
          items: ["2x Quesadillas", "1x Salsa Verde"],
          total: 120.0,
          currency: "MXN",
          status: "delivered",
          orderDate: new Date(Date.now() - 1000 * 60 * 60),
          paymentMethod: "Tarjeta",
          customerPhone: "+52 55 3333-3333",
          notes: "",
        },
      ]

      const sampleAnalytics: Analytics = {
        todayRevenue: 1250.0,
        todayOrders: 23,
        weekRevenue: 8750.0,
        weekOrders: 156,
        monthRevenue: 15750.0,
        monthOrders: 456,
        topProducts: [
          { name: "Tacos al Pastor", sales: 234 },
          { name: "Quesadillas", sales: 156 },
          { name: "Salsas", sales: 89 },
        ],
        customerSatisfaction: 4.8,
        repeatCustomers: 67,
      }

      setBusinessData(sampleBusiness)
      setOrders(sampleOrders)
      setAnalytics(sampleAnalytics)
    }
  }, [userBusinesses])

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600"
      case "confirmed":
        return "bg-blue-600"
      case "preparing":
        return "bg-orange-600"
      case "ready":
        return "bg-green-600"
      case "delivered":
        return "bg-gray-600"
      case "cancelled":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "confirmed":
        return "Confirmado"
      case "preparing":
        return "Preparando"
      case "ready":
        return "Listo"
      case "delivered":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const renderHeader = () => (
    <header className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 shadow-lg sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-2">
              <Store className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{currentBusiness?.name || "Mi Negocio"}</h1>
              <p className="text-xs text-green-100">Panel de Vendedor</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3" />
            </Button>

            <Button variant="ghost" size="sm" className="text-white" onClick={switchToCustomerMode}>
              <User className="h-4 w-4 mr-2" />
              Modo Cliente
            </Button>
          </div>
        </div>
      </div>
    </header>
  )

  const renderAdCreationForm = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" onClick={() => setShowAdCreationForm(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
            <Megaphone className="h-8 w-8 text-white" />
          </div>
          <div className="w-10"></div> {/* Spacer */}
        </div>
        <CardTitle className="text-2xl">Crear Nueva Campaña de Anuncio</CardTitle>
        <p className="text-gray-600">Llega a más clientes con promociones destacadas.</p>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const newAd: AdCampaign = {
              id: `ad_${Date.now()}`,
              title: (e.target as any).title.value,
              description: (e.target as any).description.value,
              budget: Number.parseFloat((e.target as any).budget.value),
              duration: Number.parseInt((e.target as any).duration.value),
              status: "active",
              clicks: 0,
              impressions: 0,
            }
            handleAdCreated(newAd)
            alert("Campaña de anuncio creada (simulado)!")
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="ad-title">Título del Anuncio</Label>
            <Input id="ad-title" name="title" placeholder="Ej: 50% OFF en toda la tienda" required />
          </div>
          <div>
            <Label htmlFor="ad-description">Descripción</Label>
            <Textarea id="ad-description" name="description" placeholder="Describe tu promoción..." required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="ad-budget">Presupuesto (USDT)</Label>
              <Input id="ad-budget" name="budget" placeholder="100" type="number" step="0.01" required />
            </div>
            <div>
              <Label htmlFor="ad-duration">Duración (días)</Label>
              <Input id="ad-duration" name="duration" placeholder="7" type="number" required />
            </div>
          </div>
          <div>
            <Label htmlFor="payment-method">Método de Pago</Label>
            <select id="payment-method" className="w-full p-2 border rounded-md">
              <option>USDT (Tether)</option>
              <option>Tarjeta de Crédito</option>
            </select>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Crear Campaña
          </Button>
        </form>
      </CardContent>
    </Card>
  )

  const renderAdsManagement = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Megaphone className="mr-2 h-5 w-5" />
              Mis Campañas de Anuncios
            </div>
            <Button onClick={() => setShowAdCreationForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Campaña
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {adCampaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Megaphone className="h-12 w-12 mx-auto mb-4" />
              <p>Aún no tienes campañas de anuncios. ¡Crea una para empezar a promocionar tu negocio!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {adCampaigns.map((campaign) => (
                <Card key={campaign.id} className="border-l-4 border-purple-500">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{campaign.title}</h3>
                      <Badge className={campaign.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                        {campaign.status === "active" ? "Activa" : "Pausada"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Presupuesto:</p>
                        <p>${campaign.budget} USDT</p>
                      </div>
                      <div>
                        <p className="font-medium">Duración:</p>
                        <p>{campaign.duration} días</p>
                      </div>
                      <div>
                        <p className="font-medium">Clicks:</p>
                        <p>{campaign.clicks}</p>
                      </div>
                      <div>
                        <p className="font-medium">Impresiones:</p>
                        <p>{campaign.impressions}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        {campaign.status === "active" ? "Pausar" : "Activar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  if (loading) {
    console.log("BusinessDashboard: Loading state active.")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Cargando tu dashboard de negocio...</p>
      </div>
    )
  }

  if (showRegistrationForm) {
    console.log("BusinessDashboard: Rendering BusinessRegistration form.")
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => setShowRegistrationForm(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold">Registrar Nuevo Negocio</h2>
          </div>
          <BusinessRegistration
            onBusinessRegistered={handleBusinessRegistered}
            onCancel={() => setShowRegistrationForm(false)}
          />
        </div>
      </div>
    )
  }

  if (showAdCreationForm) {
    console.log("BusinessDashboard: Rendering Ad Creation form.")
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">{renderAdCreationForm()}</div>
      </div>
    )
  }

  if (userBusinesses.length === 0) {
    console.log("BusinessDashboard: No businesses found for user. Showing registration prompt.")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4 text-center">
        <Store className="h-24 w-24 text-blue-600 mb-6" />
        <h1 className="text-3xl font-bold mb-3">¡Bienvenido, {user?.name}!</h1>
        <p className="text-xl text-gray-700 mb-8">
          Parece que aún no tienes un negocio registrado. ¡Es hora de empezar a vender!
        </p>
        <Button
          size="lg"
          onClick={() => {
            console.log("Button 'Registrar mi Primer Negocio' clicked. Setting showRegistrationForm to true.")
            setShowRegistrationForm(true)
          }}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Registrar mi Primer Negocio
        </Button>
        <Button variant="link" onClick={logout} className="mt-4 text-gray-600">
          Cerrar Sesión
        </Button>
      </div>
    )
  }

  // If there are businesses, display the dashboard for the first one (or selected one)
  const currentBusiness = selectedBusiness || userBusinesses[0]
  console.log("BusinessDashboard: Displaying dashboard for business:", currentBusiness?.name)

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Hoy</p>
                <p className="text-2xl font-bold">${analytics?.todayRevenue.toLocaleString()}</p>
                <p className="text-xs opacity-75">{analytics?.todayOrders} órdenes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Esta Semana</p>
                <p className="text-2xl font-bold">${analytics?.weekRevenue.toLocaleString()}</p>
                <p className="text-xs opacity-75">{analytics?.weekOrders} órdenes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Este Mes</p>
                <p className="text-2xl font-bold">${analytics?.monthRevenue.toLocaleString()}</p>
                <p className="text-xs opacity-75">{analytics?.monthOrders} órdenes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Star className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Rating</p>
                <p className="text-2xl font-bold">{businessData?.rating}</p>
                <p className="text-xs opacity-75">{businessData?.review_count} reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Store className="mr-2 h-5 w-5" />
              Estado del Negocio
            </div>
            <div className="flex items-center space-x-2">
              {businessData?.verified && (
                <Badge className="bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              )}
              {businessData?.featured && (
                <Badge className="bg-yellow-600">
                  <Award className="h-3 w-3 mr-1" />
                  Destacado
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-800">Negocio Activo</p>
              <p className="text-sm text-green-600">Recibiendo órdenes</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-800">Plan {businessData?.subscription_plan}</p>
              <p className="text-sm text-blue-600">Expira: {businessData?.subscriptionExpiry.toLocaleDateString()}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Megaphone className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-purple-800">{businessData?.activePromotions} Promociones</p>
              <p className="text-sm text-purple-600">Activas ahora</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Órdenes Recientes
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentView("orders")}>
              Ver Todas
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{order.customerName}</p>
                    <p className="text-xs text-gray-600">{order.items.join(", ")}</p>
                    <p className="text-xs text-gray-500">
                      {order.orderDate.toLocaleTimeString()} • {order.paymentMethod}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    ${order.total} {order.currency}
                  </p>
                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>{getStatusText(order.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderOrders = () => (
    <div className="space-y-4">
      {/* Order Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {["all", "pending", "preparing", "ready", "delivered"].map((status) => (
          <Button key={status} variant="outline" size="sm" className="flex-shrink-0">
            {status === "all" ? "Todas" : getStatusText(status as Order["status"])}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold">{order.customerName}</h3>
                  <p className="text-sm text-gray-600">Orden #{order.id}</p>
                  <p className="text-xs text-gray-500">
                    {order.orderDate.toLocaleString()} • {order.paymentMethod}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">
                    ${order.total} {order.currency}
                  </p>
                  <Badge className={`${getStatusColor(order.status)}`}>{getStatusText(order.status)}</Badge>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Productos:</p>
                <ul className="text-sm text-gray-600">
                  {order.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              {order.notes && (
                <div className="mb-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-sm">
                    <strong>Notas:</strong> {order.notes}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{order.customerPhone}</span>
                </div>

                {order.status !== "delivered" && order.status !== "cancelled" && (
                  <div className="flex space-x-2">
                    {order.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "confirmed")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Confirmar
                      </Button>
                    )}
                    {order.status === "confirmed" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        Preparar
                      </Button>
                    )}
                    {order.status === "preparing" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "ready")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Listo
                      </Button>
                    )}
                    {order.status === "ready" && (
                      <Button
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                        className="bg-gray-600 hover:bg-gray-700"
                      >
                        Entregado
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => updateOrderStatus(order.id, "cancelled")}>
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Store className="mr-2 h-6 w-6" />
              Información del Negocio
            </div>
            <Button variant="outline" onClick={() => setEditMode(!editMode)}>
              <Edit className="h-4 w-4 mr-2" />
              {editMode ? "Guardar" : "Editar"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre del Negocio</label>
                <Input
                  value={businessData?.name || ""}
                  onChange={(e) => setBusinessData((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={businessData?.description || ""}
                  onChange={(e) => setBusinessData((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Teléfono</label>
                  <Input
                    value={businessData?.phone || ""}
                    onChange={(e) => setBusinessData((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={businessData?.email || ""}
                    onChange={(e) => setBusinessData((prev) => (prev ? { ...prev, email: e.target.value } : null))}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nombre</label>
                  <p className="font-semibold">{businessData?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Categoría</label>
                  <p className="font-semibold">{businessData?.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Teléfono</label>
                  <p className="font-semibold">{businessData?.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="font-semibold">{businessData?.email}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Descripción</label>
                <p className="font-semibold">{businessData?.description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Dirección</label>
                <p className="font-semibold">{businessData?.address}</p>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="font-bold mb-3">Métodos de Pago</h3>
            <div className="flex flex-wrap gap-2">
              {businessData?.acceptsCrypto && (
                <Badge className="bg-yellow-600">
                  <Bitcoin className="h-3 w-3 mr-1" />
                  USDT
                </Badge>
              )}
              {businessData?.acceptsCards && (
                <Badge className="bg-blue-600">
                  <CreditCard className="h-3 w-3 mr-1" />
                  Tarjetas
                </Badge>
              )}
              <Badge className="bg-green-600">Efectivo</Badge>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold mb-3">Redes Sociales</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Instagram className="h-4 w-4 text-pink-600" />
                <span className="text-sm">{businessData?.instagram}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{businessData?.facebook}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-600" />
                <span className="text-sm">{businessData?.website}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Configuración General
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Notificaciones
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <CreditCard className="h-4 w-4 mr-2" />
            Suscripción y Pagos
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Megaphone className="h-4 w-4 mr-2" />
            Promociones
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Ingresos por Período
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico de ingresos (próximamente)</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">${analytics?.todayRevenue}</p>
              <p className="text-sm text-gray-600">Hoy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">${analytics?.weekRevenue}</p>
              <p className="text-sm text-gray-600">Esta Semana</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">${analytics?.monthRevenue}</p>
              <p className="text-sm text-gray-600">Este Mes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Productos Más Vendidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics?.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{index + 1}</span>
                  </div>
                  <span className="font-semibold">{product.name}</span>
                </div>
                <span className="text-green-600 font-bold">{product.sales} ventas</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Satisfacción del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600">{analytics?.customerSatisfaction}</p>
              <p className="text-sm text-gray-600">Promedio de calificaciones</p>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= (analytics?.customerSatisfaction || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Clientes Recurrentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">{analytics?.repeatCustomers}%</p>
              <p className="text-sm text-gray-600">Clientes que regresan</p>
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics?.repeatCustomers}%` }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return renderOverview()
      case "orders":
        return renderOrders()
      case "analytics":
        return renderAnalytics()
      case "profile":
        return renderProfile()
      case "ads":
        return renderAdsManagement() // New case for ads management
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard de Negocio</h1>
          <div className="flex items-center gap-4">
            {userBusinesses.length > 0 && (
              <select
                className="p-2 border rounded-md"
                value={selectedBusiness?.id || ""}
                onChange={(e) => setSelectedBusiness(userBusinesses.find((b) => b.id === e.target.value) || null)}
              >
                {userBusinesses.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            )}
            <Button
              variant="outline"
              onClick={() => {
                console.log("Button 'Registrar Otro Negocio' clicked. Setting showRegistrationForm to true.")
                setShowRegistrationForm(true)
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Registrar Otro Negocio
            </Button>
            <Button onClick={logout}>Cerrar Sesión</Button>
          </div>
        </div>

        {currentBusiness && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-6 w-6 text-blue-600" />
                  {currentBusiness.name}
                  {currentBusiness.verified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Verificado
                    </Badge>
                  )}
                  {currentBusiness.featured && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      Destacado
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{currentBusiness.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={currentBusiness.images[0] || "/placeholder.svg"}
                    alt={currentBusiness.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-sm text-gray-600">
                      Categoría: <span className="font-medium">{currentBusiness.category}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Plan: <span className="font-medium">{currentBusiness.subscription_plan}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Estado:{" "}
                      <Badge
                        className={
                          currentBusiness.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {currentBusiness.status}
                      </Badge>
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Dirección:</p>
                    <p>{currentBusiness.address}</p>
                  </div>
                  <div>
                    <p className="font-medium">Contacto:</p>
                    <p>Tel: {currentBusiness.phone}</p>
                    <p>WhatsApp: {currentBusiness.whatsapp}</p>
                    <p>Email: {currentBusiness.email}</p>
                  </div>
                </div>
                <Button className="w-full" onClick={() => setCurrentView("profile")}>
                  Gestionar Perfil del Negocio
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-purple-600" /> Rendimiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Visitas al Perfil</p>
                    <Progress value={75} className="w-full" />
                    <p className="text-xs text-gray-500">750 visitas este mes</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Interacciones (Llamadas/Pedidos)</p>
                    <Progress value={50} className="w-full" />
                    <p className="text-xs text-gray-500">50 interacciones este mes</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setCurrentView("analytics")}>
                    Ver Analytics Detallados
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" /> Finanzas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Ganancias por Pedidos</p>
                    <p className="text-lg font-bold text-green-600">$1,250 USDT</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Comisiones Pagadas</p>
                    <p className="text-lg font-bold text-red-600">$125 USDT</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Ver Historial de Transacciones
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-gray-600" /> Gestión de Anuncios y Campañas
            </CardTitle>
            <CardDescription>Crea y gestiona tus campañas publicitarias para llegar a más clientes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                console.log("Button 'Crear Nueva Campaña de Anuncio' clicked. Setting showAdCreationForm to true.")
                setShowAdCreationForm(true)
              }}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Crear Nueva Campaña de Anuncio
            </Button>
            <Separator />
            {renderAdsManagement()} {/* Render the ads management section */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
