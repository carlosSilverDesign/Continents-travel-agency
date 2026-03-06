import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';

// 1. Agregamos el "slug" a nuestras propiedades
interface DestinationCardProps {
  title: string;
  imageAlt: string;
  imageUrl: string;
  duration: string;
  price: number;
  slug: string; // ¡Nuevo!
}

export function DestinationCard({ title, imageAlt, imageUrl, duration, price, slug }: DestinationCardProps) {
  return (
    <article className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-ui-border hover:shadow-md transition-shadow">
      
      <div className="relative w-full h-48 bg-zinc-200">
        {/* Si no hay imagen en la BD aún, mostramos una por defecto */}
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800"} 
          alt={imageAlt}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="mb-4">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            {duration}
          </span>
          <h3 className="text-xl font-bold text-ui-heading mt-1 leading-tight">
            {title}
          </h3>
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center justify-between pt-4 border-t border-ui-border mt-4">
          <div>
            <p className="text-xs text-ui-text">Desde</p>
            <p className="text-2xl font-bold text-primary">US$ {price}</p>
          </div>
          
          {/* 2. Envolvemos el botón en un Link que apunte a la ruta dinámica */}
          <Link href={`/paquetes/${slug}`}>
            <Button variant="accent" size="md">
              Ver más
            </Button>
          </Link>
        </div>

      </div>
    </article>
  );
}