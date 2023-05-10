import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Landing/LandingPage';
import Main from './Main';
import Login from './Login';
import LoadingScreen from '../components/skeletons/LoadingScreen';
import { UserContext } from '../context/UserContext';

const AppRoutesWrapper = () => {
  const { user, isLoading } = useContext(UserContext);

  const setPage = (ifUserComponent: JSX.Element) => {
    if (isLoading) {
      return <LoadingScreen />;
    } else {
      return user ? ifUserComponent : <Login />;
    }
  };
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/app/*' element={setPage(<Main />)} />
    </Routes>
  );
};

export default AppRoutesWrapper;
