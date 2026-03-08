import { supabase } from "@/lib/supabase";
import { DestinationCard } from "@/components/molecules/DestinationCard";

export default async function OfertasPage() {
  
  // Consultamos a Supabase pidiendo SOLO los que tienen un badge_text (Ofertas)
  const { data: tours, error } = await supabase
    .from('tours')
    .select('id, title, slug, cover_image_url, duration_days, price, badge_text')
    .not('badge_text', 'is', null) // Filtro: "Que la etiqueta NO sea nula"
    .order('id', { ascending: true });

  if (error) {
    console.error("Error cargando ofertas:", error);
  }

  // Filtro de seguridad extra de JavaScript: por si alguien guardó un espacio vacío ("") por error en Supabase
  const ofertasReales = tours?.filter(tour => tour.badge_text && tour.badge_text.trim() !== '') || [];

  return (
    <main className="min-h-screen bg-ui-bg pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* CABECERA DE LA PÁGINA */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4 flex items-center gap-3">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            Ofertas Exclusivas
          </h1>
          <p className="text-ui-text text-lg max-w-2xl">
            Aprovecha nuestros descuentos por tiempo limitado. Las mejores experiencias al mejor precio, manteniendo siempre nuestra calidad premium.
          </p>
        </div>

        {/* GRILLA DE RESULTADOS */}
        {ofertasReales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {ofertasReales.map((tour) => (
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
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-2xl font-bold text-ui-heading mb-2">Se nos acabaron las ofertas</h3>
            <p className="text-ui-text text-lg">
              Nuestros cupos con descuento volaron. Regresa pronto para descubrir nuevas promociones o visita nuestros paquetes regulares.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}