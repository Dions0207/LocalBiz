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

export default function FreedomLifestyle() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [likes, setLikes] = useState(312456)
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
              <Input placeholder="Buscar libertad financiera..." className="rounded-r-none border-r-0" />
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
                  🔴 DESDE BALI
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  #5 TENDENCIA
                </Badge>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold leading-tight">
                🏝️ CÓMO VIVO EN BALI CON $25K/MES TRABAJANDO 2 HORAS | LIBERTAD TOTAL
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="font-semibold">4,123,567 visualizaciones</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Hace 6 horas</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +789% crecimiento
                </Badge>
              </div>

              {/* Channel Info & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>FL</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Freedom Lifestyle</h3>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">1.9M suscriptores</p>
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
                    Lifestyle Freedom - Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+4.1M</div>
                      <div className="text-sm text-muted-foreground">Vistas hoy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">+78K</div>
                      <div className="text-sm text-muted-foreground">Nuevos subs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">789%</div>
                      <div className="text-sm text-muted-foreground">Freedom Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">$25K</div>
                      <div className="text-sm text-muted-foreground">Ingresos/mes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <p className="font-semibold">
                      🌴 ESTILO DE VIDA ULTIMATE: Cómo logré la libertad financiera y geográfica total
                    </p>
                    <p className="text-sm">
                      Te muestro mi día a día en Bali, mis fuentes de ingresos pasivos y cómo puedes replicar este
                      estilo de vida trabajando desde cualquier lugar del mundo.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">#LibertadFinanciera</Badge>
                      <Badge variant="secondary">#NomadaDigital</Badge>
                      <Badge variant="secondary">#IngresosPasivos</Badge>
                      <Badge variant="secondary">#Bali</Badge>
                      <Badge variant="secondary">#Lifestyle</Badge>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>🏝️ MI DÍA EN BALI:</strong>
                      </p>
                      <p>00:00 - Morning routine en la playa</p>
                      <p>04:30 - Mis 7 fuentes de ingresos pasivos</p>
                      <p>09:15 - Tour por mi villa en Canggu</p>
                      <p>13:45 - Trabajando 2 horas desde la piscina</p>
                      <p>17:20 - Sunset y reflexiones de libertad</p>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>🎁 GUÍA GRATUITA:</strong>
                      </p>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        🗺️ Roadmap completo a la libertad
                      </Link>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        💰 7 fuentes de ingresos pasivos
                      </Link>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        🌍 Guía nómada digital 2024
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
                <CardTitle className="text-lg">Freedom Lifestyle</CardTitle>
                <CardDescription>Libertad financiera y geográfica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">1.9M</div>
                    <div className="text-xs text-muted-foreground">Suscriptores</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">789</div>
                    <div className="text-xs text-muted-foreground">Videos</div>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Comunidad Freedom
                </Button>
              </CardContent>
            </Card>

            {/* Freedom Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🌴 Freedom Tracker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ubicación actual</span>
                    <Badge variant="outline" className="text-green-600">
                      Bali, Indonesia
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Horas trabajadas/día</span>
                    <Badge variant="outline" className="text-blue-600">
                      2 horas
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ingresos pasivos</span>
                    <Badge variant="outline" className="text-purple-600">
                      $25K/mes
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Videos */}
            <div className="space-y-3">
              <h3 className="font-semibold">Más sobre libertad</h3>
              {[
                {
                  title: "🏖️ MIS 7 FUENTES DE INGRESOS PASIVOS | $25K/MES",
                  views: "3.2M visualizaciones",
                  time: "hace 1 semana",
                  duration: "19:28",
                },
                {
                  title: "✈️ CÓMO SER NÓMADA DIGITAL EN 2024 | GUÍA COMPLETA",
                  views: "2.8M visualizaciones",
                  time: "hace 2 semanas",
                  duration: "24:33",
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
                    <p className="text-xs text-muted-foreground">Freedom Lifestyle</p>
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
