"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    
    startTransition(() => {
      // Reemplazamos la ruta manteniendo el pathname actual pero con el nuevo idioma
      router.replace({ pathname }, { locale: nextLocale });
    });
  };

  return (
    <button 
      onClick={toggleLocale}
      disabled={isPending}
      className={`flex items-center gap-2 text-sm font-bold transition-colors border border-ui-border px-4 py-2 rounded-full hover:bg-ui-bg shadow-sm ${isPending ? 'opacity-50 cursor-not-allowed' : 'text-ui-text hover:text-primary'}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
