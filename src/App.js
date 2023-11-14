import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import axios from 'utils/api';
import { auth } from 'utils/firebase';
import { saveUser } from 'app/auth';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import MyChest from 'routes/my-chest';
import Root from 'routes/root';
import SignIn from 'routes/sign-in';
import ProtectedRoute from 'utils/ProtectedRoute';
import DisconnectedRoute from 'utils/DisconnectedRoute';
import SignUp from 'routes/sign-up';
import Manage from 'routes/manage';
import Notifications from 'routes/notifications'
import RecentlyPlayed from 'routes/recently-played';
import Permissions from 'routes/permissions';
import Account from 'routes/account';
import Security from 'routes/security';
import Terms from 'routes/terms';
import Help from 'routes/help'; 
import Shared from 'routes/shared';
import Profile from 'routes/profile';
import Setup from 'routes/setup';
import Share from 'routes/share';

function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/sign-in',
          element:
           <DisconnectedRoute>
             <SignIn />
           </DisconnectedRoute>
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
        },
        {
          path: 'shared',
          element: 
            <ProtectedRoute>
              <Shared />
            </ProtectedRoute>
        },
        {
          path: 'profile',
          element: 
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
        },
        {
          path: 'profile/played',
          element: 
            <ProtectedRoute>
              <RecentlyPlayed />
            </ProtectedRoute>
        },
        {
          path: 'profile/permissions',
          element: 
            <ProtectedRoute>
              <Permissions />
            </ProtectedRoute>
        },
        {
          path: 'profile/account',
          element: 
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
        },
        {
          path: 'profile/help',
          element: 
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
        },
        {
          path: 'profile/terms',
          element: 
            <ProtectedRoute>
              <Terms />
            </ProtectedRoute>
        },
        {
          path: 'profile/security',
          element: 
            <ProtectedRoute>
              <Security />
            </ProtectedRoute>
        },
        {
          path: 'notifications',
          element: 
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
        },
        {
          path: 'notifications/manage',
          element: 
            <ProtectedRoute>
              <Manage />
            </ProtectedRoute>
        },
        {
          path: 'setup',
          element: 
          <ProtectedRoute>
            <Setup/>
          </ProtectedRoute>
        },
        {
          path: 'share/:trackId',
          element: <Share />
        }
      ]
    }
  ]);
   //
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user, 'user');
      
      if (user) {
        getIdToken(user).then(async (token) => {
          const response = await axios.get('account/', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const provider = user.providerData[0].providerId;

          dispatch(saveUser({
            data: response.data,
            token: token,
            email: user.email,
            signInMethod: provider === 'google.com' ? 'google' : 'locale'
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
