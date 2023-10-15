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
  data: PlanPostResponseData;
  error: any;
}

export interface PlanDeleteResponse {
  success: boolean;
  data: PlanDeleteResponseData;
  error: any;
}

export interface PlanPostResponseData {
  acknowledged: boolean;
  insertedId: string;
}

export interface PlanDeleteResponseData {
  acknowledged: boolean;
  deletedCount: number;
}
