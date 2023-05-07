import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Space } from 'antd';

import './SizeNav.css';
import PlanIcon from '../Icons/PlanIcon';
import DashboardIcon from '../Icons/DashboardIcon';
import InfoIcon from '../Icons/InfoIcon';

const SideNav = () => {
  return (
    <>
      <Layout.Sider className='side-nav' trigger={null} collapsed={true}>
        <Space className='avatar-container'>
          <Avatar icon={<UserOutlined />} />
        </Space>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <PlanIcon />,
              label: 'Plans',
            },
            {
              key: '2',
              icon: <DashboardIcon />,
              label: 'Dashboard',
            },
            {
              key: '3',
              icon: <InfoIcon />,
              label: 'Info',
            },
          ]}
        />
      </Layout.Sider>
    </>
  );
};

export default SideNav;
