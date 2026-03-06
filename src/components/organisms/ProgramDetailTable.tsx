import React from 'react';

// Datos extraídos de tu documento de estructura
const details = [
  { key: "Precio", value: "De US$ 799.00. Incluye todos los cargos por transacción con tarjeta de crédito e impuestos." },
  { key: "Condiciones", value: "Mínimo 02 Pasajeros. Habitación Base Doble." },
  { key: "Punto de Partida", value: "LIMA" },
  { key: "Punto de Llegada", value: "LIMA" },
  { key: "Duración", value: "06 Días / 05 Noches" },
  { key: "Estilo de Viaje", value: "Arqueológico, Cultural y Ecológico" },
  { key: "Lugares a Visitar", value: "Lima y Cusco" },
  { key: "Pasajes Aéreos", value: "Lima / Cusco / Lima" },
  { key: "Highlights", value: "City Tour y 04 ruinas, Valle Sagrado de los Incas, Machupicchu y City tour: Lima Colonial." }
];

export function ProgramDetailTable() {
  return (
    // Contenedor principal con bordes redondeados
    <div className="flex flex-col border border-ui-border rounded-xl overflow-hidden animate-fade-in shadow-sm">
      {details.map((item, index) => (
        <div 
          key={index} 
          // La magia responsive: En móvil es flex-col (uno arriba de otro), en PC (md) es flex-row (lado a lado)
          // Además alternamos el color de fondo para que sea fácil de leer (Zebra striping)
          className={`flex flex-col md:flex-row p-4 lg:p-5 transition-colors hover:bg-ui-bg/50 ${
            index !== details.length - 1 ? 'border-b border-ui-border' : ''
          } ${index % 2 === 0 ? 'bg-white' : 'bg-ui-bg/30'}`}
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