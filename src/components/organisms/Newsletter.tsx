"use client"; // Necesita interactividad para evitar que el form recargue la página

import React from 'react';
import { Button } from '@/components/atoms/Button';

export function Newsletter() {
  const handleSubscribe = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("¡Suscripción exitosa! (A conectar en la fase de integraciones)");
  };

  return (
    <section className="bg-[#410092] py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">

        <h2 className="text-3xl md:text-4xl font-bold !text-white mb-4 drop-shadow-sm">
          Únete a nuestro club de viajeros
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Suscríbete para recibir ofertas exclusivas, guías de destinos y mucha inspiración para tu próximo viaje.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row gap-3 justify-center max-w-2xl mx-auto"
        >
          <input
            type="email"
            placeholder="Tu correo electrónico"
            required
            // 2. Anclamos el input a blanco puro y forzamos su texto a negro puro (!text-slate-900) para que no desaparezca de noche
            className="flex-grow px-6 py-3 rounded-lg bg-white !text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all"
          />
          <Button type="submit" variant="accent" size="lg" className="whitespace-nowrap shadow-md">
            Suscribirme
          </Button>
        </form>

        <p className="text-white/50 text-xs mt-6">
          No enviamos spam. Puedes darte de baja en cualquier momento.
        </p>
      </div>
    </section>
  );
}