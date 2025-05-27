"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AIMillonario from "./ai-millonario"
import CryptoMaster from "./crypto-master"
import DigitalEmpire from "./digital-empire"
import FreedomLifestyle from "./freedom-lifestyle"

export default function ChannelSelector() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)

  const channels = [
    {
      id: "ai-millonario",
      name: "AI Millonario",
      description: "Canal automatizado de IA y negocios",
      subscribers: "3.2M",
      niche: "Inteligencia Artificial",
      component: AIMillonario,
    },
    {
      id: "crypto-master",
      name: "Crypto Master",
      description: "Trading profesional y criptomonedas",
      subscribers: "4.7M",
      niche: "Criptomonedas & Trading",
      component: CryptoMaster,
    },
    {
      id: "digital-empire",
      name: "Digital Empire",
      description: "Marketing digital y escalamiento",
      subscribers: "2.1M",
      niche: "Marketing Digital",
      component: DigitalEmpire,
    },
    {
      id: "freedom-lifestyle",
      name: "Freedom Lifestyle",
      description: "Libertad financiera y geográfica",
      subscribers: "1.9M",
      niche: "Estilo de Vida",
      component: FreedomLifestyle,
    },
  ]

  if (selectedChannel) {
    const channel = channels.find((c) => c.id === selectedChannel)
    if (channel) {
      const ChannelComponent = channel.component
      return (
        <div>
          <div className="fixed top-4 left-4 z-50">
            <Button variant="outline" onClick={() => setSelectedChannel(null)}>
              ← Volver a canales
            </Button>
          </div>
          <ChannelComponent />
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🚀 Canales YouTube Virales</h1>
          <p className="text-xl text-muted-foreground">Selecciona el canal que quieres explorar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channels.map((channel) => (
            <Card
              key={channel.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedChannel(channel.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {channel.name}
                  <span className="text-sm font-normal text-muted-foreground">{channel.subscribers}</span>
                </CardTitle>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Nicho:</span>
                    <span className="text-sm text-muted-foreground">{channel.niche}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Suscriptores:</span>
                    <span className="text-sm text-green-600 font-semibold">{channel.subscribers}</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Ver Canal →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>🎯 Características de Todos los Canales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-green-600">✅ Títulos Virales</div>
                  <div className="text-muted-foreground">Optimizados para CTR</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">📊 Analytics Reales</div>
                  <div className="text-muted-foreground">Métricas en tiempo real</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">🤖 Automatización</div>
                  <div className="text-muted-foreground">Sistema automatizado</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-orange-600">💰 Monetización</div>
                  <div className="text-muted-foreground">Múltiples fuentes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
