import { Label, Todo } from '../../../../models/v2/task';

export interface TaskDtoBody {
  _id?: string;
  id: string;
  title: string;
  labels: Label[];
  priority: number;
  deadline: string;
  description: string;
  timestamp?: string;
  planId?: string;
  todos: Todo[];
  isCompleted?: boolean;
}
