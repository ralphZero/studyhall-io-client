import React, { useMemo } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Space } from 'antd';

import SideNavMenu from './SideNavMenu';
import './SizeNav.css';
import { useLocation } from 'react-router-dom';

const SideNav = () => {
  const location = useLocation();

  const currentRoute = useMemo(() => {
    const url = location.pathname;
    const regex = /^\/([^/]+)/;
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
          <Avatar icon={<UserOutlined />} />
        </Space>
        <SideNavMenu currentRoute={currentRoute} />
      </Layout.Sider>
    </>
  );
};

export default SideNav;
