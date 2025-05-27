"use client"
import { AuthProvider, useAuth } from "./auth-system"
import AuthSystem from "./auth-system"
import CustomerDashboard from "./customer-dashboard"
import BusinessDashboard from "./business-dashboard"
import AdminDashboard from "./admin-dashboard"

function AppContent() {
  const { user } = useAuth()

  if (!user) {
    return <AuthSystem />
  }

  // Renderizar dashboard según el tipo de usuario
  switch (user.userType) {
    case "customer":
      return <CustomerDashboard />
    case "business":
      return <BusinessDashboard />
    case "admin":
      return <AdminDashboard />
    case "affiliate":
      return <CustomerDashboard /> // Los afiliados usan el dashboard de cliente
    default:
      return <CustomerDashboard />
  }
}

export default function MainApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
