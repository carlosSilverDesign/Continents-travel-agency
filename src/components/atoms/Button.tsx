import React from 'react';

// 1. Las "Props" (Propiedades): Aquí definimos qué instrucciones acepta nuestro botón.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline'; // Colores
  size?: 'md' | 'lg'; // Tamaños
  children: React.ReactNode; // El texto que irá adentro
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  // 2. Estilos Base: Aquí aplicamos la LEY DE FITTS (min-h-[44px]) para que 
  // siempre sea fácil de tocar en celulares, sin importar el tamaño que elijas.
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-colors min-h-[44px]";
  
  // 3. Diccionario de Variantes (Usando nuestras variables semánticas de Tailwind)
  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    accent: "bg-accent text-white hover:opacity-90",
    outline: "border-2 border-primary text-primary hover:bg-primary/10"
  };

  // 4. Diccionario de Tamaños
  const sizes = {
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg"
  };

  // 5. El Render: Mezclamos todas las clases de Tailwind y devolvemos el botón
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
