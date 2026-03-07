"use client";
import React, { useState } from 'react';

export function UsefulInfo({ data }: { data: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Función para poner en negrita el texto antes de los dos puntos
  const formatText = (text: string) => {
    if (!text.includes(':')) return text; // Si no hay dos puntos, devolvemos el texto normal
    
    // Cortamos el texto por el primer ':'
    const parts = text.split(':');
    const boldPart = parts[0];
    const rest = parts.slice(1).join(':'); // Juntamos el resto por si había más de un ':' en la frase
    
    return (
      <>
        <strong className="font-bold text-ui-heading">{boldPart}:</strong>
        {rest}
      </>
    );
  };

  if (!data || data.length === 0) return <p className="text-ui-text">Información no disponible.</p>;

  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      <h3 className="text-2xl font-bold text-primary mb-2">Información Útil para tu Viaje</h3>
      
      {data.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-ui-border rounded-xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-ui-bg transition-colors"
            >
              <span className="font-bold text-ui-heading">{section.title}</span>
              <span className={`text-xl text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>↓</span>
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="p-5 pt-0 text-ui-text text-sm border-t border-ui-border/50 mt-2">
                
                {/* Lógica para saber si el JSON mandó una lista o un texto */}
                {section.type === 'list' ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {section.items.map((item: string, idx: number) => <li key={idx}>{formatText(item)}</li>)}
                  </ul>
                ) : (
                  <div className="space-y-4">
                    {section.items.map((item: string, idx: number) => <p key={idx}>{formatText(item)}</p>)}
                  </div>
                )}

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}