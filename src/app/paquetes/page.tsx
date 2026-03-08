import { supabase } from "@/lib/supabase";
import { DestinationCard } from "@/components/molecules/DestinationCard";

// Esto le dice a Next.js que construya la página leyendo la base de datos
export default async function PaquetesPage() {
  
  // Consultamos TODOS los tours a Supabase
  const { data: tours, error } = await supabase
    .from('tours')
    .select('id, title, slug, cover_image_url, duration_days, price, badge_text')
    .order('id', { ascending: true }); // Los ordenamos por ID

  if (error) {
    console.error("Error cargando paquetes:", error);
  }

  return (
    <main className="min-h-screen bg-ui-bg pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* CABECERA DE LA PÁGINA */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Nuestros Paquetes Turísticos
          </h1>
          <p className="text-ui-text text-lg max-w-2xl">
            Explora nuestra selección de experiencias únicas. Desde aventuras arqueológicas hasta escapadas de lujo, tenemos el viaje perfecto para ti.
          </p>
        </div>

        {/* GRILLA DE RESULTADOS */}
        {tours && tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {tours.map((tour) => (
              <DestinationCard 
                key={tour.id} // El DNI único que aprendimos a poner
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
          <div className="text-center py-20 bg-white rounded-2xl border border-ui-border">
            <p className="text-ui-text text-lg">Pronto subiremos nuevos paquetes increíbles.</p>
          </div>
        )}

      </div>
    </main>
  );
}