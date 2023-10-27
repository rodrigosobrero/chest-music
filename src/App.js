import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import axios from 'utils/api';
import { auth } from 'utils/firebase';
import { saveUser } from 'app/auth';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import MyChest from 'routes/my-chest';
import Root from 'routes/root';
import SignIn from 'routes/sign-in';
import ProtectedRoute from 'utils/ProtectedRoute';
import SignUp from 'routes/sign-up';

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/sign-in',
          element: <SignIn />
        },
        {
          path: '/sign-up',
          element: <SignUp />
        },
        {
          path: '/my-chest',
          element: 
            <ProtectedRoute>
              <MyChest />
            </ProtectedRoute>
        }
      ]
    }
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then(async (token) => {
          const response = await axios.get('account/', {
            headers: { Authorization: `Bearer ${token}` }
          });

          dispatch(saveUser({
            data: response.data,
            token: token
          }));
        });
      } else {
        dispatch(saveUser(undefined));
      }
    })
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
