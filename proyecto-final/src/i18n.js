import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translations/en/translation.json'; // Archivo de traducción en inglés
import translationES from './translations/es/translation.json'; // Archivo de traducción en español

// Configuración de i18next
i18n
  .use(initReactI18next) // Usa initReactI18next para integrar i18next con React
  .init({
    resources: {
      en: { translation: translationEN }, // Traducciones en inglés
      es: { translation: translationES }, // Traducciones en español
    },
    lng: 'en', // Idioma por defecto
    fallbackLng: 'en', // Idioma de fallback en caso de no encontrar la traducción
    interpolation: {
      escapeValue: false, // Evita la inyección de HTML por seguridad
    },
  });

export default i18n;

