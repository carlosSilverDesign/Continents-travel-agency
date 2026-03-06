"use client"; // Necesita interactividad para cambiar de pestaña

import React, { useState } from 'react';
import { ProgramDetailTable } from "./ProgramDetailTable";
import { ItinerarySection } from "./ItinerarySection";

// Qué datos recibe este componente
interface TourTabsProps {
  programDetail: string;
  inclusions: string;
  usefulInfo: string;
  hotels: string;
}

export function TourTabs({ programDetail, inclusions, usefulInfo, hotels }: TourTabsProps) {
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
            <ProgramDetailTable />
          </div>
        )}

        {activeTab === 'itinerary' && <ItinerarySection />}
        
        {activeTab === 'inclusions' && (
          <div className="animate-fade-in text-ui-text whitespace-pre-line leading-relaxed">
            {inclusions}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="animate-fade-in text-ui-text whitespace-pre-line leading-relaxed">
            {usefulInfo}
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="animate-fade-in text-ui-text whitespace-pre-line leading-relaxed">
            {hotels || 'Información de hoteles no disponible para este tour.'}
          </div>
        )}

        {activeTab === 'book' && (
          <div className="animate-fade-in bg-ui-bg p-6 rounded-xl border border-ui-border">
            <h3 className="text-xl font-bold text-primary mb-4">YOU HAVE SELECTED: PERU AND MACHUPICCHU</h3>
            <p className="text-ui-text mb-4">Formulario de reserva en construcción...</p>
            {/* Aquí integraremos los inputs de fechas, habitaciones y tipo de acomodación */}
          </div>
        )}
      </div>
    </div>
  );
}