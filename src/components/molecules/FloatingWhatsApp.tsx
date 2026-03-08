import React from 'react';

export function FloatingWhatsApp() {
  const numeroVentas = "51999999999"; // Recuerda cambiar esto por tu número real
  const mensaje = "¡Hola Continents Travel! Quiero hablar con una persona para planificar mi viaje.";
  const linkWhatsApp = `https://wa.me/${numeroVentas}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a 
      href={linkWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex items-center justify-center p-1"
      aria-label="Contactar asesor por WhatsApp"
    >
      
      {/* SVG MAESTRO */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        
        {/* DEFINICIONES (El carril invisible para el texto) */}
        <defs>
          {/* NUEVA FÓRMULA: Un círculo completo. Va de izquierda a derecha por arriba, y regresa por abajo. (Radio 35) */}
          <path id="textPath" d="M 15,50 A 35,35 0 1,1 85,50 A 35,35 0 1,1 15,50" />
        </defs>

        {/* ========================================================== */}
        {/* BLOQUE A: TEXTO CURVADO ESTÁTICO */}
        <g className="text-ui-text fill-ui-text uppercase tracking-[0.13em] font-bold ">
          
          <text className="text-[9.5px]">
            {/* startOffset="25%" lo ancla EXACTAMENTE en la cima (mitad superior) del círculo completo */}
            <textPath href="#textPath" startOffset="72" textAnchor="middle">
              ¡Escríbenos!
            </textPath>
          </text>
        
        </g>
        {/* ========================================================== */}

        {/* ========================================================== */}
        {/* BLOQUE B: ÍCONO CENTRAL PERFECTAMENTE CENTRADO */}
        {/* Al cambiar el ícono en el futuro, solo asegúrate de pegarlo dentro de este <g> */}
        <g transform="translate(24, 24) scale(0.55)">
          <svg className="w-24 h-24 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </g>
        {/* ========================================================== */}

      </svg>
    </a>
  );
}