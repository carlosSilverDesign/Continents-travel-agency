"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// ==============================================================================
// 🔌 IMPORTACIÓN DE SUPABASE (El puente a tu base de datos)
// ==============================================================================
import { supabase } from '@/lib/supabase';

export default function EditarTourAdmin() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Estado para el idioma de publicación
  const [locale, setLocale] = useState('es');
  // Estado para bloquear el botón mientras se suben los datos
  const [cargando, setCargando] = useState(false);
  // Estado de carga inicial
  const [cargandoDatos, setCargandoDatos] = useState(true);
  
  // Estado para guardar los destinos disponibles
  const [destinations, setDestinations] = useState<any[]>([]);

  // ==============================================================================
  // 📦 1. ESTADOS: DATOS BÁSICOS DEL TOUR (Tabla 'tours')
  // ==============================================================================
  const [basic, setBasic] = useState({
    title: '', slug: '', price: '', duration_days: '', duration_nights: '',
    cover_image_url: '', map_image_url: '', badge_text: '', category: 'nacional',
    price_disclaimer: '', destination_id: ''
  });

  // ==============================================================================
  // 📦 2. ESTADOS: PROGRAM DETAIL (Se guardará como JSONB)
  // ==============================================================================
  const [programDetails, setProgramDetails] = useState([
    { key: 'Precio', value: '' }, { key: 'Condiciones', value: '' },
    { key: 'Punto de Partida', value: '' }, { key: 'Punto de Llegada', value: '' },
    { key: 'Duración', value: '' }, { key: 'Estilo de Viaje', value: '' },
    { key: 'Highlights', value: '' }
  ]);

  // ==============================================================================
  // 📦 3. ESTADOS: ITINERARIO (Tabla 'itineraries' - Relacional)
  // ==============================================================================
  const [itinerary, setItinerary] = useState([{ day_number: 1, title: '', description: '', image_url: '' }]);

  // ==============================================================================
  // 📦 4. ESTADOS: INCLUSIONES (Se guardará como JSONB)
  // ==============================================================================
  const [included, setIncluded] = useState([{ category: '', itemsText: '' }]);
  const [notIncludedText, setNotIncludedText] = useState('');

  // ==============================================================================
  // 📦 5. ESTADOS: USEFUL INFO (Se guardará como JSONB)
  // ==============================================================================
  const [usefulInfo, setUsefulInfo] = useState([{ title: '', itemsText: '' }]);

  // ==============================================================================
  // 📦 6. ESTADOS: PRECIOS Y HOTELES (Se guardará como JSONB complejo)
  // ==============================================================================
  const [hotelsLocations, setHotelsLocations] = useState('');
  const [hotelsNotes, setHotelsNotes] = useState('');
  const [hotelsCategories, setHotelsCategories] = useState([
    { category: '', hotelsText: '', priceDouble: '', priceSingle: '' }
  ]);

  // Cargar destinos al montar el componente
  useEffect(() => {
    async function fetchDestinations() {
      const { data, error } = await supabase.from('destinations').select('id, name');
      if (data && !error) {
        setDestinations(data);
      }
    }
    fetchDestinations();
  }, []);

  // ==============================================================================
  // 🔄 CARGA INICIAL: TRAER DATOS DEL TOUR EXISTENTE
  // ==============================================================================
  useEffect(() => {
    if (!id) return;

    async function fetchTour() {
      try {
        const { data, error } = await supabase
          .from('tours')
          .select('*, itineraries(*)')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) {
          setLocale(data.locale || 'es');
          setBasic({
            title: data.title || '',
            slug: data.slug || '',
            price: data.price ? data.price.toString() : '',
            duration_days: data.duration_days ? data.duration_days.toString() : '',
            duration_nights: data.duration_nights ? data.duration_nights.toString() : '',
            cover_image_url: data.cover_image_url || '',
            map_image_url: data.map_image_url || '',
            badge_text: data.badge_text || '',
            category: data.category || 'nacional',
            price_disclaimer: data.price_disclaimer || '',
            destination_id: data.destination_id || ''
          });

          // Restaurar Program Details
          if (data.program_detail && Array.isArray(data.program_detail)) {
            const newProgramDetails = [...programDetails];
            data.program_detail.forEach((storedItem: any) => {
              const existingIdx = newProgramDetails.findIndex(p => p.key === storedItem.key);
              if (existingIdx !== -1) {
                newProgramDetails[existingIdx].value = storedItem.value || '';
              } else {
                 newProgramDetails.push(storedItem);
              }
            });
            setProgramDetails(newProgramDetails);
          }

          // Restaurar Itinerarios
          if (data.itineraries && data.itineraries.length > 0) {
            const sortedItineraries = data.itineraries.sort((a: any, b: any) => a.day_number - b.day_number);
            setItinerary(sortedItineraries.map((it: any) => ({
              day_number: it.day_number,
              title: it.title,
              description: it.description,
              image_url: it.image_url || ''
            })));
          }

          // Restaurar Inclusiones
          if (data.inclusions) {
            const inc = data.inclusions;
            if (inc.included && Array.isArray(inc.included) && inc.included.length > 0) {
               setIncluded(inc.included.map((i: any) => ({ category: i.category || '', itemsText: (i.items || []).join('\n') })));
            }
            if (inc.notIncluded && Array.isArray(inc.notIncluded)) {
               setNotIncludedText(inc.notIncluded.join('\n'));
            }
          }

          // Restaurar Useful Info
          if (data.useful_info && Array.isArray(data.useful_info) && data.useful_info.length > 0) {
            setUsefulInfo(data.useful_info.map((u: any) => ({ title: u.title || '', itemsText: (u.items || []).join('\n') })));
          }

          // Restaurar Hoteles
          if (data.hotels) {
             setHotelsLocations((data.hotels.locations || []).join(', '));
             setHotelsNotes((data.hotels.notes || []).join('\n'));
             if (data.hotels.categories && Array.isArray(data.hotels.categories) && data.hotels.categories.length > 0) {
               setHotelsCategories(data.hotels.categories.map((c: any) => ({
                 category: c.category || '',
                 hotelsText: (c.hotels || []).join('\n'),
                 priceDouble: c.priceDouble || '',
                 priceSingle: c.priceSingle || ''
               })));
             }
          }
        }
      } catch (err) {
        console.error("Error fetching tour:", err);
        alert("No se pudo cargar la información del tour.");
      } finally {
        setCargandoDatos(false);
      }
    }

    fetchTour();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ==============================================================================
  // 🔄 EFECTO: TRADUCCIÓN AUTOMÁTICA DE LAS LLAVES DEL PROGRAM DETAIL
  // ==============================================================================
  useEffect(() => {
    if (cargandoDatos) return; // Evitar traducir antes de que se cargue la base de datos
    
    const translateKeys = (details: {key: string, value: string}[], targetLocale: string) => {
      const mapToEn: Record<string, string> = {
        'Precio': 'Price',
        'Condiciones': 'Conditions',
        'Punto de Partida': 'Departure Point',
        'Punto de Llegada': 'Arrival Point',
        'Duración': 'Duration',
        'Estilo de Viaje': 'Travel Style',
        'Highlights': 'Highlights'
      };
      
      const mapToEs: Record<string, string> = {
        'Price': 'Precio',
        'Conditions': 'Condiciones',
        'Departure Point': 'Punto de Partida',
        'Arrival Point': 'Punto de Llegada',
        'Duration': 'Duración',
        'Travel Style': 'Estilo de Viaje',
        'Highlights': 'Highlights' 
      };

      const currentMap = targetLocale === 'en' ? mapToEn : mapToEs;

      return details.map(item => ({
        ...item,
        key: currentMap[item.key] || item.key
      }));
    };

    setProgramDetails(prev => translateKeys(prev, locale));
  }, [locale, cargandoDatos]);


  // ==============================================================================
  // 🚀 FUNCIÓN MAESTRA: COMPILAR JSONS Y ACTUALIZAR SUPABASE
  // ==============================================================================
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);

    try {
      // --- FASE A: EMPAQUETADO DE DATOS (Transformar textos a JSONs) ---
      const inclusionsJson = {
        included: included.filter(inc => inc.category.trim() !== '').map(inc => ({
          category: inc.category,
          items: inc.itemsText.split('\n').filter(i => i.trim() !== '')
        })),
        notIncluded: notIncludedText.split('\n').filter(i => i.trim() !== '')
      };

      const usefulInfoJson = usefulInfo.filter(info => info.title.trim() !== '').map(info => ({
        title: info.title,
        items: info.itemsText.split('\n').filter(i => i.trim() !== '')
      }));

      const hotelsJson = {
        locations: hotelsLocations.split(',').map(l => l.trim()).filter(l => l !== ''),
        notes: hotelsNotes.split('\n').filter(i => i.trim() !== ''),
        categories: hotelsCategories.filter(cat => cat.category.trim() !== '').map(cat => ({
          category: cat.category,
          hotels: cat.hotelsText.split('\n').filter(h => h.trim() !== ''),
          priceDouble: cat.priceDouble,
          priceSingle: cat.priceSingle
        }))
      };

      const tourData = {
        locale: locale,
        destination_id: basic.destination_id,
        title: basic.title,
        slug: basic.slug || basic.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        price: Number(basic.price),
        duration_days: Number(basic.duration_days),
        duration_nights: Number(basic.duration_nights),
        cover_image_url: basic.cover_image_url,
        map_image_url: basic.map_image_url || null,
        badge_text: basic.badge_text || null,
        category: basic.category,
        price_disclaimer: basic.price_disclaimer,
        program_detail: programDetails.filter(p => p.value.trim() !== ''),
        inclusions: inclusionsJson,
        useful_info: usefulInfoJson,
        hotels: hotelsJson
      };

      // --- FASE B: INYECCIÓN EN BASE DE DATOS (UPDATE) ---

      // Paso 1: Actualizamos el Tour
      const { error: tourError } = await supabase
        .from('tours')
        .update(tourData)
        .eq('id', id);

      if (tourError) throw tourError;

      // Paso 2: Eliminamos itinerarios antiguos
      const { error: deleteError } = await supabase
        .from('itineraries')
        .delete()
        .eq('tour_id', id);

      if (deleteError) throw deleteError;

      // Paso 3: Guardamos los nuevos itinerarios
      const itineraryConId = itinerary.map(day => ({
        ...day,
        tour_id: id
      }));

      const { error: itinError } = await supabase
        .from('itineraries')
        .insert(itineraryConId);

      if (itinError) throw itinError;

      // --- FASE C: ÉXITO ---
      alert("¡TOUR ACTUALIZADO CON ÉXITO! 🔄");
      
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Hubo un error al guardar. Revisa la consola para más detalles.");
    } finally {
      setCargando(false);
    }
  };

  // ==============================================================================
  // 🎨 COMPONENTES UI AUXILIARES (Para mantener el código HTML limpio)
  // ==============================================================================
  const SectionTitle = ({ children, step }: { children: React.ReactNode, step: number }) => (
    <div className="flex justify-between items-center border-b border-ui-border pb-3 mb-6">
      <h2 className="text-xl font-bold text-primary flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">{step}</span>
        {children}
      </h2>
    </div>
  );

  if (cargandoDatos) {
     return (
       <div className="max-w-5xl mx-auto py-20 px-4 md:px-8 animate-fade-in flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-ui-border border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-ui-text font-bold">Cargando datos del tour...</p>
       </div>
     )
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-8 animate-fade-in">
      <Link href="/admin" className="text-secondary hover:text-primary font-bold text-sm mb-6 inline-block">← Volver al Dashboard</Link>
      <h1 className="text-3xl font-bold text-ui-heading mb-8">Editar Paquete 🛠️</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* =========================================================
            SECCIÓN 0: IDIOMA DE PUBLICACIÓN
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={0}>Idioma de Publicación</SectionTitle>
          <div className="flex flex-col gap-3">
            <p className="text-sm text-ui-text">¿En qué idioma está escrito el contenido de este paquete?</p>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${locale === 'es' ? 'border-primary' : 'border-ui-border group-hover:border-primary/50'}`}>
                  {locale === 'es' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <input type="radio" name="tourLocale" value="es" checked={locale === 'es'} onChange={() => setLocale('es')} className="hidden" />
                <span className={`font-bold ${locale === 'es' ? 'text-primary' : 'text-ui-text'}`}>Español (ES)</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${locale === 'en' ? 'border-primary' : 'border-ui-border group-hover:border-primary/50'}`}>
                  {locale === 'en' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
                <input type="radio" name="tourLocale" value="en" checked={locale === 'en'} onChange={() => setLocale('en')} className="hidden" />
                <span className={`font-bold ${locale === 'en' ? 'text-primary' : 'text-ui-text'}`}>English (EN)</span>
              </label>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 1: DATOS BÁSICOS
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={1}>Información General</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-ui-text mb-1">Título del Tour</label>
              <input type="text" required value={basic.title} onChange={e => setBasic({...basic, title: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                placeholder="Ej. Aventura en California: L.A. y San Francisco" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">ID del Destino (UUID)</label>
              <select required value={basic.destination_id} onChange={e => setBasic({...basic, destination_id: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary">
                <option value="">Selecciona un destino</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>{dest.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Slug (URL amigable)</label>
              <input type="text" value={basic.slug} onChange={e => setBasic({...basic, slug: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                placeholder="Ej. aventura-california" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Categoría Web</label>
              <select value={basic.category} onChange={e => setBasic({...basic, category: e.target.value})} className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary">
                <option value="nacional">Nacional</option><option value="internacional">Internacional</option>
                <option value="europa">Europa</option><option value="usa">USA</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Precio Desde (USD)</label>
              <input type="number" required value={basic.price} onChange={e => setBasic({...basic, price: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                placeholder="Ej. 1850" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Total de Días</label>
              <input type="number" required value={basic.duration_days} onChange={e => setBasic({...basic, duration_days: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                placeholder="Ej. 7" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Total de Noches</label>
              <input type="number" required value={basic.duration_nights} onChange={e => setBasic({...basic, duration_nights: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                placeholder="Ej. 6" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Etiqueta (Badge)</label>
              <input type="text" value={basic.badge_text} onChange={e => setBasic({...basic, badge_text: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                placeholder="Ej. PREMIUM, TOP, -15% DCTO" />
            </div>
            
            {/* Contenedores de Imágenes explícitos */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-ui-text mb-1">Foto Portada (URL de la imagen)</label>
                <input type="url" required value={basic.cover_image_url} onChange={e => setBasic({...basic, cover_image_url: e.target.value})} 
                  className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                  placeholder="Ej. https://images.unsplash.com/photo-15015949..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-ui-text mb-1">Foto Mapa de Ruta (URL de la imagen)</label>
                <input type="url" value={basic.map_image_url} onChange={e => setBasic({...basic, map_image_url: e.target.value})} 
                  className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                  placeholder="Ej. https://images.unsplash.com/photo-14490344..." />
              </div>
            </div>
            
            <div className="md:col-span-3">
              <label className="block text-sm font-bold text-ui-text mb-1">Nota Legal del Precio (Disclaimer)</label>
              <input type="text" value={basic.price_disclaimer} onChange={e => setBasic({...basic, price_disclaimer: e.target.value})} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                placeholder="Ej. Precio por persona en habitación doble. Sujeto a variación de impuestos locales." />
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 2: PROGRAM DETAIL
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={2}>Resumen del Programa (Program Detail)</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programDetails.map((detail, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <label className="text-xs font-bold text-primary uppercase">{detail.key}</label>
                <input type="text" value={detail.value} 
                  onChange={e => { const newD = [...programDetails]; newD[idx].value = e.target.value; setProgramDetails(newD); }} 
                  className="w-full bg-ui-bg border border-ui-border rounded-lg p-2 text-sm outline-none focus:border-primary" 
                  // Placeholder dinámico según la llave para guiar al redactor
                  placeholder={
                    detail.key === 'Precio' || detail.key === 'Price' ? "Ej. Desde US$ 1,850.00. Incluye impuestos." :
                    detail.key === 'Punto de Partida' || detail.key === 'Departure Point' ? "Ej. Aeropuerto de Los Ángeles (LAX)" :
                    detail.key === 'Highlights' ? "Ej. Paseo de la Fama, Alcatraz, Golden Gate." :
                    `Ej. Detalle para ${detail.key}`
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 3: ITINERARIO
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <div className="flex justify-between items-center border-b border-ui-border pb-3 mb-6">
            <h2 className="text-xl font-bold text-primary flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">3</span> Itinerario por Días
            </h2>
            <button type="button" onClick={() => setItinerary([...itinerary, { day_number: itinerary.length + 1, title: '', description: '', image_url: '' }])} 
              className="text-xs bg-ui-bg text-ui-heading font-bold px-4 py-2 rounded-lg border border-ui-border hover:bg-primary hover:text-white transition-colors">
              + Agregar Día
            </button>
          </div>
          <div className="space-y-4">
            {itinerary.map((day, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 p-4 bg-ui-bg rounded-xl border border-ui-border">
                <div className="w-12 h-12 shrink-0 rounded-full bg-ui-surface border-2 border-primary flex items-center justify-center font-bold text-primary mx-auto md:mx-0">
                  {day.day_number}
                </div>
                <div className="flex-1 space-y-3">
                  <input type="text" required value={day.title} 
                    onChange={e => { const newIti = [...itinerary]; newIti[index].title = e.target.value; setItinerary(newIti); }} 
                    className="w-full bg-transparent border-b border-ui-border p-1 text-ui-heading font-bold outline-none focus:border-primary" 
                    placeholder="Ej. Bienvenidos a Hollywood" />
                  
                  <textarea required rows={3} value={day.description} 
                    onChange={e => { const newIti = [...itinerary]; newIti[index].description = e.target.value; setItinerary(newIti); }} 
                    className="w-full bg-white dark:bg-zinc-900 border border-ui-border rounded p-2 text-sm text-ui-text outline-none resize-none" 
                    placeholder="Ej. Llegada al aeropuerto (LAX). Recojo de su auto de alquiler y traslado al hotel. Tarde libre para pasear por el Paseo de la Fama..." />
                  
                  <input type="url" value={day.image_url} 
                    onChange={e => { const newIti = [...itinerary]; newIti[index].image_url = e.target.value; setItinerary(newIti); }} 
                    className="w-full bg-white dark:bg-zinc-900 border border-ui-border rounded p-2 text-xs outline-none" 
                    placeholder="URL de foto ilustrativa del día (Ej. https://images.unsplash.com/photo-1574888...) - Opcional" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 4: INCLUSIONES
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={4}>Inclusiones (Included / Not Included)</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* LO QUE INCLUYE (Por Categorías) */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-green-600">✓ Lo que incluye</h3>
                <button type="button" onClick={() => setIncluded([...included, { category: '', itemsText: '' }])} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">+ Categoría</button>
              </div>
              {included.map((inc, idx) => (
                <div key={idx} className="bg-ui-bg p-3 rounded-lg border border-ui-border">
                  <input type="text" value={inc.category} 
                    onChange={e => { const newInc = [...included]; newInc[idx].category = e.target.value; setIncluded(newInc); }} 
                    className="w-full bg-transparent font-bold text-sm mb-2 outline-none border-b border-ui-border pb-1" 
                    placeholder="Ej. Transporte y Logística" />
                  
                  <textarea value={inc.itemsText} 
                    onChange={e => { const newInc = [...included]; newInc[idx].itemsText = e.target.value; setIncluded(newInc); }} 
                    rows={4} className="w-full bg-white dark:bg-zinc-900 border border-ui-border rounded p-2 text-xs outline-none resize-none" 
                    placeholder="Escribe un beneficio por línea. Ej:&#10;Alquiler de auto SUV por 7 días.&#10;Seguro vehicular básico.&#10;Recojo en el aeropuerto." />
                </div>
              ))}
            </div>

            {/* LO QUE NO INCLUYE (Lista general) */}
            <div>
              <h3 className="font-bold text-red-500 mb-4">✕ No incluido</h3>
              <textarea value={notIncludedText} onChange={e => setNotIncludedText(e.target.value)} rows={7} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 text-sm outline-none focus:border-red-400" 
                placeholder="Escribe un gasto no cubierto por línea. Ej:&#10;Vuelos internacionales.&#10;Resort Fees (pago directo en hotel).&#10;Gasolina y peajes.&#10;Almuerzos y cenas libres." />
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 5: INFORMACIÓN ÚTIL (Useful Info)
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <div className="flex justify-between items-center border-b border-ui-border pb-3 mb-6">
            <h2 className="text-xl font-bold text-primary flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">5</span> Información Útil
            </h2>
            <button type="button" onClick={() => setUsefulInfo([...usefulInfo, { title: '', itemsText: '' }])} 
              className="text-xs bg-ui-bg text-ui-heading font-bold px-4 py-2 rounded-lg border border-ui-border hover:bg-primary hover:text-white transition-colors">
              + Agregar Tema
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usefulInfo.map((info, idx) => (
              <div key={idx} className="p-4 bg-ui-bg rounded-xl border border-ui-border">
                <input type="text" value={info.title} 
                  onChange={e => { const newI = [...usefulInfo]; newI[idx].title = e.target.value; setUsefulInfo(newI); }} 
                  className="w-full bg-transparent border-b border-ui-border p-1 text-ui-heading font-bold outline-none focus:border-primary mb-3" 
                  placeholder="Ej. Documentación Exigida" />
                
                <textarea rows={3} value={info.itemsText} 
                  onChange={e => { const newI = [...usefulInfo]; newI[idx].itemsText = e.target.value; setUsefulInfo(newI); }} 
                  className="w-full bg-white dark:bg-zinc-900 border border-ui-border rounded p-2 text-sm outline-none resize-none" 
                  placeholder="Escribe un dato por línea. Ej:&#10;Pasaporte vigente (mínimo 6 meses).&#10;Visa Americana B1/B2 aprobada." />
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 6: PRECIOS Y HOTELES
            ========================================================= */}
        <section className="bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm">
          <SectionTitle step={6}>Hoteles y Tarifas</SectionTitle>
          <div className="space-y-6">
            
            {/* Columnas de la tabla (Ciudades) */}
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Ciudades Base (Genera las columnas de la tabla. Separar con comas)</label>
              <input type="text" value={hotelsLocations} onChange={e => setHotelsLocations(e.target.value)} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none focus:border-primary" 
                placeholder="Ej. Los Ángeles, San Francisco" />
            </div>
            
            {/* Filas de la tabla (Categorías y Precios) */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold text-ui-text">Categorías Tarifarias</label>
                <button type="button" onClick={() => setHotelsCategories([...hotelsCategories, { category: '', hotelsText: '', priceDouble: '', priceSingle: '' }])} className="text-xs bg-ui-bg text-ui-heading font-bold px-3 py-1.5 rounded border border-ui-border">+ Categoría</button>
              </div>
              
              {hotelsCategories.map((cat, idx) => (
                <div key={idx} className="bg-ui-bg p-4 rounded-xl border border-ui-border grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <input type="text" value={cat.category} 
                      onChange={e => { const newC = [...hotelsCategories]; newC[idx].category = e.target.value; setHotelsCategories(newC); }} 
                      className="w-full bg-white dark:bg-zinc-900 border border-ui-border rounded p-2 font-bold outline-none" 
                      placeholder="Nombre Cat. Ej. Turista (3 Estrellas)" />
                    
                    <textarea value={cat.hotelsText} 
                      onChange={e => { const newC = [...hotelsCategories]; newC[idx].hotelsText = e.target.value; setHotelsCategories(newC); }} 
                      rows={2} className="w-full bg-white dark:bg-zinc-900 border border-ui-border rounded p-2 text-xs outline-none" 
                      placeholder="Escribe los hoteles en el mismo orden de las ciudades (uno por línea). Ej:&#10;Holiday Inn Express Hollywood&#10;Hotel Zephyr Fisherman's Wharf" />
                  </div>
                  
                  {/* Precios (Simple y Doble) */}
                  <div>
                    <label className="text-xs text-ui-text font-bold mb-1 block">Precio Hab. Doble</label>
                    <input type="text" value={cat.priceDouble} onChange={e => { const newC = [...hotelsCategories]; newC[idx].priceDouble = e.target.value; setHotelsCategories(newC); }} 
                      className="w-full bg-white dark:bg-zinc-900 border border-ui-border rounded p-2 text-primary font-bold" 
                      placeholder="Ej. US$ 1,850" />
                  </div>
                  <div>
                    <label className="text-xs text-ui-text font-bold mb-1 block">Precio Hab. Simple</label>
                    <input type="text" value={cat.priceSingle} onChange={e => { const newC = [...hotelsCategories]; newC[idx].priceSingle = e.target.value; setHotelsCategories(newC); }} 
                      className="w-full bg-white dark:bg-zinc-900 border border-ui-border rounded p-2 text-secondary font-bold" 
                      placeholder="Ej. US$ 2,400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Notas al pie de la tabla */}
            <div>
              <label className="block text-sm font-bold text-ui-text mb-1">Notas Adicionales de Tarifas (Opcional)</label>
              <textarea value={hotelsNotes} onChange={e => setHotelsNotes(e.target.value)} rows={3} 
                className="w-full bg-ui-bg border border-ui-border rounded-lg p-3 outline-none" 
                placeholder="Una nota por línea. Ej:&#10;Las tarifas en USA no incluyen Resort Fee (pago en destino).&#10;Desayuno no está incluido en categoría Primera." />
            </div>
          </div>
        </section>

        {/* =========================================================
            BOTÓN FINAL (Flotante y Destacado)
            ========================================================= */}
        <div className="sticky bottom-4 bg-ui-surface p-4 border border-ui-border rounded-xl shadow-2xl flex justify-between items-center z-10">
          <p className="text-sm text-ui-text hidden md:block px-4">El sistema actualizará el tour y los itinerarios automáticamente.</p>
          <button type="submit" disabled={cargando} className="w-full md:w-auto px-10 py-4 bg-accent text-white font-bold rounded-xl shadow-md hover:opacity-90 disabled:opacity-50 transition-all text-lg flex justify-center items-center">
            {cargando ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Actualizando Base de Datos...
              </span>
            ) : 'Actualizar Tour 🔄'}
          </button>
        </div>

      </form>
    </div>
  );
}
