"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex font-black text-xl uppercase tracking-widest gap-2 select-none">
      <button 
        onClick={() => switchLocale('en')} 
        className={`transition-colors ${locale === 'en' ? 'text-primary' : 'text-off-white/40 hover:text-primary'}`}
      >
        EN
      </button>
      <span className="opacity-30">/</span>
      <button 
        onClick={() => switchLocale('pl')} 
        className={`transition-colors ${locale === 'pl' ? 'text-primary' : 'text-off-white/40 hover:text-primary'}`}
      >
        PL
      </button>
    </div>
  );
}
