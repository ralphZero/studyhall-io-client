import { Plan } from '../../../../models/v2/plan';

export interface PlanResponse {
  success: boolean;
  data: Plan[];
  error: any;
}
