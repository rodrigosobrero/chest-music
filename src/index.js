import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import App from 'App';
import './i18n';
import './index.css';
import ModalProvider from 'components/ModalProvider';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store);

root.render(
  <Suspense fallback={null}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </PersistGate>
    </Provider>
  </Suspense>
);