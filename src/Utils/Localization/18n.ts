import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      requestOptions: {
        cache: 'no-store',
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

console.log(i18next);


export default i18next;