import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children, redirectPath = '/sign-in' }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 console.log('estoy aca')
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('current', currentUser)
      if (currentUser) {
        setIsAuthenticated(true);
        console.log('entre al true')
      } else {
        console.log('entre a false')
        setIsAuthenticated(false);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe(); 
  }, []);

  if (!authChecked) {
    return <div>Cargando...</div>; // O algún componente de carga
  }

  if (!isAuthenticated) {
    return navigate("/sign-in");
  }

  return children;
}
