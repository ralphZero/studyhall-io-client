import { Plan } from '../../../models/v2/plan';
import { hallifyApi } from '../hallifyApi';
import { PlanTaskIdBody } from './interfaces/PlanBody';
import { PlanPatchResponse, PlanResponse } from './interfaces/PlanResponse';

export const planApi = hallifyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getPlans: builder.query<Plan[], {}>({
      query: () => ({ url: 'plans/' }),
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Plan' as const, _id }))]
          : [{ type: 'Plan', id: 'LIST' }],
      transformResponse: (response: PlanResponse, meta, arg) => response.data,
    }),
    getPlanById: builder.query({
      query: (planId) => ({ url: `plans/${planId}` }),
      providesTags: (result, err, id) => [{ type: 'Plan', id }],
    }),
    updateTaskIdOfPlan: builder.mutation<PlanPatchResponse, PlanTaskIdBody>({
      query: ({ _id, ...body }) => ({
        url: `plans/${_id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: PlanPatchResponse, meta, arg) =>
        response.data,
      invalidatesTags: ['Plan'],
    }),
  }),
});

export const {
  useGetPlanByIdQuery,
  useGetPlansQuery,
  useUpdateTaskIdOfPlanMutation,
} = planApi;
