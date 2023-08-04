import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          general: {
            upload: 'Choose from files'
          },
          mychest: {
            uploader: {
              title: 'drop it like it’s hot',
              description: 'Drag and drop your audio file here to upload a new track, or...',
            }
          }
        }
      },
      es: {
        translation: {
          general: {
            upload: 'Seleccionar archivo'
          },
          mychest: {
            uploader: {
              title: 'suéltalo como si estuviera caliente',
              description: 'arrastra y suelta tu archivo de audio aquí para subir un nuevo track, o...'
            }
          }
        }
      }
    }
  })