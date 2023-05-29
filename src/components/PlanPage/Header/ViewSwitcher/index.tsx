import React from 'react';
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
            icon: <BoardIcon />,
          },
          {
            label: 'List view',
            value: 'list',
            icon: <ListIcon />,
          },
        ]}
      />
    </>
  );
};

export default ViewSwitcher;
