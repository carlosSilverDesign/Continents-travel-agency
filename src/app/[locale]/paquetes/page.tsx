"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { DestinationCard } from "@/components/molecules/DestinationCard";
import { supabase } from "@/lib/supabase";

const tabs = [
  { id: 'nacional', label: 'Nacional' },
  { id: 'internacional', label: 'Internacional' },
  { id: 'europa', label: 'Europa' },
  { id: 'usa', label: 'USA' }
];

export default function PaquetesPage() {
  const locale = useLocale();
  const t = useTranslations('ToursPage');
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [tours, setTours] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarPaquetes() {
      // Pedimos la columna "category" para poder filtrarlos y respetar el idioma
      const { data, error } = await supabase
        .from('tours')
        .select('id, title, slug, cover_image_url, duration_days, price, badge_text, category')
        .eq('locale', locale)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error cargando paquetes:", error);
      } else if (data) {
        setTours(data);
      }
      setCargando(false);
    }
    cargarPaquetes();
  }, []);

  // Filtramos en vivo según la pestaña activa
  const toursAMostrar = tours.filter(tour => tour.category === activeTab);

  return (
    <main className="min-h-screen bg-ui-bg pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* CABECERA DE LA PÁGINA */}
        <div className="mb-10 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t('title')}
          </h1>
          <p className="text-ui-text text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* TABS DINÁMICOS */}
        <div className="flex justify-start md:justify-center mb-10 overflow-x-auto hide-scrollbar pb-2 animate-fade-in">
          <div className="bg-ui-surface p-1 rounded-xl border border-ui-border shadow-sm inline-flex shrink-0">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-ui-text hover:text-primary'
                }`}
              >
                {/* @ts-ignore */}
                {t(`tabs.${tab.id}`)}
              </button>
            ))}
          </div>
        </div>

        {/* GRILLA DE RESULTADOS */}
        {cargando ? (
          <div className="text-center py-20 text-ui-text font-medium animate-pulse">
            {t('loading')}
          </div>
        ) : toursAMostrar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {toursAMostrar.map((tour) => (
              <DestinationCard 
                key={tour.id}
                title={tour.title}
                slug={tour.slug}
                image={tour.cover_image_url || "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800"}
                days={tour.duration_days}
                price={tour.price}
                badgeText={tour.badge_text}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-ui-border shadow-sm">
            <div className="text-5xl mb-4">🧳</div>
            <h3 className="text-xl font-bold text-ui-heading mb-2">{t('emptyTitle')}</h3>
            <p className="text-ui-text">
              {t('emptyDesc')}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}