import { TaskIdObj } from '../../../../models/v2/taskIdObj';

export interface PlanTaskIdBody {
  _id: string;
  taskIdsObj: TaskIdObj;
}
