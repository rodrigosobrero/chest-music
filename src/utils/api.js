import axios from 'axios';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// update 
export default axios.create({
  baseURL: 'https://chest-api-stg.cexar.io/web/v1/'
});

export const upload = axios.create({
  baseURL: 'https://upload.chestmusic.com/'
});

export const apiUrl = 'https://chest-api-stg.cexar.io/web/v1/'

export const patchData = async (path, body, token) => {
  console.log(token)
  const { data } = await axios.patch(apiUrl + path, body,
    {
      headers: { Authorization: `Bearer ${token}` }
    })
  return data
}

export const resetPassword = (email, callback) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Correo de restablecimiento de contraseña enviado exitosamente.
      console.log("Correo de restablecimiento de contraseña enviado exitosamente");
      callback()
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Manejar errores
      console.error("Error al enviar el correo de restablecimiento de contraseña:", errorCode, errorMessage);
    });
}