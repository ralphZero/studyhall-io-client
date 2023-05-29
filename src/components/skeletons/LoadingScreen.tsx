import React from 'react';
import { Space, Spin } from 'antd';
import logo from '../../assets/logo.svg';

const LoadingScreen = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <Space
        direction='vertical'
        style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img height={32} src={logo} alt='...' />
        </div>
        <Spin />
      </Space>
    </div>
  );
};

export default LoadingScreen;
