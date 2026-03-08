"use client";
import React, { useState, useEffect } from 'react';
import { FlightCard, FlightIcons } from '@/components/molecules/FlightCard';
import { supabase } from '@/lib/supabase';

// Leyenda para explicar los íconos (Esta sí se queda estática porque es regla de negocio)
const leyendas = [
  { key: 'personal', text: "Accesorio personal" },
  { key: 'carryon', text: "Equipaje de mano (10-12kg)" },
  { key: 'checked', text: "Maleta facturada (23kg)" },
  { key: 'change', text: "Cambios permitidos" },
  { key: 'refund', text: "Reembolso" },
  { key: 'seat', text: "Selección de asiento" },
];

export default function VuelosPage() {
  const [activeTab, setActiveTab] = useState<'nacionales' | 'internacionales'>('nacionales');
  const [vuelos, setVuelos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // EFECTO: Consultar a Supabase apenas cargue la página
  useEffect(() => {
    async function cargarVuelos() {
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error("Error cargando vuelos:", error);
      } else if (data) {
        setVuelos(data);
      }
      setCargando(false);
    }
    cargarVuelos();
  }, []);

  // Filtramos la data real de Supabase según la pestaña seleccionada
  const vuelosAMostrar = vuelos.filter(vuelo => vuelo.category === activeTab);

  return (
    <main className="min-h-screen bg-ui-bg pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Ofertas de Vuelos</h1>
          <p className="text-ui-text text-lg max-w-2xl mx-auto">
            Tarifas promocionales con cupos limitados. Encuentra tu destino y reserva al instante a través de WhatsApp.
          </p>
        </div>

        {/* TABS Y LEYENDA */}
        <div className="flex flex-col items-center gap-6 mb-10 animate-fade-in">

          <div className="bg-white p-1 rounded-xl border border-ui-border shadow-sm inline-flex">
            <button onClick={() => setActiveTab('nacionales')} className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'nacionales' ? 'bg-primary text-white shadow-md' : 'text-ui-text hover:text-primary'}`}>Nacionales</button>
            <button onClick={() => setActiveTab('internacionales')} className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'internacionales' ? 'bg-primary text-white shadow-md' : 'text-ui-text hover:text-primary'}`}>Internacionales</button>
          </div>

          {/* LEYENDA DE ÍCONOS (Ajustada al ancho completo y scroll corregido para Tablets) */}
          {/* Quitamos max-w-4xl para que tome el w-full y se alinee perfectamente con los Cards */}
          <div className="w-full bg-white rounded-xl border border-ui-border p-4 md:p-5 shadow-sm">
            <p className="text-[10px] uppercase font-bold text-ui-text/70 mb-3 text-center md:text-left tracking-wider">
              ¿Qué puede incluir tu tarifa?
            </p>
            {/* Forzamos justify-start en móviles y tablets para que el scroll siempre inicie en "Accesorio Personal". 
                Solo usamos xl:justify-center en pantallas gigantes donde sabemos que no habrá desborde. */}
            <div className="flex flex-nowrap justify-start xl:justify-center gap-2 md:gap-5 overflow-x-auto hide-scrollbar pb-2">
              {leyendas.map((item) => (
                <div key={item.key} className="flex items-center gap-1.5 whitespace-nowrap bg-ui-bg/50 px-3 py-2 rounded-lg border border-ui-border/50 shrink-0">
                  <span className="text-primary">{FlightIcons[item.key]}</span>
                  <span className="text-[11px] md:text-xs text-ui-text font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* GRILLA DE VUELOS DESDE SUPABASE */}
        {cargando ? (
          <div className="text-center py-20 text-ui-text font-medium animate-pulse">
            Buscando las mejores tarifas...
          </div>
        ) : vuelosAMostrar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {vuelosAMostrar.map((vuelo) => (
              <FlightCard
                key={vuelo.id}
                destination={vuelo.destination}
                origin={vuelo.origin}
                flightType={vuelo.flight_type}
                airline={vuelo.airline}
                image={vuelo.image_url}
                priceUsd={vuelo.price_usd}
                pricePen={vuelo.price_pen}
                dateRange={vuelo.date_range}
                inclusions={vuelo.inclusions}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-ui-border shadow-sm">
            <div className="text-4xl mb-3">✈️</div>
            <p className="text-ui-text text-lg font-medium">No hay ofertas disponibles en esta categoría por el momento.</p>
          </div>
        )}

      </div>
    </main>
  );
}