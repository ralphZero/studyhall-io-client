import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DataContextProvider from './context/DataContext';
import LandingPage from './pages/Landing/LandingPage';

import './App.css';
import DataFilterContextProvider from './context/DataFilterContext';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <DataFilterContextProvider>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/app' element={<Main />} />
          </Routes>
        </DataFilterContextProvider>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
