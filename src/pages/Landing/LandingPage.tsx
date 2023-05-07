import { Button, Space } from 'antd';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import logo from '../../assets/logo.svg';

import './LandingPage.css';
import moment from 'moment';

const LandingPage = () => {
  const { logIn } = useContext(UserContext);
  return (
    <>
      <div className='hero'>
        <div className='hero-login'>
          <Space direction='vertical'>
            <Space>
              <img height={62} src={logo} alt='...' />
            </Space>
            <h2 className='hero-h2'>
              Hallify helps you organize and track your progress when you are
              studying
            </h2>
            <Button
              onClick={logIn}
              className='ant-btn-primary'
              style={{ paddingInline: '25px' }}
              size='large'>
              Get started
            </Button>
          </Space>
          <div className='hero-footer'>
            {moment().weekYear()} &copy; hallify.app
          </div>
        </div>

        <div className='hero-group'>
          <h1 className='hero-h1'>
            Create the perfect study plan that works for you
          </h1>
          <div className='hero-image'></div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
