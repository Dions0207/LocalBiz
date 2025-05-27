"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Clock, Zap, Target, CheckCircle, ArrowRight, Play, Download } from "lucide-react"

export default function InstantMoneyDashboard() {
  const [earnings, setEarnings] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setEarnings((prev) => prev + Math.random() * 5 + 1)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isActive])

  const methods = [
    {
      id: "affiliate-automation",
      title: "🤖 Afiliación Automatizada",
      description: "Sistema que vende mientras duermes",
      timeToStart: "5 minutos",
      dailyEarnings: "$50-300",
      difficulty: "Fácil",
      status: "Activo",
      steps: [
        "Registrarse en ClickBank/ShareASale",
        "Elegir productos de alta conversión",
        "Configurar landing page automática",
        "Activar tráfico pagado mínimo",
        "Escalar con ganancias",
      ],
    },
    {
      id: "content-monetization",
      title: "📱 Monetización de Contenido",
      description: "Convierte tu conocimiento en dinero",
      timeToStart: "10 minutos",
      dailyEarnings: "$30-200",
      difficulty: "Muy Fácil",
      status: "Disponible",
      steps: [
        "Crear cuenta en Gumroad/Hotmart",
        "Subir PDF/video de 10 páginas",
        "Precio entre $7-27",
        "Promocionar en redes sociales",
        "Automatizar con email marketing",
      ],
    },
    {
      id: "dropshipping-express",
      title: "📦 Dropshipping Express",
      description: "Tienda online sin inventario",
      timeToStart: "15 minutos",
      dailyEarnings: "$100-500",
      difficulty: "Medio",
      status: "Trending",
      steps: [
        "Crear tienda en Shopify (prueba gratis)",
        "Importar productos ganadores de AliExpress",
        "Configurar pagos automáticos",
        "Lanzar anuncios en Facebook/TikTok",
        "Optimizar y escalar",
      ],
    },
    {
      id: "crypto-staking",
      title: "💎 Staking de Criptomonedas",
      description: "Gana intereses automáticamente",
      timeToStart: "3 minutos",
      dailyEarnings: "$20-150",
      difficulty: "Fácil",
      status: "Pasivo",
      steps: [
        "Abrir cuenta en Binance/Coinbase",
        "Comprar stablecoins (USDT/USDC)",
        "Activar staking flexible",
        "Reinvertir ganancias automáticamente",
        "Diversificar en más pools",
      ],
    },
    {
      id: "ai-services",
      title: "🎯 Servicios con IA",
      description: "Vende servicios automatizados",
      timeToStart: "8 minutos",
      dailyEarnings: "$80-400",
      difficulty: "Fácil",
      status: "Hot",
      steps: [
        "Crear perfil en Fiverr/Upwork",
        "Ofrecer servicios de IA (logos, textos, videos)",
        "Usar ChatGPT/Midjourney para entregar",
        "Automatizar con plantillas",
        "Subir precios gradualmente",
      ],
    },
    {
      id: "social-arbitrage",
      title: "📈 Arbitraje Social",
      description: "Revende contenido viral",
      timeToStart: "2 minutos",
      dailyEarnings: "$25-180",
      difficulty: "Muy Fácil",
      status: "Viral",
      steps: [
        "Encontrar contenido viral en TikTok/Instagram",
        "Recrear con herramientas IA",
        "Subir a todas las plataformas",
        "Monetizar con afiliación/sponsors",
        "Automatizar con herramientas",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            💰 Sistema de Dinero Instantáneo
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Métodos probados para generar ingresos pasivos en menos de 15 minutos
          </p>

          {/* Live Earnings Counter */}
          <Card className="max-w-md mx-auto mb-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">${earnings.toFixed(2)}</div>
                <div className="text-sm text-gray-500 mb-4">Ganancias simuladas en tiempo real</div>
                <Button
                  onClick={() => setIsActive(!isActive)}
                  className={isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
                >
                  {isActive ? "Pausar Sistema" : "Activar Sistema"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tiempo mínimo</p>
                  <p className="text-2xl font-bold">2 min</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Ganancia diaria</p>
                  <p className="text-2xl font-bold">$25-500</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inversión inicial</p>
                  <p className="text-2xl font-bold">$0-50</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Escalabilidad</p>
                  <p className="text-2xl font-bold">∞</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {methods.map((method, index) => (
            <Card key={method.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <Badge
                    variant={
                      method.status === "Activo"
                        ? "default"
                        : method.status === "Hot"
                          ? "destructive"
                          : method.status === "Trending"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {method.status}
                  </Badge>
                </div>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">⏱️ Inicio:</span>
                      <div className="text-green-600 font-semibold">{method.timeToStart}</div>
                    </div>
                    <div>
                      <span className="font-medium">💰 Diario:</span>
                      <div className="text-blue-600 font-semibold">{method.dailyEarnings}</div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">🎯 Dificultad:</span>
                    <Badge variant="outline" className="ml-2">
                      {method.difficulty}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="font-medium text-sm">Pasos rápidos:</div>
                    {method.steps.slice(0, 3).map((step, i) => (
                      <div key={i} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {step}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" variant="outline">
                    Empezar Ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Implementation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2" />🚀 Implementación Inmediata - Método #1 Recomendado
            </CardTitle>
            <CardDescription>El método más rápido para empezar a ganar dinero HOY</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="affiliate" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="affiliate">🤖 Afiliación Auto</TabsTrigger>
                <TabsTrigger value="content">📱 Contenido</TabsTrigger>
                <TabsTrigger value="crypto">💎 Crypto Staking</TabsTrigger>
              </TabsList>

              <TabsContent value="affiliate" className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">🤖 Sistema de Afiliación Automatizada</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Configura una vez, gana para siempre. Sistema probado que genera $50-300 diarios.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">📋 Pasos Exactos (5 minutos):</h4>
                      <ol className="text-sm space-y-1">
                        <li>1. Ir a ClickBank.com → Crear cuenta gratis</li>
                        <li>2. Buscar productos con gravedad 30+ en "Make Money"</li>
                        <li>3. Copiar link de afiliado</li>
                        <li>4. Crear página simple en Carrd.co ($19/año)</li>
                        <li>5. Promocionar en grupos de Facebook/Telegram</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">💰 Potencial de Ganancias:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Día 1-7:</span>
                          <span className="font-semibold text-green-600">$10-50/día</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Semana 2-4:</span>
                          <span className="font-semibold text-green-600">$50-150/día</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mes 2+:</span>
                          <span className="font-semibold text-green-600">$150-300/día</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="text-sm">
                      <strong>🎯 Truco Secreto:</strong> Usa ChatGPT para crear el contenido de tu landing page. Prompt:
                      "Crea una landing page persuasiva para vender [producto] a [audiencia]"
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">📱 Monetización de Contenido Express</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Convierte tu conocimiento en un producto digital que se vende solo.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">📝 Productos que Venden:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• PDF "Cómo ganar dinero online" ($17)</li>
                        <li>• Video curso "Trading básico" ($47)</li>
                        <li>• Plantillas de Instagram ($7)</li>
                        <li>• Checklist de productividad ($12)</li>
                        <li>• Guía de dropshipping ($27)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">🚀 Plataformas Instantáneas:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Gumroad:</span>
                          <span className="text-green-600">Setup en 5 min</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hotmart:</span>
                          <span className="text-green-600">Afiliados automáticos</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Etsy:</span>
                          <span className="text-green-600">Tráfico orgánico</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="crypto" className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">💎 Staking de Criptomonedas Pasivo</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Gana intereses automáticamente sin hacer nada. 100% pasivo.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">💰 Mejores Opciones:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>USDT Staking:</span>
                          <span className="text-green-600">8-12% anual</span>
                        </div>
                        <div className="flex justify-between">
                          <span>BNB Staking:</span>
                          <span className="text-green-600">5-8% anual</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ETH 2.0:</span>
                          <span className="text-green-600">4-6% anual</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DOT Staking:</span>
                          <span className="text-green-600">10-14% anual</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">📊 Calculadora Rápida:</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          Con $100: <span className="text-green-600 font-semibold">$0.20-0.40/día</span>
                        </div>
                        <div>
                          Con $500: <span className="text-green-600 font-semibold">$1-2/día</span>
                        </div>
                        <div>
                          Con $1000: <span className="text-green-600 font-semibold">$2-4/día</span>
                        </div>
                        <div>
                          Con $5000: <span className="text-green-600 font-semibold">$10-20/día</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Action Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Play className="mr-2" />🎯 Plan de Acción Inmediata
            </CardTitle>
            <CardDescription>
              Sigue este plan exacto para empezar a ganar dinero en las próximas 2 horas
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-green-600">⚡ Próximos 30 minutos</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Elegir método principal
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Crear cuentas necesarias
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Configuración básica
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg text-blue-600">🚀 Próximas 2 horas</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                    Lanzar primera campaña
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                    Promoción inicial
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                    Primeras ventas/ganancias
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg text-purple-600">📈 Próximos 7 días</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    Optimizar y escalar
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    Automatizar procesos
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                    Ingresos consistentes
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar Guía Completa PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
