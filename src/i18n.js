import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import common_uz from './translations/uz/common.json'
import common_uz_cyrl from './translations/uz_cyrl/common.json'
import common_en from './translations/en/common.json'
import common_ru from './translations/ru/common.json'

const resources = {
  uz: {
    common: common_uz,
  },
  en: { common: common_en },
  ru: { common: common_ru },
  uz_cyrl: { common: common_uz_cyrl },
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
