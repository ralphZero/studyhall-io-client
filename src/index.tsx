import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContextProvider from './context/UserContext';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Provider>
);
