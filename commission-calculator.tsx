"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Crown, DollarSign, Target } from "lucide-react"

interface CommissionCalculation {
  businessRevenue: number
  commissionRate: number
  affiliateEarnings: number
  platformFee: number
  netEarnings: number
  monthlyProjection: number
  yearlyProjection: number
}

export default function CommissionCalculator() {
  const [businessRevenue, setBusinessRevenue] = useState(1000)
  const [commissionRate, setCommissionRate] = useState(20)
  const [referralCount, setReferralCount] = useState(1)
  const [calculation, setCalculation] = useState<CommissionCalculation | null>(null)

  useEffect(() => {
    calculateCommissions()
  }, [businessRevenue, commissionRate, referralCount])

  const calculateCommissions = () => {
    const totalRevenue = businessRevenue * referralCount
    const grossCommission = (totalRevenue * commissionRate) / 100
    const platformFee = grossCommission * 0.05 // 5% fee para la plataforma
    const netCommission = grossCommission - platformFee

    const calc: CommissionCalculation = {
      businessRevenue: totalRevenue,
      commissionRate,
      affiliateEarnings: netCommission,
      platformFee,
      netEarnings: netCommission,
      monthlyProjection: netCommission,
      yearlyProjection: netCommission * 12,
    }

    setCalculation(calc)
  }

  const commissionTiers = [
    { tier: "Bronze", minReferrals: 1, rate: 20, color: "bg-orange-600" },
    { tier: "Silver", minReferrals: 5, rate: 22, color: "bg-gray-500" },
    { tier: "Gold", minReferrals: 10, rate: 25, color: "bg-yellow-600" },
    { tier: "Platinum", minReferrals: 25, rate: 28, color: "bg-purple-600" },
    { tier: "Diamond", minReferrals: 50, rate: 30, color: "bg-blue-600" },
  ]

  const getCurrentTier = () => {
    return (
      commissionTiers
        .slice()
        .reverse()
        .find((tier) => referralCount >= tier.minReferrals) || commissionTiers[0]
    )
  }

  const getNextTier = () => {
    return commissionTiers.find((tier) => referralCount < tier.minReferrals)
  }

  const currentTier = getCurrentTier()
  const nextTier = getNextTier()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-6 w-6 text-blue-600" />
            Calculadora de Comisiones de Afiliados
          </CardTitle>
          <p className="text-gray-600">
            Calcula las ganancias potenciales del programa de afiliados con comisiones infinitas del 20%
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Parámetros de Cálculo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Revenue Mensual por Negocio (USD)</label>
              <Input
                type="number"
                value={businessRevenue}
                onChange={(e) => setBusinessRevenue(Number(e.target.value))}
                placeholder="1000"
              />
              <p className="text-xs text-gray-500 mt-1">Ingresos promedio mensuales de cada negocio referido</p>
            </div>

            <div>
              <label className="text-sm font-medium">Tasa de Comisión (%)</label>
              <Input
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                placeholder="20"
                min="1"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">Porcentaje de comisión por cada transacción</p>
            </div>

            <div>
              <label className="text-sm font-medium">Número de Referidos</label>
              <Input
                type="number"
                value={referralCount}
                onChange={(e) => setReferralCount(Number(e.target.value))}
                placeholder="1"
                min="1"
              />
              <p className="text-xs text-gray-500 mt-1">Cantidad de negocios que has referido</p>
            </div>

            <Alert>
              <Crown className="h-4 w-4" />
              <AlertDescription>
                <strong>Comisiones Infinitas:</strong> Ganas el {commissionRate}% de TODAS las transacciones de tus
                referidos, de por vida.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-green-600" />
              Ganancias Calculadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {calculation && (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Revenue Total Mensual</span>
                    <span className="font-bold text-blue-600">${calculation.businessRevenue.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">Comisión Bruta ({commissionRate}%)</span>
                    <span className="font-bold text-purple-600">
                      ${((calculation.businessRevenue * commissionRate) / 100).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">Fee Plataforma (5%)</span>
                    <span className="font-bold text-red-600">-${calculation.platformFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                    <span className="text-sm font-medium">Ganancia Neta Mensual</span>
                    <span className="font-bold text-green-600 text-lg">
                      ${calculation.netEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Proyecciones</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Ganancia Anual:</span>
                      <span className="font-bold text-green-600">${calculation.yearlyProjection.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Por referido/mes:</span>
                      <span className="font-bold text-blue-600">
                        ${(calculation.netEarnings / referralCount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Tier System */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Crown className="mr-2 h-5 w-5 text-yellow-600" />
              Sistema de Niveles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg">
              <h3 className="font-bold text-lg">Nivel Actual</h3>
              <div className="flex items-center justify-center mt-2">
                <Badge className={`${currentTier.color} text-white text-lg px-4 py-2`}>{currentTier.tier}</Badge>
              </div>
              <p className="text-sm mt-2">Comisión: {currentTier.rate}%</p>
            </div>

            {nextTier && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-sm">Próximo Nivel: {nextTier.tier}</h4>
                <p className="text-xs text-gray-600">Necesitas {nextTier.minReferrals - referralCount} referidos más</p>
                <p className="text-xs text-green-600">Comisión aumentará a {nextTier.rate}%</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(referralCount / nextTier.minReferrals) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Todos los Niveles</h4>
              {commissionTiers.map((tier) => (
                <div
                  key={tier.tier}
                  className={`flex justify-between items-center p-2 rounded ${
                    tier.tier === currentTier.tier ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Badge className={`${tier.color} text-white text-xs`}>{tier.tier}</Badge>
                    <span className="text-xs">{tier.minReferrals}+ referidos</span>
                  </div>
                  <span className="text-xs font-bold">{tier.rate}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Escenarios de ejemplo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-purple-600" />
            Escenarios de Ganancias Reales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Principiante", referrals: 3, revenue: 800, description: "3 pequeños negocios" },
              { title: "Intermedio", referrals: 10, revenue: 1500, description: "10 negocios medianos" },
              { title: "Experto", referrals: 25, revenue: 2500, description: "25 negocios establecidos" },
            ].map((scenario) => {
              const monthlyEarnings = ((scenario.referrals * scenario.revenue * 20) / 100) * 0.95
              const yearlyEarnings = monthlyEarnings * 12

              return (
                <Card
                  key={scenario.title}
                  className="border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors"
                >
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">{scenario.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>

                      <div className="space-y-2">
                        <div className="bg-blue-50 p-2 rounded">
                          <p className="text-xs text-gray-600">Revenue/negocio</p>
                          <p className="font-bold">${scenario.revenue}/mes</p>
                        </div>

                        <div className="bg-green-50 p-2 rounded">
                          <p className="text-xs text-gray-600">Ganancia mensual</p>
                          <p className="font-bold text-green-600">${monthlyEarnings.toLocaleString()}</p>
                        </div>

                        <div className="bg-purple-50 p-2 rounded">
                          <p className="text-xs text-gray-600">Ganancia anual</p>
                          <p className="font-bold text-purple-600">${yearlyEarnings.toLocaleString()}</p>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="mt-4 w-full"
                        onClick={() => {
                          setReferralCount(scenario.referrals)
                          setBusinessRevenue(scenario.revenue)
                        }}
                      >
                        Usar este escenario
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💡 Consejos para Maximizar Ganancias</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Enfócate en negocios con alto volumen de transacciones</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Ayuda a tus referidos a crecer para aumentar tus comisiones</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Diversifica en diferentes categorías de negocios</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Mantén una relación cercana con tus referidos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Promociona activamente los beneficios de la plataforma</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📊 Datos del Programa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Comisión base:</span>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Duración:</span>
                <span className="font-bold text-green-600">♾️ Infinita</span>
              </div>
              <div className="flex justify-between">
                <span>Fee de plataforma:</span>
                <span className="font-bold">5%</span>
              </div>
              <div className="flex justify-between">
                <span>Pago mínimo:</span>
                <span className="font-bold">$10 USDT</span>
              </div>
              <div className="flex justify-between">
                <span>Frecuencia de pago:</span>
                <span className="font-bold">Mensual</span>
              </div>
              <div className="flex justify-between">
                <span>Método de pago:</span>
                <span className="font-bold">USDT/USD</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
