import React, { useContext, useCallback } from 'react';
import { Button, Layout } from 'antd';
import UniversalSider from '../../components/UniversalSider';
import { DataContext } from '../../context/DataContext';
import { Link, useParams } from 'react-router-dom';
import HallPage from '../HallPage';
import Login from '../Login';

const Plan = () => {
  const { isLoading, dataList } = useContext(DataContext);
  const hallId = useParams()['*'];

  const planItems = dataList.map((hall) => (
    <Link to={`${hall._id}`}>
      <div
        key={hall._id}
        className='text-[#ffffff] hover:text-accent-secondary my-2'>
        {hall.title}
      </div>
    </Link>
  ));

  const buildPage = useCallback(
    () => (hallId ? <HallPage /> : <Login />),
    [hallId]
  );

  return (
    <div className='min-h-screen flex'>
      <UniversalSider>
        <Button className='bg-accent-primary w-full mt-3' type='primary'>
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
