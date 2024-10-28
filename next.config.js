/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_BASE_URL
          : "http://d-dkr-betel.tricotcorp.cl:8080/oms-service/v1",
    },
  
    // Cambio del directorio de construcción
    distDir: "dist",
  
    // Cambio del directorio de salida
    output: "export",
  
    // Configuración de imágenes (unoptimized:true deshabilita la optimización automática de imágenes)
    images: {
      unoptimized: true,
    },
  };
  
  module.exports = nextConfig;
  