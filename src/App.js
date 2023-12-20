import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { api as service } from 'utils/axios';
import { auth } from 'utils/firebase';
import { saveUser } from 'app/auth';
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import { api } from 'store/api';
import { store } from 'app/store';
import { persistStore } from 'redux-persist';

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
import Upload from 'routes/upload';
import Share from 'routes/share';
import Treasure from 'routes/treasure';
import Trash from 'routes/trash';

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
            </ProtectedRoute>,
        },
        {
          path: '/my-chest/upload',
          element:
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
        },
        {
          path: '/my-chest/treasure/:id',
          element:
            <ProtectedRoute>
              <Treasure />
            </ProtectedRoute>
        },
        {
          path: '/my-chest/treasure/:id/trash',
          element:
            <ProtectedRoute>
              <Trash />
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
              <Setup />
            </ProtectedRoute>
        },
        {
          path: 'share/:trackId',
          element: <Share />
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
            token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhM2JkODk4ZGE1MGE4OWViOWUxY2YwYjdhN2VmZTM1OTNkNDEwNjgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRHlsYW4gR2F2aWxhbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJOWNwVDRSRld0OTBxS1E2eUZMQ0sxNXVwX3BiNklwQ0NQcDdURC1MRTgwV2M9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2hlc3RtdXNpYy02MDEyMSIsImF1ZCI6ImNoZXN0bXVzaWMtNjAxMjEiLCJhdXRoX3RpbWUiOjE3MDE3MDQ0NDksInVzZXJfaWQiOiJhVkxTQWhCUTMyYnB2MlppOGswQk9mZWQ1T2MyIiwic3ViIjoiYVZMU0FoQlEzMmJwdjJaaThrMEJPZmVkNU9jMiIsImlhdCI6MTcwMTg5NDQ5MiwiZXhwIjoxNzAxODk4MDkyLCJlbWFpbCI6ImR5bGFuLmdhdmlsYW4zMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNTM4ODY1MDgyNjY1MzMyNzA4OCJdLCJlbWFpbCI6WyJkeWxhbi5nYXZpbGFuMzJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.O7igagYtv6BQrBzWXGWHF2GlQ0Y2Pu_B7kUmNDQ_eStZIRj_hUuxOFkQW24uQkk37bRHdjOZOQLUHVYVwRIjsATohHY5_0lYQIEXSOPw-eJVwJprGZXcaH1XNtY5Kbk3_HEODWPY6PXbwBt1o6n24FIrbSEnRPwr5uQIbDQj8yUWCvNV2XBJul8f-Sa4Qcysu38UBBGDj0ENug8qriJD2c-pj4pAo9SCCq_kpmaPtaBYMBk0cE8JxQND3OQ2xMyy34qw0eRUBXZ4SERW3hl6SnHCO3pMYsyBH16_bhwXWLSRFhgHOGXjhPOjzjFq2FHohDYIrOpRNBtnPeqpuE6mUg',
            email: user?.email,
            signInMethod: provider === 'google.com' ? 'google' : 'local'
          }));
        });
      } else {
        dispatch(saveUser(undefined));
        api.util.resetApiState();
        persistStore(store).purge();
      }
    })
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
