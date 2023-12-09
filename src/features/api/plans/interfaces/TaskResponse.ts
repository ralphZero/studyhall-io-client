import { Task } from '../../../../models/v2/task';

export interface TaskResponse {
  success: boolean;
  data: Task[];
  error: any;
}

export interface TaskPostResponse {
  success: boolean;
  data: TaskPostResponseData;
  error: any;
}

export interface TaskPostResponseData {
  acknowledged: boolean;
  insertedId: string;
}
