import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-ui-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* GRID PRINCIPAL DE 4 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* COLUMNA 1: Marca y Redes */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex flex-col items-start gap-2">
              <img src="/logo.svg" alt="Continents Travel" className="h-10 md:h-12 w-auto object-contain object-left group-hover:scale-105 transition-transform origin-left" />
              <span className="text-ui-text/60 font-medium text-sm tracking-widest uppercase pl-3">
                Travel & Tours
              </span>
            </Link>
            <p className="text-sm text-ui-text leading-relaxed mt-2">
              Diseñamos experiencias inolvidables cuidando cada detalle de tu viaje. Expertos en conectar viajeros con los mejores destinos del mundo.
            </p>
            {/* Íconos de Redes Sociales */}
            <div className="flex gap-4 mt-2">
              {/* <a href="#" className="w-10 h-10 rounded-full bg-ui-bg flex items-center justify-center text-ui-text hover:bg-primary hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a> */}
              <a href="#" className="w-10 h-10 rounded-full bg-ui-bg flex items-center justify-center text-ui-text hover:bg-primary hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-ui-bg flex items-center justify-center text-ui-text hover:bg-primary hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>
          </div>

          {/* COLUMNA 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-bold text-ui-heading mb-4 uppercase tracking-wider text-sm">Explora</h4>
            <ul className="flex flex-col gap-3 text-sm text-ui-text">
              <li><Link href="/paquetes" className="hover:text-secondary transition-colors">Paquetes Turísticos</Link></li>
              <li><Link href="/destinos" className="hover:text-secondary transition-colors">Destinos</Link></li>
              <li><Link href="/ofertas" className="hover:text-secondary transition-colors font-medium text-secondary">Ofertas Especiales</Link></li>
              <li><Link href="/nosotros" className="hover:text-secondary transition-colors">Sobre Nosotros</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: Contacto */}
          <div>
            <h4 className="font-bold text-ui-heading mb-4 uppercase tracking-wider text-sm">Contacto</h4>
            <ul className="flex flex-col gap-3 text-sm text-ui-text">
              <li className="flex items-start gap-2">
                <span className="font-bold">Whatsapp:</span>
                <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">+51 999 999 999</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">Email:</span>
                <a href="mailto:reservas@continents.com" className="hover:text-secondary transition-colors">reservas@continents.com</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">Horario:</span>
                <span>Lun - Vie: 9am a 6pm<br/>Sábados: 9am a 1pm</span>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: Legal & INDECOPI */}
          <div>
            <h4 className="font-bold text-ui-heading mb-4 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm text-ui-text">
              <li><Link href="/terminos" className="hover:text-secondary transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="hover:text-secondary transition-colors">Políticas de Privacidad</Link></li>
              
              {/* Botón Libro de Reclamaciones (Requerido en Perú) */}
              <li className="mt-2">
                <Link href="/reclamaciones" className="inline-flex items-center gap-2 border border-ui-border rounded-lg p-2 hover:bg-ui-bg transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-ui-heading">Libro de</span>
                    <span className="text-xs font-bold text-primary">Reclamaciones</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BARRA INFERIOR: Copyright */}
        <div className="pt-8 border-t border-ui-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ui-text">
          <p>© {currentYear} Continents Travel & Tours. Todos los derechos reservados.</p>
          <div className="flex gap-3">
            {/* Aquí luego puedes poner iconos de Visa, Mastercard, PayPal */}
            <span className="px-2 py-1 bg-ui-bg rounded border border-ui-border">Pago Seguro</span>
            <span className="px-2 py-1 bg-ui-bg rounded border border-ui-border">SSL Certificado</span>
          </div>
        </div>

      </div>
    </footer>
  );
}