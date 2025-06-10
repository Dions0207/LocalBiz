"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "./auth-system"
import BusinessRegistration from "./business-registration"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Users,
  PlusCircle,
  Store,
  Megaphone,
  Wallet,
  MapPin,
  Phone,
  Mail,
  Globe,
  Info,
  Edit,
  MoreHorizontal,
  ImageIcon,
  Sparkles,
  Loader2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Definiciones de tipos para el dashboard
interface BusinessData {
  id: string
  name: string
  category: string
  address: string
  phone: string
  email: string
  website?: string
  description: string
  owner_id: string
  status: "active" | "pending" | "suspended"
  created_at: string
  logo_url?: string
  cover_image_url?: string
  rating?: number
  review_count?: number
}

interface AdCampaign {
  id: string
  businessId: string
  name: string
  status: "active" | "paused" | "completed"
  budget: number
  spent: number
  impressions: number
  clicks: number
  startDate: Date
  endDate: Date
  targetAudience: string
  adContent: string
  adBannerUrl?: string
  createdAt: Date
}

interface Product {
  id: string
  businessId: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
  category: string
  status: "available" | "out_of_stock" | "hidden"
  createdAt: Date
}

export default function BusinessDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showCreateAdForm, setShowCreateAdForm] = useState(false)
  const [currentBusiness, setCurrentBusiness] = useState<BusinessData | null>(null)
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>([])

  const [aiBannerPrompt, setAiBannerPrompt] = useState("")
  const [generatedBannerUrl, setGeneratedBannerUrl] = useState("")
  const [isGeneratingBanner, setIsGeneratingBanner] = useState(false)
  const [bannerGenerationError, setBannerGenerationError] = useState<string | null>(null)

  const fetchBusiness = useCallback(async () => {
    if (!user?.id) return

    try {
      console.log(`Fetching business for user ID: ${user.id}`)
      const response = await fetch(`/api/businesses?userId=${user.id}`)
      const result = await response.json()

      if (response.ok && result.businesses && result.businesses.length > 0) {
        setCurrentBusiness(result.businesses[0])
        console.log("Business loaded:", result.businesses[0])
        setShowRegistrationForm(false)
      } else {
        console.log("No business found for this user or error fetching:", result.error || "No businesses array")
        setCurrentBusiness(null)
        setShowRegistrationForm(true)
      }
    } catch (error) {
      console.error("Failed to fetch business:", error)
      setCurrentBusiness(null)
      setShowRegistrationForm(true)
    }
  }, [user])

  useEffect(() => {
    if (user && user.userType === "business") {
      fetchBusiness()
      setAdCampaigns([
        {
          id: "ad_001",
          businessId: "biz_001",
          name: "Campaña de Lanzamiento",
          status: "active",
          budget: 500,
          spent: 350,
          impressions: 15000,
          clicks: 500,
          startDate: new Date("2024-05-01"),
          endDate: new Date("2024-05-31"),
          targetAudience: "Clientes en CDMX",
          adContent: "Gran oferta en todos nuestros productos!",
          adBannerUrl: "/placeholder.svg?height=150&width=600",
          createdAt: new Date("2024-04-25"),
        },
      ])
    }
  }, [user, fetchBusiness])

  const handleBusinessRegistered = (newBusinessData: BusinessData) => {
    setCurrentBusiness(newBusinessData)
    setShowRegistrationForm(false)
    setActiveTab("overview")
    console.log("New business registered and set as current:", newBusinessData)
  }

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const newAd: AdCampaign = {
      id: `ad_${Date.now()}`,
      businessId: currentBusiness?.id || "unknown",
      name: (form.elements.namedItem("adName") as HTMLInputElement).value,
      status: "active",
      budget: Number.parseFloat((form.elements.namedItem("adBudget") as HTMLInputElement).value),
      spent: 0,
      impressions: 0,
      clicks: 0,
      startDate: new Date(),
      endDate: new Date(
        new Date().setDate(
          new Date().getDate() + Number.parseInt((form.elements.namedItem("adDuration") as HTMLInputElement).value),
        ),
      ),
      targetAudience: "General",
      adContent: (form.elements.namedItem("adContent") as HTMLTextAreaElement).value,
      adBannerUrl:
        (form.elements.namedItem("adBannerUrl") as HTMLInputElement)?.value || "/placeholder.svg?height=150&width=600",
      createdAt: new Date(),
    }
    setAdCampaigns([...adCampaigns, newAd])
    setShowCreateAdForm(false)
    setActiveTab("ads")
    console.log("New ad campaign created:", newAd)
    alert("Campaña de anuncio creada (simulado)!")
  }

  const handleGenerateBanner = async () => {
    if (!aiBannerPrompt.trim()) {
      setBannerGenerationError("Por favor, ingresa una descripción para el banner.")
      return
    }
    setIsGeneratingBanner(true)
    setBannerGenerationError(null)
    setGeneratedBannerUrl("")

    try {
      const response = await fetch("/api/generate-banner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiBannerPrompt }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al generar el banner con IA.")
      }

      const data = await response.json()
      setGeneratedBannerUrl(data.imageUrl)
      const adBannerUrlInput = document.getElementById("adBannerUrl") as HTMLInputElement
      if (adBannerUrlInput) {
        adBannerUrlInput.value = data.imageUrl
      }
    } catch (error: any) {
      console.error("Failed to generate banner:", error)
      setBannerGenerationError(error.message || "Error desconocido al generar el banner.")
    } finally {
      setIsGeneratingBanner(false)
    }
  }

  if (!user || user.userType !== "business") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
        Acceso denegado. Solo los usuarios de negocio pueden ver este dashboard.
      </div>
    )
  }

  if (!currentBusiness && !showRegistrationForm) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">¡Bienvenido, {user.name}!</CardTitle>
            <p className="text-gray-600">Parece que aún no tienes un negocio registrado.</p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                setShowRegistrationForm(true)
                console.log("Button 'Registrar mi Primer Negocio' clicked. Setting showRegistrationForm to true.")
              }}
              className="w-full"
            >
              Registrar mi Primer Negocio
            </Button>
            <Button variant="outline" onClick={logout} className="mt-4 w-full">
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showRegistrationForm) {
    console.log("BusinessDashboard: showRegistrationForm is now true. Rendering BusinessRegistration.")
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <BusinessRegistration
          onRegisterSuccess={handleBusinessRegistered}
          onCancel={() => {
            setShowRegistrationForm(false)
            console.log("BusinessRegistration: Cancelled. Setting showRegistrationForm to false.")
          }}
        />
      </div>
    )
  }

  if (showCreateAdForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={() => setShowCreateAdForm(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </Button>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Megaphone className="h-8 w-8 text-white" />
              </div>
              <div className="w-10"></div>
            </div>
            <CardTitle className="text-2xl">Crear Nueva Campaña de Anuncio</CardTitle>
            <p className="text-gray-600">Llega a más clientes con promociones destacadas.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAd} className="space-y-4">
              <div>
                <label htmlFor="adName" className="text-sm font-medium">
                  Título del Anuncio *
                </label>
                <Input id="adName" name="adName" placeholder="Ej: 50% OFF en toda la tienda" required />
              </div>
              <div>
                <label htmlFor="adContent" className="text-sm font-medium">
                  Descripción *
                </label>
                <textarea
                  id="adContent"
                  name="adContent"
                  placeholder="Describe tu promoción..."
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="adBudget" className="text-sm font-medium">
                    Presupuesto (USDT) *
                  </label>
                  <Input id="adBudget" name="adBudget" placeholder="100" type="number" step="0.01" required />
                </div>
                <div>
                  <label htmlFor="adDuration" className="text-sm font-medium">
                    Duración (días) *
                  </label>
                  <Input id="adDuration" name="adDuration" placeholder="7" type="number" required />
                </div>
              </div>

              <div className="space-y-2 p-4 border rounded-lg bg-purple-50/20">
                <h3 className="font-semibold text-purple-800 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generar Banner con IA
                </h3>
                <p className="text-sm text-gray-700">
                  Describe el banner que deseas crear (ej: "un perro feliz comiendo pizza").
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Descripción del banner para IA..."
                    value={aiBannerPrompt}
                    onChange={(e) => setAiBannerPrompt(e.target.value)}
                    disabled={isGeneratingBanner}
                  />
                  <Button
                    type="button"
                    onClick={handleGenerateBanner}
                    disabled={isGeneratingBanner || !aiBannerPrompt.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isGeneratingBanner ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generando...
                      </>
                    ) : (
                      "Generar"
                    )}
                  </Button>
                </div>
                {bannerGenerationError && <p className="text-red-600 text-sm mt-2">{bannerGenerationError}</p>}
                {generatedBannerUrl && (
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium mb-2">Banner Generado (se ha copiado al campo de URL):</p>
                    <img
                      src={generatedBannerUrl || "/placeholder.svg"}
                      alt="Generated Ad Banner"
                      className="max-w-full h-32 object-contain border rounded-md mx-auto"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="adBannerUrl" className="text-sm font-medium">
                  URL de Imagen del Banner (Opcional)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="adBannerUrl"
                    name="adBannerUrl"
                    placeholder="https://ejemplo.com/banner.jpg"
                    type="url"
                    className="pl-10"
                    defaultValue={generatedBannerUrl}
                  />
                </div>
                {(document.getElementById("adBannerUrl") as HTMLInputElement)?.value && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={(document.getElementById("adBannerUrl") as HTMLInputElement)?.value || "/placeholder.svg"}
                      alt="Ad Banner Preview"
                      className="max-w-full h-24 object-cover border rounded-md"
                    />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="payment-method" className="text-sm font-medium">
                  Método de Pago
                </label>
                <select id="payment-method" className="w-full p-2 border rounded-md">
                  <option>USDT (Tether)</option>
                  <option>Tarjeta de Crédito</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Crear Campaña
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 shrink-0 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a
            className="flex items-center gap-2 text-lg font-semibold md:text-base cursor-pointer"
            onClick={() => setActiveTab("overview")}
          >
            <Store className="h-6 w-6" />
            <span className="sr-only">LocalBiz</span>
          </a>
          <a
            className={`text-gray-500 transition-colors hover:text-gray-900 ${
              activeTab === "overview" && "text-gray-900"
            }`}
            href="#"
            onClick={() => setActiveTab("overview")}
          >
            Resumen
          </a>
          <a
            className={`text-gray-500 transition-colors hover:text-gray-900 ${activeTab === "ads" && "text-gray-900"}`}
            href="#"
            onClick={() => setActiveTab("ads")}
          >
            Anuncios
          </a>
          <a
            className={`text-gray-500 transition-colors hover:text-gray-900 ${
              activeTab === "products" && "text-gray-900"
            }`}
            href="#"
            onClick={() => setActiveTab("products")}
          >
            Productos
          </a>
          <a
            className={`text-gray-500 transition-colors hover:text-gray-900 ${
              activeTab === "analytics" && "text-gray-900"
            }`}
            href="#"
            onClick={() => setActiveTab("analytics")}
          >
            Analíticas
          </a>
          <a
            className={`text-gray-500 transition-colors hover:text-gray-900 ${
              activeTab === "settings" && "text-gray-900"
            }`}
            href="#"
            onClick={() => setActiveTab("settings")}
          >
            Configuración
          </a>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowRegistrationForm(true)
              console.log("Button 'Registrar Otro Negocio' clicked. Setting showRegistrationForm to true.")
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Registrar Otro Negocio
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuItem>Soporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Cerrar Sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-gray-500">+20.1% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Anuncios Activos</CardTitle>
                  <Megaphone className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adCampaigns.filter((ad) => ad.status === "active").length}</div>
                  <p className="text-xs text-gray-500">+180.1% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-gray-500">+180.1% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas Pendientes</CardTitle>
                  <Wallet className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$573</div>
                  <p className="text-xs text-gray-500">+201 desde el mes pasado</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-4">
              <Card className="xl:col-span-2">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Campañas Recientes</CardTitle>
                    <p className="text-sm text-gray-500">Tus campañas de anuncios más recientes.</p>
                  </div>
                  <Button asChild size="sm" className="ml-auto gap-1">
                    <a href="#" onClick={() => setShowCreateAdForm(true)}>
                      <PlusCircle className="h-4 w-4" />
                      Crear Nueva Campaña
                    </a>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaña</TableHead>
                        <TableHead className="hidden xl:table-column">Estado</TableHead>
                        <TableHead className="hidden xl:table-column">Presupuesto</TableHead>
                        <TableHead className="hidden md:table-column">Impresiones</TableHead>
                        <TableHead className="hidden md:table-column">Clicks</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="hidden text-sm text-gray-500 md:inline">{campaign.targetAudience}</div>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">
                            <Badge className="text-xs" variant={campaign.status === "active" ? "default" : "secondary"}>
                              {campaign.status === "active"
                                ? "Activa"
                                : campaign.status === "paused"
                                  ? "Pausada"
                                  : "Completada"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden xl:table-column">${campaign.budget.toFixed(2)}</TableCell>
                          <TableCell className="hidden md:table-column">
                            {campaign.impressions.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden md:table-column">{campaign.clicks.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Acciones</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Pausar/Activar</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Información del Negocio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentBusiness ? (
                    <>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={currentBusiness.logo_url || "/placeholder.svg?height=60&width=60"} />
                          <AvatarFallback>{currentBusiness.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold">{currentBusiness.name}</h3>
                          <p className="text-sm text-gray-500">{currentBusiness.category}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{currentBusiness.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{currentBusiness.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{currentBusiness.email}</span>
                        </div>
                        {currentBusiness.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <a
                              href={currentBusiness.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {currentBusiness.website}
                            </a>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-gray-500 mt-1" />
                          <p className="text-gray-700">{currentBusiness.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Información
                      </Button>
                    </>
                  ) : (
                    <p className="text-center text-gray-500">No hay información de negocio disponible.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="ads">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gestión de Anuncios y Campañas</CardTitle>
                <Button onClick={() => setShowCreateAdForm(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Crear Nueva Campaña de Anuncio
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaña</TableHead>
                      <TableHead>Banner</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Presupuesto</TableHead>
                      <TableHead>Impresiones</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                        </TableCell>
                        <TableCell>
                          {campaign.adBannerUrl ? (
                            <img
                              src={campaign.adBannerUrl || "/placeholder.svg"}
                              alt="Ad Banner"
                              className="w-24 h-auto object-cover rounded-md"
                            />
                          ) : (
                            <span className="text-gray-400">Sin banner</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className="text-xs" variant={campaign.status === "active" ? "default" : "secondary"}>
                            {campaign.status === "active"
                              ? "Activa"
                              : campaign.status === "paused"
                                ? "Pausada"
                                : "Completada"}
                          </Badge>
                        </TableCell>
                        <TableCell>${campaign.budget.toFixed(2)}</TableCell>
                        <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
                        <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Acciones</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Pausar/Activar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Productos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Funcionalidad de gestión de productos en desarrollo.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analíticas del Negocio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Panel de analíticas en desarrollo.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Negocio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Opciones de configuración en desarrollo.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
