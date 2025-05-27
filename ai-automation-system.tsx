"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Bot,
  Brain,
  Shield,
  TrendingUp,
  MessageCircle,
  Target,
  Zap,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Eye,
  Lightbulb,
  Settings,
  Activity,
  Cpu,
  Database,
  Network,
} from "lucide-react"

export default function AIAutomationSystem() {
  const [aiStatus, setAiStatus] = useState("active")
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [userInput, setUserInput] = useState("")
  const [aiMetrics, setAiMetrics] = useState({
    fraudDetected: 0,
    recommendationsServed: 0,
    chatInteractions: 0,
    automatedActions: 0,
  })

  // Simular métricas de IA en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setAiMetrics((prev) => ({
        fraudDetected: prev.fraudDetected + Math.floor(Math.random() * 2),
        recommendationsServed: prev.recommendationsServed + Math.floor(Math.random() * 5),
        chatInteractions: prev.chatInteractions + Math.floor(Math.random() * 3),
        automatedActions: prev.automatedActions + Math.floor(Math.random() * 4),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const aiModules = [
    {
      id: "recommendations",
      name: "Recomendaciones Inteligentes",
      icon: Target,
      status: "active",
      accuracy: 94.2,
      description: "IA que analiza patrones de usuario para recomendar negocios personalizados",
      features: [
        "Análisis de comportamiento de usuario",
        "Filtrado colaborativo avanzado",
        "Predicción de preferencias",
        "Recomendaciones en tiempo real",
      ],
      metrics: {
        clickRate: "12.8%",
        conversionRate: "8.4%",
        userSatisfaction: "4.7/5",
        dailyRecommendations: "15,678",
      },
    },
    {
      id: "chatbot",
      name: "Asistente Virtual 24/7",
      icon: MessageCircle,
      status: "active",
      accuracy: 91.7,
      description: "Chatbot inteligente que resuelve consultas y guía a usuarios automáticamente",
      features: [
        "Procesamiento de lenguaje natural",
        "Respuestas contextuales",
        "Escalación automática",
        "Soporte multiidioma",
      ],
      metrics: {
        resolutionRate: "89.3%",
        avgResponseTime: "1.2s",
        userSatisfaction: "4.5/5",
        dailyChats: "2,847",
      },
    },
    {
      id: "fraud",
      name: "Detección de Fraude",
      icon: Shield,
      status: "active",
      accuracy: 98.9,
      description: "Sistema que detecta transacciones sospechosas y protege a usuarios",
      features: [
        "Análisis de patrones anómalos",
        "Verificación en tiempo real",
        "Machine learning adaptativo",
        "Bloqueo automático",
      ],
      metrics: {
        fraudBlocked: "99.1%",
        falsePositives: "0.8%",
        avgDetectionTime: "0.3s",
        savedAmount: "$45,678",
      },
    },
    {
      id: "pricing",
      name: "Optimización de Precios",
      icon: TrendingUp,
      status: "active",
      accuracy: 87.5,
      description: "IA que optimiza precios dinámicamente según demanda y competencia",
      features: [
        "Análisis de mercado en tiempo real",
        "Predicción de demanda",
        "Optimización de revenue",
        "Ajustes automáticos",
      ],
      metrics: {
        revenueIncrease: "+23.4%",
        priceAccuracy: "94.2%",
        marketShare: "+8.7%",
        optimizations: "1,234",
      },
    },
    {
      id: "sentiment",
      name: "Análisis de Sentimientos",
      icon: Brain,
      status: "active",
      accuracy: 92.1,
      description: "Analiza reseñas y comentarios para entender satisfacción del cliente",
      features: [
        "Procesamiento de texto avanzado",
        "Detección de emociones",
        "Alertas automáticas",
        "Reportes de insights",
      ],
      metrics: {
        reviewsAnalyzed: "8,945",
        sentimentAccuracy: "92.1%",
        alertsGenerated: "156",
        businessInsights: "89",
      },
    },
    {
      id: "marketing",
      name: "Marketing Automatizado",
      icon: Zap,
      status: "active",
      accuracy: 89.3,
      description: "Automatiza campañas de marketing personalizadas para cada usuario",
      features: ["Segmentación automática", "Campañas personalizadas", "A/B testing automático", "Optimización de CTR"],
      metrics: {
        campaignROI: "340%",
        openRate: "28.7%",
        clickRate: "12.4%",
        conversions: "1,567",
      },
    },
  ]

  const aiInsights = [
    {
      type: "trend",
      title: "Tendencia Detectada",
      message: "Aumento del 45% en búsquedas de 'comida saludable' en tu zona",
      action: "Recomendar negocios de comida saludable",
      priority: "high",
      timestamp: "Hace 5 min",
    },
    {
      type: "fraud",
      title: "Fraude Bloqueado",
      message: "Transacción sospechosa de $2,500 USDT bloqueada automáticamente",
      action: "Usuario notificado, cuenta en revisión",
      priority: "critical",
      timestamp: "Hace 12 min",
    },
    {
      type: "optimization",
      title: "Precio Optimizado",
      message: "Ajuste automático de precios en 23 negocios aumentó revenue 8%",
      action: "Continuar monitoreo de mercado",
      priority: "medium",
      timestamp: "Hace 18 min",
    },
    {
      type: "recommendation",
      title: "Nueva Recomendación",
      message: "Usuario premium busca servicios de belleza - match 94% encontrado",
      action: "Recomendación enviada automáticamente",
      priority: "low",
      timestamp: "Hace 25 min",
    },
  ]

  const handleChatSubmit = () => {
    if (!userInput.trim()) return

    const newMessage = {
      id: Date.now(),
      user: "Usuario",
      message: userInput,
      timestamp: new Date().toLocaleTimeString(),
    }

    setChatMessages((prev) => [...prev, newMessage])

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        user: "LocalBiz AI",
        message: generateAIResponse(userInput),
        timestamp: new Date().toLocaleTimeString(),
        isAI: true,
      }
      setChatMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setUserInput("")
  }

  const generateAIResponse = (input: string) => {
    const responses = [
      "Entiendo tu consulta. He encontrado 3 negocios cerca de ti que coinciden con tus preferencias.",
      "Basado en tu historial, te recomiendo estos lugares que tienen excelentes reseñas.",
      "He detectado una promoción especial en tu zona. ¿Te interesa que te comparta los detalles?",
      "Puedo ayudarte con eso. ¿Prefieres pagar con USDT o tarjeta de crédito?",
      "He analizado las mejores opciones para ti. Aquí tienes mis recomendaciones personalizadas.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 mr-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              LocalBiz AI Automation
            </h1>
          </div>
          <p className="text-xl text-gray-600">Sistema de Inteligencia Artificial para automatización completa</p>
        </div>

        {/* AI Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm opacity-90">Fraudes Bloqueados</p>
                  <p className="text-2xl font-bold">{aiMetrics.fraudDetected}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Target className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm opacity-90">Recomendaciones</p>
                  <p className="text-2xl font-bold">{aiMetrics.recommendationsServed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <MessageCircle className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm opacity-90">Chats Atendidos</p>
                  <p className="text-2xl font-bold">{aiMetrics.chatInteractions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm opacity-90">Acciones Auto</p>
                  <p className="text-2xl font-bold">{aiMetrics.automatedActions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="modules" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg rounded-xl">
            <TabsTrigger value="modules">🤖 Módulos IA</TabsTrigger>
            <TabsTrigger value="chatbot">💬 Asistente</TabsTrigger>
            <TabsTrigger value="insights">📊 Insights</TabsTrigger>
            <TabsTrigger value="automation">⚡ Automatización</TabsTrigger>
            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiModules.map((module) => (
                <Card
                  key={module.id}
                  className="hover:shadow-xl transition-all duration-300 bg-white border-2 border-transparent hover:border-purple-200"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2 mr-3">
                          <module.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                      </div>
                      <Badge
                        variant={module.status === "active" ? "default" : "secondary"}
                        className={module.status === "active" ? "bg-green-500" : ""}
                      >
                        {module.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Precisión</span>
                        <span className="text-sm font-bold text-green-600">{module.accuracy}%</span>
                      </div>
                      <Progress value={module.accuracy} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Características:</h4>
                      <ul className="text-xs space-y-1">
                        {module.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(module.metrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-2 rounded">
                          <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                          <div className="font-bold text-purple-600">{value}</div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chatbot" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="h-96">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bot className="mr-2 h-5 w-5 text-purple-600" />
                      LocalBiz AI Assistant
                      <Badge className="ml-2 bg-green-500">En línea</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center mb-1">
                          <Bot className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="font-semibold text-sm">LocalBiz AI</span>
                        </div>
                        <p className="text-sm">
                          ¡Hola! Soy tu asistente de IA. Puedo ayudarte a encontrar negocios, procesar pagos, resolver
                          dudas y mucho más. ¿En qué puedo ayudarte hoy?
                        </p>
                      </div>

                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-lg ${
                            msg.isAI ? "bg-blue-50 border-l-4 border-blue-500" : "bg-gray-50 ml-8"
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            {msg.isAI ? (
                              <Bot className="h-4 w-4 text-blue-600 mr-2" />
                            ) : (
                              <Users className="h-4 w-4 text-gray-600 mr-2" />
                            )}
                            <span className="font-semibold text-sm">{msg.user}</span>
                            <span className="text-xs text-gray-500 ml-auto">{msg.timestamp}</span>
                          </div>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Escribe tu mensaje..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                      />
                      <Button onClick={handleChatSubmit} className="bg-purple-600 hover:bg-purple-700">
                        Enviar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Stats */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">📊 Estadísticas del Chatbot</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Consultas resueltas:</span>
                        <span className="font-bold text-green-600">89.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tiempo respuesta:</span>
                        <span className="font-bold">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Satisfacción:</span>
                        <span className="font-bold text-blue-600">4.5/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Chats hoy:</span>
                        <span className="font-bold">2,847</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🎯 Consultas Frecuentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Horarios de negocios</span>
                        <span className="text-purple-600">34%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Métodos de pago</span>
                        <span className="text-purple-600">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ubicaciones</span>
                        <span className="text-purple-600">22%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Promociones</span>
                        <span className="text-purple-600">16%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">⚡ Acciones Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Buscar negocios cercanos
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Consultar promociones
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      Verificar horarios
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                    Insights de IA en Tiempo Real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.map((insight, i) => (
                      <Alert
                        key={i}
                        className={`border-l-4 ${
                          insight.priority === "critical"
                            ? "border-red-500 bg-red-50"
                            : insight.priority === "high"
                              ? "border-orange-500 bg-orange-50"
                              : insight.priority === "medium"
                                ? "border-blue-500 bg-blue-50"
                                : "border-green-500 bg-green-50"
                        }`}
                      >
                        <div className="flex items-start">
                          {insight.type === "fraud" ? (
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                          ) : insight.type === "trend" ? (
                            <TrendingUp className="h-4 w-4 text-orange-500 mt-1" />
                          ) : insight.type === "optimization" ? (
                            <BarChart3 className="h-4 w-4 text-blue-500 mt-1" />
                          ) : (
                            <Target className="h-4 w-4 text-green-500 mt-1" />
                          )}
                          <div className="ml-3 flex-1">
                            <h4 className="font-semibold text-sm">{insight.title}</h4>
                            <AlertDescription className="text-sm mt-1">{insight.message}</AlertDescription>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-gray-500">{insight.action}</span>
                              <span className="text-xs text-gray-400">{insight.timestamp}</span>
                            </div>
                          </div>
                        </div>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Predictive Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-purple-500" />
                    Análisis Predictivo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-sm text-blue-800">Demanda Predicha</h4>
                      <p className="text-sm text-blue-600">
                        Aumento del 67% en servicios de belleza este fin de semana
                      </p>
                      <div className="mt-2">
                        <Progress value={67} className="h-2" />
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-sm text-green-800">Oportunidad de Revenue</h4>
                      <p className="text-sm text-green-600">Optimización de precios puede aumentar ingresos 23%</p>
                      <div className="mt-2">
                        <Progress value={23} className="h-2" />
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-sm text-purple-800">Retención de Usuarios</h4>
                      <p className="text-sm text-purple-600">Probabilidad de retorno de usuarios nuevos: 78%</p>
                      <div className="mt-2">
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-sm text-orange-800">Riesgo de Fraude</h4>
                      <p className="text-sm text-orange-600">Nivel de riesgo actual: Bajo (2.1%)</p>
                      <div className="mt-2">
                        <Progress value={2.1} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Intelligence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-cyan-500" />
                  Inteligencia de Mercado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-8 w-8 text-cyan-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Tendencias Emergentes</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Comida vegana:</span>
                        <span className="text-green-600 font-bold">+45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Servicios a domicilio:</span>
                        <span className="text-green-600 font-bold">+32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pagos crypto:</span>
                        <span className="text-green-600 font-bold">+89%</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Comportamiento Usuario</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Búsquedas móviles:</span>
                        <span className="text-blue-600 font-bold">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tiempo en app:</span>
                        <span className="text-blue-600 font-bold">12.4 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversión:</span>
                        <span className="text-blue-600 font-bold">8.7%</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Competencia</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Market share:</span>
                        <span className="text-orange-600 font-bold">34.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ventaja competitiva:</span>
                        <span className="text-orange-600 font-bold">+23%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Nuevos competidores:</span>
                        <span className="text-orange-600 font-bold">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Automation Rules */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                    Reglas de Automatización
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Auto-Recomendaciones",
                        description: "Enviar recomendaciones personalizadas cada 2 horas",
                        status: "active",
                        trigger: "Comportamiento usuario",
                        actions: "Enviar notificación push",
                      },
                      {
                        name: "Detección de Fraude",
                        description: "Bloquear transacciones sospechosas automáticamente",
                        status: "active",
                        trigger: "Patrón anómalo detectado",
                        actions: "Bloquear + Notificar admin",
                      },
                      {
                        name: "Optimización de Precios",
                        description: "Ajustar precios según demanda cada 30 minutos",
                        status: "active",
                        trigger: "Cambio en demanda >10%",
                        actions: "Ajustar precios dinámicamente",
                      },
                      {
                        name: "Marketing Automático",
                        description: "Enviar ofertas personalizadas a usuarios inactivos",
                        status: "active",
                        trigger: "Usuario inactivo >7 días",
                        actions: "Enviar oferta personalizada",
                      },
                    ].map((rule, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{rule.name}</h4>
                          <Badge variant={rule.status === "active" ? "default" : "secondary"}>
                            {rule.status === "active" ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{rule.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-medium">Trigger:</span>
                            <p className="text-gray-600">{rule.trigger}</p>
                          </div>
                          <div>
                            <span className="font-medium">Acción:</span>
                            <p className="text-gray-600">{rule.actions}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Automation Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
                    Rendimiento de Automatización
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Eficiencia por Módulo</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Recomendaciones</span>
                            <span>94.2%</span>
                          </div>
                          <Progress value={94.2} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Detección Fraude</span>
                            <span>98.9%</span>
                          </div>
                          <Progress value={98.9} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Optimización Precios</span>
                            <span>87.5%</span>
                          </div>
                          <Progress value={87.5} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Marketing Auto</span>
                            <span>89.3%</span>
                          </div>
                          <Progress value={89.3} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Impacto en Negocio</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-2xl font-bold text-green-600">+34%</div>
                          <div className="text-gray-600">Revenue</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="text-2xl font-bold text-blue-600">-67%</div>
                          <div className="text-gray-600">Costos Operativos</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded">
                          <div className="text-2xl font-bold text-purple-600">+89%</div>
                          <div className="text-gray-600">Satisfacción</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded">
                          <div className="text-2xl font-bold text-orange-600">-45%</div>
                          <div className="text-gray-600">Tiempo Respuesta</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-purple-500" />
                  Progreso de Aprendizaje de IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <Database className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">Datos Procesados</h3>
                    <div className="text-2xl font-bold text-purple-600">2.4M</div>
                    <div className="text-sm text-gray-600">registros/día</div>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-cyan-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <Cpu className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">Modelos Entrenados</h3>
                    <div className="text-2xl font-bold text-green-600">47</div>
                    <div className="text-sm text-gray-600">algoritmos activos</div>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <Network className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">Precisión Promedio</h3>
                    <div className="text-2xl font-bold text-orange-600">92.1%</div>
                    <div className="text-sm text-gray-600">todos los modelos</div>
                  </div>

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                      <Activity className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">Mejora Continua</h3>
                    <div className="text-2xl font-bold text-blue-600">+2.3%</div>
                    <div className="text-sm text-gray-600">precisión/semana</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Eye className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">Predicciones Realizadas</p>
                      <p className="text-2xl font-bold">15,678</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Target className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">Precisión Global</p>
                      <p className="text-2xl font-bold">92.1%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Zap className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">Automatizaciones</p>
                      <p className="text-2xl font-bold">2,847</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8" />
                    <div className="ml-4">
                      <p className="text-sm opacity-90">ROI de IA</p>
                      <p className="text-2xl font-bold">340%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>📊 Rendimiento por Módulo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiModules.slice(0, 4).map((module) => (
                      <div key={module.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{module.name}</span>
                          <span className="text-sm font-bold">{module.accuracy}%</span>
                        </div>
                        <Progress value={module.accuracy} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🎯 Impacto en KPIs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Conversión de usuarios:</span>
                      <span className="font-bold text-green-600">+45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tiempo de respuesta:</span>
                      <span className="font-bold text-blue-600">-67%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Satisfacción cliente:</span>
                      <span className="font-bold text-purple-600">+34%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Costos operativos:</span>
                      <span className="font-bold text-orange-600">-23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Revenue por usuario:</span>
                      <span className="font-bold text-cyan-600">+56%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
