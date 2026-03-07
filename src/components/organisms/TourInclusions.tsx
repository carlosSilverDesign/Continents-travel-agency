import React from 'react';

export function TourInclusions({ data }: { data: any }) {
  if (!data) return <p className="text-ui-text">Información no disponible.</p>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      
      {/* COLUMNA IZQUIERDA: LO QUE INCLUYE */}
      <div className="bg-green-50/50 p-6 md:p-8 rounded-2xl border border-green-100 shadow-sm">
        <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
          <span className="text-green-600 bg-green-100 p-1 rounded-full">✓</span> 
          Lo que incluye
        </h3>
        
        <div className="flex flex-col gap-6">
          {data.included.map((section: { category: string; items: string[] }, index: number) => (
            <div key={index}>
              <h4 className="font-bold text-ui-heading mb-3 border-b border-green-200/50 pb-1">
                {section.category}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.items.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-ui-text text-sm">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMNA DERECHA: LO QUE NO INCLUYE */}
      <div className="bg-red-50/50 p-6 md:p-8 rounded-2xl border border-red-100 shadow-sm h-fit">
        <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
          <span className="text-red-500 bg-red-100 px-2 py-0.5 rounded-full font-bold">✕</span> 
          No incluido
        </h3>
        
        <ul className="flex flex-col gap-3">
          {data.notIncluded.map((item: string, index: number) => (
            <li key={index} className="flex items-start gap-2 text-ui-text text-sm">
              <span className="text-red-400 mt-0.5 shrink-0">✕</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}