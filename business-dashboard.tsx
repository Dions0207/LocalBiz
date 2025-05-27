"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "./auth-system"
import {
  Store,
  BarChart3,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  Edit,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Settings,
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
} from "lucide-react"

interface BusinessData {
  id: string
  name: string
  category: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  instagram: string
  facebook: string
  hours: { [key: string]: { open: string; close: string; closed: boolean } }
  images: string[]
  verified: boolean
  featured: boolean
  rating: number
  reviewCount: number
  monthlyRevenue: number
  totalOrders: number
  activePromotions: number
  subscriptionPlan: "free" | "basic" | "premium" | "enterprise"
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

export default function BusinessDashboard() {
  const { user, switchToCustomerMode, logout } = useAuth()
  const [currentView, setCurrentView] = useState("overview")
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [editMode, setEditMode] = useState(false)

  // Simular datos del negocio
  useEffect(() => {
    const sampleBusiness: BusinessData = {
      id: "biz_001",
      name: "Tacos El Güero",
      category: "food",
      description: "Los mejores tacos al pastor de la zona. Más de 20 años sirviendo sabor auténtico.",
      address: "Av. Insurgentes Sur 1234, Roma Norte, CDMX",
      phone: "+52 55 1234-5678",
      email: "contacto@tacosguero.com",
      website: "www.tacosguero.com",
      instagram: "@tacosguero",
      facebook: "Tacos El Güero",
      hours: {
        monday: { open: "08:00", close: "22:00", closed: false },
        tuesday: { open: "08:00", close: "22:00", closed: false },
        wednesday: { open: "08:00", close: "22:00", closed: false },
        thursday: { open: "08:00", close: "22:00", closed: false },
        friday: { open: "08:00", close: "23:00", closed: false },
        saturday: { open: "08:00", close: "23:00", closed: false },
        sunday: { open: "09:00", close: "21:00", closed: false },
      },
      images: ["/placeholder.svg?height=300&width=400"],
      verified: true,
      featured: true,
      rating: 4.8,
      reviewCount: 234,
      monthlyRevenue: 15750.0,
      totalOrders: 456,
      activePromotions: 2,
      subscriptionPlan: "premium",
      subscriptionExpiry: new Date("2024-12-31"),
      paymentMethods: ["USDT", "USD", "Cash", "Cards"],
      acceptsCrypto: true,
      acceptsCards: true,
    }

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
  }, [])

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
              <h1 className="text-xl font-bold text-white">{businessData?.name || "Mi Negocio"}</h1>
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
                <p className="text-xs opacity-75">{businessData?.reviewCount} reviews</p>
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
              <p className="font-semibold text-blue-800">Plan {businessData?.subscriptionPlan}</p>
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
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {renderHeader()}

      <div className="px-4 py-4 pb-20">{renderContent()}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <div className="grid grid-cols-4 py-2">
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentView === "overview" ? "text-green-600" : ""}`}
            onClick={() => setCurrentView("overview")}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs mt-1">Resumen</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentView === "orders" ? "text-green-600" : ""}`}
            onClick={() => setCurrentView("orders")}
          >
            <Package className="h-5 w-5" />
            <span className="text-xs mt-1">Órdenes</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentView === "analytics" ? "text-green-600" : ""}`}
            onClick={() => setCurrentView("analytics")}
          >
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs mt-1">Analytics</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${currentView === "profile" ? "text-green-600" : ""}`}
            onClick={() => setCurrentView("profile")}
          >
            <Store className="h-5 w-5" />
            <span className="text-xs mt-1">Negocio</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
