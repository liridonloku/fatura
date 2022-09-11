/* eslint-disable global-require */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'al',
  resources: {
    en: {
      translations: require('./locales/en/translations.json'),
    },
    al: {
      translations: require('./locales/al/translations.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['en', 'al'];

export default i18n;
