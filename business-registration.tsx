"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, MapPin, Phone, Mail, Globe, Tag, Info, AlertCircle, ImageIcon, Upload } from "lucide-react"

interface BusinessRegistrationProps {
  onRegisterSuccess: (businessData: any) => void
  onCancel: () => void
}

export default function BusinessRegistration({ onRegisterSuccess, onCancel }: BusinessRegistrationProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    logoUrl: "",
    coverImageUrl: "",
  })
  const [errors, setErrors] = useState<any>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateField = (name: string, value: string) => {
    let fieldError = ""
    switch (name) {
      case "name":
        if (!value.trim()) fieldError = "El nombre del negocio es obligatorio."
        break
      case "category":
        if (!value.trim()) fieldError = "La categoría es obligatoria."
        break
      case "address":
        if (!value.trim()) fieldError = "La dirección es obligatoria."
        break
      case "phone":
        if (!value.trim()) fieldError = "El teléfono es obligatorio."
        else if (!/^\+?[0-9\s-()]{7,20}$/.test(value)) fieldError = "Formato de teléfono inválido."
        break
      case "email":
        if (!value.trim()) fieldError = "El email es obligatorio."
        else if (!/\S+@\S+\.\S+/.test(value)) fieldError = "Formato de email inválido."
        break
      case "description":
        if (!value.trim()) fieldError = "La descripción es obligatoria."
        break
      case "logoUrl":
      case "coverImageUrl":
        if (value.trim() && !/^https?:\/\/\S+\.(png|jpg|jpeg|gif|svg|webp)$/i.test(value)) {
          fieldError = "URL de imagen inválida (solo .png, .jpg, .jpeg, .gif, .svg, .webp)."
        }
        break
      default:
        break
    }
    setErrors((prevErrors: any) => ({ ...prevErrors, [name]: fieldError }))
    return fieldError === ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    validateField(name, value)
    setGeneralError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Attempting to submit business registration form.")
    setGeneralError(null)
    let formIsValid = true
    const currentErrors: any = {}

    const fieldsToValidate = [
      "name",
      "category",
      "address",
      "phone",
      "email",
      "description",
      "logoUrl",
      "coverImageUrl",
    ]
    fieldsToValidate.forEach((field) => {
      if (!validateField(field, (formData as any)[field])) {
        formIsValid = false
        currentErrors[field] = errors[field] || "Campo obligatorio."
      }
    })

    setErrors(currentErrors)

    if (!formIsValid) {
      setGeneralError("Por favor, corrige los errores en el formulario.")
      console.log("Form validation failed:", currentErrors)
      return
    }

    setIsLoading(true)
    console.log("Form is valid. Submitting data to API:", formData)

    try {
      const response = await fetch("/api/businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          owner_id: "current_user_id_placeholder", // TODO: Replace with actual user ID from auth context
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al registrar el negocio.")
      }

      console.log("Business registered successfully:", result.business)
      onRegisterSuccess(result.business)
    } catch (error: any) {
      console.error("Error during business registration:", error)
      setGeneralError(error.message || "Error al registrar el negocio. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Building className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Registra tu Negocio</CardTitle>
        <p className="text-gray-600">Completa los detalles de tu empresa para empezar a vender.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {generalError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-red-700 text-sm">{generalError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre del Negocio *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej. Mi Tienda de Ropa"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Categoría *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md pl-10 h-10"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="food">🍕 Comida y Restaurantes</option>
                  <option value="retail">👕 Retail y Tiendas</option>
                  <option value="services">🔧 Servicios Profesionales</option>
                  <option value="beauty">💄 Belleza y Cuidado</option>
                  <option value="automotive">🚗 Automotriz</option>
                  <option value="health">🏥 Salud y Bienestar</option>
                  <option value="other">Otros</option>
                </select>
              </div>
              {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Dirección *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="address"
                  name="address"
                  placeholder="Calle, Número, Colonia, Ciudad"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Teléfono *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+52 55 1234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email de Contacto *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contacto@minegocio.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Sitio Web (Opcional)
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="website"
                  name="website"
                  placeholder="https://www.minegocio.com"
                  value={formData.website}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" /> Imágenes del Negocio
            </h3>
            <p className="text-sm text-gray-600">
              Pega la URL de tus imágenes. Para subir archivos, necesitarías un backend.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="logoUrl" className="text-sm font-medium">
                  URL del Logo *
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="logoUrl"
                    name="logoUrl"
                    placeholder="https://ejemplo.com/logo.png"
                    value={formData.logoUrl}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
                {errors.logoUrl && <p className="text-red-600 text-xs mt-1">{errors.logoUrl}</p>}
                {formData.logoUrl && !errors.logoUrl && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={formData.logoUrl || "/placeholder.svg"}
                      alt="Logo Preview"
                      className="max-w-[100px] max-h-[100px] object-contain border rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="coverImageUrl" className="text-sm font-medium">
                  URL de Imagen de Portada (Opcional)
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="coverImageUrl"
                    name="coverImageUrl"
                    placeholder="https://ejemplo.com/portada.jpg"
                    value={formData.coverImageUrl}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
                {errors.coverImageUrl && <p className="text-red-600 text-xs mt-1">{errors.coverImageUrl}</p>}
                {formData.coverImageUrl && !errors.coverImageUrl && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={formData.coverImageUrl || "/placeholder.svg"}
                      alt="Cover Image Preview"
                      className="max-w-full h-32 object-cover border rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descripción del Negocio *
            </label>
            <div className="relative">
              <Info className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <textarea
                id="description"
                name="description"
                placeholder="Describe brevemente tu negocio, productos o servicios..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border rounded-md pl-10 resize-y"
              ></textarea>
            </div>
            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar Negocio"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
