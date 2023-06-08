import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import DataContextProvider from './context/DataContext';
import DataFilterContextProvider from './context/DataFilterContext';
import AppRoutesWrapper from './pages/AppRoutesWrapper';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <DataFilterContextProvider>
          <AppRoutesWrapper />
        </DataFilterContextProvider>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
