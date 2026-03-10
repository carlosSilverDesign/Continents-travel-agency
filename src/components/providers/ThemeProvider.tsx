"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// En Next.js 14/15, tenemos que aislar el proveedor en un componente de cliente ("use client")
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}