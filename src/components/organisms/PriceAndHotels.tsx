import React from 'react';

export function PriceAndHotels({ data }: { data: any }) {
  if (!data) return <p className="text-ui-text">Información de precios no disponible.</p>;
  const categories = data.categories || [];
  const locations = data.locations || [];
  const notes = data.notes || [];
  return (
    <div className="animate-fade-in flex flex-col gap-8">

      {/* VERSIÓN MÓVIL: Tarjetas (Se oculta en PC) */}
      <div className="md:hidden flex flex-col gap-4">
        {categories.map((item: { category: string; hotels: string[]; priceDouble: string; priceSingle: string }, index: number) => (
          <div key={index} className="bg-white border border-ui-border rounded-xl p-4 shadow-sm">
            <h4 className="font-bold text-lg text-primary mb-3 border-b border-ui-border pb-2 uppercase tracking-wider">
              Categoría {item.category}
            </h4>

            <div className="flex flex-col gap-2 text-sm text-ui-text mb-4">
              {/* Recorremos las locaciones dinámicamente */}
              {locations.map((loc: string, idx: number) => (
                <p key={idx}>
                  <span className="font-bold text-ui-heading">{loc}:</span> {item.hotels?.[idx] || "N/A"}
                </p>
              ))}
            </div>

            <div className="bg-ui-bg p-3 rounded-lg flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-ui-text font-semibold">Doble/Triple (pp)</span>
                <span className="font-bold text-primary">{item.priceDouble}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-ui-text font-semibold">Simple</span>
                <span className="font-bold text-secondary">{item.priceSingle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VERSIÓN PC: Tabla Elegante (Se oculta en móvil) */}
      <div className="hidden md:block overflow-hidden border border-ui-border rounded-xl shadow-sm bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-ui-bg border-b border-ui-border">
            <tr>
              <th className="p-4 font-bold text-primary uppercase tracking-wider text-xs">Categoría</th>
              {/* Títulos dinámicos de ciudades */}
              {locations.map((loc: string, idx: number) => (
                <th key={idx} className="p-4 font-bold text-primary uppercase tracking-wider text-xs">Hotel en {loc}</th>
              ))}
              <th className="p-4 font-bold text-primary uppercase tracking-wider text-xs text-right">Doble/Triple</th>
              <th className="p-4 font-bold text-primary uppercase tracking-wider text-xs text-right">Simple</th>
            </tr>

          </thead>
          <tbody className="divide-y divide-ui-border">
            {categories.map((item: { category: string; hotels: string[]; priceDouble: string; priceSingle: string }, index: number) => (
              <tr key={index} className="hover:bg-ui-bg/50 transition-colors">
                <td className="p-4 font-bold text-ui-heading">{item.category}</td>
                {/* Generamos un <td> dinámico por cada hotel que venga en la lista del JSON */}
                {(item.hotels || []).map((hotel: string, idx: number) => (
                  <td key={idx} className="p-4 text-ui-text">{hotel}</td>
                ))}
                <td className="p-4 font-bold text-primary text-right">{item.priceDouble}</td>
                <td className="p-4 font-bold text-secondary text-right">{item.priceSingle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NOTAS ADICIONALES (Trenes y Upgrades) */}
      <div className="bg-ui-light p-5 rounded-xl border border-ui-border mt-2">
        <h4 className="font-bold text-ui-heading mb-3">Notas Adicionales</h4>
        <div className="flex flex-col gap-2 text-sm text-ui-text">
          <ul className="list-disc pl-5 space-y-1">
            {notes.map((nota: string, idx: number) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: nota }}></li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}