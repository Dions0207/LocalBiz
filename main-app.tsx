"use client"
import { AuthProvider, useAuth } from "./auth-system"
import AuthSystem from "./auth-system"
import BusinessDashboard from "./business-dashboard"
import AdminDashboard from "./admin-dashboard"
import MobileFirstLocalBiz from "./mobile-first-localbiz"

function AppContent() {
  const { user } = useAuth() // Obtiene el usuario del contexto de autenticación

  if (!user) {
    // Si no hay usuario, muestra el sistema de autenticación
    return <AuthSystem />
  }

  // Si hay usuario, redirige al dashboard según el tipo de usuario
  switch (user.userType) {
    case "customer":
      return <MobileFirstLocalBiz />
    case "business":
      return <BusinessDashboard />
    case "admin":
      return <AdminDashboard />
    case "affiliate":
      return <MobileFirstLocalBiz />
    default:
      return <MobileFirstLocalBiz /> // Default a MobileFirstLocalBiz para otros casos
  }
}

export default function MainApp() {
  return (
    <AuthProvider>
      {" "}
      // Envuelve toda la aplicación con el proveedor de autenticación
      <AppContent />
    </AuthProvider>
  )
}
