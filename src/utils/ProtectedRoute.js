import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ auth, children, redirectPath = '/sign-in' }) {
  const user = useSelector((state) => state.auth.user);
    console.log(user.token)

  if (!user?.token) {
    return <Navigate to='/sign-in' replace />
  } else {
    return children
  }
}
