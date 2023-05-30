import React from 'react';
import HeaderTitle from './HeaderTitle';
import ViewSwitcher from './ViewSwitcher';
import ProgressIndicator from './ProgressIndicator';
import { Divider } from 'antd';
import FilterToggle from './FilterToggle';
import MoreOptions from './MoreOptions';
import { Plan } from '../../../models/v2/plan';

interface IPlanHeader {
  plan: Plan;
}

const PlanHeader = ({ plan }: IPlanHeader) => {
  const { progress, title, description } = plan;
  return (
    <div className='global-header-style justify-between border-dividerDark px-6 w-full bg-[#ffffff]'>
      <HeaderTitle title={title} description={description as string} />
      <div className='flex items-center gap-4 h-full'>
        <ProgressIndicator progress={progress} />
        <Divider className='h-8 bg-dividerDark' type='vertical' />
        <ViewSwitcher />
        <FilterToggle />
        <MoreOptions />
      </div>
    </div>
  );
};

export default PlanHeader;
