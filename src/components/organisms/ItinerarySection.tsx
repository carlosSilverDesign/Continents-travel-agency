"use client";

import React, { useState } from 'react';

export function ItinerarySection({ itineraries }: { itineraries: any[] }) {
  const [showMap, setShowMap] = useState(true);
  if (!itineraries || itineraries.length === 0) return <p className="text-ui-text">Itinerario no disponible.</p>;

  return (
    <div className="animate-fade-in flex flex-col gap-8">

      {/* SECCIÓN DEL MAPA (Mantenemos el botón para colapsar el mapa general) */}
      <div className="bg-ui-bg p-4 rounded-2xl border border-ui-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-primary text-lg">Mapa de Ruta</h3>
          <button
            onClick={() => setShowMap(!showMap)}
            className="text-sm font-semibold text-secondary hover:text-primary transition-colors px-3 py-1 bg-white rounded-md shadow-sm"
          >
            {showMap ? 'Ocultar Mapa' : 'Ver Mapa'}
          </button>
        </div>

        <div className={`transition-all duration-300 overflow-hidden rounded-xl ${showMap ? 'h-64 opacity-100' : 'h-0 opacity-0'}`}>
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
            alt="Mapa del Itinerario"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* SECCIÓN DE LOS DÍAS */}
      <div className="flex flex-col gap-6">
        {itineraries.map((dia) => (
          <div key={dia.day_number} className="border-l-2 border-primary pl-6 py-2 relative">

            <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-white border-2 border-primary"></div>

            <div>
              <h4 className="font-bold text-ui-heading text-lg">Día {dia.day_number}: {dia.title}</h4>
              <p className="text-ui-text mt-2 leading-relaxed">{dia.description}</p>
            </div>

            {/* MAGIA DE REACT: Si "dia.image" existe, renderiza el bloque de la imagen. Si no, lo ignora automáticamente. */}
            {dia.image_url && (
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <img src={dia.image_url} alt={dia.title} className="w-full h-full object-cover" />
              </div>
            )}

          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-ui-light rounded-xl border border-ui-border text-xs text-ui-text font-semibold flex gap-4">
        <span>D = Desayuno</span>
        <span>A = Almuerzo</span>
        <span>C = Cena</span>
      </div>

    </div>
  );
}