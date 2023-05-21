import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Landing/LandingPage';
import Main from './Main';
import Login from './Login';
import LoadingScreen from '../components/skeletons/LoadingScreen';
import { useFirebaseAuth } from '../services/auth/useAuth';

const AppRoutesWrapper = () => {
  const { user, isReady } = useFirebaseAuth();

  const setPage = (ifUserComponent: JSX.Element) => {
    if (!isReady) {
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
