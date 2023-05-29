import React from 'react';
import { Progress } from 'antd';

import './ProgressIndicator.css';

const ProgressIndicator = () => {
  return (
    <div id='progress-indicator' className='flex flex-col'>
      <div className='text-general font-sans'>
        <span className='font-semibold text-base mr-1'>Progress:</span>
        <span className='font-medium text-sm'>75%</span>
      </div>
      <Progress
        className='leading-[0] mb-[4px]'
        percent={30}
        size='small'
        showInfo={false}
      />
    </div>
  );
};

export default ProgressIndicator;
