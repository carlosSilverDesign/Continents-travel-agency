"use client";

import React from 'react';
import { Button } from '@/components/atoms/Button';
import { useTranslations } from 'next-intl';

// 1. Recibimos el nombre del tour como "prop" para que sea dinámico
interface BookNowFormProps {
  tourName?: string;
}

export function BookNowForm({ tourName = "este paquete" }: BookNowFormProps) {
  const t = useTranslations('BookNowForm');
  
  // 2. Función para capturar los datos y enviarlos a WhatsApp
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Capturamos todos los inputs usando FormData (súper eficiente)
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      nombre: (formData.get('nombre') as string) || '',
      email: (formData.get('email') as string) || '',
      telefono: (formData.get('telefono') as string) || '',
      startDate: (formData.get('startDate') as string) || '',
      endDate: (formData.get('endDate') as string) || '',
      singleRooms: (formData.get('singleRooms') as string) || '0',
      doubleRooms: (formData.get('doubleRooms') as string) || '0',
      accommodation: (formData.get('accommodation') as string) || '',
      comments: (formData.get('comments') as string) || '',
    };

    // 3. Armamos el mensaje formateado para WhatsApp
    const mensaje = t('whatsappMessage', {
      tourName,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      startDate: data.startDate,
      endDate: data.endDate,
      singleRooms: data.singleRooms,
      doubleRooms: data.doubleRooms,
      accommodation: data.accommodation,
      comments: data.comments || 'None'
    });

    // Reemplaza este número por el WhatsApp real de tu agencia (con código de país, sin el +)
    const numeroWhatsApp = "51999999999"; 
    
    // Generamos la URL y abrimos una nueva pestaña
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in flex flex-col gap-6 bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm"
    >
      <h3 className="text-xl md:text-2xl font-bold text-primary uppercase border-b border-ui-border pb-4">
        {t('selectedPackage', { tourName })}
      </h3>

      {/* NUEVA SECCIÓN: DATOS DE CONTACTO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="nombre" className="text-sm font-bold text-ui-heading">{t('fullName')}</label>
          <input type="text" id="nombre" name="nombre" required placeholder={t('fullNamePlaceholder')} className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-ui-heading">{t('email')}</label>
          <input type="email" id="email" name="email" required placeholder={t('emailPlaceholder')} className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="telefono" className="text-sm font-bold text-ui-heading">{t('phone')}</label>
          <input type="tel" id="telefono" name="telefono" required placeholder={t('phonePlaceholder')} className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-ui-border">
        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="text-sm font-bold text-ui-heading">{t('startDate')}</label>
          {/* Añadimos name="..." a todos los inputs para que el FormData los reconozca */}
          <input type="date" id="startDate" name="startDate" required className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="endDate" className="text-sm font-bold text-ui-heading">{t('endDate')}</label>
          <input type="date" id="endDate" name="endDate" required className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary transition-all" />
        </div>
      </div>

      <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded-r-lg">
        <p className="text-sm text-ui-heading font-medium">
          {t('travelersSelect')} <span className="font-normal text-ui-text">{t('roomSelectDesc')}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="singleRooms" className="text-sm font-bold text-ui-heading">{t('singleRooms')}</label>
          {/* Quitamos el bg-white y pusimos bg-ui-bg para que respete el Dark Mode */}
          <select id="singleRooms" name="singleRooms" className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary">
            <option value="0">{t('rooms0')}</option><option value="1">{t('rooms1')}</option>
            <option value="2">{t('rooms2')}</option><option value="3">{t('rooms3')}</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="doubleRooms" className="text-sm font-bold text-ui-heading">{t('doubleRooms')}</label>
          <select id="doubleRooms" name="doubleRooms" className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary">
            <option value="0">{t('rooms0')}</option><option value="1">{t('rooms1')}</option>
            <option value="2">{t('rooms2')}</option><option value="3">{t('rooms3')}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-ui-heading">{t('accommodationCategory')}</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Económico', 'Turista', 'Superior', 'Lujo'].map((type) => (
            <label key={type} className="cursor-pointer relative">
              <input type="radio" name="accommodation" value={type} className="peer sr-only" required />
              <div className="p-3 text-center text-sm font-semibold text-ui-text border border-ui-border rounded-lg peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors hover:bg-ui-bg peer-checked:hover:bg-primary">
                {/* @ts-ignore */}
                {t(`accommodationOptions.${type}`)}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="comments" className="text-sm font-bold text-ui-heading">{t('comments')}</label>
        <textarea id="comments" name="comments" rows={4} placeholder={t('commentsPlaceholder')} className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary transition-all resize-none"></textarea>
      </div>

      <div className="pt-4 border-t border-ui-border flex justify-end">
        <Button type="submit" variant="accent" size="lg" className="w-full md:w-auto">
          {t('submitButton')}
        </Button>
      </div>
    </form>
  );
}