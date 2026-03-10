"use client"; // ¡Vital! Le dice a Next.js que este componente usa interactividad en el navegador

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';

// Nuestra data de prueba para los banners (Mock data)
const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop",
    title: "Descubre el Imperio Inca",
    subtitle: "Ofertas en paquetes a Cusco",
    cta: "Ver Promoción"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1714876906025-77b148689e2c?q=80&w=1374&auto=format&fit=crop",
    title: "Lima Gastronómica",
    subtitle: "Tours culinarios exclusivos",
    cta: "Reserva Ahora"
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    // AQUÍ ESTÁ LA MAGIA: 
    // max-w-[980px] para respetar el estándar.
    // h-[250px] en móvil, md:h-[400px] en PC (Banner Expandible).
    // rounded-xl para darle un toque moderno y elegante que no choque con los bordes.
    <section className="relative w-full max-w-[980px] mx-auto h-[250px] md:h-[400px] overflow-hidden md:rounded-xl shadow-sm">
      
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl md:text-5xl font-bold !text-white mb-2 drop-shadow-md">
              {slide.title}
            </h2>
            {/* Ocultamos el subtítulo en móvil para ahorrar espacio (hidden md:block) */}
            <p className="hidden md:block text-lg !text-white/90 mb-6 font-sans drop-shadow-md">
              {slide.subtitle}
            </p>
            <Button variant="accent" size="md">
              {slide.cta}
            </Button>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-accent w-6' : 'bg-white/50 w-2 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
