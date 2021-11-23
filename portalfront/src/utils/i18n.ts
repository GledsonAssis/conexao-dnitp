import i18n from 'i18next';
import ptBR from '../static/locales/pt-BR/toast_errors.json'
import enUS from '../static/locales/en-US/toast_errors.json'

i18n
  .init({
    resources: {
      'pt-BR': {
        translation: ptBR,
      },
      'en-US': {
        translation: enUS,
      },
    },
    lng: 'pt-BR',
    keySeparator: '.',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
