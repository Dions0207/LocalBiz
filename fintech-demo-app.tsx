"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  Calculator,
  PiggyBank,
  Target,
  CheckCircle,
} from "lucide-react"

export default function FintechDemoApp() {
  const [loanAmount, setLoanAmount] = useState(10000)
  const [loanTerm, setLoanTerm] = useState(12)
  const [investAmount, setInvestAmount] = useState(5000)
  const [userType, setUserType] = useState<"borrower" | "investor">("borrower")

  // Cálculos simulados (solo demostración)
  const interestRate = 12 // 12% anual
  const monthlyPayment =
    (loanAmount * (interestRate / 100 / 12)) / (1 - Math.pow(1 + interestRate / 100 / 12, -loanTerm))
  const totalPayment = monthlyPayment * loanTerm
  const totalInterest = totalPayment - loanAmount

  const investmentReturn = investAmount * 0.08 // 8% trimestral simulado
  const quarterlyReturn = investAmount * 0.02 // 2% trimestral

  const demoMetrics = {
    totalLoans: 2847000,
    activeInvestors: 1234,
    averageReturn: 8.5,
    defaultRate: 2.1,
    totalUsers: 15678,
    monthlyGrowth: 23.4,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Advertencia Legal */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="text-red-800">⚠️ PROTOTIPO EDUCATIVO ÚNICAMENTE</AlertTitle>
          <AlertDescription className="text-red-700">
            <strong>Esta es una demostración técnica.</strong> Los servicios financieros reales requieren: licencias
            bancarias, cumplimiento regulatorio (CNBV, CONDUSEF), capital mínimo, auditorías, y autorización de
            autoridades financieras. No usar para servicios reales sin asesoría legal especializada.
          </AlertDescription>
        </Alert>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            💳 FinTech Demo
          </h1>
          <p className="text-xl text-gray-600">Prototipo de plataforma financiera peer-to-peer</p>
        </div>

        {/* User Type Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <Button
              variant={userType === "borrower" ? "default" : "ghost"}
              onClick={() => setUserType("borrower")}
              className="mr-1"
            >
              💰 Solicitar Préstamo
            </Button>
            <Button variant={userType === "investor" ? "default" : "ghost"} onClick={() => setUserType("investor")}>
              📈 Invertir
            </Button>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Préstamos Totales</p>
                  <p className="text-2xl font-bold">${demoMetrics.totalLoans.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inversores Activos</p>
                  <p className="text-2xl font-bold">{demoMetrics.activeInvestors.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rendimiento Promedio</p>
                  <p className="text-2xl font-bold">{demoMetrics.averageReturn}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tasa de Morosidad</p>
                  <p className="text-2xl font-bold">{demoMetrics.defaultRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={userType} className="w-full">
          <TabsContent value="borrower" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Loan Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2" />
                    Calculadora de Préstamo
                  </CardTitle>
                  <CardDescription>Simula tu préstamo (solo demostración)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Monto del Préstamo</label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Plazo (meses)</label>
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Resumen del Préstamo</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Monto:</span>
                        <span className="font-semibold">${loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tasa de Interés:</span>
                        <span className="font-semibold">{interestRate}% anual</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pago Mensual:</span>
                        <span className="font-semibold">${monthlyPayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total a Pagar:</span>
                        <span className="font-semibold">${totalPayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Intereses Totales:</span>
                        <span className="font-semibold">${totalInterest.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" disabled>
                    Solicitar Préstamo (Demo)
                  </Button>
                  <p className="text-xs text-gray-500 text-center">⚠️ Funcionalidad deshabilitada - Solo demostración</p>
                </CardContent>
              </Card>

              {/* Loan Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2" />
                    Requisitos (Ejemplo)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold">📋 Documentos Requeridos:</h3>
                      <div className="space-y-2">
                        {[
                          "Identificación oficial vigente",
                          "Comprobante de ingresos (3 meses)",
                          "Comprobante de domicilio",
                          "Estado de cuenta bancario",
                          "Referencias personales",
                        ].map((req, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold">💰 Criterios de Evaluación:</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Ingresos mínimos:</span>
                          <span className="font-semibold">$15,000/mes</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Score crediticio:</span>
                          <span className="font-semibold">650+</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Antigüedad laboral:</span>
                          <span className="font-semibold">6 meses</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Edad:</span>
                          <span className="font-semibold">18-65 años</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-sm">
                        <strong>⚠️ Nota:</strong> Los criterios reales dependerían de regulaciones locales y políticas de
                        riesgo específicas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="investor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Investment Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PiggyBank className="mr-2" />
                    Calculadora de Inversión
                  </CardTitle>
                  <CardDescription>Simula tu inversión (solo demostración)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Monto a Invertir</label>
                    <Input
                      type="number"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Proyección de Rendimientos</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Inversión inicial:</span>
                        <span className="font-semibold">${investAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rendimiento trimestral:</span>
                        <span className="font-semibold text-green-600">8% (ejemplo)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ganancia trimestral:</span>
                        <span className="font-semibold text-green-600">${(investAmount * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total después de 1 trimestre:</span>
                        <span className="font-semibold">${(investAmount * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Proyección Anual:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>3 meses:</span>
                        <span>${(investAmount * 1.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>6 meses:</span>
                        <span>${(investAmount * Math.pow(1.08, 2)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>9 meses:</span>
                        <span>${(investAmount * Math.pow(1.08, 3)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>12 meses:</span>
                        <span className="font-semibold text-green-600">
                          ${(investAmount * Math.pow(1.08, 4)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" disabled>
                    Invertir Ahora (Demo)
                  </Button>
                  <p className="text-xs text-gray-500 text-center">⚠️ Funcionalidad deshabilitada - Solo demostración</p>
                </CardContent>
              </Card>

              {/* Investment Portfolio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2" />
                    Portafolio de Préstamos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold">📊 Diversificación por Riesgo:</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Bajo Riesgo (6% anual)</span>
                            <span>40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Medio Riesgo (12% anual)</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Alto Riesgo (18% anual)</span>
                            <span>15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold">💼 Préstamos Activos (Ejemplo):</h3>
                      <div className="space-y-2">
                        {[
                          { id: "L001", amount: 50000, rate: 12, term: "18 meses", risk: "Medio" },
                          { id: "L002", amount: 25000, rate: 8, term: "12 meses", risk: "Bajo" },
                          { id: "L003", amount: 75000, rate: 15, term: "24 meses", risk: "Alto" },
                        ].map((loan, i) => (
                          <div key={i} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-sm">{loan.id}</span>
                              <Badge
                                variant={
                                  loan.risk === "Bajo" ? "default" : loan.risk === "Medio" ? "secondary" : "destructive"
                                }
                              >
                                {loan.risk}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-600">
                              ${loan.amount.toLocaleString()} • {loan.rate}% • {loan.term}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                      <p className="text-sm">
                        <strong>💡 Estrategia:</strong> Diversifica tu inversión en múltiples préstamos para reducir
                        riesgo y optimizar rendimientos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Business Model */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2" />
              Modelo de Negocio (Conceptual)
            </CardTitle>
            <CardDescription>Estructura financiera para sostenibilidad (solo educativo)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-green-600">💰 Fuentes de Ingresos</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Comisión por originación:</span>
                    <span className="font-semibold">2-5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spread de tasas:</span>
                    <span className="font-semibold">3-6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comisión por servicio:</span>
                    <span className="font-semibold">1% anual</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Penalizaciones:</span>
                    <span className="font-semibold">Variable</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-blue-600">📊 Costos Operativos</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tecnología y desarrollo:</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing y adquisición:</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operaciones y personal:</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumplimiento y legal:</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reservas para morosidad:</span>
                    <span className="font-semibold">10%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-purple-600">🎯 KPIs Clave</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CAC (Costo por cliente):</span>
                    <span className="font-semibold">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LTV (Valor de vida):</span>
                    <span className="font-semibold">$800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasa de conversión:</span>
                    <span className="font-semibold">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiempo de aprobación:</span>
                    <span className="font-semibold">24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NPS (Satisfacción):</span>
                    <span className="font-semibold">75+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">🏛️ Consideraciones Regulatorias Críticas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">📋 Licencias Requeridas:</h4>
                  <ul className="space-y-1">
                    <li>• Licencia SOFOM (CNBV)</li>
                    <li>• Registro en CONDUSEF</li>
                    <li>• Cumplimiento PLD/FT</li>
                    <li>• Certificación ISO 27001</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">💰 Capital Mínimo:</h4>
                  <ul className="space-y-1">
                    <li>• SOFOM ENR: $5M MXN</li>
                    <li>• SOFOM ER: $50M MXN</li>
                    <li>• Reservas técnicas</li>
                    <li>• Capital de trabajo</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Disclaimer */}
        <Alert className="mt-6 border-orange-200 bg-orange-50">
          <Shield className="h-4 w-4" />
          <AlertTitle className="text-orange-800">🛡️ Disclaimer Legal Importante</AlertTitle>
          <AlertDescription className="text-orange-700">
            <div className="space-y-2 text-sm">
              <p>
                <strong>Este es únicamente un prototipo educativo.</strong> Para operar servicios financieros reales se
                requiere:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Licencias bancarias o SOFOM otorgadas por CNBV</li>
                <li>Cumplimiento estricto de regulaciones financieras</li>
                <li>Capital mínimo regulatorio significativo</li>
                <li>Sistemas de prevención de lavado de dinero</li>
                <li>Auditorías externas y reportes regulatorios</li>
                <li>Asesoría legal especializada en servicios financieros</li>
              </ul>
              <p className="font-semibold">
                No utilizar este código para servicios financieros reales sin la debida autorización regulatoria.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
