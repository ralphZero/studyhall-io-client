import { Plan } from '../../../../models/v2/plan';

export interface PlanResponse {
  success: boolean;
  data: Plan[];
  error: any;
}

export interface PlanPatchResponse {
  success: boolean;
  data: any;
  error: any;
}

export interface PlanPostResponse {
  success: boolean;
  data: any;
  error: any;
}
