import React, { useContext, useMemo } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Space } from 'antd';

import SideNavMenu from './SideNavMenu';
import { useLocation } from 'react-router-dom';
import './SizeNav.css';
import { UserContext } from '../../context/UserContext';

const SideNav = () => {
  const location = useLocation();

  const currentRoute = useMemo(() => {
    const url = location.pathname;
    const regex = /^\/app\/([^/]+)/;
    const match = regex.exec(url);

    let firstRoute = 'plan';
    if (match && match[1]) {
      firstRoute = match[1];
    }
    return firstRoute;
  }, [location]);

  const { user, isLoading } = useContext(UserContext);

  return (
    <>
      <Layout.Sider className='side-nav' trigger={null} collapsed={true}>
        <Space className='avatar-container'>
          {isLoading ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
            <Avatar src={<img src={user?.photoURL as string} alt='avatar' />} />
          )}
        </Space>
        <SideNavMenu currentRoute={currentRoute} />
      </Layout.Sider>
    </>
  );
};

export default SideNav;
