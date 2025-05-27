"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Store,
  Crown,
  DollarSign,
  BarChart3,
  Settings,
  Search,
  Download,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CreditCard,
  Percent,
  Shield,
  Bell,
  PieChart,
  Activity,
  Clock,
  Banknote,
  UserCheck,
  UserX,
  Plus,
  Minus,
  Send,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  type: "customer" | "business" | "affiliate" | "admin"
  status: "active" | "inactive" | "suspended"
  registrationDate: Date
  lastActivity: Date
  totalSpent: number
  referredBy?: string
  referralCode: string
  referralCount: number
  commissionEarned: number
  location: string
  avatar: string
  verified: boolean
  kycStatus: "pending" | "approved" | "rejected"
}

interface Business {
  id: string
  name: string
  category: string
  owner: string
  email: string
  phone: string
  address: string
  coordinates: { lat: number; lng: number }
  status: "active" | "pending" | "suspended"
  registrationDate: Date
  referredBy?: string
  monthlyRevenue: number
  totalTransactions: number
  rating: number
  reviewCount: number
  subscriptionPlan: "free" | "basic" | "premium" | "enterprise"
  subscriptionExpiry: Date
  commissionRate: number
  paymentMethods: string[]
  documents: string[]
  verified: boolean
}

interface Commission {
  id: string
  affiliateId: string
  affiliateName: string
  businessId: string
  businessName: string
  amount: number
  percentage: number
  status: "pending" | "paid" | "cancelled"
  transactionDate: Date
  paymentDate?: Date
  paymentMethod: string
  notes: string
}

interface Transaction {
  id: string
  userId: string
  businessId: string
  amount: number
  currency: "USDT" | "USD"
  type: "payment" | "commission" | "withdrawal" | "deposit"
  status: "completed" | "pending" | "failed"
  date: Date
  fees: number
  affiliateCommission?: number
  paymentMethod: string
}

