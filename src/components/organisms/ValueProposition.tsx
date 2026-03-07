import React from 'react';

// Datos estáticos de los beneficios (Podemos cambiarlos a inglés después junto con el resto del sitio)
const benefits = [
  { 
    icon: "🌟", 
    title: "Expertos Locales", 
    description: "Guías nativos apasionados por mostrarte los secretos mejor guardados de cada destino." 
  },
  { 
    icon: "🛡️", 
    title: "Viaje Seguro", 
    description: "Asistencia 24/7 y protocolos de seguridad para que solo te preocupes por disfrutar." 
  },
  { 
    icon: "💎", 
    title: "Experiencias Premium", 
    description: "Seleccionamos los mejores hoteles y servicios para garantizar tu máxima comodidad." 
  }
];

export function ValueProposition() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-ui-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">¿Por qué viajar con Continents?</h2>
          <p className="text-ui-text text-lg max-w-2xl mx-auto">
            Convertimos tus vacaciones de ensueño en una realidad sin complicaciones, con el respaldo de verdaderos expertos en turismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-ui-bg/30 border border-ui-border/50 hover:border-secondary/30 transition-colors hover:shadow-sm"
            >
              <div className="text-5xl mb-6 bg-white w-20 h-20 flex items-center justify-center rounded-full shadow-sm">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-ui-heading mb-3">{benefit.title}</h3>
              <p className="text-ui-text leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}