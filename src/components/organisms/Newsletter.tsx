"use client"; // Necesita interactividad para evitar que el form recargue la página

import React from 'react';
import { Button } from '@/components/atoms/Button';

export function Newsletter() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Suscripción exitosa! (A conectar en la fase de integraciones)");
  };

  return (
    <section className="bg-primary py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm">
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
            // Le agregamos bg-white y placeholder:text-ui-text/60 para que resalte
            className="flex-grow px-6 py-3 rounded-lg bg-white text-ui-heading placeholder:text-ui-text/60 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm transition-all"
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