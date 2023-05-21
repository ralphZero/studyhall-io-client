import React, { useMemo } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Space } from 'antd';

import SideNavMenu from './SideNavMenu';
import { useLocation } from 'react-router-dom';
import './SizeNav.css';
import { useFirebaseAuth } from '../../services/auth/useAuth';

const SideNav = () => {
  const location = useLocation();
  const { isReady, user, signOut } = useFirebaseAuth();

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

  return (
    <>
      <Layout.Sider className='side-nav' trigger={null} collapsed={true}>
        <Space className='avatar-container'>
          {!isReady ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
            <Avatar
              onClick={() => signOut()}
              src={<img src={user?.photoUrl as string} alt='avatar' />}
            />
          )}
        </Space>
        <SideNavMenu currentRoute={currentRoute} />
      </Layout.Sider>
    </>
  );
};

export default SideNav;
