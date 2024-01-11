import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { api as service } from 'utils/axios';
// import { auth, messaging } from 'utils/firebase';
import { auth } from 'utils/firebase';
import { saveUser } from 'app/auth';
// import { getToken, onMessage } from 'firebase/messaging';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import { api, useGetAccountQuery } from 'store/api';
import { store } from 'app/store';
import { persistStore } from 'redux-persist';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyChest from 'routes/my-chest';
import Root from 'routes/root';
// import SignIn from 'routes/sign-in';
import SignIn from 'routes/sign-in-default';
import SignInBeta from 'routes/sign-in-beta';
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
import Upload from 'routes/upload';
import Share from 'routes/share';
import Treasure from 'routes/treasure';
import Trash from 'routes/trash';
import SharedPlay from 'routes/shared-play';

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
              {process.env.REACT_APP_BETA 
                ? (<SignInBeta />)
                : (<SignIn />)
              }
            </DisconnectedRoute>
        },
        {
          path: '/sign-up',
          element: <SignUp />
        },
        {
          path: '/my-chest',
          element:
            <ProtectedRoute onlyArtist={true}>
              <MyChest />
            </ProtectedRoute>,
        },
        {
          path: '/my-chest/upload',
          element:
            <ProtectedRoute onlyArtist={true}>
              <Upload />
            </ProtectedRoute>
        },
        {
          path: '/my-chest/treasure/:id',
          element:
            <ProtectedRoute onlyArtist={true}>
              <Treasure />
            </ProtectedRoute>
        },
        {
          path: '/my-chest/treasure/:id/trash',
          element:
            <ProtectedRoute onlyArtist={true}>
              <Trash />
            </ProtectedRoute>
        },
        {
          path: 'shared',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Shared />
            </ProtectedRoute>
        },
        {
          path: 'profile',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Profile />
            </ProtectedRoute>
        },
        {
          path: 'profile/played',
          element:
            <ProtectedRoute onlyArtist={false}>
              <RecentlyPlayed />
            </ProtectedRoute>
        },
        {
          path: 'profile/permissions',
          element:
            <ProtectedRoute onlyArtist={true}>
              <Permissions />
            </ProtectedRoute>
        },
        {
          path: 'profile/account',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Account />
            </ProtectedRoute>
        },
        {
          path: 'profile/help',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Help />
            </ProtectedRoute>
        },
        {
          path: 'profile/terms',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Terms />
            </ProtectedRoute>
        },
        {
          path: 'profile/security',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Security />
            </ProtectedRoute>
        },
        {
          path: 'notifications',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Notifications />
            </ProtectedRoute>
        },
        {
          path: 'notifications/manage',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Manage />
            </ProtectedRoute>
        },
        {
          path: 'setup',
          element:
            <ProtectedRoute onlyArtist={false}>
              <Setup />
            </ProtectedRoute>
        },
        {
          path: 'share/:trackId',
          element: <Share />
        },
        {
          path: '/shared-link',
          element: <SharedPlay />
        }
      ]
    }
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then(async (token) => {
          const response = await service.get('account/', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const provider = user?.providerData[0].providerId;
          dispatch(saveUser({
            data: response.data,
            token: token,
            email: user?.email,
            signInMethod: provider === 'google.com' ? 'google' : 'local'
          }));
        });
      } else {
        dispatch(saveUser(undefined));
        api.util.resetApiState();
        persistStore(store).purge();
      }
    });
    /** push notifications */
    // getToken(messaging, { vapidKey: process.env.REACT_APP_MESSAGING }).then((currentToken) => {
    //   if (currentToken) {
    //     console.log(currentToken);
    //   } else {
    //     console.log('No registration token available. Request permission to generate one.');
    //   }

    //   onMessage(messaging, (payload) => {
    //     console.log('Message received. ', payload);
    //     toast(payload);
    //   });
    // }).catch((err) => {
    //   console.log('An error occurred while retrieving token. ', err);
    // });
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
