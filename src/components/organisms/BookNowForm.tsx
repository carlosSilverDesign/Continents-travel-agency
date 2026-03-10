"use client";

import React from 'react';
import { Button } from '@/components/atoms/Button';

export function BookNowForm() {
  // Función simulada para evitar que la página se recargue al enviar el formulario
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("¡Formulario enviado! En la Fase de Integración conectaremos esto a tu WhatsApp o correo.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in flex flex-col gap-6 bg-ui-surface p-6 md:p-8 rounded-2xl border border-ui-border shadow-sm"
    >
      <h3 className="text-xl md:text-2xl font-bold text-primary uppercase border-b border-ui-border pb-4">
        HAS SELECCIONADO: PERÚ Y MACHU PICCHU
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="text-sm font-bold text-ui-heading">Fecha de inicio del tour *</label>
          <input type="date" id="startDate" required className="p-3 border border-ui-border rounded-lg text-ui-text focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="endDate" className="text-sm font-bold text-ui-heading">Fecha de fin del tour *</label>
          <input type="date" id="endDate" required className="p-3 border border-ui-border rounded-lg text-ui-text focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" />
        </div>
      </div>

      <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded-r-lg">
        <p className="text-sm text-ui-heading font-medium">
          Selecciona el número de viajeros: <span className="font-normal text-ui-text">Este paquete incluye noches de hotel, por favor selecciona el tipo de habitación(es) y hoteles para alojar a 2 viajeros.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="singleRooms" className="text-sm font-bold text-ui-heading">Habitaciones simples</label>
          <select id="singleRooms" className="p-3 border border-ui-border rounded-lg text-ui-text focus:outline-none focus:border-secondary appearance-none bg-white">
            <option value="0">0 Habitaciones</option>
            <option value="1">1 Habitación</option>
            <option value="2">2 Habitaciones</option>
            <option value="3">3+ Habitaciones</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="doubleRooms" className="text-sm font-bold text-ui-heading">Habitaciones dobles</label>
          <select id="doubleRooms" className="p-3 border border-ui-border rounded-lg text-ui-text focus:outline-none focus:border-secondary appearance-none bg-white">
            <option value="0">0 Habitaciones</option>
            <option value="1">1 Habitación</option>
            <option value="2">2 Habitaciones</option>
            <option value="3">3+ Habitaciones</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-ui-heading">Por favor selecciona el tipo de alojamiento *</label>
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
        <textarea id="comments" rows={4} placeholder="¿Tienes algún requerimiento especial, alergias o preguntas?" className="p-3 border border-ui-border rounded-lg text-ui-text focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none"></textarea>
      </div>

      <div className="pt-4 border-t border-ui-border flex justify-end">
        <Button type="submit" variant="accent" size="lg" className="w-full md:w-auto">
          Enviar Reserva
        </Button>
      </div>
    </form>
  );
}
