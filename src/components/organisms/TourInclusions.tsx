import React from 'react';
import { useTranslations } from 'next-intl';

export function TourInclusions({ data }: { data: any }) {
  const t = useTranslations('TourInclusions');
  if (!data) return <p className="text-ui-text">{t('noInfo')}</p>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      
      {/* COLUMNA IZQUIERDA: LO QUE INCLUYE */}
      {/* Agregamos dark:bg-green-950/20 y dark:border-green-900/30 para un fondo oscuro elegante */}
      <div className="bg-green-50/50 dark:bg-green-950/20 p-6 md:p-8 rounded-2xl border border-green-100 dark:border-green-900/30 shadow-sm transition-colors">
        <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-6 flex items-center gap-3">
          
          {/* LA CURA DEL CÍRCULO: w-8 h-8 flex items-center justify-center shrink-0 */}
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 shrink-0">
            ✓
          </span> 
          {t('included')}
        </h3>
        
        <div className="flex flex-col gap-6">
          {data.included.map((section: { category: string; items: string[] }, index: number) => (
            <div key={index}>
              <h4 className="font-bold text-ui-heading mb-3 border-b border-green-200/50 dark:border-green-900/50 pb-2 transition-colors">
                {section.category}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.items.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-ui-text text-sm transition-colors">
                    <span className="text-green-500 dark:text-green-400 mt-0.5 shrink-0">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMNA DERECHA: LO QUE NO INCLUYE */}
      {/* Agregamos dark:bg-red-950/20 y dark:border-red-900/30 */}
      <div className="bg-red-50/50 dark:bg-red-950/20 p-6 md:p-8 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm h-fit transition-colors">
        <h3 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-6 flex items-center gap-3">
          
          {/* LA CURA DEL CÍRCULO: w-8 h-8 flex items-center justify-center shrink-0 */}
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-500 dark:text-red-400 font-bold shrink-0">
            ✕
          </span> 
          {t('notIncluded')}
        </h3>
        
        <ul className="flex flex-col gap-3">
          {data.notIncluded.map((item: string, index: number) => (
            <li key={index} className="flex items-start gap-2 text-ui-text text-sm transition-colors">
              <span className="text-red-400 dark:text-red-500 mt-0.5 shrink-0">✕</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}