import type { Metadata } from "next";
// 1. Importamos las fuentes directamente de los servidores de Google a través de Next.js
import { Inter, Syne } from "next/font/google"; 
import "./globals.css";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { FloatingWhatsApp } from "@/components/molecules/FloatingWhatsApp";

// ¡NUEVO! Importamos el motor del Dark Mode
import { ThemeProvider } from "@/components/providers/ThemeProvider"; 

// 2. Configuramos Inter (Para textos generales)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", // Creamos una variable CSS
});

// 3. Configuramos Syne (La disruptiva, para títulos)
const syne = Syne({ 
  subsets: ["latin"],
  variable: "--font-syne", 
});

export const metadata: Metadata = {
  title: "Continents | Agencia de Viajes",
  description: "Descubre Perú y el mundo con nosotros.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* 4. Inyectamos las variables de las fuentes en el body */}
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased flex flex-col min-h-screen`}>
        
        {/* 5. ENVOLVEMOS TODO EL ECOSISTEMA CON EL THEME PROVIDER */}
        <ThemeProvider
          attribute="class" // Le dice a Tailwind que use la clase .dark en el HTML
          defaultTheme="system" // Lee si el usuario ya tiene su iPhone/PC en oscuro
          enableSystem
          disableTransitionOnChange // Evita parpadeos extraños al recargar la página
        >
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />

          {/* NUESTRO BOTÓN FLOTANTE GLOBAL */}
          <FloatingWhatsApp />
        </ThemeProvider>

      </body>
    </html>
  );
}