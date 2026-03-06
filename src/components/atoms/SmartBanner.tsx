import React from 'react';
import Link from 'next/link';

interface SmartBannerProps {
  desktopImage: string;
  mobileImage: string;
  link: string;
  alt: string;
  variant?: 'leaderboard' | 'header' | 'billboard';
}

export function SmartBanner({ desktopImage, mobileImage, link, alt, variant = 'leaderboard' }: SmartBannerProps) {
  // Diccionario de alturas exactas basadas en tus requerimientos (IAB)
  // Nota: El ancho máximo lo controlaremos desde el contenedor padre para que no se desborde.
  const heights = {
    header: "h-[50px] md:h-[180px]",      // Móvil estándar a PC cabecera
    leaderboard: "h-[50px] md:h-[90px]",  // Móvil 320x50 a PC 970x90
    billboard: "h-[100px] md:h-[250px]",  // Móvil alto a PC formato gran impacto
  };

  return (
    <Link href={link} className={`block w-full max-w-[980px] mx-auto overflow-hidden ${heights[variant]}`}>
      <picture className="w-full h-full block">
        {/* Le decimos al navegador: "Si la pantalla es mínimo 768px (md), usa la imagen de PC" */}
        <source media="(min-width: 768px)" srcSet={desktopImage} />
        {/* De lo contrario, usa la imagen móvil (320x50) */}
        <img 
          src={mobileImage} 
          alt={alt} 
          className="w-full h-full object-cover object-center"
        />
      </picture>
    </Link>
  );
}