import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define available languages (replace with your languages)
//const languages = ['en']//, 'es']; // English and Spanish

// Import translation files (explained later)
import translationEN from './translations/en.json';
//import translationES from './translations/es.json';

i18n
  .use(initReactI18next) // Initializes i18next with react-i18next
  .init({
    resources: {
      en: { translation: translationEN },
      //es: { translation: translationES },
    },
    lng: 'auto', // Set default language (can be 'auto' for browser detection)
    interpolation: {
      escapeValue: false, // This ensures raw HTML in translations is displayed correctly
    },
  });

export default i18n;
