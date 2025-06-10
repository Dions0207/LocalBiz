"use client"
import { AuthProvider, useAuth } from "./auth-system"
import AuthSystem from "./auth-system"
import BusinessDashboard from "./business-dashboard"
import AdminDashboard from "./admin-dashboard"
import MobileFirstLocalBiz from "./mobile-first-localbiz"
import CustomerDashboard from "./customer-dashboard" // Asegúrate de importar CustomerDashboard

function AppContent() {
  const { user } = useAuth() // Obtiene el usuario del contexto de autenticación

  if (!user) {
    // Si no hay usuario, muestra el sistema de autenticación
    return <AuthSystem />
  }

  // Si hay usuario, redirige al dashboard según el tipo de usuario
  switch (user.userType) {
    case "customer":
      return <CustomerDashboard /> // Usar CustomerDashboard para clientes
    case "business":
      return <BusinessDashboard />
    case "admin":
      return <AdminDashboard />
    case "affiliate":
      return <MobileFirstLocalBiz /> // O un dashboard específico para afiliados si existe
    default:
      return <MobileFirstLocalBiz /> // Default a MobileFirstLocalBiz para otros casos
  }
}

export default function MainApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
