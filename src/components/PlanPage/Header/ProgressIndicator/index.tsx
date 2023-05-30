import React from 'react';
import { Progress } from 'antd';

import './ProgressIndicator.css';

interface IProgressIndicator {
  progress: number;
}

const ProgressIndicator = ({ progress }: IProgressIndicator) => {
  const prepareProgressValue = () => {
    return +(progress * 100).toFixed(0);
  };

  return (
    <div id='progress-indicator' className='flex flex-col'>
      <div className='text-general font-sans'>
        <span className='font-semibold text-base mr-1'>Progress:</span>
        <span className='font-medium text-sm'>{prepareProgressValue()}%</span>
      </div>
      <Progress
        className='leading-[0] mb-[4px]'
        percent={prepareProgressValue()}
        size='small'
        showInfo={false}
      />
    </div>
  );
};

export default ProgressIndicator;
