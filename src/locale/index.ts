import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from './languages/en';
import vi from './languages/vi';

i18n.use(reactI18nextModule).init({
  fallbackLng: 'en',
  lng: 'vi',
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },

  debug: true,
});

export default i18n;
