import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children, redirectPath = '/sign-in' }) {
  const user = useSelector((state) => state.auth.user);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Usuario autenticado
        setIsAuthenticated(true);
      } else {
        // Usuario no autenticado
        setIsAuthenticated(false);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe(); // Limpieza de la suscripción
  }, []);

  // Espera hasta que la verificación de autenticación esté completa
  if (!authChecked) {
    return <div>Cargando...</div>; // O algún componente de carga
  }

  // Si la verificación de autenticación está completa y el usuario no está autenticado, redirigir
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
