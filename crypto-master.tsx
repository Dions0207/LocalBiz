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

export default function CryptoMaster() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [likes, setLikes] = useState(234567)
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
              <Input placeholder="Buscar trading y criptomonedas..." className="rounded-r-none border-r-0" />
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
                  🔴 TRADING EN VIVO
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  #3 TENDENCIA
                </Badge>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold leading-tight">
                💎 CONVERTÍ $500 EN $50,000 CON ESTA ESTRATEGIA CRYPTO | TRADING AUTOMÁTICO
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="font-semibold">3,456,789 visualizaciones</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Hace 1 hora</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +1,234% crecimiento
                </Badge>
              </div>

              {/* Channel Info & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>CM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Crypto Master</h3>
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">4.7M suscriptores</p>
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
                    Trading Dashboard en Vivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+3.4M</div>
                      <div className="text-sm text-muted-foreground">Vistas hoy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">+67K</div>
                      <div className="text-sm text-muted-foreground">Nuevos subs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">1,234%</div>
                      <div className="text-sm text-muted-foreground">ROI Portfolio</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">$18.7K</div>
                      <div className="text-sm text-muted-foreground">Ganancias hoy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <p className="font-semibold">🚀 ESTRATEGIA SECRETA: Cómo multipliqué mi dinero x100 en 6 meses</p>
                    <p className="text-sm">
                      Te revelo la estrategia EXACTA que uso para generar ganancias consistentes en crypto trading.
                      Incluye bot automatizado y señales en tiempo real.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">#CryptoTrading</Badge>
                      <Badge variant="secondary">#Bitcoin</Badge>
                      <Badge variant="secondary">#TradingBot</Badge>
                      <Badge variant="secondary">#Binance</Badge>
                      <Badge variant="secondary">#Altcoins</Badge>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>📊 CONTENIDO:</strong>
                      </p>
                      <p>00:00 - Mi portfolio actual ($50K)</p>
                      <p>03:45 - Configuración del bot</p>
                      <p>08:20 - Análisis técnico en vivo</p>
                      <p>14:30 - Trades ganadores del día</p>
                      <p>19:15 - Próximas altcoins x100</p>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>🎁 RECURSOS GRATIS:</strong>
                      </p>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        🤖 Bot de trading configurado
                      </Link>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        📈 Señales VIP Telegram
                      </Link>
                      <Link href="#" className="block text-blue-600 hover:underline">
                        💎 Lista de altcoins x100
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
                <CardTitle className="text-lg">Crypto Master</CardTitle>
                <CardDescription>Trading profesional y criptomonedas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">4.7M</div>
                    <div className="text-xs text-muted-foreground">Suscriptores</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">1,234</div>
                    <div className="text-xs text-muted-foreground">Videos</div>
                  </div>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Señales VIP
                </Button>
              </CardContent>
            </Card>

            {/* Portfolio Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💎 Portfolio en Vivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bitcoin (BTC)</span>
                    <Badge variant="outline" className="text-green-600">
                      +12.5%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ethereum (ETH)</span>
                    <Badge variant="outline" className="text-green-600">
                      +8.7%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Solana (SOL)</span>
                    <Badge variant="outline" className="text-green-600">
                      +23.4%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Videos */}
            <div className="space-y-3">
              <h3 className="font-semibold">Más videos de trading</h3>
              {[
                {
                  title: "🔥 ALTCOIN QUE HARÁ X1000 EN 2024 | ANÁLISIS COMPLETO",
                  views: "2.1M visualizaciones",
                  time: "hace 2 días",
                  duration: "16:33",
                },
                {
                  title: "💰 BOT AUTOMÁTICO GENERA $1000 DIARIOS | CONFIGURACIÓN",
                  views: "1.8M visualizaciones",
                  time: "hace 4 días",
                  duration: "21:45",
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
                    <p className="text-xs text-muted-foreground">Crypto Master</p>
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
