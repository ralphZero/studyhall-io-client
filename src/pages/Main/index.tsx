import React from 'react';
import SideNav from '../../components/SideNav';
import { Layout } from 'antd';
import Dashboard from '../Dashboard';
import Info from '../Info';
import Notification from '../Notification';
import Settings from '../Settings';
import Plan from '../Plan';
import { Navigate, Route, Routes } from 'react-router-dom';
import ModalManager from '../../components/ModalManager';

interface MainProps {
  children?: JSX.Element | JSX.Element[];
}

const Main = (props: MainProps) => {
  return (
    <Layout hasSider className='min-h-screen'>
      <SideNav />
      <Layout id='main-container'>
        <Routes>
          <Route path='/plan/*' element={<Plan />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/info' element={<Info />} />
          <Route path='/notifications' element={<Notification />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<Navigate to='plan/' />} />
        </Routes>
        <ModalManager />
      </Layout>
    </Layout>
  );
};

export default Main;
