import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DataContextProvider from "./context/DataContext";
import { UserContext } from "./context/UserContext";
import CreatePlan from "./pages/CreatePlan";
import HallPage from "./pages/HallPage";
import LandingPage from "./pages/LandingPage";

import "./App.css";

function App() {
  const { user } = useContext(UserContext);
  console.log({ user });
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routes>
          <Route path="/" element={user ? <CreatePlan /> : <LandingPage />} />
          <Route
            path="/halls/:hallId"
            element={user ? <HallPage /> : <LandingPage />}
          />
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
