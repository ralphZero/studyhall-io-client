import React from 'react';
import { Button, Tooltip } from 'antd';
import { ReactComponent as FilterIcon } from '../../../../assets/filter_icon.svg';
import Icon from '@ant-design/icons';

const FilterToggle = () => {
  return (
    <Tooltip title='Filter'>
      <Button
        className='font-sans font-medium text-sm text-textLight'
        icon={<Icon className='text-textLight' component={FilterIcon} />}
        type='text'>
        Filter
      </Button>
    </Tooltip>
  );
};

export default FilterToggle;
