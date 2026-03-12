import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

// 1. Agregamos el nuevo campo badgeText
interface DestinationCardProps {
  title: string;
  slug: string;
  image: string;
  days: number;
  price: number;
  badgeText?: string;
}

export function DestinationCard({ title, slug, image, days, price, badgeText }: DestinationCardProps) {
  const t = useTranslations('DestinationCard');
  // Variable del Tipo de Cambio (Más adelante podemos traerla de una API o de Supabase)
  const TIPO_DE_CAMBIO = 3.80;
  const precioSoles = (price * TIPO_DE_CAMBIO).toFixed(2);

  return (
    // relative es crucial para que la etiqueta (badge) flote sobre la imagen
    <div className="bg-ui-surface rounded-2xl overflow-hidden border border-ui-border shadow-sm hover:shadow-md transition-shadow group relative flex flex-col h-full">

      {/* ETIQUETA DE OFERTA (Se renderiza solo si escribiste algo en Supabase) */}
      {badgeText && (
        <div className="absolute top-4 left-4 z-10 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
          {badgeText}
        </div>
      )}

      {/* Imagen */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-[#410092]">
          {t('days', { count: days })}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-ui-heading mb-4 flex-grow line-clamp-2">{title}</h3>

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-ui-border">
          <div className="flex flex-col">
            <span className="text-xs text-ui-text uppercase tracking-wider font-semibold">{t('from')}</span>
            {/* Precio en USD (Principal) */}
            <span className="text-xl font-bold text-primary leading-none mt-1">US$ {price}</span>
            {/* Precio en Soles (INDECOPI) */}
            <span className="text-[10px] text-ui-text/80 mt-1 font-medium">
              {/* Ref: S/ {precioSoles} (TC: {TIPO_DE_CAMBIO.toFixed(2)}) */}
              Ref: S/ {precioSoles}
            </span>
          </div>
          <Link
            href={`/paquetes/${slug}`}
            className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer inline-flex items-center justify-center shadow-sm"
          >
            {t('viewMore')}
          </Link>
        </div>
      </div>
    </div>
  );
}