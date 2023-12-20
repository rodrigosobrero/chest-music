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
            by: 'By',
            save: 'Save',
            remove: 'Remove',
            back: 'Go back',
            close: 'close',
            open: 'open',
            notifications: 'notifications',
            learn_more: 'Learn more',
            change: 'change',
            email: 'Email',
            add_another: 'Add another', 
            allow: 'Allow',
            free: 'Free',
            block: 'Block',
            placeholder: {
              write_here: 'Write here...',
              search: 'Search...',
              select_one: 'Select one...',
              only_numbers: 'Only numbers..'
            },
            edit: 'Edit',
            confirm: 'Confirm',
            user: 'User', 
            send: 'Send',
            generate: 'Generate',
            months: {
              0: 'jan',
              1: 'feb',
              2: 'mar',
              3: 'apr',
              4: 'may',
              5: 'jun',
              6: 'jul',
              7: 'aug',
              8: 'sep',
              9: 'oct',
              10: 'nov',
              11: 'dec'
            },
            hours_one: '{{count}} hour ago',
            hours_other: '{{count}} hours ago',
            days_one: '{{ count }} day ago',
            days_other: '{{ count }} days ago'
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
          profile: {
            sections: [ 
              { title: 'Recently played',
                subtitle: 'Explore the list of tracks that you have recently listened'
              },
              { title: 'Global permissions',
                subtitle: 'Choose users to be your regular listeners by giving them the key to your chest'
              },
              { title: 'Account',
                subtitle: 'Manage your personal information and current plan settings'
              },
              { title: 'Security',
                subtitle: 'Change your password, set your PIN Code and learn more about our security'
              },
              { title: 'Help center',
              subtitle: 'Access to frequently asked questions or get support to resolve your issues'
              },
              { title: 'Terms & Conditions',
              subtitle: 'Review user rights, legal responsibilities, and usage guidelines of the platform'
              },
             ]
          },
          notification: {
            title: 'Notifications',
            manage: 'Manage',
            invites: 'Invites',
            general: 'General',
            nothing_here: 'Nothing here',
            not_general: 'You haven’t received any General yet'
          },
          manage: {
            privacy_set: 'Privacy is set to',
            blocked_users: 'Blocked users',
            allowed_users: 'Allowed users',
            receive_any_except_blocked: 'Receive notifications from anyone except blocked',
            receive_only_allowed: 'Receive notifications from allowed users only',
            allow_new_user: 'Allow new user',
            block_new_user: 'Block new user'
          },
          recently: {
            subtitle: 'Explore the list of tracks that you have recently listened'
          },
          permissions: {
            subtitle: 'Choose users to be your regular listeners by giving them the key to your chest',
            alert: 'Keep in mind that these users will be able to listen to all your tracks without limit by default'
          },
          account: { 
            subtitle: 'Manage your personal information and current plan settings',
            personal_data: 'Personal Data',
            my_plan: 'My Plan',
            storage: 'Storage',
            current_plan: 'Current plan',
            artist_name: 'Artist name',
            artist_username: 'Username',
            upgrade: 'Upgrade storage',
            delete_validation_text: 'delete my chest',
            modals:{
              delete_account: 'Delete Account',
              delete_subtitle: 'We are sad to see you go. Are you sure you want to delete your account? You cannot undo this operation.',
              delete_confirm: 'To confirm, please type "delete my chest" below.',
              change_name: 'change artist name',
              change_subtitle: 'Choose a new artist name for your current account',
              upgrade_title: 'Sign up for a bigger chest',
              upgrade_subtitle: 'Leave your data here to know the launch date before anyone, and access to the free trial of the Premium Plan.',
              full_name: 'Full name',
              country_residence: 'Country of residence'
            },
          },
          shared: {
            title: 'Shared with me',
            subtitle: 'Explore and play the tracks that other artists shared with you',
            any: 'Nobody shared a track with you yet'
          },
          security: {
            pin: 'PIN Code',
            change_password: 'Change your password, set your PIN Code and learn more about our security',
            subtitle: 'Chest keeps your treasure secure',
            text: 'Aliquet malesuada dolor sit amet consectetur. Viverra id feugiat risus volutpat dictum. Fames adipiscing nunc pretium dolor at enim eu.',
            password_modal: {
              title: 'change password',
              subtitle: 'Once you continue, you will receive an email with instructions on how to reset your password.',
            },
            pin_modal: {
              current_pin: 'Current PIN Code',
              new_pin: 'New PIN Code'
            }
          },
          help_center: {
            subtitle: 'Access to frequently asked questions or get support to resolve your issues',
            contact_us: 'Contact us',
            email: 'Your email',
            subject: 'Subject',
            message: 'Message', 
            send: 'Send message',
            faqs:    [{
                  "title": "What does “role” mean in track permissions?",
                  "content" :"Aliquet malesuada dolor sit amet consectetur. Viverra id feugiat risus volutpat dictum. Fames adipiscing nunc pretium dolor at enim eu."
              },
              {
                  "title": "Adipiscing nunc pretium dolor viverra at?",
                  "content" :"Aliquet malesuada dolor sit amet consectetur. Viverra id feugiat risus volutpat dictum. Fames adipiscing nunc pretium dolor at enim eu."
              },
              {
                  "title": "Suspendisse neque augue ultricies vel sed tempor commodo mattis tincidunt?",
                  "content" :"Aliquet malesuada dolor sit amet consectetur. Viverra id feugiat risus volutpat dictum. Fames adipiscing nunc pretium dolor at enim eu."
              },
              {
                  "title": "Det mi cursus ultrices enim vulputate?",
                  "content" :"Aliquet malesuada dolor sit amet consectetur. Viverra id feugiat risus volutpat dictum. Fames adipiscing nunc pretium dolor at enim eu."
              },
              {
                  "title": "Vehicula pellentesque elit laoreet pharetra sodales a risus?",
                  "content" :"Aliquet malesuada dolor sit amet consectetur. Viverra id feugiat risus volutpat dictum. Fames adipiscing nunc pretium dolor at enim eu."
              }
              ]
          },
          terms: {
            title: 'Terms & conditions',
            subtitle: 'Review user rights, legal responsibilities, and usage guidelines of the platform',
            items:[
              {
                  "title": "Lectus adipiscing",
                  "text": "Convallis eget sit nibh amet magna morbi orci. Cursus massa vitae pretium in nibh massa dignissim adipiscing leo. Sit aliquet vulputate porttitor tempor sed pharetra orci enim etiam. Aenean risus sed hac eget malesuada arcu sed sit morbi. Tellus orci euismod nibh tellus pellentesque aliquam id urna. Ac consectetur molestie pellentesque sed tempus malesuada diam justo. Id erat leo vitae tristique neque. Aliquam amet scelerisque sapien ac elementum. Nullam ultrices nunc at lectus nec adipiscing. Consequat eu sodales augue mauris at eu viverra. Sit lacinia risus pulvinar turpis. Lobortis accumsan viverra magna ullamcorper. At interdum sapien vitae sodales in amet adipiscing at dolor. Augue lacus elementum fringilla adipiscing malesuada mauris. Ac eu nibh adipiscing risus pretium. Sapien eros in feugiat lectus ut vivamus dictumst. Et enim fermentum facilisis arcu lorem eu. Cras dui posuere velit consectetur amet pretium sed mi nulla. Proin quis semper urna ipsum mi venenatis accumsan ante. Nullam eu arcu at ac parturient. Et nulla nunc enim amet. Etiam vulputate ut vitae nulla cursus turpis. Id viverra metus elit eu. Vitae eget aliquam pretium condimentum."
              },
              {
                  "title": "Cursus Massa portitor",
                  "text": "Porttitor tempor sed pharetra orci enim etiam. Aenean risus sed hac eget malesuada arcu sed sit morbi. Tellus orci euismod nibh tellus pellentesque aliquam id urna. Ac consectetur molestie pellentesque sed tempus malesuada diam justo. Id erat leo vitae tristique neque. Aliquam amet scelerisque sapien ac elementum. Nullam ultrices nunc at lectus nec adipiscing. Consequat eu sodales augue mauris at eu viverra. Sit lacinia risus pulvinar turpis. Lobortis accumsan viverra magna ullamcorper. At interdum sapien vitae sodales in amet adipiscing at dolor. Augue lacus elementum fringilla adipiscing malesuada mauris. Ac eu nibh adipiscing risus pretium. Sapien eros in feugiat lectus ut vivamus dictumst. Et enim fermentum facilisis arcu lorem eu. Cras dui posuere velit consectetur amet pretium sed mi nulla. Proin quis semper urna ipsum mi venenatis accumsan ante. Nullam eu arcu at ac parturient. Et nulla nunc enim amet. Etiam vulputate ut vitae nulla cursus turpis."
              },
              {
                  "title": "Sit aliquet vulputate",
                  "text": "Quis semper diam vehicula odio quam urna vitae porttitor. Varius pretium semper condimentum diam in. Eget massa nibh imperdiet tortor odio dui. Vitae odio adipiscing imperdiet commodo placerat eleifend nunc. Non hendrerit gravida habitasse velit lacus venenatis praesent nisl. Condimentum pharetra in elit elementum ultricies pellentesque. Nullam placerat tempor pretium egestas massa nullam gravida. Suspendisse vel tortor quis dui posuere. Vestibulum malesuada risus est erat lectus risus neque sagittis eleifend. Vitae enim gravida turpis metus sit purus laoreet. Sem nec pretium sit maecenas morbi morbi. Urna quis proin aliquet sed fames turpis suspendisse. Sed quam volutpat vestibulum dictum habitant scelerisque ullamcorper orci amet. Enim et faucibus sed pellentesque risus id morbi urna. Blandit ut nisl sagittis maecenas. Turpis sed nunc egestas justo sem adipiscing eleifend semper ultrices. Sit etiam mi et viverra orci id. Suspendisse accumsan dui bibendum turpis posuere pharetra. Mollis in sem tellus accumsan. Suscipit non morbi pretium donec malesuada elementum vitae. Amet morbi eu donec ac hac senectus. Morbi tempor orci tristique ac. In porta a viverra hendrerit. Ornare neque turpis egestas neque dis aliquam semper ultricies scelerisque. Dictum in amet amet enim tempus. Sem dui pharetra sed et risus cursus fermentum et feugiat. Lorem diam duis cras nunc. Nulla imperdiet laoreet sagittis ipsum morbi leo. Tristique nisi cursus amet iaculis ac facilisis odio faucibus semper. Condimentum orci augue lectus aenean adipiscing eu vitae. In neque sit id aenean id. In nibh dolor odio in et tellus."
              }
          ]
          },
          share: {
            play_limit: 'Play limit',
            unlimited: 'Unlimited',
            allow_web_play: 'Allow web play',
            message: 'Message',
            message_example: 'For example: “Check out my new track”'
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
            months: {
              0: 'ene',
              1: 'feb',
              2: 'mar',
              3: 'abr',
              4: 'may',
              5: 'jun',
              6: 'jul',
              7: 'ago',
              8: 'sep',
              9: 'oct',
              10: 'nov',
              11: 'dic'
            },
            hours_one: 'hace {{count}} hora',
            hours_other: 'hace {{count}} horas',
            days_one: 'hace {{ count }} día',
            days_other: 'hace {{ count }} días'
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
          notification: {
            title: 'Notifications',
            manage: 'Managa',
            invites: 'Invites', 
            general: 'General',
          },
          footer: {
            rights: 'Todos los derechos reservados.'
          }
        }
      }
    }
  })