import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Loader from 'components/Loader';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, redirectPath = '/sign-in', onlyArtist = true }) {
  const navigate = useNavigate()
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if(!user) return;
    const type = user.data.type
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
        if(onlyArtist) {
          setIsEnabled(type === 'artist')
        } 
      } else {
        setIsAuthenticated(false);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [user]);

  if (!authChecked) {
    return <Loader />
  }
  if (!isAuthenticated) {
    return navigate(redirectPath);
  }
  if(isAuthenticated && !isEnabled) {
    return navigate('/my-chest')
  }

  return children;
}