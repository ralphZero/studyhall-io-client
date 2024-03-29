import { TaskIdObj } from './taskIdObj';

export interface Plan {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  startTimestamp: string;
  endTimestamp: string;
  progress: number;
  taskIdObj: TaskIdObj;
}
