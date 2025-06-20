import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useRouter } from "next/router"; 
import { supabase } from "@/lib/supabase"; 

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-gray-300 bg-white hover:bg-gray-100",
        ghost: "hover:bg-gray-200",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  actionType?: "navigate" | "pay" | "subscribe" | "back"; 
  route?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, actionType, route, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const router = useRouter();

    const handleClick = async () => {
      if (actionType === "navigate" && route) {
        router.push(route);
      } else if (actionType === "pay") {
        try {
            const response = await fetch("/api/checkout", { method: "POST" });
            const { url } = await response.json();
            if (url) {
                window.location.href = url;
            } else {
                alert("Hubo un problema al iniciar el pago.");
            }
        } catch (error) {
            console.error("Error en el checkout:", error);
            alert("Error al procesar la solicitud de pago.");
        }
      } else if (actionType === "subscribe") {
        // --- CÓDIGO CORREGIDO PARA EL ERROR DE SUPABASE ---
        const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });
        
        if (error) {
          console.error("Error en el login con Google:", error);
          alert("Hubo un error al intentar suscribirse.");
        } else {
          // El inicio de sesión se ha iniciado, la redirección se maneja automáticamente por Supabase
          // No es necesario hacer nada más aquí, ni siquiera una alerta, 
          // ya que la página se recargará tras el login.
        }
        // --- FIN DE LA CORRECCIÓN ---
      } else if (actionType === "back") {
        window.history.back();
      }
    };

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
