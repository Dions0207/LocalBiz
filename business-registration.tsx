"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Clock,
  ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "./auth-system" // Assuming useAuth is available

interface BusinessRegistrationProps {
  onBusinessRegistered: (businessData: any) => void
  onCancel?: () => void
}

export default function BusinessRegistration({ onBusinessRegistered, onCancel }: BusinessRegistrationProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    phone: "",
    whatsapp: "",
    email: user?.email || "", // Pre-fill with user's email if available
    website: "",
    instagram: "",
    facebook: "",
    images: [] as string[],
    acceptsCrypto: true,
    acceptsCards: true,
    hours: {
      monday: { open: "09:00", close: "18:00", active: true },
      tuesday: { open: "09:00", close: "18:00", active: true },
      wednesday: { open: "09:00", close: "18:00", active: true },
      thursday: { open: "09:00", close: "18:00", active: true },
      friday: { open: "09:00", close: "18:00", active: true },
      saturday: { open: "09:00", close: "14:00", active: false },
      sunday: { open: "Closed", close: "Closed", active: false },
    },
  })
  const [errors, setErrors] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleHoursChange = (day: string, field: "open" | "close" | "active", value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccess(false)
    setLoading(true)

    // Basic validation
    const newErrors: any = {}
    if (!formData.name) newErrors.name = "El nombre del negocio es obligatorio."
    if (!formData.category) newErrors.category = "La categoría es obligatoria."
    if (!formData.address) newErrors.address = "La dirección es obligatoria."
    if (!formData.phone) newErrors.phone = "El teléfono es obligatorio."
    if (!formData.email) newErrors.email = "El email es obligatorio."

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newBusinessData = {
      id: `biz_${Date.now()}`,
      owner_id: user?.id || "mock_user_id", // Link to current user
      status: "pending", // Or 'active' based on your logic
      verified: false,
      featured: false,
      rating: 0,
      review_count: 0,
      subscription_plan: "free",
      monthlyRevenue: 0,
      totalOrders: 0,
      activePromotions: 0,
      subscriptionExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      ...formData,
    }

    setLoading(false)
    setSuccess(true)
    onBusinessRegistered(newBusinessData)
  }

  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Building className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Registrar tu Negocio</CardTitle>
        <p className="text-gray-600">Completa los datos para que tu negocio aparezca en LocalBiz</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-green-700 text-sm">¡Negocio registrado con éxito! Redirigiendo...</span>
            </div>
          )}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Negocio *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Tacos El Güero"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <select
                id="category"
                name="category"
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="food">🍕 Comida y Restaurantes</option>
                <option value="retail">👕 Retail y Tiendas</option>
                <option value="services">🔧 Servicios Profesionales</option>
                <option value="beauty">💄 Belleza y Cuidado</option>
                <option value="automotive">🚗 Automotriz</option>
                <option value="health">🏥 Salud y Bienestar</option>
                <option value="education">📚 Educación</option>
                <option value="other">Otro</option>
              </select>
              {errors.category && <p className="text-red-600 text-xs">{errors.category}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción del Negocio</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe tu negocio, productos y servicios..."
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="address"
                  name="address"
                  placeholder="Calle, número, colonia, ciudad"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.address && <p className="text-red-600 text-xs">{errors.address}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono de Contacto *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+52 55 1234-5678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp (Opcional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="+52 55 1234-5678"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email de Contacto *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contacto@minegocio.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
              {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Sitio Web (Opcional)</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="website"
                  name="website"
                  placeholder="https://www.minegocio.com"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (Opcional)</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="instagram"
                  name="instagram"
                  placeholder="@minegocio"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook (Opcional)</Label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="facebook"
                  name="facebook"
                  placeholder="Mi Negocio Oficial"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Imágenes (URLs, Opcional)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="images"
                  name="images"
                  placeholder="URL de imagen principal"
                  value={formData.images[0] || ""}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500">Puedes agregar más imágenes después en tu dashboard.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Clock className="h-5 w-5 mr-2" /> Horarios de Operación
            </h3>
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center space-x-4">
                <Checkbox
                  id={day}
                  checked={formData.hours[day].active}
                  onCheckedChange={(checked) => handleHoursChange(day, "active", checked as boolean)}
                />
                <Label htmlFor={day} className="w-24 capitalize">
                  {day === "monday" && "Lunes"}
                  {day === "tuesday" && "Martes"}
                  {day === "wednesday" && "Miércoles"}
                  {day === "thursday" && "Jueves"}
                  {day === "friday" && "Viernes"}
                  {day === "saturday" && "Sábado"}
                  {day === "sunday" && "Domingo"}
                </Label>
                {formData.hours[day].active ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={formData.hours[day].open}
                      onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                      className="w-28"
                    />
                    <span>-</span>
                    <Input
                      type="time"
                      value={formData.hours[day].close}
                      onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                      className="w-28"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">Cerrado</span>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center">
              <Building className="h-5 w-5 mr-2" /> Métodos de Pago
            </h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptsCrypto"
                name="acceptsCrypto"
                checked={formData.acceptsCrypto}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptsCrypto: checked as boolean })}
              />
              <Label htmlFor="acceptsCrypto">Acepta pagos con Crypto (USDT)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptsCards"
                name="acceptsCards"
                checked={formData.acceptsCards}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptsCards: checked as boolean })}
              />
              <Label htmlFor="acceptsCards">Acepta pagos con Tarjetas (USD)</Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading || success}>
            {loading ? "Registrando negocio..." : success ? "¡Registrado!" : "Registrar Negocio"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" className="w-full mt-2" onClick={onCancel} disabled={loading}>
              Cancelar
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
