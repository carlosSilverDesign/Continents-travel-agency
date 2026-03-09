"use client"; // Necesita interactividad para cambiar de pestaña

import React, { useState } from 'react';
import { ProgramDetailTable } from "./ProgramDetailTable";
import { ItinerarySection } from "./ItinerarySection";
import { TourInclusions } from "./TourInclusions";
import { UsefulInfo } from "./UsefulInfo";
import { PriceAndHotels } from "./PriceAndHotels";
import { BookNowForm } from "./BookNowForm";

// Qué datos recibe este componente
interface TourTabsProps {
  programDetail: any[];
  inclusions: any;
  usefulInfo: any;
  hotels: any;
  itineraries: any[];
  mapImage?: string;
}

export function TourTabs({ programDetail, inclusions, usefulInfo, hotels, itineraries, mapImage }: TourTabsProps) {
  // Estado para saber qué pestaña está activa (por defecto la primera)
  const [activeTab, setActiveTab] = useState('detail');

  // Los botones de las pestañas
  const tabs = [
    { id: 'detail', label: 'Program Detail' },
    { id: 'itinerary', label: 'Itinerary' }, // Agregamos Itinerario aquí
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'info', label: 'Useful Info' },
    { id: 'hotels', label: 'Price & Hotels' },
    { id: 'book', label: 'Book Now' }, // Nueva pestaña para el formulario
  ];

  return (
    <div className="w-full">
      {/* Cabecera de Pestañas (Scrollable en móvil) */}
      <div className="flex overflow-x-auto border-b border-ui-border hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap py-4 px-6 font-bold text-sm transition-colors border-b-2 ${
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
            {/* Le pasamos la prop "details" que espera tu tabla restaurada */}
            <ProgramDetailTable details={programDetail} />
          </div>
        )}

        {activeTab === 'itinerary' && <ItinerarySection itineraries={itineraries} mapImage={mapImage} />}
        
        {activeTab === 'inclusions' && <TourInclusions data={inclusions} />}

        {activeTab === 'info' && <UsefulInfo data={usefulInfo} />}

        {activeTab === 'hotels' && <PriceAndHotels data={hotels} />}

        {activeTab === 'book' && <BookNowForm />}
      </div>
    </div>
  );
}