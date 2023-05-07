import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Space } from 'antd';

import './SizeNav.css';
import SideNavMenu from './SideNavMenu';

const SideNav = () => {
  return (
    <>
      <Layout.Sider className='side-nav' trigger={null} collapsed={true}>
        <Space className='avatar-container'>
          <Avatar icon={<UserOutlined />} />
        </Space>
        <SideNavMenu />
      </Layout.Sider>
    </>
  );
};

export default SideNav;
