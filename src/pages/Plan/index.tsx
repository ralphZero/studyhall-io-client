import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Layout } from 'antd';
import UniversalSider from '../../components/UniversalSider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GettingStarted from './components/GettingStarted';
import { RightSquareOutlined } from '@ant-design/icons';
import { useGetPlansQuery } from '../../features/api/plans/planApi';
import PlanPage from './components/PlanPage';
import { preparePlanPage } from './helpers/preparePlanPage';
import { useDispatch } from 'react-redux';
import { updateActivePlanId } from '../../features/ui/globalUiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Plan = () => {
  const { data: plans, isSuccess, isLoading, isError } = useGetPlansQuery({});
  const pageQuery = useParams()['*'];
  const dispatch = useDispatch();
  const { activePlanId } = useSelector((state: RootState) => state.ui);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageQuery && activePlanId) {
      navigate(`${activePlanId}`, { replace: true });
    }
  }, [activePlanId, navigate, pageQuery]);

  const planId = useMemo<string>(() => {
    if (activePlanId) return activePlanId;
    return pageQuery as string;
  }, [activePlanId, pageQuery]);

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
            dispatch(updateActivePlanId(plan._id));
            return <PlanPage currentPlan={plan} />;
          },
        })
      ) : (
        <GettingStarted />
      ),
    [dispatch, planId, isError, isLoading, isSuccess, plans]
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
