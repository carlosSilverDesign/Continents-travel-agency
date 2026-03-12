"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

// 1. Le agregamos "mapImage" a las propiedades que recibe
export function ItinerarySection({ itineraries, mapImage }: { itineraries: any[], mapImage?: string }) {
  const t = useTranslations('ItinerarySection');
  const [showMap, setShowMap] = useState(true);
  if (!itineraries || itineraries.length === 0) return <p className="text-ui-text">{t('noInfo')}</p>;

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      {/* SECCIÓN DEL MAPA */}
      <div className="bg-ui-bg p-4 rounded-2xl border border-ui-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-primary text-lg">{t('mapTitle')}</h3>
          <button
            onClick={() => setShowMap(!showMap)}
            className="text-sm font-semibold text-secondary hover:text-primary transition-colors px-3 py-1 bg-white rounded-md shadow-sm"
          >
            {showMap ? t('hideMap') : t('showMap')}
          </button>
        </div>

        <div className={`transition-all duration-300 overflow-hidden rounded-xl ${showMap ? 'h-64 opacity-100' : 'h-0 opacity-0'}`}>
          {/* 2. MAGIA: Si hay mapImage lo dibuja, si no, usa una imagen genérica por defecto */}
          <img
            src={mapImage || "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"}
            alt={t('mapTitle')}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* SECCIÓN DE LOS DÍAS (El resto de tu código queda igual) */}
      <div className="flex flex-col gap-6">
        {itineraries.map((dia) => (
          <div key={dia.day_number} className="border-l-2 border-primary pl-6 py-2 relative">
            <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-white border-2 border-primary"></div>
            <div>
              <h4 className="font-bold text-ui-heading text-lg">{t('day', { num: dia.day_number })}: {dia.title}</h4>
              <p className="text-ui-text mt-2 leading-relaxed">{dia.description}</p>
            </div>
            {dia.image_url && (
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <img src={dia.image_url} alt={dia.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-ui-light rounded-xl border border-ui-border text-xs text-ui-text font-semibold flex gap-4">
        <span>{t('meals.b')}</span><span>{t('meals.l')}</span><span>{t('meals.d')}</span>
      </div>
    </div>
  );
}