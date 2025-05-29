/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"], // Revisar si necesitas todas
    unoptimized: true, // Solo usa esto si realmente no optimizas imágenes con Next.js
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  eslint: {
    ignoreDuringBuilds: false, // Mejor mantenerlo en `false` para detectar errores antes del despliegue
  },
  typescript: {
    ignoreBuildErrors: false, // Mismo caso, mantenerlo en `false` para evitar errores en producción
  },
  reactStrictMode: true, // Esto mejora el rendimiento y la depuración en desarrollo
  generateBuildId: async () => {
    return "my-build-id"; // Ayuda a Netlify a gestionar caché correctamente
  },
};

module.exports = nextConfig;
