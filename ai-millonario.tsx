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

export default function AIMillonario() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [likes, setLikes] = useState(125847)
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
              <Input placeholder="Buscar videos virales..." className="rounded-r-none border-r-0" />
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
                  🔴 EN VIVO
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  #1 TENDENCIA
                </Badge>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold leading-tight">
                🚀 CÓMO GANAR $10,000 AL MES CON IA EN 2024 | MÉTODO AUTOMATIZADO VIRAL
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="font-semibold">2,847,392 visualizaciones</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Hace 2 horas</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +847% crecimiento
                </Badge>
              </div>

              {/* Channel Info & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">AI Millonario</h3>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">3.2M suscriptores</p>
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
                    Analytics en Tiempo Real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+2.8M</div>
                      <div className="text-sm text-muted-foreground">Vistas hoy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">+45K</div>
                      <div className="text-sm text-muted-foreground">Nuevos subs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">847%</div>
                      <div className="text-sm text-muted-foreground">Engagement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">$12.5K</div>
                      <div className="text-sm text-muted-foreground">Ingresos hoy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <p className="font-semibold">
                      🔥 MÉTODO REVOLUCIONARIO: Descubre cómo generar ingresos pasivos con IA
                    </p>
                    <p className="text-sm">
                      En este video te muestro PASO A PASO el sistema automatizado que me ha permitido generar más de
                      $10,000 mensuales utilizando inteligencia artificial.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">#IA</Badge>
                      <Badge variant="secondary">#DineroOnline</Badge>
                      <Badge variant="secondary">#Automatización</Badge>
                      <Badge variant="secondary">#IngresosPasivos</Badge>
                      <Badge variant="secondary">#Viral</Badge>
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
                <CardTitle className="text-lg">AI Millonario</CardTitle>
                <CardDescription>Canal automatizado de IA y negocios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">3.2M</div>
                    <div className="text-xs text-muted-foreground">Suscriptores</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">847</div>
                    <div className="text-xs text-muted-foreground">Videos</div>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Activar notificaciones
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Videos */}
            <div className="space-y-3">
              <h3 className="font-semibold">Videos recomendados</h3>
              {[
                {
                  title: "🤖 IA GENERA $5000 EN 24 HORAS | MÉTODO SECRETO",
                  views: "1.2M visualizaciones",
                  time: "hace 1 día",
                  duration: "15:42",
                },
                {
                  title: "💰 AUTOMATIZA TU NEGOCIO CON CHATGPT | PASO A PASO",
                  views: "890K visualizaciones",
                  time: "hace 3 días",
                  duration: "12:18",
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
                    <p className="text-xs text-muted-foreground">AI Millonario</p>
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
