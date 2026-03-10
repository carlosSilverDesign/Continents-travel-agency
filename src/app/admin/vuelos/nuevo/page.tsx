"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Lo ponemos fuera del componente o al inicio
const INCLUSIONES_DISPONIBLES = [
  { key: 'personal', text: "Accesorio personal" },
  { key: 'carryon', text: "Equipaje de mano (10-12kg)" },
  { key: 'checked', text: "Maleta facturada (23kg)" },
  { key: 'change', text: "Cambios permitidos" },
  { key: 'refund', text: "Reembolso" },
  { key: 'seat', text: "Selección de asiento" },
];

export default function NuevoVueloAdmin() {
  const [cargando, setCargando] = useState(false);

  // ==============================================================================
  // 📦 1. ESTADO: DATOS DEL VUELO (Mapeado exacto a tu tabla 'flights')
  // ==============================================================================
  const [flight, setFlight] = useState({
    origin: '', 
    destination: '', 
    flight_type: 'Ida y Vuelta', // Valor por defecto
    airline: '', 
    date_range: '', 
    category: 'nacional', // Valor por defecto
    slug: '',
    price_usd: '', 
    price_pen: '', 
    image_url: ''
  });

  // ==============================================================================
  // 📦 2. ESTADO: INCLUSIONES (Para el JSONB 'inclusions')
  // ==============================================================================
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([]);

  // Función para encender/apagar un Chip
  const toggleInclusion = (text: string) => {
    if (selectedInclusions.includes(text)) {
      // Si ya está, lo quitamos
      setSelectedInclusions(selectedInclusions.filter(item => item !== text));
    } else {
      // Si no está, lo agregamos
      setSelectedInclusions([...selectedInclusions, text]);
    }
  };

  // ==============================================================================
  // 🚀 FUNCIÓN MAESTRA: PROCESAR Y ENVIAR A SUPABASE
  // ==============================================================================
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setCargando(true);

    try {
      // 1. Armamos el objeto final (¡Ya no hay que limpiar ni hacer split!)
      const flightData = {
        origin: flight.origin,
        destination: flight.destination,
        flight_type: flight.flight_type,
        airline: flight.airline,
        image_url: flight.image_url,
        price_usd: Number(flight.price_usd),
        price_pen: Number(flight.price_pen),
        date_range: flight.date_range,
        
        // 2. MAGIA: Pasamos el arreglo de los Chips directamente
        inclusions: selectedInclusions, 
        
        slug: flight.slug || `${flight.origin}-a-${flight.destination}`.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        category: flight.category
      };

      console.log("✈️ MAGIA: Datos del Vuelo listos para insertar:", flightData);

      // =================================================================
      // CÓDIGO DE CONEXIÓN A SUPABASE (Tabla 'flights')
      // =================================================================
      
      const { error } = await supabase
        .from('flights')
        .insert([flightData]);

      if (error) throw error;

      alert("¡VUELO PUBLICADO CON ÉXITO! ✈️ Revisa la consola.");
      
    } catch (error) {
      console.error("Error guardando el vuelo:", error);
      alert("Hubo un error al guardar. Revisa la consola.");
    } finally {
      setCargando(false);
    }
  };

  // Componente UI Auxiliar para los Títulos
  const SectionTitle = ({ children, step }: { children: React.ReactNode, step: number }) => (
    <div className="flex justify-between items-center border-b border-ui-border pb-3 mb-6">
      <h2 className="text-xl font-bold text-secondary flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-sm">{step}</span>
        {children}
      </h2>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-8 animate-fade-in">
      <Link href="/admin" className="text-ui-text hover:text-secondary font-bold text-sm mb-6 inline-block">← Volver al Dashboard</Link>
      <h1 className="text-3xl font-bold text-ui-heading mb-8">Crear Nuevo Ticket de Vuelo ✈️</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* =========================================================
            SECCIÓN 1: RUTA Y DETALLES BÁSICOS
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={1}>Ruta y Aerolínea</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Origen</label>
              <input type="text" required value={flight.origin} onChange={e => setFlight({...flight, origin: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-secondary transition-colors" 
                placeholder="Ej. Lima (LIM)" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Destino</label>
              <input type="text" required value={flight.destination} onChange={e => setFlight({...flight, destination: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-secondary transition-colors" 
                placeholder="Ej. Miami (MIA)" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Aerolínea</label>
              <input type="text" required value={flight.airline} onChange={e => setFlight({...flight, airline: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-secondary transition-colors" 
                placeholder="Ej. LATAM Airlines, Sky Airline" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Tipo de Vuelo</label>
              <select value={flight.flight_type} onChange={e => setFlight({...flight, flight_type: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-secondary transition-colors text-ui-heading">
                <option value="Ida y Vuelta">Ida y Vuelta</option>
                <option value="Solo Ida">Solo Ida</option>
                <option value="Multidestino">Multidestino</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Fechas del Vuelo</label>
              <input type="text" required value={flight.date_range} onChange={e => setFlight({...flight, date_range: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-secondary transition-colors" 
                placeholder="Ej. 15 Nov - 22 Nov 2026" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Categoría Web</label>
              <select value={flight.category} onChange={e => setFlight({...flight, category: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-secondary transition-colors text-ui-heading">
                <option value="nacional">Nacional</option>
                <option value="internacional">Internacional</option>
                <option value="ofertas">Ofertas Relámpago</option>
              </select>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 2: PRECIOS Y MULTIMEDIA
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={2}>Tarifas y Multimedia</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Precio en Dólares (USD)</label>
              <input type="number" required value={flight.price_usd} onChange={e => setFlight({...flight, price_usd: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 text-secondary font-bold outline-none focus:border-secondary transition-colors" 
                placeholder="Ej. 250" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Precio en Soles (PEN)</label>
              <input type="number" required value={flight.price_pen} onChange={e => setFlight({...flight, price_pen: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 text-secondary font-bold outline-none focus:border-secondary transition-colors" 
                placeholder="Ej. 950" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-ui-text mb-1">Slug (Opcional - Se autogenera si lo dejas vacío)</label>
              <input type="text" value={flight.slug} onChange={e => setFlight({...flight, slug: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-secondary transition-colors" 
                placeholder="Ej. vuelo-lima-miami-latam" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-ui-text mb-1">Imagen del Destino (URL)</label>
              <input type="url" required value={flight.image_url} onChange={e => setFlight({...flight, image_url: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-secondary transition-colors" 
                placeholder="Ej. https://images.unsplash.com/photo-1514222..." />
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 3: INCLUSIONES (Chips Múltiples)
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={3}>¿Qué incluye tu tarifa?</SectionTitle>
          <div>
            <label className="block text-sm font-bold text-ui-text mb-4">Selecciona los beneficios incluidos en este boleto:</label>
            
            <div className="flex flex-wrap gap-3">
              {INCLUSIONES_DISPONIBLES.map((inc) => {
                // Verificamos si este beneficio está en nuestro arreglo de seleccionados
                const isSelected = selectedInclusions.includes(inc.text);
                
                return (
                  <button
                    key={inc.key}
                    type="button" // IMPORTANTE para que no envíe el form al hacer clic
                    onClick={() => toggleInclusion(inc.text)}
                    className={`
                      px-4 py-2 rounded-full border text-sm font-bold transition-all duration-200
                      ${isSelected 
                        ? 'bg-secondary text-white border-secondary shadow-md scale-105' 
                        : 'bg-ui-bg text-ui-text border-ui-border hover:border-secondary/50'
                      }
                    `}
                  >
                    {isSelected && <span className="mr-2">✓</span>}
                    {inc.text}
                  </button>
                );
              })}
            </div>
            
            <p className="text-xs text-ui-text mt-4">
              * Los beneficios seleccionados activarán sus respectivos íconos en la tarjeta del vuelo.
            </p>
          </div>
        </section>

        {/* =========================================================
            BOTÓN FINAL DE GUARDADO
            ========================================================= */}
        <div className="sticky bottom-4 bg-ui-surface p-4 border border-ui-border rounded-xl shadow-2xl flex justify-between items-center z-10">
          <p className="text-sm text-ui-text hidden md:block px-4">El JSON de inclusiones se armará en automático.</p>
          <button type="submit" disabled={cargando} className="w-full md:w-auto px-10 py-4 bg-secondary text-white font-bold rounded-xl shadow-md hover:opacity-90 disabled:opacity-50 transition-all text-lg flex justify-center items-center">
            {cargando ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Inyectando Vuelo...
              </span>
            ) : 'Publicar Vuelo ✈️'}
          </button>
        </div>

      </form>
    </div>
  );
}