import React from 'react';
import PlanHeader from '../../../../components/PlanPage/Header';
import { Plan } from '../../../../models/v2/plan';

interface IPlanPage {
  currentPlan: Plan;
}
const PlanPage = ({ currentPlan }: IPlanPage) => {
  return (
    <div className='min-h-screen flex bg-hallifyWhite'>
      <PlanHeader />
    </div>
  );
};

export default PlanPage;
