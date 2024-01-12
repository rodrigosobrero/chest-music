import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function DisconnectedRoute({ children }) {
  const { data, token } = useSelector((state) => state.auth.user);

  return token ? (
    <Navigate to={data?.type ? '/my-chest' : '/setup' } replace /> 
  ) : (
    children
  );
}