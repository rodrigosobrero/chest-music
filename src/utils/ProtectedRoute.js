import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useGetAccountQuery } from 'store/api';
import Loader from 'components/Loader';

export default function ProtectedRoute({
  children,
  redirectPath = '/sign-in',
  onlyArtist = true,
  onlyAmbassador = false
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: account,
    isSuccess: isSuccessAccount,
    isError: isErrorAccount } = useGetAccountQuery({}, { refetchOnMountOrArgChange: true });

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

    if ((!user.data || !user.data.subscription) && location.pathname !== '/setup') {
      navigate('/setup');
    }

    if (onlyAmbassador && user.data.ambassador === false) {
      navigate('/setup');
    }
    
  }, [authChecked, user, location.pathname, navigate, redirectPath]);

  if (!authChecked || !isAuthenticated) {
    return <Loader />;
  }

  return children;
}
