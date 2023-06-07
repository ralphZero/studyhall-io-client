import React from 'react';
import PlanHeader from '../../../components/PlanPage/Header';
import { Plan } from '../../../models/v2/plan';
import PlanBoard from '../../../components/PlanPage/PlanBoard';

interface IPlanPage {
  currentPlan: Plan;
}
const PlanPage = ({ currentPlan }: IPlanPage) => {
  return (
    <div className='min-h-screen flex flex-col bg-hallifyWhite'>
      <PlanHeader plan={currentPlan} />
      <PlanBoard />
    </div>
  );
};

export default PlanPage;
