"use client"; // Necesario porque tendremos botones interactivos (mostrar/ocultar)

import React, { useState } from 'react';

// Datos de prueba extraídos exactamente de tu documento
const mockDays = [
  {
    dayNumber: 1,
    title: "LLEGADA LIMA.",
    description: "Asistencia, traslado a hotel, tiempo libre. Noche en hotel.",
    image: "https://images.unsplash.com/photo-1577587230708-187fbfefcebf?q=80&w=800"
  },
  {
    dayNumber: 2,
    title: "LIMA - LIMA - CITY TOUR (D).",
    description: "Tour por Lima (Prehispánica, Colonial, Moderna), panorámica de “La Huaca Pucllana”, Centro Histórico (palacios, iglesias, plazas), distritos de San Isidro y Miraflores. Incluye entrada a Museo BCR y Complejo Monumental San Francisco y Catacumbas. Noche en hotel.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800"
  }
];

export function ItinerarySection() {
  // 1. Estado para mostrar/ocultar el mapa general
  const [showMap, setShowMap] = useState(true);

  // 2. Estado para saber qué imágenes de cada día están visibles
  // Usamos un objeto para guardar el estado individual (ej: { 1: true, 2: false })
  const [visibleDayImages, setVisibleDayImages] = useState<Record<number, boolean>>({});

  const toggleDayImage = (dayNumber: number) => {
    setVisibleDayImages(prev => ({
      ...prev,
      [dayNumber]: !prev[dayNumber]
    }));
  };

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      
      {/* SECCIÓN DEL MAPA */}
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
        
        {/* Usamos CSS para expandir o colapsar el mapa suavemente */}
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
        {mockDays.map((dia) => (
          <div key={dia.dayNumber} className="border-l-2 border-primary pl-6 py-2 relative">
            
            {/* El circulito en la línea de tiempo */}
            <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-white border-2 border-primary"></div>
            
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="font-bold text-ui-heading text-lg">Día {dia.dayNumber}: {dia.title}</h4>
                <p className="text-ui-text mt-2 leading-relaxed">{dia.description}</p>
              </div>
              
              {/* Botón para mostrar/ocultar la foto de este día específico */}
              <button 
                onClick={() => toggleDayImage(dia.dayNumber)}
                className="shrink-0 text-xs font-bold text-ui-text hover:text-secondary border border-ui-border px-3 py-2 rounded-lg transition-colors"
              >
                {visibleDayImages[dia.dayNumber] ? 'Ocultar Foto' : 'Ver Foto'}
              </button>
            </div>

            {/* Imagen condicional del día */}
            {visibleDayImages[dia.dayNumber] && (
              <div className="mt-4 h-48 rounded-xl overflow-hidden animate-fade-in">
                <img src={dia.image} alt={dia.title} className="w-full h-full object-cover" />
              </div>
            )}
            
          </div>
        ))}
      </div>

      {/* LEYENDA DE COMIDAS */}
      <div className="mt-6 p-4 bg-ui-light rounded-xl border border-ui-border text-xs text-ui-text font-semibold flex gap-4">
        <span>D = Desayuno</span>
        <span>A = Almuerzo</span>
        <span>C = Cena</span>
      </div>

    </div>
  );
}