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
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
      setAuthChecked(true);
    });
    return () => unsubscribe(); 
  }, []);

  if (!authChecked) {
    return <div>Cargando...</div>; // O algún componente de carga
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
