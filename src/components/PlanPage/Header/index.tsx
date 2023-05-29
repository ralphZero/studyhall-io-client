import React from 'react';
import HeaderTitle from './HeaderTitle';
import ViewSwitcher from './ViewSwitcher';
import ProgressIndicator from './ProgressIndicator';
import { Divider } from 'antd';
import FilterToggle from './FilterToggle';
import MoreOptions from './MoreOptions';

const PlanHeader = () => {
  return (
    <div className='global-header-style justify-between border-dividerDark px-6 w-full bg-[#ffffff]'>
      <HeaderTitle />
      <div className='flex items-center gap-4 h-full'>
        <ProgressIndicator />
        <Divider className='h-8 bg-dividerDark' type='vertical' />
        <ViewSwitcher />
        <FilterToggle />
        <MoreOptions />
      </div>
    </div>
  );
};

export default PlanHeader;
