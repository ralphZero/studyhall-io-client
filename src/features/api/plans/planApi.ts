import { Plan } from '../../../models/v2/plan';
import { hallifyApi } from '../hallifyApi';
import { PlanResponse } from './interfaces/PlanResponse';

export const planApi = hallifyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getPlans: builder.query<Plan[], {}>({
      query: () => ({ url: 'plans/' }),
      transformResponse: (response: PlanResponse, meta, arg) => response.data,
    }),
    getPlanById: builder.query({
      query: (planId) => ({ url: `plans/${planId}` }),
    }),
  }),
});

export const { useGetPlanByIdQuery, useGetPlansQuery } = planApi;
