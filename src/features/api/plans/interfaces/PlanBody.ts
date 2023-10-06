import { TaskIdObj } from '../../../../models/v2/taskIdObj';

export interface PlanTaskIdBody {
  _id: string;
  taskIdsObj: TaskIdObj;
}

export interface PlanDtoBody {
  title: string;
  description?: string;
  startTimestamp: string;
  endTimestamp: string;
}
