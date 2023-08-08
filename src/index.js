import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, MyChest, Shared, Profile, Track, SignIn, SignUp, Manage, Notifications } from 'routes'
import reportWebVitals from './reportWebVitals';
import store from 'app/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'my-chest',
        element: <MyChest />
      },
      {
        path: 'my-chest/track/:trackId',
        element: <Track />
      },
      {
        path: 'shared',
        element: <Shared />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'notifications',
        element: <Notifications />
      },
      {
        path: 'notifications/manage',
        element: <Manage />
      }
    ],
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
