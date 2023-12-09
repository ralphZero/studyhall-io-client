import { Label, Todo } from '../../../../models/v2/task';

export interface TaskDtoBody {
  title: string;
  labels: Label[];
  priority: string;
  deadline: string;
  description: string;
  timestamp?: string;
  planId?: string;
  todos: Todo[];
}
