import React from 'react';

// Definimos la estructura exacta que le pasamos desde la base de datos
interface DetailItem {
  key: string;
  value: string;
}

interface ProgramDetailProps {
  details: DetailItem[];
}

export function ProgramDetailTable({ details }: ProgramDetailProps) {
  
  // Si por alguna razón el tour aún no tiene detalles llenos, mostramos un mensaje bonito
  if (!details || details.length === 0) {
    return <p className="text-ui-text">Los detalles de este programa estarán disponibles muy pronto.</p>;
  }

  return (
    // Tu contenedor principal original intacto
    <div className="flex flex-col border border-ui-border rounded-xl overflow-hidden animate-fade-in shadow-sm">
      {details.map((item, index) => (
        <div 
          key={index} 
          // Tu magia responsive y de zebra striping original intacta
          className={`flex flex-col md:flex-row p-4 lg:p-5 transition-colors hover:bg-ui-bg/50 ${
            index !== details.length - 1 ? 'border-b border-ui-border' : ''
          } ${index % 2 === 0 ? 'bg-ui-surface' : 'bg-ui-bg/30'}`}
        >
          {/* Columna Izquierda: La Llave (Key) */}
          <div className="md:w-1/3 font-bold text-primary mb-1 md:mb-0 uppercase tracking-wide text-sm flex items-center">
            {item.key}
          </div>
          
          {/* Columna Derecha: El Valor */}
          <div className="md:w-2/3 text-ui-text leading-relaxed">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}