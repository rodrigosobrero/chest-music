import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function DisconnectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  return user?.token ? (
    <Navigate to={user?.data?.type ? '/my-chest' : '/setup' } replace /> 
  ) : (
    children
  );
}