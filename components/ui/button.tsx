import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useRouter } from "next/router"; // Manejo de navegación
import { supabase } from "@/lib/supabase"; // Conexión con Supabase

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
  actionType?: "navigate" | "pay" | "subscribe" | "back"; // Acciones disponibles
  route?: string; // Ruta para navegación
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, actionType, route, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const router = useRouter();

    // Manejo de eventos de los botones
    const handleClick = async () => {
      if (actionType === "navigate" && route) {
        router.push(route); // Navegación interna
      } else if (actionType === "pay") {
        const response = await fetch("/api/checkout", { method: "POST" });
        const { url } = await response.json();
        window.location.href = url; // Redirección a la página de pago
      } else if (actionType === "subscribe") {
        const { user } = await supabase.auth.signInWithOAuth({ provider: "google" });
        if (user) alert("¡Suscripción exitosa! 🎉");
      } else if (actionType === "back") {
        window.history.back(); // Regresar a la página anterior
      }
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
