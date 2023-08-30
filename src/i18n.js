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
            upload: 'Choose from files',
            click_here: 'click here',
            password: 'Password',
            write_here: 'Write here',
            divider: 'or'
          },
          signin: {
            title: 'open your chest',
            button_google: 'Log in with Google',
            button: 'Log in',
            signup: 'Don’t have an account? Sign up',
            reset: 'Lost your key?',
          },
          signup: {
            title: 'create a new chest',
            button: 'Sign up',
            button_google: 'Sign up with Google',
            full_name: 'Full name',
            login: 'Already have an account? Log in'
          },
          mychest: {
            uploader: {
              title: 'drop it like it’s hot',
              description: 'Drag and drop your audio file here to upload a new track, or...',
            }
          },
          footer: {
            rights: 'All rights reserved.'
          }
        }
      },
      es: {
        translation: {
          general: {
            upload: 'Seleccionar archivo',
            click_here: 'clic aquí',
            password: 'Contraseña',
            write_here: 'Escribe aquí',
            divider: 'o'
          },
          signin: {
            title: 'abre tu cofre',
            button_google: 'Ingresa con Google',
            button: 'Ingresar',
            signup: '¿No tienes cuenta? Registate',
            reset: '¿Perdiste tus llaves?',
          },
          signup: {
            title: 'crea un nuevo cofre',
            button: 'Registrate',
            button_google: 'Registrate con Google',
            full_name: 'Nombre completo',
            login: '¿Ya tienes una cuenta? Ingresa'
          },
          mychest: {
            uploader: {
              title: 'suéltalo como si estuviera caliente',
              description: 'arrastra y suelta tu archivo de audio aquí para subir un nuevo track, o...'
            }
          },
          footer: {
            rights: 'Todos los derechos reservados.'
          }
        }
      }
    }
  })