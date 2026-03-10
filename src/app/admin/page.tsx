import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-ui-heading mb-2">¡Hola, Equipo Continents! 👋</h1>
      <p className="text-ui-text mb-10 text-lg">¿Qué aventura vamos a publicar hoy?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TARJETA TOURS */}
        <div className="bg-ui-surface p-8 rounded-2xl border border-ui-border shadow-sm flex flex-col">
          <div className="text-4xl mb-4">🎒</div>
          <h2 className="text-xl font-bold text-ui-heading mb-2">Paquetes Turísticos</h2>
          <p className="text-ui-text text-sm mb-6 flex-grow">
            Crea paquetes completos. El sistema gestionará automáticamente el Destino, el Itinerario por días, Hoteles y detalles del programa.
          </p>
          <Link 
            href="/admin/tours/nuevo" 
            className="bg-primary text-white text-center py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Crear Nuevo Tour
          </Link>
        </div>

        {/* TARJETA VUELOS */}
        <div className="bg-ui-surface p-8 rounded-2xl border border-ui-border shadow-sm flex flex-col">
          <div className="text-4xl mb-4">✈️</div>
          <h2 className="text-xl font-bold text-ui-heading mb-2">Tickets de Vuelo</h2>
          <p className="text-ui-text text-sm mb-6 flex-grow">
            Publica ofertas de vuelos o rutas específicas. Define si es ida y vuelta, aerolínea, precios en USD/PEN e inclusiones del boleto.
          </p>
          <Link 
            href="/admin/vuelos/nuevo" 
            className="bg-secondary text-white text-center py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Crear Nuevo Vuelo
          </Link>
        </div>
      </div>
    </div>
  );
}