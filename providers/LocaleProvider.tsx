'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import en from '@/locales/en/common.json';
import fa from '@/locales/fa/common.json';

type Locale = 'en' | 'fa';

type LocaleContextValue = {
  locale: Locale;
  translations: Record<string, string>;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const map: Record<Locale, Record<string, string>> = {
  en,
  fa
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      translations: map[locale]
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}

export function useT() {
  const { translations } = useLocale();
  return (key: string) => translations[key] ?? key;
}
