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
          global: {
            upload: 'Choose from files',
            click_here: 'click here',
            password: 'Password',
            write_here: 'Write here',
            divider: 'or',
            account: 'account',
            month: 'month',
            coming_soon: 'Coming soon',
            of: 'of',
            cancel: 'Cancel',
            continue: 'Continue',
            by: 'by',
            save: 'Save',
            remove: 'Remove',
            back: 'Go back',
            confirm: 'Confirm',
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
            subtitle: 'Configure your new account',
            artist: 'artist',
            fan: 'fan',
            fan_description: 'If you came to listen to the music of your favorite friends and artists before anyone else, this is for you. Enjoy a simplified version of Chest adjusted to your needs.',
            artist_description: 'If you make music, this option is for you. It doesn\'t matter if you are a singer, music producer, or DJ: if your music is your treasure, you have found its chest.',
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
              title_mobile: 'upload a treasure',
              description: 'Drag and drop your audio file here to upload a new track, or...',
              description_mobile: 'Choose a file here to upload a new track',
            }
          },
          upload: {
            title: 'name your treasure',
            track_name: 'Track name',
            your_role: 'Your role',
            leave_empty: 'Leave empty for singles',
            version: 'Version',
            album: 'Album',
            edit_cover: 'edit cover',
            edit_instruction: 'Choose a default preset from our library or upload your own cover from your files.',
            preview: 'Preview',
            presets: 'Presets',
            upload_file: 'Upload file',
            upload_filetype: 'In .jpg or .png format, max size 10 MB',
            browse: 'Browse',
            participants: 'participants',
            participant: 'Participant'
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
            coming_soon: 'Próximamente',
            of: 'de',
            cancel: 'Cancelar',
            continue: 'Continuar',
            by: 'por',
            save: 'Guardar',
            remove: 'Remover',
            back: 'Ir atrás',
            confirm: 'Confirmar',
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
          upload: {
            title: 'nombra tu tesoro',
            track_name: 'Nombre del track',
            your_role: 'Tu rol',
            leave_empty: 'Deja vacío para singles',
            version: 'Versión',
            album: 'Álbum',
            edit_cover: 'Editar portada',
            edit_instruction: 'Choose a default preset from our library or upload your own cover from your files.',
            preview: 'Vista previa',
            presets: 'Presets',
            upload_file: 'Subir archivo',
            upload_filetype: 'En formato .jpg o .png, tamaño máximo 10 MB',
            browse: 'Buscar archivo',
            participants: 'Participantes',
            participant: 'Participante'
          },
          footer: {
            rights: 'Todos los derechos reservados.'
          }
        }
      }
    }
  })