import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

import './ViewSwitcher.css';

const ViewSwitcher = () => {
  return (
    <>
      <Segmented
        id='view-switcher'
        options={[
          {
            label: 'Board view',
            value: 'board',
            icon: <AppstoreOutlined />,
          },
          {
            label: 'List view',
            value: 'list',
            icon: <BarsOutlined />,
          },
        ]}
      />
    </>
  );
};

export default ViewSwitcher;
