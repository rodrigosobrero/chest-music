import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DisconnectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation()
  if (user?.token) {
    return <Navigate to={user?.data.type ? '/my-chest' : '/setup' }replace />  
  } else {
    return children
  }
}
