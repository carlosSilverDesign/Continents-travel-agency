import { HeroSlider } from "@/components/organisms/HeroSlider";
import { SmartBanner } from "@/components/atoms/SmartBanner";
import { DestinationCard } from "@/components/molecules/DestinationCard";
import { ValueProposition } from "@/components/organisms/ValueProposition";
import { Newsletter } from "@/components/organisms/Newsletter";
import { supabase } from "@/lib/supabase"; // Nuestro conector
import { getTranslations } from "next-intl/server";

// Convertimos la función en "async" para poder esperar (await) los datos de la base de datos
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  
  // 1. Consultamos la tabla 'tours' a Supabase
  // Ordenamos por fecha de creación para mostrar los más recientes
  const { data: tours, error } = await supabase
    .from('tours')
    .select('id, title, slug, cover_image_url, duration_days, price, badge_text')
    .order('created_at', { ascending: false });

  // Si hay error en la consulta, lo mostramos en consola
  if (error) {
    console.error("Error cargando los tours:", error);
  }

  return (
    <main className="flex flex-col min-h-screen">
      
      {/* SECCIÓN 1: Anuncios y Slider estáticos */}
      <section className="w-full bg-ui-bg pt-6 pb-8 px-4 flex flex-col gap-6">
        <SmartBanner 
          variant="leaderboard" link="/ofertas" alt="Cyber Days"
          desktopImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=980&h=90&auto=format&fit=crop"
          mobileImage="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=320&h=50&auto=format&fit=crop"
        />
        <HeroSlider />
      </section>

      {/* SECCIÓN 2: Cards Dinámicas desde Supabase */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {t('mostSearched')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 2. Si hay tours, los mapeamos (recorremos) para crear una Card por cada uno */}
          {tours && tours.map((tour) => (
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

          {/* Si no hay tours registrados, mostramos un mensaje amistoso */}
          {(!tours || tours.length === 0) && (
            <p className="text-ui-text col-span-full">{t('emptyTour')}</p>
          )}
        </div>
      </section>

      {/* SECCIÓN 3: Propuesta de Valor */}
      <ValueProposition />

      {/* SECCIÓN 4: Captura de Leads (Newsletter) */}
      <Newsletter />

    </main>
  );
}