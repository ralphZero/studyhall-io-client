import React from 'react';
import Icon from '@ant-design/icons';
import { Segmented } from 'antd';
import { ReactComponent as ListIcon } from '../../../../assets/list_icon.svg';
import { ReactComponent as BoardIcon } from '../../../../assets/board_icon.svg';

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
            icon: <Icon component={BoardIcon} />,
          },
          {
            label: 'List view',
            value: 'list',
            icon: <Icon component={ListIcon} />,
          },
        ]}
      />
    </>
  );
};

export default ViewSwitcher;
