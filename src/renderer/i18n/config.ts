/* eslint-disable global-require */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('./locales/en/translations.json'),
    },
    al: {
      translations: require('./locales/al/translations.json'),
    },
    de: {
      translations: require('./locales/de/translations.json'),
    },
    es: {
      translations: require('./locales/es/translations.json'),
    },
    fr: {
      translations: require('./locales/fr/translations.json'),
    },
    tr: {
      translations: require('./locales/tr/translations.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['en', 'al', 'de', 'es', 'fr', 'tr'];

export default i18n;
