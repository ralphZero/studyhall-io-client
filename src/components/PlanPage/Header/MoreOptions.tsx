import React from 'react';
import { Button } from 'antd';
import Icon from '@ant-design/icons';
import { ReactComponent as MoreOptionsIcon } from '../../../assets/more_option_icon.svg';

const MoreOptions = () => {
  return (
    <Button
      type='text'
      shape='circle'
      icon={<Icon component={MoreOptionsIcon} />}
    />
  );
};

export default MoreOptions;