export default function AdminDashboard() {
  const [currentTab, setCurrentTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [users, setUsers] = useState<User[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showBusinessModal, setShowBusinessModal] = useState(false)

  // Simular datos iniciales
  useEffect(() => {
    // Usuarios de ejemplo
    const sampleUsers: User[] = [
      {
        id: "usr_001",
        name: "María González",
        email: "maria@email.com",
        phone: "+52 55 1234-5678",
        type: "affiliate",
        status: "active",
        registrationDate: new Date("2024-01-15"),
        lastActivity: new Date("2024-01-25"),
        totalSpent: 1250.5,
        referralCode: "MARIA2024",
        referralCount: 8,
        commissionEarned: 2847.3,
        location: "Ciudad de México",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        kycStatus: "approved",
      },
      {
        id: "usr_002",
        name: "Carlos Mendoza",
        email: "carlos@email.com",
        phone: "+52 55 2345-6789",
        type: "customer",
        status: "active",
        registrationDate: new Date("2024-01-20"),
        lastActivity: new Date("2024-01-26"),
        totalSpent: 450.75,
        referredBy: "usr_001",
        referralCode: "CARLOS2024",
        referralCount: 2,
        commissionEarned: 0,
        location: "Ciudad de México",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        kycStatus: "approved",
      },
      {
        id: "usr_003",
        name: "Ana Rodríguez",
        email: "ana@email.com",
        phone: "+52 55 3456-7890",
        type: "business",
        status: "active",
        registrationDate: new Date("2024-01-10"),
        lastActivity: new Date("2024-01-26"),
        totalSpent: 0,
        referredBy: "usr_001",
        referralCode: "ANA2024",
        referralCount: 0,
        commissionEarned: 0,
        location: "Ciudad de México",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
        kycStatus: "approved",
      },
    ]

    // Negocios de ejemplo
    const sampleBusinesses: Business[] = [
      {
        id: "biz_001",
        name: "Tacos El Güero",
        category: "food",
        owner: "usr_003",
        email: "tacos@elguero.com",
        phone: "+52 55 1111-2222",
        address: "Av. Insurgentes Sur 1234, Roma Norte",
        coordinates: { lat: 19.4326, lng: -99.1332 },
        status: "active",
        registrationDate: new Date("2024-01-10"),
        referredBy: "usr_001",
        monthlyRevenue: 15750.0,
        totalTransactions: 234,
        rating: 4.8,
        reviewCount: 156,
        subscriptionPlan: "premium",
        subscriptionExpiry: new Date("2024-12-31"),
        commissionRate: 20,
        paymentMethods: ["USDT", "USD", "Cash"],
        documents: ["business_license.pdf", "tax_id.pdf"],
        verified: true,
      },
      {
        id: "biz_002",
        name: "Boutique Luna",
        category: "retail",
        owner: "usr_004",
        email: "info@boutiqueluna.com",
        phone: "+52 55 2222-3333",
        address: "Calle Álvaro Obregón 567, Condesa",
        coordinates: { lat: 19.4284, lng: -99.1276 },
        status: "pending",
        registrationDate: new Date("2024-01-25"),
        referredBy: "usr_001",
        monthlyRevenue: 8900.0,
        totalTransactions: 89,
        rating: 4.6,
        reviewCount: 67,
        subscriptionPlan: "basic",
        subscriptionExpiry: new Date("2024-06-30"),
        commissionRate: 20,
        paymentMethods: ["USDT", "USD"],
        documents: ["business_license.pdf"],
        verified: false,
      },
    ]

    // Comisiones de ejemplo
    const sampleCommissions: Commission[] = [
      {
        id: "com_001",
        affiliateId: "usr_001",
        affiliateName: "María González",
        businessId: "biz_001",
        businessName: "Tacos El Güero",
        amount: 315.0,
        percentage: 20,
        status: "paid",
        transactionDate: new Date("2024-01-20"),
        paymentDate: new Date("2024-01-25"),
        paymentMethod: "USDT",
        notes: "Comisión mensual enero 2024",
      },
      {
        id: "com_002",
        affiliateId: "usr_001",
        affiliateName: "María González",
        businessId: "biz_002",
        businessName: "Boutique Luna",
        amount: 178.0,
        percentage: 20,
        status: "pending",
        transactionDate: new Date("2024-01-25"),
        paymentMethod: "USDT",
        notes: "Comisión mensual enero 2024",
      },
    ]

    // Transacciones de ejemplo
    const sampleTransactions: Transaction[] = [
      {
        id: "txn_001",
        userId: "usr_002",
        businessId: "biz_001",
        amount: 25.5,
        currency: "USDT",
        type: "payment",
        status: "completed",
        date: new Date("2024-01-26"),
        fees: 0.13,
        affiliateCommission: 5.1,
        paymentMethod: "USDT Wallet",
      },
      {
        id: "txn_002",
        userId: "usr_001",
        businessId: "",
        amount: 315.0,
        currency: "USDT",
        type: "commission",
        status: "completed",
        date: new Date("2024-01-25"),
        fees: 0,
        paymentMethod: "USDT Wallet",
      },
    ]

    setUsers(sampleUsers)
    setBusinesses(sampleBusinesses)
    setCommissions(sampleCommissions)
    setTransactions(sampleTransactions)
  }, [])

  // Calcular estadísticas
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    totalBusinesses: businesses.length,
    activeBusinesses: businesses.filter((b) => b.status === "active").length,
    totalAffiliates: users.filter((u) => u.type === "affiliate").length,
    pendingCommissions: commissions.filter((c) => c.status === "pending").reduce((sum, c) => sum + c.amount, 0),
    paidCommissions: commissions.filter((c) => c.status === "paid").reduce((sum, c) => sum + c.amount, 0),
    monthlyRevenue: businesses.reduce((sum, b) => sum + b.monthlyRevenue, 0),
    totalTransactions: transactions.length,
    pendingApprovals: businesses.filter((b) => b.status === "pending").length,
  }

  const handlePayCommission = (commissionId: string) => {
    setCommissions((prev) =>
      prev.map((c) => (c.id === commissionId ? { ...c, status: "paid" as const, paymentDate: new Date() } : c)),
    )
    alert("✅ Comisión pagada exitosamente")
  }

  const handleApproveUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, kycStatus: "approved" as const, verified: true } : u)),
    )
    alert("✅ Usuario aprobado exitosamente")
  }

  const handleApproveBusiness = (businessId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === businessId ? { ...b, status: "active" as const, verified: true } : b)),
    )
    alert("✅ Negocio aprobado exitosamente")
  }

  const handleSuspendUser = (userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: "suspended" as const } : u)))
    alert("⚠️ Usuario suspendido")
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Usuarios Totales</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs opacity-75">{stats.activeUsers} activos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Store className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Negocios</p>
                <p className="text-2xl font-bold">{stats.totalBusinesses.toLocaleString()}</p>
                <p className="text-xs opacity-75">{stats.activeBusinesses} activos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Crown className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Afiliados</p>
                <p className="text-2xl font-bold">{stats.totalAffiliates.toLocaleString()}</p>
                <p className="text-xs opacity-75">Programa activo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Revenue Mensual</p>
                <p className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs opacity-75">USDT + USD</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comisiones pendientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Banknote className="mr-2 h-5 w-5 text-yellow-600" />
              Comisiones Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-semibold">Total Pendiente</p>
                  <p className="text-2xl font-bold text-yellow-600">${stats.pendingCommissions.toFixed(2)} USDT</p>
                </div>
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  <Send className="h-4 w-4 mr-2" />
                  Pagar Todo
                </Button>
              </div>

              {commissions
                .filter((c) => c.status === "pending")
                .slice(0, 3)
                .map((commission) => (
                  <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-sm">{commission.affiliateName}</p>
                      <p className="text-xs text-gray-600">{commission.businessName}</p>
                      <p className="text-sm font-bold text-green-600">${commission.amount.toFixed(2)} USDT</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handlePayCommission(commission.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Pagar
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-600" />
              Aprobaciones Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-semibold">Negocios Pendientes</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</p>
                </div>
                <Button variant="outline" className="border-orange-500 text-orange-600">
                  <Eye className="h-4 w-4 mr-2" />
                  Revisar
                </Button>
              </div>

              {businesses
                .filter((b) => b.status === "pending")
                .slice(0, 3)
                .map((business) => (
                  <div key={business.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold text-sm">{business.name}</p>
                      <p className="text-xs text-gray-600">{business.category}</p>
                      <p className="text-xs text-gray-500">Referido por: {business.referredBy}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveBusiness(business.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Transacciones Diarias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Gráfico de transacciones</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Hoy</p>
                <p className="font-bold text-green-600">+23%</p>
              </div>
              <div>
                <p className="text-gray-600">Esta semana</p>
                <p className="font-bold text-blue-600">+15%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Distribución de Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Clientes</span>
                <span className="font-bold">65%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Negocios</span>
                <span className="font-bold">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Afiliados</span>
                <span className="font-bold">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Nuevo negocio registrado</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Comisión pagada</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Usuario verificado</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Nueva transacción</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar usuarios por nombre, email o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          className="px-3 py-2 border rounded-md"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">Todos los usuarios</option>
          <option value="customer">Clientes</option>
          <option value="business">Negocios</option>
          <option value="affiliate">Afiliados</option>
          <option value="active">Activos</option>
          <option value="pending">Pendientes</option>
          <option value="suspended">Suspendidos</option>
        </select>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Lista de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      {user.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <Badge
                        variant={user.type === "affiliate" ? "default" : "secondary"}
                        className={
                          user.type === "affiliate"
                            ? "bg-purple-600"
                            : user.type === "business"
                              ? "bg-blue-600"
                              : "bg-gray-600"
                        }
                      >
                        {user.type === "affiliate"
                          ? "Afiliado"
                          : user.type === "business"
                            ? "Negocio"
                            : user.type === "customer"
                              ? "Cliente"
                              : "Admin"}
                      </Badge>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className={
                          user.status === "active"
                            ? "bg-green-600"
                            : user.status === "suspended"
                              ? "bg-red-600"
                              : "bg-yellow-600"
                        }
                      >
                        {user.status === "active" ? "Activo" : user.status === "suspended" ? "Suspendido" : "Inactivo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📱 {user.phone}</span>
                      <span>📍 {user.location}</span>
                      <span>📅 {user.registrationDate.toLocaleDateString()}</span>
                    </div>
                    {user.type === "affiliate" && (
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-purple-600 font-semibold">Código: {user.referralCode}</span>
                        <span className="text-green-600">{user.referralCount} referidos</span>
                        <span className="text-blue-600">${user.commissionEarned.toFixed(2)} ganado</span>
                      </div>
                    )}
                    {user.referredBy && (
                      <p className="text-xs text-orange-600">
                        Referido por: {users.find((u) => u.id === user.referredBy)?.name || user.referredBy}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedUser(user)
                      setShowUserModal(true)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {user.kycStatus === "pending" && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveUser(user.id)}
                    >
                      <UserCheck className="h-4 w-4" />
                    </Button>
                  )}
                  {user.status === "active" && (
                    <Button size="sm" variant="destructive" onClick={() => handleSuspendUser(user.id)}>
                      <UserX className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBusinesses = () => (
    <div className="space-y-6">
      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar negocios por nombre, categoría o propietario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select className="px-3 py-2 border rounded-md">
          <option value="all">Todas las categorías</option>
          <option value="food">Comida</option>
          <option value="retail">Retail</option>
          <option value="services">Servicios</option>
          <option value="beauty">Belleza</option>
        </select>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Negocio
        </Button>
      </div>

      {/* Lista de negocios */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Negocios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businesses.map((business) => (
              <div
                key={business.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Store className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{business.name}</h3>
                      {business.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <Badge className="bg-blue-100 text-blue-800">{business.category}</Badge>
                      <Badge
                        variant={business.status === "active" ? "default" : "secondary"}
                        className={
                          business.status === "active"
                            ? "bg-green-600"
                            : business.status === "pending"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {business.status === "active"
                          ? "Activo"
                          : business.status === "pending"
                            ? "Pendiente"
                            : "Suspendido"}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800">{business.subscriptionPlan}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{business.email}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📱 {business.phone}</span>
                      <span>📍 {business.address}</span>
                      <span>📅 {business.registrationDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-green-600 font-semibold">
                        ${business.monthlyRevenue.toLocaleString()}/mes
                      </span>
                      <span className="text-blue-600">{business.totalTransactions} transacciones</span>
                      <span className="text-yellow-600">
                        ⭐ {business.rating} ({business.reviewCount} reviews)
                      </span>
                    </div>
                    {business.referredBy && (
                      <p className="text-xs text-orange-600">
                        Referido por: {users.find((u) => u.id === business.referredBy)?.name || business.referredBy}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedBusiness(business)
                      setShowBusinessModal(true)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {business.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveBusiness(business.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCommissions = () => (
    <div className="space-y-6">
      {/* Resumen de comisiones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Banknote className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Comisiones Pagadas</p>
                <p className="text-2xl font-bold">${stats.paidCommissions.toFixed(2)}</p>
                <p className="text-xs opacity-75">Este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Pendientes de Pago</p>
                <p className="text-2xl font-bold">${stats.pendingCommissions.toFixed(2)}</p>
                <p className="text-xs opacity-75">USDT</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Percent className="h-8 w-8" />
              <div className="ml-4">
                <p className="text-sm opacity-90">Tasa Promedio</p>
                <p className="text-2xl font-bold">20%</p>
                <p className="text-xs opacity-75">Comisión estándar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por afiliado o negocio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select className="px-3 py-2 border rounded-md">
          <option value="all">Todas las comisiones</option>
          <option value="pending">Pendientes</option>
          <option value="paid">Pagadas</option>
          <option value="cancelled">Canceladas</option>
        </select>
        <Button className="bg-green-600 hover:bg-green-700">
          <Send className="h-4 w-4 mr-2" />
          Pagar Pendientes
        </Button>
      </div>

      {/* Lista de comisiones */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Comisiones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commissions.map((commission) => (
              <div
                key={commission.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Crown className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{commission.affiliateName}</h3>
                      <Badge
                        variant={commission.status === "paid" ? "default" : "secondary"}
                        className={
                          commission.status === "paid"
                            ? "bg-green-600"
                            : commission.status === "pending"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {commission.status === "paid"
                          ? "Pagada"
                          : commission.status === "pending"
                            ? "Pendiente"
                            : "Cancelada"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{commission.businessName}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>💰 ${commission.amount.toFixed(2)} USDT</span>
                      <span>📊 {commission.percentage}% comisión</span>
                      <span>📅 {commission.transactionDate.toLocaleDateString()}</span>
                      {commission.paymentDate && <span>✅ Pagada: {commission.paymentDate.toLocaleDateString()}</span>}
                    </div>
                    <p className="text-xs text-gray-500">{commission.notes}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">${commission.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{commission.paymentMethod}</p>
                  </div>
                  {commission.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handlePayCommission(commission.id)}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Pagar
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Resumen de transacciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Total Transacciones</p>
              <p className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Volumen USDT</p>
              <p className="text-2xl font-bold">$45,678</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Volumen USD</p>
              <p className="text-2xl font-bold">$23,456</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm opacity-90">Comisiones</p>
              <p className="text-2xl font-bold">$1,234</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de transacciones */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === "payment"
                        ? "bg-blue-100"
                        : transaction.type === "commission"
                          ? "bg-purple-100"
                          : transaction.type === "withdrawal"
                            ? "bg-red-100"
                            : "bg-green-100"
                    }`}
                  >
                    {transaction.type === "payment" ? (
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    ) : transaction.type === "commission" ? (
                      <Crown className="h-6 w-6 text-purple-600" />
                    ) : transaction.type === "withdrawal" ? (
                      <Minus className="h-6 w-6 text-red-600" />
                    ) : (
                      <Plus className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">
                        {transaction.type === "payment"
                          ? "Pago"
                          : transaction.type === "commission"
                            ? "Comisión"
                            : transaction.type === "withdrawal"
                              ? "Retiro"
                              : "Depósito"}
                      </h3>
                      <Badge
                        variant={transaction.status === "completed" ? "default" : "secondary"}
                        className={
                          transaction.status === "completed"
                            ? "bg-green-600"
                            : transaction.status === "pending"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {transaction.status === "completed"
                          ? "Completada"
                          : transaction.status === "pending"
                            ? "Pendiente"
                            : "Fallida"}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-800">{transaction.currency}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Usuario: {users.find((u) => u.id === transaction.userId)?.name || transaction.userId}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>💳 {transaction.paymentMethod}</span>
                      <span>📅 {transaction.date.toLocaleDateString()}</span>
                      <span>💸 Comisión: ${transaction.fees.toFixed(2)}</span>
                      {transaction.affiliateCommission && (
                        <span className="text-purple-600">
                          🎯 Afiliado: ${transaction.affiliateCommission.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === "withdrawal" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {transaction.type === "withdrawal" ? "-" : "+"}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.currency}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-2">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LocalBiz Admin</h1>
                <p className="text-sm text-gray-600">Panel de Control Administrativo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Datos
              </Button>
              <Button variant="outline">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="overview">📊 Resumen</TabsTrigger>
            <TabsTrigger value="users">👥 Usuarios</TabsTrigger>
            <TabsTrigger value="businesses">🏪 Negocios</TabsTrigger>
            <TabsTrigger value="commissions">💰 Comisiones</TabsTrigger>
            <TabsTrigger value="transactions">💳 Transacciones</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">{renderOverview()}</TabsContent>
            <TabsContent value="users">{renderUsers()}</TabsContent>
            <TabsContent value="businesses">{renderBusinesses()}</TabsContent>
            <TabsContent value="commissions">{renderCommissions()}</TabsContent>
            <TabsContent value="transactions">{renderTransactions()}</TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
