import React, { useCallback } from 'react';
import { Button, Layout } from 'antd';
import UniversalSider from '../../components/UniversalSider';
// import { DataContext } from '../../context/DataContext';
import { Link, useParams } from 'react-router-dom';
import HallPage from '../HallPage';
import GettingStarted from './GettingStarted';
import { RightSquareOutlined } from '@ant-design/icons';
import { useGetPlansQuery } from '../../features/api/plans/planApi';

const Plan = () => {
  // const { isLoading, dataList } = useContext(DataContext);
  const { data: plans, isLoading } = useGetPlansQuery({});
  const hallId = useParams()['*'];

  const planItems =
    plans &&
    plans.map((plan) => (
      <Link key={plan._id} to={`${plan._id}`}>
        <div className='text-textLight hover:text-selectedTextLight my-2 truncate'>
          <RightSquareOutlined className='mr-1' />
          {plan.title}
        </div>
      </Link>
    ));

  const buildPage = useCallback(
    () => (hallId ? <HallPage /> : <GettingStarted />),
    [hallId]
  );

  return (
    <div className='min-h-screen flex'>
      <UniversalSider>
        <Button className='bg-accent-primary w-full my-3' type='primary'>
          New study plan
        </Button>
        {isLoading ? <div className='text-white'>Loading...</div> : planItems}
      </UniversalSider>
      <Layout.Content className='grow min-h-screen h-screen overflow-x-hidden'>
        {buildPage()}
      </Layout.Content>
    </div>
  );
};

export default Plan;
