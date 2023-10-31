import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ auth, children, redirectPath = '/sign-in' }) {
  const user = useSelector((state) => state.auth.user);

  if (!user?.token) {
    return <Navigate to='/sign-in' replace />
  } else {
    return children
  }
}
