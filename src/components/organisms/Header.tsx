import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full shadow-md">
      {/* NIVEL 1: Topbar (Logo y utilidades) */}
      <div className="bg-primary text-white py-3 px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wider">
          CONTINENTS
        </Link>
        <div className="flex gap-4 text-sm font-semibold">
          <button className="hover:text-secondary transition-colors">Ayuda</button>
          <button className="hover:text-secondary transition-colors">Iniciar Sesión</button>
        </div>
      </div>

      {/* NIVEL 2: Menú de Navegación (Secciones Importantes) */}
      <div className="bg-white border-b border-ui-border py-2 px-4 md:px-8 flex gap-6 overflow-x-auto">
        <Link href="/tours" className="flex flex-col items-center min-w-max text-ui-text hover:text-primary transition-colors">
          <span className="text-xl">🗺️</span>
          <span className="text-xs font-bold mt-1">Paquetes</span>
        </Link>
        <Link href="/destinos" className="flex flex-col items-center min-w-max text-ui-text hover:text-primary transition-colors">
          <span className="text-xl">📍</span>
          <span className="text-xs font-bold mt-1">Destinos</span>
        </Link>
        <Link href="/ofertas" className="flex flex-col items-center min-w-max text-ui-text hover:text-primary transition-colors">
          <span className="text-xl">🔥</span>
          <span className="text-xs font-bold mt-1">Ofertas</span>
        </Link>
      </div>

      {/* NIVEL 3: Zona del Buscador (Placeholder para el MVP) */}
      <div className="bg-primary/5 py-4 px-4 md:px-8 flex justify-center border-b border-ui-border">
        <div className="bg-white px-6 py-3 rounded-full shadow-sm text-sm text-ui-text border border-ui-border w-full max-w-2xl text-center">
          ¿A dónde quieres viajar? <span className="text-secondary font-bold">(Buscador en construcción)</span>
        </div>
      </div>
    </header>
  );
}