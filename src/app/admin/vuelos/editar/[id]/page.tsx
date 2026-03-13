"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { StatusModal } from '@/components/molecules/StatusModal';

// Lo ponemos fuera del componente o al inicio
const INCLUSIONES_DISPONIBLES = [
  { key: 'personal', text: "Accesorio personal" },
  { key: 'carryon', text: "Equipaje de mano (10-12kg)" },
  { key: 'checked', text: "Maleta facturada (23kg)" },
  { key: 'change', text: "Cambios permitidos" },
  { key: 'refund', text: "Reembolso" },
  { key: 'seat', text: "Selección de asiento" },
];

export default function EditarVueloAdmin() {
  const router = useRouter();
  const params = useParams();
  const flightId = params.id as string;

  const [locale, setLocale] = useState('es');
  const [cargando, setCargando] = useState(false);
  const [cargandoDatos, setCargandoDatos] = useState(true);

  const [modalConfig, setModalConfig] = useState<{isOpen: boolean, type: 'success' | 'error', message: string}>({
    isOpen: false, type: 'success', message: ''
  });

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
      setSelectedInclusions(selectedInclusions.filter(item => item !== text));
    } else {
      setSelectedInclusions([...selectedInclusions, text]);
    }
  };

  // ==============================================================================
  // 🔌 EFECTO MAESTRO: CARGAR DATOS DEL VUELO EXISTENTE
  // ==============================================================================
  useEffect(() => {
    async function cargarVuelo() {
      try {
        const { data, error } = await supabase
          .from('flights')
          .select('*')
          .eq('id', flightId)
          .single();

        if (error) throw error;
        if (data) {
          // 1. Restaurar Locale
          setLocale(data.locale || 'es');
          
          // 2. Restaurar datos base
          setFlight({
            origin: data.origin,
            destination: data.destination,
            flight_type: data.flight_type,
            airline: data.airline,
            date_range: data.date_range,
            category: data.category,
            slug: data.slug,
            price_usd: data.price_usd.toString(),
            price_pen: data.price_pen.toString(),
            image_url: data.image_url
          });

          // 3. Restaurar Inclusiones y Auto-Migrar Textos Viejos a Llaves
          if (data.inclusions && Array.isArray(data.inclusions)) {
             const migratedKeys = data.inclusions.map((inclusionValue: string) => {
               if (inclusionValue === 'Accesorio personal') return 'personal';
               if (inclusionValue === 'Equipaje de mano (10-12kg)') return 'carryon';
               if (inclusionValue === 'Maleta facturada (23kg)') return 'checked';
               if (inclusionValue === 'Cambios permitidos') return 'change';
               if (inclusionValue === 'Reembolso') return 'refund';
               if (inclusionValue === 'Selección de asiento') return 'seat';
               return inclusionValue; // Si ya es una llave
             });
             setSelectedInclusions(migratedKeys);
          }
        }
      } catch (error) {
        console.error("Error cargando vuelo:", error);
        alert("Error cargando el vuelo. Regresando...");
        router.push('/admin');
      } finally {
        setCargandoDatos(false);
      }
    }

    if (flightId) {
      cargarVuelo();
    }
  }, [flightId, router]);

  // ==============================================================================
  // 🚀 FUNCIÓN MAESTRA: PROCESAR Y ENVIAR A SUPABASE
  // ==============================================================================
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setCargando(true);

    try {
      // 1. Armamos el objeto final (¡Ya no hay que limpiar ni hacer split!)
      const flightData = {
        locale: locale,
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
        .update(flightData)
        .eq('id', flightId);

      setModalConfig({
        isOpen: true,
        type: 'success',
        message: 'Los datos del vuelo han sido actualizados con éxito.'
      });
      
    } catch (error) {
      console.error("Error guardando el vuelo:", error);
      setModalConfig({
        isOpen: true,
        type: 'error',
        message: 'Error al actualizar el vuelo. Por favor revisa la consola.'
      });
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

  if (cargandoDatos) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center animate-pulse">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-ui-text font-medium text-lg">Descargando bitácora de vuelo...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-8 animate-fade-in relative z-0">
      
      <StatusModal 
        isOpen={modalConfig.isOpen}
        type={modalConfig.type}
        message={modalConfig.message}
        onClose={() => {
          setModalConfig({...modalConfig, isOpen: false});
          if (modalConfig.type === 'success') {
            router.push('/admin');
          }
        }}
      />

      <Link href="/admin" className="text-ui-text hover:text-secondary font-bold text-sm mb-6 inline-block">← Volver al Dashboard</Link>
      <h1 className="text-3xl font-bold text-ui-heading mb-8">Editar Ticket de Vuelo 🛠️</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* =========================================================
            SECCIÓN 0: IDIOMA DE PUBLICACIÓN
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={0}>Idioma de Publicación</SectionTitle>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-ui-text">¿En qué idioma están escritos los datos de este vuelo?</p>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${locale === 'es' ? 'border-secondary' : 'border-ui-border group-hover:border-secondary/50'}`}>
                  {locale === 'es' && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                </div>
                <input type="radio" name="flightLocale" value="es" checked={locale === 'es'} onChange={() => setLocale('es')} className="hidden" />
                <span className={`font-bold ${locale === 'es' ? 'text-secondary' : 'text-ui-text'}`}>Español (ES)</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${locale === 'en' ? 'border-secondary' : 'border-ui-border group-hover:border-secondary/50'}`}>
                  {locale === 'en' && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                </div>
                <input type="radio" name="flightLocale" value="en" checked={locale === 'en'} onChange={() => setLocale('en')} className="hidden" />
                <span className={`font-bold ${locale === 'en' ? 'text-secondary' : 'text-ui-text'}`}>English (EN)</span>
              </label>
            </div>
          </div>
        </section>

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
                // Ahora comparamos y guardamos la KEY interna, NO el texto.
                const isSelected = selectedInclusions.includes(inc.key);
                
                return (
                  <button
                    key={inc.key}
                    type="button" 
                    onClick={() => toggleInclusion(inc.key)}
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
                Actualizando Ticket...
              </span>
            ) : 'Guardar Cambios 🛠️'}
          </button>
        </div>

      </form>
    </div>
  );
}