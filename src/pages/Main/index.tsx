import React from 'react';
import SideNav from '../../components/SideNav';
import { Layout } from 'antd';

const Main = () => {
  return (
    <Layout className='min-h-screen'>
      <SideNav />
      <Layout id='main-container'></Layout>
    </Layout>
  );
};

export default Main;
