import React from 'react';
import { Button } from 'antd';
import UniversalSider from '../../components/UniversalSider';

const Plan = () => {
  return (
    <div className='min-h-screen flex'>
      <UniversalSider>
        <Button className='bg-accent-primary w-full mt-3' type='primary'>
          New study plan
        </Button>
      </UniversalSider>
      <section className='grow'></section>
    </div>
  );
};

export default Plan;
