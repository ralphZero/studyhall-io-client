import React from 'react';
import HeaderTitle from './HeaderTitle';
import ViewSwitcher from './ViewSwitcher';
import ProgressIndicator from './ProgressIndicator';
import { Divider } from 'antd';

const PlanHeader = () => {
  return (
    <div className='global-header-style justify-between border-dividerDark px-6 w-full bg-[#ffffff]'>
      <HeaderTitle />
      <div className='flex items-center h-full'>
        <ProgressIndicator />
        <Divider className='h-8 m-6 bg-dividerDark' type='vertical' />
        <ViewSwitcher />
      </div>
    </div>
  );
};

export default PlanHeader;
