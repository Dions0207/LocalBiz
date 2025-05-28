// Asumo que este archivo es algo como: app/admin/page.tsx
'use client'; // Necesario para useRouter, useState, useEffect y onClick handlers

import { Button } from "@/components/ui/button"; // Asumiendo que usas Shadcn UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Asumiendo
import { Input } from "@/components/ui/input"; // Asumiendo
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"; // Ejemplo si tienes filtros
import Link from "next/link";
import { useRouter } from "next/navigation"; // Para redireccionar
import { supabase } from "@/lib/supabase"; // Ajusta la ruta si es diferente
import { useEffect, useState } from "react"; // Hooks de React
import type { Business } from "@/lib/supabase"; // Importa tu tipo Business (asegúrate que la ruta a lib/supabase.ts sea correcta)

// Iconos (si los usas, asegúrate de instalarlos o reemplazarlos)
// Ejemplo: npm install lucide-react
// import { UsersIcon, StoreIcon, DollarSignIcon, CreditCardIcon, SearchIcon, FilterIcon, PlusCircleIcon, MoreHorizontalIcon } from 'lucide-react';

// Componente del Panel de Administración
export default function AdminDashboardPage() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]); // Estado para guardar los negocios
  const [loadingBusinesses, setLoadingBusinesses] = useState(true); // Estado para el indicador de carga de negocios
  const [fetchError, setFetchError] = useState<string | null>(null); // Estado para errores de fetch

  // Función para Cerrar Sesión
  const handleLogout = async () => {
    setLoadingBusinesses(true); // O un estado de carga general para la acción
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      alert(`Error al cerrar sesión: ${error.message}`); // Feedback simple
      setLoadingBusinesses(false);
    } else {
      router.push("/login"); // Redirige a la página de login
      router.refresh(); // Importante para actualizar estado de auth en el servidor
    }
  };

  // Función para obtener los negocios
  useEffect(() => {
    const fetchBusinessesFromDB = async () => {
      setLoadingBusinesses(true);
      setFetchError(null);
      // Asumo que tu tabla en Supabase se llama 'businesses'
      // Ajusta el nombre de la tabla si es diferente.
      const { data, error } = await supabase
        .from('businesses') // <--- VERIFICA EL NOMBRE DE TU TABLA AQUÍ
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching businesses:", error);
        setFetchError(error.message);
        setBusinesses([]);
      } else {
        setBusinesses(data || []);
      }
      setLoadingBusinesses(false);
    };

    fetchBusinessesFromDB();
  }, []); // El array vacío significa que se ejecuta una vez cuando el componente se monta

  // Datos de ejemplo para los negocios (serán reemplazados por `businesses` del estado)
  // Los mantengo aquí temporalmente por si quieres comparar la estructura
  const exampleBusinesses = [
    {
      id: "1",
      name: "Tacos El Güero",
      category: "food",
      status: "active",
      subscription_plan: "premium",
      email: "tacos@elguero.com",
      phone: "+52 55 1111-2222",
      address: "Av. Insurgentes Sur 1234, Roma Norte",
      created_at: "2024-09-01T00:00:00Z", // Asegúrate que el formato coincida con tu tipo Business
      // Estos campos no están en tu tipo Business, pero estaban en el ejemplo original
      // monthly_revenue: "$15,750/mes",
      // transaction_count: "234 transacciones",
      // rating_details: "⭐ 4.8 (156 reviews)",
      // referred_by: "Referido por: María González",
      // Para coincidir con tu tipo Business:
      rating: 4.8,
      review_count: 156,
      owner_id: "owner1", // Necesitarás este dato si tu tipo lo requiere
      verified: true,
      featured: false,
      accepts_crypto: false,
      accepts_cards: true,
    },
    {
      id: "2",
      name: "Boutique Luna",
      category: "retail",
      status: "pending",
      subscription_plan: "basic",
      email: "info@boutiqueluna.com",
      phone: "+52 55 2222-3333",
      address: "Calle Álvaro Obregón 567, Condesa",
      created_at: "2024-01-24T00:00:00Z",
      // monthly_revenue: "$8900/mes",
      // transaction_count: "89 transacciones",
      // rating_details: "⭐ 4.6 (67 reviews)",
      // referred_by: "Referido por: María González",
      rating: 4.6,
      review_count: 67,
      owner_id: "owner2",
      verified: false,
      featured: true,
      accepts_crypto: true,
      accepts_cards: true,
    },
  ];


  // Función para manejar la acción de bloquear/activar (placeholder)
  const handleToggleBusinessStatus = async (businessId: string, currentStatus: "active" | "pending" | "suspended") => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    alert(`Acción: Cambiar estado de ${businessId} a ${newStatus}. Implementar lógica con Supabase.`);
    // Lógica futura:
    // const { error } = await supabase
    //   .from('businesses')
    //   .update({ status: newStatus })
    //   .eq('id', businessId);
    // if (error) { /* manejar error */ }
    // else { /* recargar negocios o actualizar estado local */ }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 dark:bg-gray-800 dark:border-gray-700 sm:px-6">
        <Link href="/admin" className="flex items-center gap-2">
          {/* <StoreIcon className="h-6 w-6 text-primary" /> Podrías usar un icono */}
          <span className="text-lg font-semibold">LocalBiz Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => alert("Funcionalidad Exportar Datos pendiente.")}>
            Exportar Datos
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout} disabled={loadingBusinesses}>
            {loadingBusinesses && router.asPath.endsWith("/login") ? "Cerrando..." : "Cerrar Sesión"}
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Panel de Control Administrativo</h1>
        </div>

        {/* Resumenes como Links */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          {[
            { title: "Resumen", icon: "📊", href: "/admin/summary" },
            { title: "Usuarios", icon: "👥", href: "/admin/users" },
            { title: "Negocios", icon: "🏪", href: "/admin/businesses-list" }, // O /admin si esta es la lista principal
            { title: "Comisiones", icon: "💰", href: "/admin/commissions" },
            { title: "Transacciones", icon: "💳", href: "/admin/transactions" },
          ].map((item) => (
            <Link key={item.title} href={item.href} passHref>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <span className="text-2xl">{item.icon}</span> {/* Podrías usar iconos reales */}
                </CardHeader>
                <CardContent>
                  {/* Podrías añadir un número o un pequeño gráfico aquí en el futuro */}
                  <p className="text-xs text-muted-foreground">Ver {item.title.toLowerCase()}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Gestión de Negocios */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <CardTitle>Gestión de Negocios</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  {/* <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
                  <Input type="search" placeholder="Buscar negocios..." className="pl-8 w-full sm:w-[200px] lg:w-[300px]" />
                </div>
                {/* Filtro de ejemplo */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      {/* <FilterIcon className="h-3.5 w-3.5" /> */}
                      <span className="sr-only sm:not-sr-only">Comida</span> {/* Estado del filtro */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Todo</DropdownMenuItem>
                    <DropdownMenuItem>Comida</DropdownMenuItem>
                    <DropdownMenuItem>Retail</DropdownMenuItem>
                    <DropdownMenuItem>Servicios</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/admin/negocios/nuevo" passHref>
                  <Button size="sm" className="gap-1">
                    {/* <PlusCircleIcon className="h-4 w-4" /> */}
                    Nuevo Negocio
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loadingBusinesses && <p className="text-center py-4">Cargando negocios...</p>}
            {fetchError && <p className="text-red-500 text-center py-4">Error al cargar negocios: {fetchError}</p>}
            {!loadingBusinesses && !fetchError && businesses.length === 0 && (
              <p className="text-center py-4 text-muted-foreground">No hay negocios registrados.</p>
            )}

            {!loadingBusinesses && !fetchError && businesses.length > 0 && (
              <div className="space-y-4">
                {businesses.map((business) => (
                  <Card key={business.id} className="overflow-hidden">
                    <CardContent className="p-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                      <div className="grid gap-1">
                        <h3 className="font-semibold text-lg">{business.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium capitalize">{business.category}</span> -
                          <span className={`ml-1 capitalize font-semibold ${
                            business.status === "active" ? "text-green-600 dark:text-green-400" :
                            business.status === "pending" ? "text-yellow-600 dark:text-yellow-400" :
                            "text-red-600 dark:text-red-400"
                          }`}>
                            {business.status}
                          </span> -
                          <span className="ml-1 capitalize">{business.subscription_plan}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{business.email}</p>
                        <p className="text-sm text-muted-foreground">{business.phone}</p>
                        <p className="text-sm text-muted-foreground">{business.address}</p>
                      </div>
                      <div className="grid gap-1 text-sm md:text-right">
                        <p>
                          <span className="font-medium">{new Date(business.created_at).toLocaleDateString()}</span>
                        </p>
                        {/* Campos adicionales que podrías querer mostrar */}
                        <p>Rating: {business.rating} ({business.review_count} reviews)</p>
                        <p>Verificado: {business.verified ? "Sí" : "No"}</p>
                        {/* <p>Referido por: {business.referred_by || "N/A"}</p> */}
                      </div>
                      <div className="md:col-span-2 flex flex-wrap gap-2 items-center mt-2 pt-2 border-t dark:border-gray-700">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/negocios/${business.id}`)}>
                          Detalles
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/negocios/${business.id}/editar`)}>
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleBusinessStatus(business.id, business.status)}
                          className={
                            business.status === "active"
                              ? "text-red-600 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-500 dark:hover:bg-red-900/50"
                              : "text-green-600 border-green-500 hover:bg-green-50 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-900/50"
                          }
                        >
                          {business.status === "active" ? "Bloquear" : "Activar"}
                        </Button>
                        {/* Más acciones como "Pagar Comisiones" */}
                        {/* <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Más acciones</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Pagar Comisión</DropdownMenuItem>
                            <DropdownMenuItem>Ver Transacciones</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// Helper para iconos (si decides usarlos con lucide-react)
// function UsersIcon(props: any) { return (<svg /* ... */ >{props.children}</svg>); }
// function StoreIcon(props: any) { return (<svg /* ... */ >{props.children}</svg>); }
// function DollarSignIcon(props: any) { return (<svg /* ... */ >{props.children}</svg>); }
// function CreditCardIcon(props: any) { return (<svg /* ... */ >{props.children}</svg>); }
// function SearchIcon(props: any) { return (<svg /* ... */ >{props.children}</svg>); }
// function FilterIcon(props: any) { return (<svg /* ... */ >{props.children}</svg>); }
// function PlusCircleIcon(props: any) { return (<svg /* ... */ >{props.children}</svg>); }
// function MoreHorizontalIcon(props: any) { return (<svg /* ... */ >{props.children}</svg>); }
