import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en, ua } from '../locales';
import { Language } from '../types';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    supportedLngs: Object.values(Language),
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      ua: {
        translation: ua,
      },
    },
  });

export default i18next;
