import React, { useContext } from 'react';
import SideNav from '../../components/SideNav';
import { Layout } from 'antd';

import LoadingScreen from '../../components/skeletons/LoadingScreen';
import { UserContext } from '../../context/UserContext';
import { Route, Routes } from 'react-router-dom';
import CreatePlan from '../CreatePlan';
import Login from '../Login';
import HallPage from '../HallPage';
import Dashboard from '../Dashboard';
import Info from '../Info';
import Notification from '../Notification';
import Settings from '../Settings';
import Plan from '../Plan';

interface MainProps {
  children?: JSX.Element | JSX.Element[];
}

const Main = (props: MainProps) => {
  const { user, isLoading } = useContext(UserContext);

  const setPage = (ifUserComponent: JSX.Element) => {
    if (isLoading) {
      return <LoadingScreen />;
    } else {
      return user ? ifUserComponent : <Login />;
    }
  };

  return (
    <Layout className='min-h-screen'>
      <SideNav />
      <Layout id='main-container'>
        <Routes>
          <Route path='/' element={setPage(<Plan />)} />
          <Route path='/halls/:hallId' element={setPage(<HallPage />)} />
          <Route path='/dashboard' element={setPage(<Dashboard />)} />
          <Route path='/info' element={setPage(<Info />)} />
          <Route path='/notification' element={setPage(<Notification />)} />
          <Route path='/settings' element={setPage(<Settings />)} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default Main;
