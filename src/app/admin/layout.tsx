import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "../globals.css";
import { AdminHeader } from "@/components/organisms/AdminHeader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "Admin | Continents",
  description: "Panel de administración",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased min-h-screen bg-ui-bg pt-16`}>
        <AdminHeader />
        <main className="min-h-[calc(100vh-64px)] w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
