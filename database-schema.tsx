"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Key, Link, Users, Store, Crown, CreditCard } from "lucide-react"

export default function DatabaseSchema() {
  const tables = [
    {
      name: "users",
      icon: Users,
      color: "bg-blue-500",
      description: "Tabla principal de usuarios (clientes, negocios, afiliados, admins)",
      fields: [
        { name: "id", type: "UUID", primary: true, description: "Identificador único" },
        { name: "email", type: "VARCHAR(255)", unique: true, description: "Email único" },
        { name: "password_hash", type: "VARCHAR(255)", description: "Contraseña encriptada" },
        { name: "name", type: "VARCHAR(255)", description: "Nombre completo" },
        { name: "phone", type: "VARCHAR(20)", description: "Teléfono" },
        { name: "user_type", type: "ENUM", description: "customer, business, affiliate, admin" },
        { name: "status", type: "ENUM", description: "active, inactive, suspended" },
        { name: "kyc_status", type: "ENUM", description: "pending, approved, rejected" },
        { name: "referral_code", type: "VARCHAR(20)", unique: true, description: "Código de referido único" },
        { name: "referred_by", type: "UUID", foreign: true, description: "ID del usuario que lo refirió" },
        { name: "location", type: "VARCHAR(255)", description: "Ubicación del usuario" },
        { name: "avatar_url", type: "TEXT", description: "URL del avatar" },
        { name: "verified", type: "BOOLEAN", description: "Usuario verificado" },
        { name: "created_at", type: "TIMESTAMP", description: "Fecha de registro" },
        { name: "updated_at", type: "TIMESTAMP", description: "Última actualización" },
        { name: "last_activity", type: "TIMESTAMP", description: "Última actividad" },
      ],
    },
    {
      name: "businesses",
      icon: Store,
      color: "bg-green-500",
      description: "Información de negocios registrados en la plataforma",
      fields: [
        { name: "id", type: "UUID", primary: true, description: "Identificador único" },
        { name: "owner_id", type: "UUID", foreign: true, description: "ID del propietario (users.id)" },
        { name: "name", type: "VARCHAR(255)", description: "Nombre del negocio" },
        { name: "category", type: "VARCHAR(100)", description: "Categoría del negocio" },
        { name: "description", type: "TEXT", description: "Descripción del negocio" },
        { name: "email", type: "VARCHAR(255)", description: "Email del negocio" },
        { name: "phone", type: "VARCHAR(20)", description: "Teléfono del negocio" },
        { name: "address", type: "TEXT", description: "Dirección completa" },
        { name: "latitude", type: "DECIMAL(10,8)", description: "Latitud GPS" },
        { name: "longitude", type: "DECIMAL(11,8)", description: "Longitud GPS" },
        { name: "status", type: "ENUM", description: "active, pending, suspended" },
        { name: "subscription_plan", type: "ENUM", description: "free, basic, premium, enterprise" },
        { name: "subscription_expiry", type: "DATE", description: "Fecha de expiración" },
        { name: "commission_rate", type: "DECIMAL(5,2)", description: "Tasa de comisión %" },
        { name: "payment_methods", type: "JSON", description: "Métodos de pago aceptados" },
        { name: "business_hours", type: "JSON", description: "Horarios de atención" },
        { name: "rating", type: "DECIMAL(3,2)", description: "Calificación promedio" },
        { name: "review_count", type: "INTEGER", description: "Número de reseñas" },
        { name: "verified", type: "BOOLEAN", description: "Negocio verificado" },
        { name: "referred_by", type: "UUID", foreign: true, description: "ID del afiliado que lo refirió" },
        { name: "created_at", type: "TIMESTAMP", description: "Fecha de registro" },
        { name: "updated_at", type: "TIMESTAMP", description: "Última actualización" },
      ],
    },
    {
      name: "affiliates",
      icon: Crown,
      color: "bg-purple-500",
      description: "Información específica de afiliados y sus comisiones",
      fields: [
        { name: "id", type: "UUID", primary: true, description: "Identificador único" },
        { name: "user_id", type: "UUID", foreign: true, description: "ID del usuario (users.id)" },
        { name: "commission_rate", type: "DECIMAL(5,2)", description: "Tasa de comisión %" },
        { name: "total_referrals", type: "INTEGER", description: "Total de referidos" },
        { name: "active_referrals", type: "INTEGER", description: "Referidos activos" },
        { name: "total_commission_earned", type: "DECIMAL(15,2)", description: "Total comisiones ganadas" },
        { name: "pending_commission", type: "DECIMAL(15,2)", description: "Comisiones pendientes" },
        { name: "paid_commission", type: "DECIMAL(15,2)", description: "Comisiones pagadas" },
        { name: "payment_method", type: "VARCHAR(50)", description: "Método de pago preferido" },
        { name: "wallet_address", type: "VARCHAR(255)", description: "Dirección de wallet USDT" },
        { name: "tier", type: "ENUM", description: "bronze, silver, gold, platinum, diamond" },
        { name: "created_at", type: "TIMESTAMP", description: "Fecha de registro" },
        { name: "updated_at", type: "TIMESTAMP", description: "Última actualización" },
      ],
    },
    {
      name: "commissions",
      icon: CreditCard,
      color: "bg-yellow-500",
      description: "Registro de todas las comisiones generadas y pagadas",
      fields: [
        { name: "id", type: "UUID", primary: true, description: "Identificador único" },
        { name: "affiliate_id", type: "UUID", foreign: true, description: "ID del afiliado" },
        { name: "business_id", type: "UUID", foreign: true, description: "ID del negocio" },
        { name: "transaction_id", type: "UUID", foreign: true, description: "ID de la transacción origen" },
        { name: "amount", type: "DECIMAL(15,2)", description: "Monto de la comisión" },
        { name: "percentage", type: "DECIMAL(5,2)", description: "Porcentaje aplicado" },
        { name: "currency", type: "ENUM", description: "USDT, USD" },
        { name: "status", type: "ENUM", description: "pending, paid, cancelled" },
        { name: "payment_method", type: "VARCHAR(50)", description: "Método de pago usado" },
        { name: "payment_reference", type: "VARCHAR(255)", description: "Referencia del pago" },
        { name: "notes", type: "TEXT", description: "Notas adicionales" },
        { name: "created_at", type: "TIMESTAMP", description: "Fecha de generación" },
        { name: "paid_at", type: "TIMESTAMP", description: "Fecha de pago" },
        { name: "updated_at", type: "TIMESTAMP", description: "Última actualización" },
      ],
    },
    {
      name: "transactions",
      icon: CreditCard,
      color: "bg-orange-500",
      description: "Todas las transacciones financieras de la plataforma",
      fields: [
        { name: "id", type: "UUID", primary: true, description: "Identificador único" },
        { name: "user_id", type: "UUID", foreign: true, description: "ID del usuario" },
        { name: "business_id", type: "UUID", foreign: true, description: "ID del negocio (si aplica)" },
        { name: "amount", type: "DECIMAL(15,2)", description: "Monto de la transacción" },
        { name: "currency", type: "ENUM", description: "USDT, USD" },
        { name: "type", type: "ENUM", description: "payment, commission, withdrawal, deposit" },
        { name: "status", type: "ENUM", description: "completed, pending, failed, cancelled" },
        { name: "payment_method", type: "VARCHAR(50)", description: "Método de pago" },
        { name: "payment_reference", type: "VARCHAR(255)", description: "Referencia externa" },
        { name: "fees", type: "DECIMAL(15,2)", description: "Comisiones cobradas" },
        { name: "affiliate_commission", type: "DECIMAL(15,2)", description: "Comisión para afiliado" },
        { name: "metadata", type: "JSON", description: "Datos adicionales" },
        { name: "created_at", type: "TIMESTAMP", description: "Fecha de transacción" },
        { name: "updated_at", type: "TIMESTAMP", description: "Última actualización" },
      ],
    },
    {
      name: "referrals",
      icon: Link,
      color: "bg-indigo-500",
      description: "Registro de todas las referencias entre usuarios",
      fields: [
        { name: "id", type: "UUID", primary: true, description: "Identificador único" },
        { name: "referrer_id", type: "UUID", foreign: true, description: "ID del que refiere" },
        { name: "referred_id", type: "UUID", foreign: true, description: "ID del referido" },
        { name: "referral_code", type: "VARCHAR(20)", description: "Código usado" },
        { name: "type", type: "ENUM", description: "user, business" },
        { name: "status", type: "ENUM", description: "active, inactive, completed" },
        { name: "commission_earned", type: "DECIMAL(15,2)", description: "Comisión total generada" },
        { name: "created_at", type: "TIMESTAMP", description: "Fecha de referencia" },
        { name: "updated_at", type: "TIMESTAMP", description: "Última actualización" },
      ],
    },
  ]

  const relationships = [
    { from: "users", to: "businesses", type: "1:N", description: "Un usuario puede tener múltiples negocios" },
    { from: "users", to: "affiliates", type: "1:1", description: "Un usuario puede ser afiliado" },
    { from: "users", to: "referrals", type: "1:N", description: "Un usuario puede referir a muchos" },
    { from: "affiliates", to: "commissions", type: "1:N", description: "Un afiliado tiene múltiples comisiones" },
    { from: "businesses", to: "commissions", type: "1:N", description: "Un negocio genera múltiples comisiones" },
    { from: "transactions", to: "commissions", type: "1:1", description: "Una transacción puede generar una comisión" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-6 w-6 text-blue-600" />
            Esquema de Base de Datos - LocalBiz
          </CardTitle>
          <p className="text-gray-600">
            Estructura completa de la base de datos para gestión de usuarios, negocios, afiliados y comisiones
          </p>
        </CardHeader>
      </Card>

      {/* Tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tables.map((table) => (
          <Card key={table.name} className="border-l-4" style={{ borderLeftColor: table.color.replace("bg-", "#") }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className={`${table.color} rounded-lg p-2 mr-3`}>
                  <table.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="font-mono text-lg">{table.name}</span>
                  <p className="text-sm text-gray-600 font-normal">{table.description}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {table.fields.map((field) => (
                  <div key={field.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-semibold">{field.name}</span>
                      {field.primary && <Badge className="bg-red-100 text-red-800 text-xs">PK</Badge>}
                      {field.foreign && <Badge className="bg-blue-100 text-blue-800 text-xs">FK</Badge>}
                      {field.unique && <Badge className="bg-green-100 text-green-800 text-xs">UNIQUE</Badge>}
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-gray-600">{field.type}</span>
                      <p className="text-xs text-gray-500">{field.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Relaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="mr-2 h-6 w-6 text-green-600" />
            Relaciones entre Tablas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relationships.map((rel, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-semibold">{rel.from}</span>
                  <Badge variant="outline">{rel.type}</Badge>
                  <span className="font-mono text-sm font-semibold">{rel.to}</span>
                </div>
                <p className="text-xs text-gray-600">{rel.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Índices recomendados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-6 w-6 text-purple-600" />
            Índices Recomendados para Optimización
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Índices de Búsqueda</h4>
              <div className="space-y-1 text-sm font-mono">
                <p>• users(email)</p>
                <p>• users(referral_code)</p>
                <p>• users(referred_by)</p>
                <p>• businesses(owner_id)</p>
                <p>• businesses(category)</p>
                <p>• businesses(status)</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Índices de Rendimiento</h4>
              <div className="space-y-1 text-sm font-mono">
                <p>• commissions(affiliate_id, status)</p>
                <p>• transactions(user_id, created_at)</p>
                <p>• referrals(referrer_id)</p>
                <p>• businesses(latitude, longitude)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
