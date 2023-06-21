import { Task } from '../../../../models/v2/task';

export interface TaskResponse {
  success: boolean;
  data: Task[];
  error: any;
}
