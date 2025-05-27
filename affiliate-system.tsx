"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Crown,
  Users,
  DollarSign,
  TrendingUp,
  Share2,
  Copy,
  Gift,
  Award,
  Banknote,
  Percent,
  Calendar,
  Target,
  Zap,
} from "lucide-react"

interface AffiliateData {
  totalEarnings: number
  monthlyEarnings: number
  referredUsers: number
  activeReferrals: number
  commissionRate: number
  lifetimeCommissions: boolean
  pendingPayouts: number
  totalPayouts: number
  referralCode: string
  tier: string
  nextTierRequirement: number
}

interface ReferralActivity {
  id: string
  type: "signup" | "purchase" | "commission"
  user: string
  amount: number
  business: string
  timestamp: Date
  status: "pending" | "completed" | "paid"
}

export default function AffiliateSystem() {
  const [affiliateData, setAffiliateData] = useState<AffiliateData>({
    totalEarnings: 247.85,
    monthlyEarnings: 89.32,
    referredUsers: 23,
    activeReferrals: 18,
    commissionRate: 20,
    lifetimeCommissions: true,
    pendingPayouts: 45.67,
    totalPayouts: 202.18,
    referralCode: "LOCALBIZ2024",
    tier: "Gold",
    nextTierRequirement: 50,
  })

  const [recentActivity, setRecentActivity] = useState<ReferralActivity[]>([
    {
      id: "1",
      type: "commission",
      user: "María G.",
      amount: 8.4,
      business: "Tacos El Güero",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "completed",
    },
    {
      id: "2",
      type: "signup",
      user: "Carlos M.",
      amount: 0,
      business: "",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "completed",
    },
    {
      id: "3",
      type: "commission",
      user: "Ana L.",
      amount: 12.6,
      business: "Boutique Luna",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      status: "pending",
    },
    {
      id: "4",
      type: "purchase",
      user: "Roberto S.",
      amount: 15.8,
      business: "Café Literario",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      status: "completed",
    },
  ])

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular nueva actividad ocasional
      if (Math.random() > 0.8) {
        const newActivity: ReferralActivity = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "commission" : "signup",
          user: `Usuario ${Math.floor(Math.random() * 100)}`,
          amount: Math.random() * 20,
          business: ["Tacos El Güero", "Boutique Luna", "Café Literario"][Math.floor(Math.random() * 3)],
          timestamp: new Date(),
          status: "completed",
        }

        setRecentActivity((prev) => [newActivity, ...prev.slice(0, 9)])

        if (newActivity.type === "commission") {
          setAffiliateData((prev) => ({
            ...prev,
            totalEarnings: prev.totalEarnings + newActivity.amount,
            monthlyEarnings: prev.monthlyEarnings + newActivity.amount,
          }))
        } else {
          setAffiliateData((prev) => ({
            ...prev,
            referredUsers: prev.referredUsers + 1,
          }))
        }
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const copyReferralCode = () => {
    navigator.clipboard.writeText(affiliateData.referralCode)
    alert("¡Código copiado al portapapeles!")
  }

  const shareReferralLink = () => {
    const referralLink = `https://localbiz.app/ref/${affiliateData.referralCode}`

    if (navigator.share) {
      navigator.share({
        title: "LocalBiz - Encuentra negocios locales",
        text: "¡Únete a LocalBiz y descubre negocios increíbles cerca de ti! 🏪✨",
        url: referralLink,
      })
    } else {
      navigator.clipboard.writeText(referralLink)
      alert("¡Link de referido copiado!")
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "bg-orange-600"
      case "Silver":
        return "bg-gray-500"
      case "Gold":
        return "bg-yellow-600"
      case "Platinum":
        return "bg-purple-600"
      case "Diamond":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`
    } else if (diffInMinutes < 1440) {
      return `Hace ${Math.floor(diffInMinutes / 60)} h`
    } else {
      return `Hace ${Math.floor(diffInMinutes / 1440)} días`
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "signup":
        return <Users className="h-4 w-4 text-blue-600" />
      case "purchase":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "commission":
        return <Percent className="h-4 w-4 text-purple-600" />
      default:
        return <Target className="h-4 w-4 text-gray-600" />
    }
  }

  const progressToNextTier = (affiliateData.referredUsers / affiliateData.nextTierRequirement) * 100

  return (
    <div className="space-y-6">
      {/* Header con tier y ganancias principales */}
      <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-full p-3">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Programa de Afiliados</h2>
                <div className="flex items-center space-x-2">
                  <Badge className={`${getTierColor(affiliateData.tier)} text-white`}>
                    <Award className="h-3 w-3 mr-1" />
                    {affiliateData.tier}
                  </Badge>
                  <Badge className="bg-white/20 text-white">♾️ Comisiones de por vida</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${affiliateData.totalEarnings.toFixed(2)}</p>
              <p className="text-sm opacity-90">Total ganado (USDT)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{affiliateData.referredUsers}</p>
              <p className="text-sm opacity-90">Referidos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{affiliateData.commissionRate}%</p>
              <p className="text-sm opacity-90">Comisión</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">${affiliateData.monthlyEarnings.toFixed(2)}</p>
              <p className="text-sm opacity-90">Este mes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{affiliateData.activeReferrals}</p>
              <p className="text-sm opacity-90">Activos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progreso al siguiente tier */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Progreso al siguiente nivel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{affiliateData.tier} → Platinum</span>
              <span className="text-sm text-gray-600">
                {affiliateData.referredUsers}/{affiliateData.nextTierRequirement} referidos
              </span>
            </div>
            <Progress value={progressToNextTier} className="h-3" />
            <p className="text-sm text-gray-600">
              Te faltan {affiliateData.nextTierRequirement - affiliateData.referredUsers} referidos para alcanzar
              Platinum
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Código de referido y compartir */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="mr-2 h-5 w-5 text-green-600" />
            Tu código de referido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Tu código único:</p>
              <p className="text-2xl font-mono font-bold text-purple-600 mb-3">{affiliateData.referralCode}</p>
              <div className="flex space-x-2 justify-center">
                <Button size="sm" variant="outline" onClick={copyReferralCode}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar código
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={shareReferralLink}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir link
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Gift className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-sm">Bonus de registro</p>
              <p className="text-xs text-gray-600">$5 USDT por cada nuevo usuario</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Percent className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-sm">20% de comisión</p>
              <p className="text-xs text-gray-600">En todas las compras de por vida</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-sm">Pagos instantáneos</p>
              <p className="text-xs text-gray-600">Retiros automáticos en USDT</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-orange-600" />
            Actividad reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="font-medium text-sm">
                      {activity.type === "signup" && `${activity.user} se registró`}
                      {activity.type === "purchase" && `${activity.user} compró en ${activity.business}`}
                      {activity.type === "commission" && `Comisión de ${activity.user} en ${activity.business}`}
                    </p>
                    <p className="text-xs text-gray-600">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount > 0 && <p className="font-bold text-green-600">+${activity.amount.toFixed(2)}</p>}
                  <Badge
                    variant={activity.status === "completed" ? "default" : "secondary"}
                    className={`text-xs ${
                      activity.status === "completed"
                        ? "bg-green-600"
                        : activity.status === "pending"
                          ? "bg-yellow-600"
                          : "bg-gray-600"
                    }`}
                  >
                    {activity.status === "completed"
                      ? "Completado"
                      : activity.status === "pending"
                        ? "Pendiente"
                        : "Pagado"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumen financiero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-green-600" />
              Resumen financiero
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Ganancias totales:</span>
              <span className="font-bold text-green-600">${affiliateData.totalEarnings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Pagos pendientes:</span>
              <span className="font-bold text-yellow-600">${affiliateData.pendingPayouts.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total retirado:</span>
              <span className="font-bold text-blue-600">${affiliateData.totalPayouts.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Banknote className="h-4 w-4 mr-2" />
                Retirar ganancias
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Estadísticas de referidos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total referidos:</span>
              <span className="font-bold">{affiliateData.referredUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Referidos activos:</span>
              <span className="font-bold text-green-600">{affiliateData.activeReferrals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tasa de conversión:</span>
              <span className="font-bold text-blue-600">
                {((affiliateData.activeReferrals / affiliateData.referredUsers) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Ganancia promedio:</span>
              <span className="font-bold text-purple-600">
                ${(affiliateData.totalEarnings / affiliateData.referredUsers).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
