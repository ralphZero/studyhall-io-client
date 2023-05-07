import React from 'react';
import Icon, { UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Space } from 'antd';

import PlanIcon from '../../assets/icons/ico_plans.svg';
import DashboardIcon from '../../assets/icons/ico_dashboard.svg';
import InfoIcon from '../../assets/icons/ico_info.svg';

import './SizeNav.css';

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
              icon: <Icon component={PlanIcon} />,
              label: 'Plans',
            },
            {
              key: '2',
              icon: <Icon component={DashboardIcon} />,
              label: 'Dashboard',
            },
            {
              key: '3',
              icon: <Icon component={InfoIcon} />,
              label: 'Info',
            },
          ]}
        />
      </Layout.Sider>
    </>
  );
};

export default SideNav;
