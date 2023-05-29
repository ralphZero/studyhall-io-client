import React from 'react';
import LoadingSkeleton from '../../../components/PlanPage/LoadingSkeleton';
import ErrorPlanPage from '../../../components/PlanPage/ErrorPage';
import { Plan } from '../../../models/v2/plan';

interface IPreparePlanPage {
  hallId: string;
  plans: Plan[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  onSuccess: (plan: Plan) => JSX.Element;
}

export const preparePlanPage = ({
  plans,
  isLoading,
  isSuccess,
  onSuccess,
  hallId,
}: IPreparePlanPage): JSX.Element => {
  if (isLoading) {
    return <LoadingSkeleton />;
  } else if (isSuccess && !!plans) {
    const index = plans.findIndex((plan) => plan._id === hallId);
    if (index !== -1) {
      return onSuccess(plans[index]);
    } else {
      return <ErrorPlanPage />;
    }
  } else {
    return <ErrorPlanPage />;
  }
};
