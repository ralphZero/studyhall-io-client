import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import DataContextProvider from './context/DataContext';
import './App.css';
import DataFilterContextProvider from './context/DataFilterContext';
import AppRoutesWrapper from './pages/AppRoutesWrapper';

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
