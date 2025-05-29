import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

export default function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      // Redirigir a login si no hay sesión activa
      if (!data.session) {
        router.push("/login");
      }
    };

    getSession();

    // Detectar cambios en la sesión (logout, login)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return <Component {...pageProps} />;
}
