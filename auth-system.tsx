"use client"

import type React from "react"

import { useState, createContext, useContext, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  User,
  Store,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Building,
  Crown,
  AlertCircle,
} from "lucide-react"

interface UserData {
  id: string
  name: string
  email: string
  phone: string
  userType: "customer" | "business" | "affiliate" | "admin"
  status: "active" | "pending" | "suspended"
  avatar: string
  location: string
  referralCode: string
  referredBy?: string
  businessId?: string // ID del negocio asociado si es userType: "business"
  verified: boolean
  kycStatus: "pending" | "approved" | "rejected"
  createdAt: Date
  lastLogin: Date
}

interface AuthContextType {
  user: UserData | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  switchToBusinessMode: () => void
  switchToCustomerMode: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Simular datos de usuario
  useEffect(() => {
    const savedUser = localStorage.getItem("localbiz_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Usuarios de prueba
    const testUsers: UserData[] = [
      {
        id: "usr_001",
        name: "María González",
        email: "maria@test.com",
        phone: "+52 55 1234-5678",
        userType: "customer",
        status: "active",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Ciudad de México",
        referralCode: "MARIA2024",
        verified: true,
        kycStatus: "approved",
        createdAt: new Date("2024-01-15"),
        lastLogin: new Date(),
      },
      {
        id: "usr_002",
        name: "Carlos Mendoza",
        email: "carlos@business.com",
        phone: "+52 55 2345-6789",
        userType: "business",
        status: "active",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Ciudad de México",
        referralCode: "CARLOS2024",
        businessId: "biz_001", // Asignar un ID de negocio para simular que ya tiene uno
        verified: true,
        kycStatus: "approved",
        createdAt: new Date("2024-01-10"),
        lastLogin: new Date(),
      },
      {
        id: "usr_003",
        name: "Admin LocalBiz",
        email: "admin@localbiz.com",
        phone: "+52 55 0000-0000",
        userType: "admin",
        status: "active",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Ciudad de México",
        referralCode: "ADMIN2024",
        verified: true,
        kycStatus: "approved",
        createdAt: new Date("2024-01-01"),
        lastLogin: new Date(),
      },
    ]

    const foundUser = testUsers.find((u) => u.email === email)

    if (foundUser && password === "123456") {
      setUser(foundUser)
      localStorage.setItem("localbiz_user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newUser: UserData = {
      id: `usr_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      userType: userData.userType || "customer",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      location: userData.location || "Ciudad de México",
      referralCode: `${userData.name.toUpperCase().slice(0, 3)}${Date.now().toString().slice(-4)}`,
      referredBy: userData.referralCode,
      verified: false,
      kycStatus: "pending",
      createdAt: new Date(),
      lastLogin: new Date(),
      businessId: userData.userType === "business" ? undefined : undefined, // Asegurar que no tenga businessId al registrarse
    }

    setUser(newUser)
    localStorage.setItem("localbiz_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("localbiz_user")
  }

  const switchToBusinessMode = () => {
    if (user) {
      const updatedUser = { ...user, userType: "business" as const }
      setUser(updatedUser)
      localStorage.setItem("localbiz_user", JSON.stringify(updatedUser))
    }
  }

  const switchToCustomerMode = () => {
    if (user) {
      const updatedUser = { ...user, userType: "customer" as const }
      setUser(updatedUser)
      localStorage.setItem("localbiz_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        switchToBusinessMode,
        switchToCustomerMode,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function AuthSystem() {
  const [currentView, setCurrentView] = useState<"login" | "register">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    userType: "customer",
    referralCode: "",
    businessName: "",
    businessCategory: "",
    acceptTerms: false,
  })
  const [errors, setErrors] = useState<any>({})
  const { login, register, isLoading, user } = useAuth() // Obtener 'user' del contexto

  // Si el usuario ya está logueado, no mostrar el AuthSystem
  // Esto es redundante con main-app.tsx pero puede ayudar a evitar flashes
  useEffect(() => {
    if (user) {
      // No hacemos una redirección aquí, main-app.tsx ya se encarga de renderizar el dashboard
      // Este componente simplemente no se renderizará si user ya existe.
    }
  }, [user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!formData.email || !formData.password) {
      setErrors({ general: "Por favor completa todos los campos" })
      return
    }

    const success = await login(formData.email, formData.password)
    if (!success) {
      setErrors({ general: "Email o contraseña incorrectos" })
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validaciones
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setErrors({ general: "Por favor completa todos los campos obligatorios" })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ password: "Las contraseñas no coinciden" })
      return
    }

    if (formData.password.length < 6) {
      setErrors({ password: "La contraseña debe tener al menos 6 caracteres" })
      return
    }

    if (!formData.acceptTerms) {
      setErrors({ terms: "Debes aceptar los términos y condiciones" })
      return
    }

    const success = await register(formData)
    if (!success) {
      setErrors({ general: "Error al crear la cuenta. Intenta de nuevo." })
    }
  }

  const renderLogin = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <LogIn className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        <p className="text-gray-600">Accede a tu cuenta LocalBiz</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contraseña</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setCurrentView("register")}
              className="text-blue-600 hover:underline text-sm"
            >
              ¿No tienes cuenta? Regístrate aquí
            </button>
          </div>

          {/* Cuentas de prueba */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <p className="text-blue-800 font-semibold text-sm mb-2">🧪 Cuentas de Prueba:</p>
            <div className="space-y-1 text-xs">
              <p>
                <strong>Cliente:</strong> maria@test.com / 123456
              </p>
              <p>
                <strong>Negocio:</strong> carlos@business.com / 123456
              </p>
              <p>
                <strong>Admin:</strong> admin@localbiz.com / 123456
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  const renderRegister = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <UserPlus className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
        <p className="text-gray-600">Únete a la comunidad LocalBiz</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </div>
          )}

          {/* Tipo de cuenta */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Cuenta</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "customer" })}
                className={`p-4 border rounded-lg text-center transition-all ${
                  formData.userType === "customer"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <User className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">Cliente</p>
                <p className="text-xs text-gray-600">Buscar y comprar</p>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: "business" })}
                className={`p-4 border rounded-lg text-center transition-all ${
                  formData.userType === "business"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Store className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">Negocio</p>
                <p className="text-xs text-gray-600">Vender productos</p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre Completo *</label>
              <Input
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Teléfono *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="+52 55 1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ubicación</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Ciudad, Estado"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña *</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirmar Contraseña *</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          {/* Campos adicionales para negocios */}
          {formData.userType === "business" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre del Negocio</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Mi Negocio S.A."
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.businessCategory}
                  onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                >
                  <option value="">Selecciona categoría</option>
                  <option value="food">🍕 Comida y Restaurantes</option>
                  <option value="retail">👕 Retail y Tiendas</option>
                  <option value="services">🔧 Servicios Profesionales</option>
                  <option value="beauty">💄 Belleza y Cuidado</option>
                  <option value="automotive">🚗 Automotriz</option>
                  <option value="health">🏥 Salud y Bienestar</option>
                </select>
              </div>
            </div>
          )}

          {/* Código de referido */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Código de Referido (Opcional)</label>
            <div className="relative">
              <Crown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="CODIGO2024"
                value={formData.referralCode}
                onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-gray-500">
              Si alguien te refirió, ingresa su código para que ambos reciban beneficios
            </p>
          </div>

          {/* Términos y condiciones */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="mt-1"
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-600">
              Acepto los{" "}
              <a href="#" className="text-blue-600 hover:underline">
                términos y condiciones
              </a>{" "}
              y la{" "}
              <a href="#" className="text-blue-600 hover:underline">
                política de privacidad
              </a>
            </label>
          </div>
          {errors.terms && <p className="text-red-600 text-xs">{errors.terms}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setCurrentView("login")}
              className="text-blue-600 hover:underline text-sm"
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {currentView === "login" ? renderLogin() : renderRegister()}
    </div>
  )
}
