import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutesWrapper from './pages/AppRoutesWrapper';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutesWrapper />
    </BrowserRouter>
  );
}

export default App;
