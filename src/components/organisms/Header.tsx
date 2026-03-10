"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from "@/components/atoms/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-ui-surface border-b border-ui-border sticky top-0 z-50">

      {/* PRIMER NIVEL: Logo y Botón de Idioma */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">

        {/* LOGO REAL Y TEXTO */}
        {/* Agregamos shrink-0 para que el logo nunca se aplaste por otros elementos */}
        <Link href="/" className="flex flex-col md:flex-row items-start md:items-center justify-center group shrink-0">
          {/* Logo más pequeño en móviles (h-8) y grande en PC (md:h-12) */}
          {/* <img src="/logo.svg" alt="Continents Travel" className="h-8 sm:h-10 md:h-12 w-auto object-contain object-left group-hover:scale-102 transition-transform origin-left" /> */}
          
          {/* Logo a color para el Modo Claro (Se oculta en oscuro con dark:hidden) */}
          <img
            src="/logo.svg"
            alt="Continents Travel"
            className="h-8 sm:h-10 md:h-12 w-auto object-contain object-left group-hover:scale-102 transition-transform origin-left dark:hidden"
          />

          {/* Logo blanco para el Modo Oscuro (Se oculta en claro con hidden dark:block) */}
          <img
            src="/logo-white.svg"
            alt="Continents Travel"
            className="h-8 sm:h-10 md:h-12 w-auto object-contain object-left group-hover:scale-102 transition-transform origin-left hidden dark:block"
          />

          {/* En móvil se oculta. En PC (md) se pone al lado, con margen y línea separadora */}
          <span className="hidden sm:block text-ui-text/60 font-semibold text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1 md:mt-0 md:ml-3 md:border-l md:border-ui-border md:pl-3">
            Travel & Tours
          </span>
        </Link>

        {/* BOTONES DERECHA: Asesor y Cambio de Idioma */}
        <div className="flex items-center gap-3 md:gap-4">

          {/* Botón de WhatsApp (Oculto en móviles muy pequeños para ahorrar espacio) */}
          <a
            href="https://wa.me/51999999999?text=Hola%20Continents%20Travel,%20deseo%20asesor%C3%ADa%20para%20un%20viaje"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors px-4 py-2 rounded-full shadow-sm"
          >
            {/* Ícono oficial de WhatsApp en SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contacta un asesor
          </a>

          {/* Botón de Idioma */}
          <button className="flex items-center gap-2 text-sm font-bold text-ui-text hover:text-primary transition-colors border border-ui-border px-4 py-2 rounded-full hover:bg-ui-bg shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            ES
          </button>

          {/* Botón de Dark Mode */}
          <ThemeToggle />

        </div>

      </div>

      {/* SEGUNDO NIVEL: Navegación Principal con Íconos SVG */}
      <nav className="border-t border-ui-border/50 bg-ui-bg/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ul className="flex items-center gap-8 overflow-x-auto hide-scrollbar py-3">

            <li>
              <Link
                href="/paquetes"
                className={`flex items-center gap-2 text-sm font-bold transition-colors whitespace-nowrap ${pathname === '/paquetes' ? 'text-primary' : 'text-ui-text hover:text-primary'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Paquetes
              </Link>
            </li>

            <li>
              <Link
                href="/vuelos"
                className={`flex items-center gap-2 text-sm font-bold transition-colors whitespace-nowrap ${pathname === '/vuelos' ? 'text-primary' : 'text-ui-text hover:text-primary'}`}
              >
                {/* Ícono de Avión */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Vuelos
              </Link>
            </li>

            <li>
              <Link
                href="/ofertas"
                className={`flex items-center gap-2 text-sm font-bold transition-colors whitespace-nowrap ${pathname === '/ofertas' ? 'text-secondary' : 'text-ui-text hover:text-secondary'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                Ofertas
              </Link>
            </li>

          </ul>
        </div>
      </nav>

      {/* TERCER NIVEL (FUTURO ROADMAP): Motor de Búsqueda Embebido (Booking Engine) */}
      {/* <div className="hidden bg-ui-light p-4 border-t border-ui-border shadow-inner">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-ui-text text-sm">Espacio reservado para iframe de Nuevo Mundo Viajes o motor propio</p>
        </div>
      </div> 
      */}

    </header>
  );
}
