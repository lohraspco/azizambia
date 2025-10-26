'use client';

import { useLocale } from '@/providers/LocaleProvider';

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'fa' : 'en')}
      className="flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-xs font-medium text-deepNavy shadow-sm"
    >
      <span>{locale === 'en' ? 'EN' : 'FA'}</span>
      <span className="text-deepNavy/60">/</span>
      <span className="text-deepNavy/80">{locale === 'en' ? 'FA' : 'EN'}</span>
    </button>
  );
}
