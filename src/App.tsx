import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DataContextProvider from "./context/DataContext";
import { UserContext } from "./context/UserContext";
import CreatePlan from "./pages/CreatePlan";
import HallPage from "./pages/HallPage";
import LandingPage from "./pages/LandingPage";

import "./App.css";
import LoadingScreen from "./components/skeletons/LoadingScreen";

function App() {
  const { user, isLoading } = useContext(UserContext);

  const setPage = (ifUserComponent: JSX.Element, noUserComponent: JSX.Element) => {
    if(isLoading) {
      return <LoadingScreen />
    } else {
      return user ? ifUserComponent : noUserComponent;
    }
  }

  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routes>
          <Route path="/" element={ setPage(<CreatePlan />, <LandingPage />)} />
          <Route
            path="/halls/:hallId"
            element={ setPage(<HallPage />, <LandingPage />)}
          />
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
