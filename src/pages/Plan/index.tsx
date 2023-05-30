import React, { useCallback, useEffect } from 'react';
import UniversalSider from '../../components/UniversalSider';
import GettingStarted from './components/GettingStarted';
import PlanPage from './components/PlanPage';

import { Button, Layout } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RightSquareOutlined } from '@ant-design/icons';
import { useGetPlansQuery } from '../../features/api/plans/planApi';
import { preparePlanPage } from './helpers/preparePlanPage';
import { useDispatch } from 'react-redux';
import { updateActivePlanId } from '../../features/ui/globalUiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Plan = () => {
  const { data: plans, isSuccess, isLoading, isError } = useGetPlansQuery({});
  const pageQuery = useParams()['*'];

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { activePlanId } = useSelector((state: RootState) => state.ui);

  const planId = pageQuery;

  useEffect(() => {
    if (isSuccess) {
      const index = plans.findIndex((plan) => plan._id === pageQuery);
      if (index !== -1) {
        dispatch(updateActivePlanId(plans[index]._id));
      }
    }
  }, [pageQuery, plans, isSuccess, dispatch]);

  useEffect(() => {
    if (!pageQuery && activePlanId) {
      navigate(`${activePlanId}`, { replace: true });
    }
  }, [activePlanId, navigate, pageQuery]);

  const buildPage = useCallback(
    () =>
      planId ? (
        preparePlanPage({
          plans,
          planId,
          isLoading,
          isError,
          isSuccess,
          onSuccess: (plan) => {
            return <PlanPage currentPlan={plan} />;
          },
        })
      ) : (
        <GettingStarted />
      ),
    [isError, isLoading, isSuccess, planId, plans]
  );

  const planItems =
    isSuccess &&
    plans.map((plan) => {
      const active =
        activePlanId === plan._id ? 'text-selectedTextLight' : 'text-textLight';
      return (
        <Link key={plan._id} to={`${plan._id}`}>
          <div
            className={`${active} hover:text-selectedTextLight my-2 truncate`}>
            <RightSquareOutlined className='mr-1' />
            {plan.title}
          </div>
        </Link>
      );
    });

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
