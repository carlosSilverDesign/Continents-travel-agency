export const revalidate = 0; // Obliga a Next.js a consultar Supabase en vivo (mata la caché)

import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { TourTabs } from "@/components/organisms/TourTabs";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TourDetail({ params }: Props) {
  const { slug } = await params;

  // Consultamos tu base de datos respetando tu tabla relacional de itineraries
  const { data: tour, error } = await supabase
    .from('tours')
    .select(`
      *,
      itineraries (
        day_number,
        title,
        description,
        image_url
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !tour) {
    notFound();
  }

  // Ordenamos el itinerario
  const itinerarioOrdenado = tour.itineraries?.sort((a: any, b: any) => a.day_number - b.day_number);

  // Botón de WhatsApp
  const numeroVentas = "51999999999"; 
  const mensaje = `¡Hola Continents Travel! Quiero reservar el paquete "${tour.title}" por US$ ${tour.price}. ¿Me dan más información?`;
  const linkWhatsApp = `https://wa.me/${numeroVentas}?text=${encodeURIComponent(mensaje)}`;

  return (
    <main className="min-h-screen bg-ui-bg pb-20">

      {/* CABECERA DEL TOUR */}
      <section className="relative w-full h-[40vh] md:h-[60vh]">
        <img
          src={tour.cover_image_url || "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1920"}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-10">
            {tour.category && (
              <span className="bg-primary px-3 py-1 rounded-full text-xs text-white font-bold uppercase tracking-wider mb-4 inline-block shadow-md">
                {tour.category}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{tour.title}</h1>
            <p className="text-xl text-white/90">
              {tour.duration_days} Días {tour.duration_nights ? `/ ${tour.duration_nights} Noches` : ''}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL Y SIDEBAR */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">

        {/* Columna Izquierda: Tus amadas TourTabs Intactas */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-ui-border">
          <TourTabs
            programDetail={tour.program_detail}
            inclusions={tour.inclusions}
            usefulInfo={tour.useful_info}
            hotels={tour.hotels}
            itineraries={itinerarioOrdenado}
            mapImage={tour.map_image_url}
          />
        </div>

        {/* Columna Derecha: Sidebar de Reserva */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-ui-border sticky top-24">
            <p className="text-sm text-ui-text uppercase tracking-wide font-semibold mb-2">Precio por persona</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-primary">US$ {tour.price}</span>
            </div>
            <p className="text-xs text-ui-text mb-6">
              {tour.price_disclaimer || "Precio base en ocupación doble."}
            </p>

            <a
              href={linkWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-base font-bold rounded-lg hover:bg-[#20bd5a] hover:shadow-lg transition-all active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              Reservar ahora
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}