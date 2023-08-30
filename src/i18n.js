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
            divider: 'or',
            account: 'account',
            month: 'month',
            coming_soon: 'Coming soon'
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
          setup: {
            title: 'welcome to chest',
            subtitle: 'Choose your role',
            artist: 'artist',
            fan: 'fan',
            button: 'Confirm',
            step_two: {
              title: 'configure your account',
              selected: 'Selected role',
              account: '{{ role }} account',
              button: 'Change',
              username: 'Username',
              artist_name: 'Artist name',
              pin: 'PIN code',
              helper: 'You won’t be able to change this',
              free: 'Free',
              free_description: 'Limited cloud storage, up to 1 GB',
              premium_description: 'Extended cloud storage and more',
              terms: 'I have read and accept the',
              terms_link: 'Terms and Conditions',
              create_button: 'Create chest'
            }
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
          global: {
            upload: 'Seleccionar archivo',
            click_here: 'clic aquí',
            password: 'Contraseña',
            write_here: 'Escribe aquí',
            divider: 'o',
            account: 'cuenta',
            month: 'mes',
            coming_soon: 'Próximamente'
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
          setup: {
            title: 'bienvenido a chest',
            subtitle: 'Elije tu rol',
            artist: 'artista',
            fan: 'fan',
            button: 'Confirmar',
            step_two: {
              title: 'configura tu cuenta',
              selected: 'Role seleccionado',
              account: 'Cuenta {{ role }}',
              button: 'Cambiar',
              username: 'Nombre de usuario',
              artist_name: 'Nombre de artista',
              pin: 'Código PIN',
              helper: 'Luego no podrás cambiarlo',
              free: 'Gratis',
              free_description: 'Almacenamiento en la nube limitado, hasta 1 GB',
              premium_description: 'Almacenamiento en la nube ampliado y más',
              terms: 'He leido y acepto los',
              terms_link: 'Términos y Condiciones',
              create_button: 'Crear cofre'
            }
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