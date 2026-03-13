"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiGlobe, FiPackage, FiNavigation } from "react-icons/fi";
import { StatusModal } from "@/components/molecules/StatusModal";
import { ConfirmModal } from "@/components/molecules/ConfirmModal";

type Tour = {
  id: string;
  title: string;
  locale: string;
  price: number;
  category: string;
  created_at: string;
};

type Flight = {
  id: string;
  route: string; // Origin - Destination
  locale: string;
  price_usd: number;
  created_at: string;
};

export default function AdminDashboard() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"tours" | "flights">("tours");
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState<"all" | "es" | "en">("all");

  const [statusConfig, setStatusConfig] = useState<{isOpen: boolean, type: 'success' | 'error', message: string}>({
    isOpen: false, type: 'success', message: ''
  });
  
  const [deleteConfig, setDeleteConfig] = useState<{
    isOpen: boolean;
    id: string | null;
    type: "tours" | "flights";
    title: string;
    isDeleting: boolean;
  }>({
    isOpen: false,
    id: null,
    type: "tours",
    title: "",
    isDeleting: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Tours
      const { data: toursData, error: toursError } = await supabase
        .from("tours")
        .select("id, title, locale, price, category, created_at")
        .order("created_at", { ascending: false });

      if (toursError) throw toursError;

      // Fetch Flights
      const { data: flightsData, error: flightsError } = await supabase
        .from("flights")
        .select("id, origin, destination, locale, price_usd, created_at")
        .order("created_at", { ascending: false });

      if (flightsError) throw flightsError;

      // Map flights to match the expected state shape (combining origin/dest to 'route')
      const mappedFlights = (flightsData || []).map((f) => ({
        id: f.id,
        route: `${f.origin} - ${f.destination}`,
        locale: f.locale,
        price_usd: f.price_usd,
        created_at: f.created_at,
      }));

      setTours(toursData || []);
      setFlights(mappedFlights);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching data:", error);
      alert("Error cargando los datos del dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const ejecutarEliminacion = async () => {
    if (!deleteConfig.id) return;
    setDeleteConfig((prev) => ({ ...prev, isDeleting: true }));

    try {
      const { error } = await supabase.from(deleteConfig.type).delete().eq("id", deleteConfig.id);
      if (error) throw error;

      // Update local state
      if (deleteConfig.type === "tours") {
        setTours((prev) => prev.filter((t) => t.id !== deleteConfig.id));
      } else {
        setFlights((prev) => prev.filter((f) => f.id !== deleteConfig.id));
      }

      setDeleteConfig((prev) => ({ ...prev, isOpen: false, isDeleting: false }));
      setStatusConfig({
        isOpen: true,
        type: "success",
        message: "El registro ha sido eliminado exitosamente de la base de datos."
      });
    } catch (error) {
      console.error("Error deleting record:", error);
      setDeleteConfig((prev) => ({ ...prev, isOpen: false, isDeleting: false }));
      setStatusConfig({
        isOpen: true,
        type: "error",
        message: "Error al intentar eliminar el registro. Verifica la consola."
      });
    }
  };

  const handleDeleteClick = (id: string, type: "tours" | "flights", recordTitle: string) => {
    setDeleteConfig({
      isOpen: true,
      id,
      type,
      title: recordTitle,
      isDeleting: false
    });
  };

  // --- Filtering Logic ---
  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = languageFilter === "all" || tour.locale === languageFilter;
    return matchesSearch && matchesLang;
  });

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch = flight.route?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = languageFilter === "all" || flight.locale === languageFilter;
    return matchesSearch && matchesLang;
  });

  return (
    <div className="animate-fade-in max-w-7xl mx-auto py-8 px-4 md:px-8 relative z-0">
      
      {/* --- INYECCIÓN DE MODALES --- */}
      <StatusModal 
        isOpen={statusConfig.isOpen}
        type={statusConfig.type}
        message={statusConfig.message}
        onClose={() => setStatusConfig({ ...statusConfig, isOpen: false })}
      />

      <ConfirmModal
        isOpen={deleteConfig.isOpen}
        isDeleting={deleteConfig.isDeleting}
        title="¿Eliminar este registro?"
        message={`Estás a punto de borrar "${deleteConfig.title}". Esta acción es irreversible y no se puede deshacer.`}
        onCancel={() => setDeleteConfig({ ...deleteConfig, isOpen: false })}
        onConfirm={ejecutarEliminacion}
      />

      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ui-heading">Panel de Control</h1>
          <p className="text-ui-text mt-1">Gestiona tu contenido, paquetes turísticos y vuelos.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/tours/nuevo"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            <FiPlus /> Nuevo Tour
          </Link>
          <Link
            href="/admin/vuelos/nuevo"
            className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            <FiPlus /> Nuevo Vuelo
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border shadow-sm flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-4 rounded-full text-2xl">
            <FiPackage />
          </div>
          <div>
            <p className="text-sm text-ui-text font-medium">Total Tours</p>
            <p className="text-2xl font-bold text-ui-heading">{loading ? "-" : tours.length}</p>
          </div>
        </div>
        <div className="bg-ui-surface p-6 rounded-2xl border border-ui-border shadow-sm flex items-center gap-4">
          <div className="bg-secondary/10 text-secondary p-4 rounded-full text-2xl">
            <FiNavigation />
          </div>
          <div>
            <p className="text-sm text-ui-text font-medium">Total Vuelos</p>
            <p className="text-2xl font-bold text-ui-heading">{loading ? "-" : flights.length}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area: Tabs + Filters + Table */}
      <div className="bg-ui-surface border border-ui-border rounded-2xl shadow-sm overflow-hidden">
        
        {/* Top Controls: Tabs & Search */}
        <div className="p-4 md:p-6 border-b border-ui-border flex flex-col md:flex-row justify-between gap-4 items-center">
          
          {/* Tabs */}
          <div className="flex bg-ui-bg p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab("tours")}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === "tours" ? "bg-white text-primary shadow-sm" : "text-ui-text hover:text-ui-heading"
              }`}
            >
              Tours
            </button>
            <button
              onClick={() => setActiveTab("flights")}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === "flights" ? "bg-white text-secondary shadow-sm" : "text-ui-text hover:text-ui-heading"
              }`}
            >
              Vuelos
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-text" />
              <input
                type="text"
                placeholder={activeTab === "tours" ? "Buscar por título..." : "Buscar origen/destino..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-ui-bg border border-ui-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            
            <div className="relative">
              <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-text" />
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value as any)}
                className="w-full sm:w-auto appearance-none pl-10 pr-8 py-2 bg-ui-bg border border-ui-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
              >
                <option value="all">Todos los idiomas</option>
                <option value="es">Español (ES)</option>
                <option value="en">English (EN)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ui-bg/50 border-b border-ui-border text-sm text-ui-text font-medium">
                <th className="py-4 px-6">{activeTab === "tours" ? "Título del Tour" : "Ruta (Origen - Destino)"}</th>
                <th className="py-4 px-6 text-center">Idioma</th>
                <th className="py-4 px-6">{activeTab === "tours" ? "Precio (PEN)" : "Precio (USD)"}</th>
                <th className="py-4 px-6 hidden sm:table-cell">{activeTab === "tours" ? "Categoría" : "Fecha Creación"}</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-ui-text">
                    Cargando datos...
                  </td>
                </tr>
              ) : activeTab === "tours" && filteredTours.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-ui-text">
                    No se encontraron tours.
                  </td>
                </tr>
              ) : activeTab === "flights" && filteredFlights.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-ui-text">
                    No se encontraron vuelos.
                  </td>
                </tr>
              ) : activeTab === "tours" ? (
                 // Render Tours Rows
                filteredTours.map((tour) => (
                  <tr key={tour.id} className="border-b border-ui-border hover:bg-ui-bg/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-ui-heading">{tour.title}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                        tour.locale === 'es' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {tour.locale.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-ui-text">S/ {tour.price}</td>
                    <td className="py-4 px-6 text-ui-text hidden sm:table-cell capitalize">{tour.category}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/tours/editar/${tour.id}`}
                          className="p-2 text-ui-text hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(tour.id, "tours", tour.title)}
                          className="p-2 text-ui-text hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // Render Flights Rows
                filteredFlights.map((flight) => (
                  <tr key={flight.id} className="border-b border-ui-border hover:bg-ui-bg/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-ui-heading">{flight.route}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                        flight.locale === 'es' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {flight.locale.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-ui-text">$ {flight.price_usd}</td>
                    <td className="py-4 px-6 text-ui-text hidden sm:table-cell">
                      {new Date(flight.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/vuelos/editar/${flight.id}`}
                          className="p-2 text-ui-text hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(flight.id, "flights", flight.route)}
                          className="p-2 text-ui-text hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}