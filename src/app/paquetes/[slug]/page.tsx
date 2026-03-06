import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { TourTabs } from "@/components/organisms/TourTabs";

// 1. Definimos que esta página recibirá un parámetro dinámico (el slug)
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TourDetail({ params }: Props) {
  // 2. En Next.js 15+, los parámetros se deben "esperar" (await)
  const { slug } = await params;

  // 3. Consultamos a Supabase el tour que coincida con ese slug
  // Usamos un JOIN de SQL para traer también los días del itinerario
  const { data: tour, error } = await supabase
    .from('tours')
    .select(`
      *,
      itineraries (
        day_number,
        title,
        description
      )
    `)
    .eq('slug', slug)
    .single(); // Le decimos que solo queremos 1 resultado

  // 4. Si el tour no existe en la base de datos o hay error, mostramos la pantalla 404
  if (error || !tour) {
    notFound();
  }

  // Ordenamos el itinerario por día para que no salgan desordenados
  const itinerarioOrdenado = tour.itineraries?.sort((a: any, b: any) => a.day_number - b.day_number);

  return (
    <main className="min-h-screen bg-ui-bg pb-20">

      {/* CABECERA DEL TOUR (Hero) */}
      <section className="relative w-full h-[40vh] md:h-[60vh]">
        <img
          src={tour.cover_image_url || "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1920"}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{tour.title}</h1>
            <p className="text-xl text-white/90">{tour.duration_days} Días / {tour.duration_nights} Noches</p>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL Y SIDEBAR */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">

        {/* Columna Izquierda: La información (Aquí pondremos las pestañas) */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-ui-border">

          <TourTabs
            programDetail={tour.program_detail}
            inclusions={tour.inclusions}
            usefulInfo={tour.useful_info}
            hotels={tour.hotels}
          />

        </div>
        {/* Columna Derecha: Tarjeta de Precio (Sidebar fijo) */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-ui-border sticky top-24">
            <p className="text-sm text-ui-text uppercase tracking-wide font-semibold mb-2">Precio por persona</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-primary">US$ {tour.price}</span>
            </div>
            <p className="text-xs text-ui-text mb-6">{tour.price_disclaimer}</p>

            <Button variant="accent" size="lg" className="w-full">
              Reservar Ahora
            </Button>
          </div>
        </div>

      </section>
    </main>
  );
}