import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "./App.css";
import DataContextProvider from "./context/DataContext";
import CreatePlan from "./pages/CreatePlan";
import HallPage from './pages/HallPage';

function App() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routes>
          <Route path="/halls" element={<CreatePlan />} />
          <Route path="/halls/:hallId" element={<HallPage />} />
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
