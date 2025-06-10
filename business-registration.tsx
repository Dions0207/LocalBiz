"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, MapPin, Phone, Mail, Globe, Tag, Info, AlertCircle, ImageIcon, Upload, Loader2 } from "lucide-react"

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
    logoUrl: "", // This will store the Blob URL after upload
    coverImageUrl: "", // This will store the Blob URL after upload
  })
  const [errors, setErrors] = useState<any>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false) // New state for logo upload progress
  const [isUploadingCover, setIsUploadingCover] = useState(false) // New state for cover image upload progress
  const [logoPreview, setLogoPreview] = useState<string | null>(null) // For local preview before upload
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null) // For local preview before upload

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
      // Removed URL validation for logoUrl and coverImageUrl as they will be handled by file upload
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

  // New handler for file uploads
  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, fieldName: "logoUrl" | "coverImageUrl") => {
      const file = event.target.files?.[0]
      if (!file) return

      setGeneralError(null)
      setErrors((prevErrors: any) => ({ ...prevErrors, [fieldName]: "" })) // Clear previous errors for this field

      // Set local preview immediately
      const previewUrl = URL.createObjectURL(file)
      if (fieldName === "logoUrl") {
        setLogoPreview(previewUrl)
      } else {
        setCoverImagePreview(previewUrl)
      }

      const setStateUploading = fieldName === "logoUrl" ? setIsUploadingLogo : setIsUploadingCover
      setStateUploading(true)

      try {
        const response = await fetch(`/api/upload-image?filename=${file.name}`, {
          method: "POST",
          body: file, // Send the file directly in the body
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.error || `Error al subir ${fieldName === "logoUrl" ? "el logo" : "la imagen de portada"}.`,
          )
        }

        const blob = await response.json()
        setFormData((prevData) => ({ ...prevData, [fieldName]: blob.url })) // Store the Blob URL
        console.log(`File uploaded successfully for ${fieldName}:`, blob.url)
      } catch (error: any) {
        console.error(`Error uploading ${fieldName}:`, error)
        setErrors((prevErrors: any) => ({ ...prevErrors, [fieldName]: error.message || "Error al subir la imagen." }))
        setGeneralError("Error al subir una o más imágenes. Por favor, inténtalo de nuevo.")
        // Clear preview if upload fails
        if (fieldName === "logoUrl") {
          setLogoPreview(null)
        } else {
          setCoverImagePreview(null)
        }
      } finally {
        setStateUploading(false)
      }
    },
    [],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Attempting to submit business registration form.")
    setGeneralError(null)
    let formIsValid = true
    const currentErrors: any = {}

    const fieldsToValidate = ["name", "category", "address", "phone", "email", "description"]
    fieldsToValidate.forEach((field) => {
      if (!validateField(field, (formData as any)[field])) {
        formIsValid = false
        currentErrors[field] = errors[field] || "Campo obligatorio."
      }
    })

    // Validate that logoUrl is present after upload (it's required)
    if (!formData.logoUrl) {
      formIsValid = false
      currentErrors.logoUrl = "El logo es obligatorio."
    }
    // coverImageUrl is optional, so no validation needed here

    setErrors(currentErrors)

    if (!formIsValid) {
      setGeneralError("Por favor, corrige los errores en el formulario.")
      console.log("Form validation failed:", currentErrors)
      return
    }

    // Prevent submission if any uploads are still in progress
    if (isUploadingLogo || isUploadingCover) {
      setGeneralError("Por favor, espera a que todas las imágenes terminen de subirse antes de registrar el negocio.")
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
            <p className="text-sm text-gray-600">Sube tus imágenes directamente aquí.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="logoUpload" className="text-sm font-medium">
                  Subir Logo *
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="logoUpload"
                    name="logoUpload"
                    type="file" // Changed to file input
                    accept="image/*" // Accept only image files
                    onChange={(e) => handleFileUpload(e, "logoUrl")}
                    className="pl-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    disabled={isUploadingLogo} // Disable input while uploading
                  />
                  {isUploadingLogo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
                      <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
                    </div>
                  )}
                </div>
                {errors.logoUrl && <p className="text-red-600 text-xs mt-1">{errors.logoUrl}</p>}
                {(logoPreview || formData.logoUrl) && !errors.logoUrl && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={logoPreview || formData.logoUrl || "/placeholder.svg"}
                      alt="Logo Preview"
                      className="max-w-[100px] max-h-[100px] object-contain border rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="coverImageUpload" className="text-sm font-medium">
                  Subir Imagen de Portada (Opcional)
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="coverImageUpload"
                    name="coverImageUpload"
                    type="file" // Changed to file input
                    accept="image/*" // Accept only image files
                    onChange={(e) => handleFileUpload(e, "coverImageUrl")}
                    className="pl-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                    disabled={isUploadingCover} // Disable input while uploading
                  />
                  {isUploadingCover && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
                      <Loader2 className="h-6 w-6 animate-spin text-violet-500" />
                    </div>
                  )}
                </div>
                {errors.coverImageUrl && <p className="text-red-600 text-xs mt-1">{errors.coverImageUrl}</p>}
                {(coverImagePreview || formData.coverImageUrl) && !errors.coverImageUrl && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={coverImagePreview || formData.coverImageUrl || "/placeholder.svg"}
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
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading || isUploadingLogo || isUploadingCover}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || isUploadingLogo || isUploadingCover}>
              {isLoading ? "Registrando..." : "Registrar Negocio"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
