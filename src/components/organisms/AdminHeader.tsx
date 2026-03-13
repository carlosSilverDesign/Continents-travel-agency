"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // No renderizar el Header en la página de login
  if (pathname === "/admin/login") {
    return null;
  }

  const handleLogout = async () => {
    // Cerrar sesión en Supabase y borrar cookies sincronizadas
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-ui-surface border-b border-ui-border z-40 flex items-center justify-between px-6 shadow-sm">
      <div className="font-bold text-ui-heading text-lg">
        Continents <span className="text-secondary">Admin</span>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 border border-ui-border/50 bg-ui-bg text-ui-text text-sm font-bold rounded-lg hover:border-secondary hover:text-secondary transition-all flex items-center gap-2 shadow-sm shrink-0"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
        Cerrar Sesión
      </button>
    </header>
  );
}
