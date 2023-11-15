import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Loading from 'components/Loading';

export default function ProtectedRoute({ children, redirectPath = '/sign-in' }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  console.log(user)
  useEffect(() => {
    const auth = getAuth();
    console.log(auth)
    
    if (!auth) {
      setIsUserLoaded(true);
    } else {
      if (user !== undefined) { // gVerificar si el usuario no es null o undefined
        setIsUserLoaded(true);
      }
    }
  }, [user]);

  if (!isUserLoaded) {
    return <Loading />;
  } else {
    const auth = getAuth();
    if (!auth) {
      return <Navigate to='/sign-in' replace />;
    } else {
      return children;
    }
  }
}
