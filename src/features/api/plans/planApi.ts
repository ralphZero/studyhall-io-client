import { Plan } from '../../../models/v2/plan';
import { hallifyApi } from '../hallifyApi';
import { PlanDtoBody, PlanTaskIdBody } from './interfaces/PlanBody';
import {
  PlanPatchResponse,
  PlanPostResponse,
  PlanResponse,
} from './interfaces/PlanResponse';

export const planApi = hallifyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getPlans: builder.query<Plan[], {}>({
      query: () => ({ url: 'plans/' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Plans' as const, _id })),
              { type: 'Plans', id: 'LIST' },
            ]
          : [{ type: 'Plans', id: 'LIST' }],
      transformResponse: (response: PlanResponse, meta, arg) => response.data,
    }),
    getPlanById: builder.query({
      query: (planId) => ({ url: `plans/${planId}` }),
      providesTags: (result, err, id) => [{ type: 'Plans', id }],
    }),
    postPlan: builder.mutation<PlanPostResponse, PlanDtoBody>({
      query: (planDto) => ({
        url: 'plans/',
        method: 'POST',
        body: planDto,
      }),
      invalidatesTags: (result) => [{ type: 'Plans', id: 'LIST' }],
    }),
    updateTaskIdOfPlan: builder.mutation<PlanPatchResponse, PlanTaskIdBody>({
      query: ({ _id, ...body }) => ({
        url: `plans/${_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { _id }) => [{ type: 'Plans', id: _id }],
      // React Optimistic Updates
      // https://redux-toolkit.js.org/rtk-query/usage/examples#react-optimistic-updates
      async onQueryStarted(planTaskIdBody, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          planApi.util.updateQueryData('getPlans', {}, (plansDraft) => {
            const index = plansDraft.findIndex(
              (plan) => plan._id === planTaskIdBody._id
            );
            const thisPlan = plansDraft[index];
            thisPlan.taskIdObj = planTaskIdBody.taskIdsObj;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      transformResponse: (response: PlanPatchResponse, meta, arg) =>
        response.data,
    }),
  }),
});

export const {
  useGetPlanByIdQuery,
  useGetPlansQuery,
  useUpdateTaskIdOfPlanMutation,
  usePostPlanMutation,
} = planApi;
