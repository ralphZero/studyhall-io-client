import React from 'react';
import LoadingSkeleton from '../../../components/PlanPage/LoadingSkeleton';
import ErrorPlanPage from '../../../components/PlanPage/ErrorPage';
import { Plan } from '../../../models/v2/plan';

interface IPreparePlanPage {
  planId: string;
  plans: Plan[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  onSuccess: (plan: Plan) => JSX.Element;
  onPlanNotFound: () => JSX.Element;
}

export const preparePlanPage = ({
  plans,
  isLoading,
  isSuccess,
  onSuccess,
  onPlanNotFound,
  planId,
}: IPreparePlanPage): JSX.Element => {
  if (isLoading) {
    return <LoadingSkeleton />;
  } else if (isSuccess && !!plans) {
    const index = plans.findIndex((plan) => plan._id === planId);
    if (index !== -1) {
      return onSuccess(plans[index]);
    } else {
      return onPlanNotFound();
    }
  } else {
    return <ErrorPlanPage />;
  }
};
