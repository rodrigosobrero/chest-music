import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children, redirectPath = '/sign-in', onlyArtist = true }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsAuthenticated(!!currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authChecked) return;

    if (!user) {
      navigate(redirectPath);
      return;
    }

    if (!user.data.type && location.pathname !== '/setup') {
      navigate('/setup');
      return;
    }

    if (onlyArtist && user.data.type !== 'artist') {
      navigate('/shared');
      return;
    }
  }, [authChecked, user, location.pathname, navigate, redirectPath, onlyArtist]);

  if (!authChecked || !isAuthenticated) {
    return <Loader />;
  }

  return children;
}
