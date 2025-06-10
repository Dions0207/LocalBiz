"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MapPin, Upload, CheckCircle, Camera, Instagram, Facebook, Plus } from "lucide-react"

export default function BusinessRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    instagram: "",
    facebook: "",
    hours: {},
    images: [],
    verified: false,
    featured: false,
  })

  const categories = [
    { id: "food", name: "Comida y Restaurantes", icon: "🍕" },
    { id: "retail", name: "Retail y Tiendas", icon: "👕" },
    { id: "services", name: "Servicios Profesionales", icon: "🔧" },
    { id: "health", name: "Salud y Bienestar", icon: "🏥" },
    { id: "beauty", name: "Belleza y Cuidado", icon: "💄" },
    { id: "automotive", name: "Automotriz", icon: "🚗" },
    { id: "education", name: "Educación", icon: "📚" },
    { id: "entertainment", name: "Entretenimiento", icon: "🎬" },
  ]

  const plans = [
    {
      id: "free",
      name: "Básico",
      price: "Gratis",
      features: [
        "Perfil básico del negocio",
        "Información de contacto",
        "Hasta 3 fotos",
        "Horarios de atención",
        "Ubicación en mapa",
      ],
      limitations: ["Sin destacar en búsquedas", "Sin analytics", "Sin promociones"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$299/mes",
      features: [
        "Todo lo del plan básico",
        "Perfil destacado",
        "Hasta 20 fotos",
        "Analytics detallados",
        "Promociones especiales",
        "Badge de verificado",
        "Soporte prioritario",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "$599/mes",
      features: [
        "Todo lo del plan premium",
        "Múltiples ubicaciones",
        "API personalizada",
        "Integración con sistemas",
        "Manager dedicado",
        "Reportes personalizados",
      ],
    },
  ]

  const steps = [
    { id: 1, name: "Información Básica", icon: "📝" },
    { id: 2, name: "Ubicación y Contacto", icon: "📍" },
    { id: 3, name: "Fotos y Multimedia", icon: "📸" },
    { id: 4, name: "Plan y Verificación", icon: "✅" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">🏪 Registra tu Negocio</h1>
          <p className="text-xl text-gray-600">Únete a miles de negocios que ya están creciendo con LocalBiz</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.icon}
                </div>
                <div className="ml-2 hidden md:block">
                  <div className="text-sm font-medium">{step.name}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Tabs value={`step${currentStep}`} className="w-full">
          {/* Step 1: Basic Information */}
          <TabsContent value="step1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">📝 Información Básica de tu Negocio</CardTitle>
                <CardDescription>
                  Cuéntanos sobre tu negocio para que los clientes puedan encontrarte fácilmente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Nombre del Negocio *</Label>
                    <Input
                      id="businessName"
                      placeholder="Ej: Tacos El Güero"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <select
                      id="category"
                      className="w-full p-2 border rounded-md"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción del Negocio *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu negocio, productos o servicios principales..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <p className="text-sm text-gray-500">
                    Una buena descripción ayuda a los clientes a entender qué ofreces
                  </p>
                </div>

                <div className="space-y-4">
                  <Label>Especialidades o Productos Principales</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Input placeholder="Ej: Tacos al Pastor" />
                    <Input placeholder="Ej: Quesadillas" />
                    <Input placeholder="Ej: Salsas Caseras" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)}>Siguiente: Ubicación y Contacto</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 2: Location and Contact */}
          <TabsContent value="step2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">📍 Ubicación y Contacto</CardTitle>
                <CardDescription>Ayuda a tus clientes a encontrarte y contactarte fácilmente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección Completa *</Label>
                  <Input
                    id="address"
                    placeholder="Calle, número, colonia, ciudad"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  <Button variant="outline" size="sm" className="mt-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    Usar mi ubicación actual
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      placeholder="+52 55 1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Business</Label>
                    <Input
                      id="whatsapp"
                      placeholder="+52 55 1234-5678"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contacto@tunegocio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input
                      id="website"
                      placeholder="https://www.tunegocio.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Redes Sociales</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Instagram className="h-5 w-5 text-pink-600" />
                      <Input
                        placeholder="@tunegocio"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <Input
                        placeholder="Tu Negocio"
                        value={formData.facebook}
                        onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Horarios de Atención</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <div className="w-20 text-sm">{day}</div>
                        <Input placeholder="09:00" className="w-20" />
                        <span>-</span>
                        <Input placeholder="18:00" className="w-20" />
                        <Switch />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Anterior
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>Siguiente: Fotos</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 3: Photos and Media */}
          <TabsContent value="step3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">📸 Fotos y Multimedia</CardTitle>
                <CardDescription>
                  Las fotos de calidad atraen más clientes. Sube imágenes de tu negocio, productos o servicios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Foto Principal del Negocio *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Sube tu foto principal</h3>
                    <p className="text-gray-600 mb-4">Esta será la primera imagen que vean los clientes</p>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Seleccionar Archivo
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Galería de Fotos (Opcional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400"
                      >
                        <div className="text-center">
                          <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">Foto {i}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">💡 Tips para mejores fotos:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Usa buena iluminación natural</li>
                    <li>• Muestra tu producto o servicio principal</li>
                    <li>• Incluye fotos del interior y exterior</li>
                    <li>• Mantén las imágenes actualizadas</li>
                    <li>• Evita fotos borrosas o muy oscuras</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Anterior
                  </Button>
                  <Button onClick={() => setCurrentStep(4)}>Siguiente: Plan y Verificación</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 4: Plan and Verification */}
          <TabsContent value="step4">
            <div className="space-y-6">
              {/* Plans */}
              <Card>
                <CardHeader>
                  <CardTitle>💎 Elige tu Plan</CardTitle>
                  <CardDescription>
                    Selecciona el plan que mejor se adapte a las necesidades de tu negocio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                      <Card
                        key={plan.id}
                        className={`relative cursor-pointer transition-all ${
                          plan.popular ? "ring-2 ring-blue-500 scale-105" : "hover:shadow-lg"
                        }`}
                      >
                        {plan.popular && (
                          <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                            Más Popular
                          </Badge>
                        )}
                        <CardHeader className="text-center">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          {plan.limitations && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-xs text-gray-500 mb-2">Limitaciones:</p>
                              <ul className="space-y-1">
                                {plan.limitations.map((limitation, i) => (
                                  <li key={i} className="flex items-center text-xs text-gray-500">
                                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-2 flex-shrink-0" />
                                    {limitation}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <Button className="w-full mt-4" variant={plan.popular ? "default" : "outline"}>
                            Seleccionar {plan.name}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Verification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">✅ Verificación del Negocio</CardTitle>
                  <CardDescription>
                    La verificación aumenta la confianza de los clientes y mejora tu posicionamiento
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800">🏆 Beneficios de la Verificación:</h3>
                    <ul className="text-sm space-y-1 text-green-700">
                      <li>• Badge de "Verificado" en tu perfil</li>
                      <li>• Mayor confianza de los clientes</li>
                      <li>• Mejor posicionamiento en búsquedas</li>
                      <li>• Acceso a funciones premium</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Documentos para Verificación:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h5 className="font-medium mb-2">📄 Negocios Formales</h5>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• RFC</li>
                          <li>• Comprobante de domicilio fiscal</li>
                          <li>• Identificación oficial del representante</li>
                        </ul>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h5 className="font-medium mb-2">🏪 Negocios Informales</h5>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Identificación oficial</li>
                          <li>• Comprobante de domicilio</li>
                          <li>• Fotos del establecimiento</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Solicitar verificación ahora (proceso de 24-48 horas)</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Final Actions */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  Anterior
                </Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  🚀 Registrar mi Negocio
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
