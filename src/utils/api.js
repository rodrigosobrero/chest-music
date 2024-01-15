import axios from 'axios';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default axios.create({
  baseURL: process.env.REACT_APP_API
});

export const upload = axios.create({
  baseURL: process.env.REACT_APP_UPLOAD_API
});

export const apiUrl = process.env.REACT_APP_API

export const patchData = async (path, body, token) => {
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