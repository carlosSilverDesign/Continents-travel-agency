"use client"; // Necesita interactividad para cambiar de pestaña

import React, { useState } from 'react';
import { ProgramDetailTable } from "./ProgramDetailTable";
import { ItinerarySection } from "./ItinerarySection";
import { TourInclusions } from "./TourInclusions";
import { UsefulInfo } from "./UsefulInfo";
import { PriceAndHotels } from "./PriceAndHotels";
import { BookNowForm } from "./BookNowForm";

// 1. Agregamos tourName a las propiedades que recibe este componente
interface TourTabsProps {
  programDetail: any[];
  inclusions: any;
  usefulInfo: any;
  hotels: any;
  itineraries: any[];
  mapImage?: string;
  tourName: string; // <-- ¡NUEVO!
}

// 2. Extraemos tourName de las propiedades
export function TourTabs({ programDetail, inclusions, usefulInfo, hotels, itineraries, mapImage, tourName }: TourTabsProps) {
  // Estado para saber qué pestaña está activa (por defecto la primera)
  const [activeTab, setActiveTab] = useState('detail');

  // Los botones de las pestañas
  const tabs = [
    { id: 'detail', label: 'Resumen' },
    { id: 'itinerary', label: 'Itinerario' },
    { id: 'inclusions', label: 'Inclusiones' },
    { id: 'info', label: 'Info útil' },
    { id: 'hotels', label: 'Tarifas y Hoteles' },
    { id: 'book', label: 'Reserva Ahora' },
  ];

  return (
    <div className="w-full">
      {/* Cabecera de Pestañas (Scrollable en móvil) */}
      <div className="flex overflow-x-auto border-b border-ui-border hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap py-4 px-6 font-bold text-sm transition-colors cursor-pointer border-b-2 ${
              activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-ui-text hover:text-primary hover:bg-ui-bg'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

     {/* Contenido Dinámico según la pestaña activa */}
      <div className="py-8 min-h-[300px]">
        {activeTab === 'detail' && (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-ui-heading mb-6">Resumen del Programa</h3>
            <ProgramDetailTable details={programDetail} />
          </div>
        )}

        {activeTab === 'itinerary' && <ItinerarySection itineraries={itineraries} mapImage={mapImage} />}
        
        {activeTab === 'inclusions' && <TourInclusions data={inclusions} />}

        {activeTab === 'info' && <UsefulInfo data={usefulInfo} />}

        {activeTab === 'hotels' && <PriceAndHotels data={hotels} />}

        {/* 3. ¡LA CONEXIÓN FINAL! Le pasamos el nombre al formulario */}
        {activeTab === 'book' && <BookNowForm tourName={tourName} />}
      </div>
    </div>
  );
}