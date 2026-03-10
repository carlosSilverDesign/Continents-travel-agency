"use client";

import React from 'react';
import { Button } from '@/components/atoms/Button';

// 1. Recibimos el nombre del tour como "prop" para que sea dinámico
interface BookNowFormProps {
  tourName?: string;
}

export function BookNowForm({ tourName = "este paquete" }: BookNowFormProps) {
  
  // 2. Función para capturar los datos y enviarlos a WhatsApp
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Capturamos todos los inputs usando FormData (súper eficiente)
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      singleRooms: formData.get('singleRooms'),
      doubleRooms: formData.get('doubleRooms'),
      accommodation: formData.get('accommodation'),
      comments: formData.get('comments'),
    };

    // 3. Armamos el mensaje formateado para WhatsApp
    const mensaje = `Hola Equipo Continents! ✈️ Me gustaría reservar:\n\n` +
      `🎒 *Paquete:* ${tourName}\n` +
      `👤 *Nombre:* ${data.nombre}\n` +
      `📧 *Email:* ${data.email}\n` +
      `📱 *Tel:* ${data.telefono}\n` +
      `📅 *Fechas:* ${data.startDate} al ${data.endDate}\n` +
      `🛏️ *Habitaciones:* ${data.singleRooms} Simples | ${data.doubleRooms} Dobles\n` +
      `🏨 *Categoría:* ${data.accommodation}\n` +
      `💬 *Comentarios:* ${data.comments || 'Ninguno'}`;

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
        HAS SELECCIONADO: {tourName}
      </h3>

      {/* NUEVA SECCIÓN: DATOS DE CONTACTO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="nombre" className="text-sm font-bold text-ui-heading">Nombre completo *</label>
          <input type="text" id="nombre" name="nombre" required placeholder="Ej. Juan Pérez" className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold text-ui-heading">Correo electrónico *</label>
          <input type="email" id="email" name="email" required placeholder="tu@correo.com" className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="telefono" className="text-sm font-bold text-ui-heading">Teléfono / WhatsApp *</label>
          <input type="tel" id="telefono" name="telefono" required placeholder="+51 999 999 999" className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-ui-border">
        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="text-sm font-bold text-ui-heading">Fecha de inicio *</label>
          {/* Añadimos name="..." a todos los inputs para que el FormData los reconozca */}
          <input type="date" id="startDate" name="startDate" required className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="endDate" className="text-sm font-bold text-ui-heading">Fecha de fin *</label>
          <input type="date" id="endDate" name="endDate" required className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary transition-all" />
        </div>
      </div>

      <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded-r-lg">
        <p className="text-sm text-ui-heading font-medium">
          Selecciona el número de viajeros: <span className="font-normal text-ui-text">Por favor selecciona el tipo de habitación(es).</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="singleRooms" className="text-sm font-bold text-ui-heading">Hab. Simples</label>
          {/* Quitamos el bg-white y pusimos bg-ui-bg para que respete el Dark Mode */}
          <select id="singleRooms" name="singleRooms" className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary">
            <option value="0">0 Habitaciones</option><option value="1">1 Habitación</option>
            <option value="2">2 Habitaciones</option><option value="3">3+ Habitaciones</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="doubleRooms" className="text-sm font-bold text-ui-heading">Hab. Dobles</label>
          <select id="doubleRooms" name="doubleRooms" className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary">
            <option value="0">0 Habitaciones</option><option value="1">1 Habitación</option>
            <option value="2">2 Habitaciones</option><option value="3">3+ Habitaciones</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-ui-heading">Categoría de alojamiento *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Económico', 'Turista', 'Superior', 'Lujo'].map((type) => (
            <label key={type} className="cursor-pointer relative">
              <input type="radio" name="accommodation" value={type} className="peer sr-only" required />
              <div className="p-3 text-center text-sm font-semibold text-ui-text border border-ui-border rounded-lg peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors hover:bg-ui-bg peer-checked:hover:bg-primary">
                {type}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="comments" className="text-sm font-bold text-ui-heading">Comentarios</label>
        <textarea id="comments" name="comments" rows={4} placeholder="¿Tienes algún requerimiento especial o alergias?" className="p-3 bg-ui-bg border border-ui-border rounded-lg text-ui-heading focus:outline-none focus:border-secondary transition-all resize-none"></textarea>
      </div>

      <div className="pt-4 border-t border-ui-border flex justify-end">
        <Button type="submit" variant="accent" size="lg" className="w-full md:w-auto">
          Solicitar Reserva por WhatsApp
        </Button>
      </div>
    </form>
  );
}