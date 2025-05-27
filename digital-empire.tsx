"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Youtube,
  Search,
  Bell,
  ThumbsUp,
  ThumbsDown,
  Share,
  Download,
  MoreHorizontal,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  BarChart3,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function DigitalEmpire() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [likes, setLikes] = useState(178923)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-2 text-xl font-bold">
              <Youtube className="w-8 h-8 text-red-600" />
              <span className="hidden sm:block">YouTube</span>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex">
              <Input placeholder="Buscar marketing digital..." className="rounded-r-none border-r-0" />
              <Button variant="outline" className="rounded-l-none px-6">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>TU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Principal */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video className="w-full h-full object-cover" poster="/placeholder.svg?height=480&width=854" controls>
                <source src="#" type="video/mp4" />
              </video>
              <div className="absolute top-4 left-4">
                <Badge variant="destructive" className="bg-red-600">
                  🔴 MASTERCLASS LIVE
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  #4 TENDENCIA
                </Badge>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold leading-tight">
                👑 CONSTRUÍ UN IMPERIO DIGITAL DE $100K/MES | BLUEPRINT COMPLETO 2024
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="font-semibold">1,789,234 visualizaciones</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Hace 3 horas</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +567% crecimiento
                </Badge>
              </div>

              {/* Channel Info & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>DE</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Digital Empire</h3>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">2.1M suscriptores</p>
                  </div>
                  <Button
                    variant={isSubscribed ? "outline" : "default"}
                    className={isSubscribed ? "" : "bg-red-600 hover:bg-red-700"}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    {isSubscribed ? "Suscrito" : "Suscribirse"}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleLike}>
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    {likes.toLocaleString()}
                  </Button>
                  <Button variant="outline" size="icon">
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share className="w-4 h-4" />
                    Compartir
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Analytics Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Imperio Digital - Métricas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+1.7M</div>
                      <div className="text-sm text-muted-foreground">Vistas hoy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">+29K</div>
                      <div className="text-sm text-muted-foreground">Nuevos subs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">567%</div>
                      <div className="text-sm text-muted-foreground">ROI Campaigns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">$8.9K</div>
                      <div className="text-sm text-muted-foreground">Revenue hoy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <p className="font-semibold">
                      🏆 BLUEPRINT EXCLUSIVO: Cómo construir un imperio digital desde cero
                    </p>
                    <p className="text-sm">
                      Te muestro el sistema EXACTO que uso para generar $100K mensuales con marketing digital. Incluye
                      funnels, automatizaciones y estrategias de scaling.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">#MarketingDigital</Badge>
                      <Badge variant="secondary">#Funnels</Badge>
                      <Badge variant="secondary">#Dropshipping</Badge>
                      <Badge variant="secondary">#Ecommerce</Badge>
                      <Badge variant="secondary">#Scaling</Badge>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>🎯 MASTERCLASS:</strong>
                      </p>
                      <p>00:00 - Mi historia: de $0 a $100K/mes</p>
                      <p>05:30 - Los 4 pilares del imperio digital</p>
                      <p>12:15 - Funnels que convierten al 15%</p>
                      <p>18:45 - Automatizaciones que escalan</p>
                      <p>25:20 - Case study: $50K en 30 días</p>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>🚀 RECURSOS PREMIUM:</strong>
                      </p>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        📋 Blueprint completo del imperio
                      </Link>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        🎯 Templates de funnels ganadores
                      </Link>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        💰 Calculadora de ROI automática
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Channel Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Digital Empire</CardTitle>
                <CardDescription>Marketing digital y escalamiento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">2.1M</div>
                    <div className="text-xs text-muted-foreground">Suscriptores</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">567</div>
                    <div className="text-xs text-muted-foreground">Videos</div>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Masterclass VIP
                </Button>
              </CardContent>
            </Card>

            {/* Empire Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">👑 Imperio Actual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue mensual</span>
                    <Badge variant="outline" className="text-green-600">
                      $100K+
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Funnels activos</span>
                    <Badge variant="outline" className="text-blue-600">
                      47
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversión promedio</span>
                    <Badge variant="outline" className="text-purple-600">
                      12.8%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Videos */}
            <div className="space-y-3">
              <h3 className="font-semibold">Más del imperio</h3>
              {[
                {
                  title: "🔥 FUNNEL QUE GENERA $10K/DÍA | TEMPLATE GRATIS",
                  views: "987K visualizaciones",
                  time: "hace 1 semana",
                  duration: "23:17",
                },
                {
                  title: "💎 DROPSHIPPING 2024: $1M EN 90 DÍAS | CASO REAL",
                  views: "1.4M visualizaciones",
                  time: "hace 2 semanas",
                  duration: "28:45",
                },
              ].map((video, i) => (
                <div key={i} className="flex gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=94&width=168"
                      alt={video.title}
                      width={168}
                      height={94}
                      className="rounded aspect-video object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
                    <p className="text-xs text-muted-foreground">Digital Empire</p>
                    <p className="text-xs text-muted-foreground">
                      {video.views} • {video.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
