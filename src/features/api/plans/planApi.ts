import { Plan } from '../../../models/v2/plan';
import { hallifyApi } from '../hallifyApi';
import {
  PlanDeleteDto,
  PlanDtoBody,
  PlanTaskIdBody,
} from './interfaces/PlanBody';
import {
  PlanDeleteResponse,
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
    deletePlan: builder.mutation<PlanDeleteResponse, PlanDeleteDto>({
      query: (planDto) => ({
        url: 'plans/',
        method: 'DELETE',
        body: planDto,
      }),
      invalidatesTags: (result) => [{ type: 'Plans', id: 'LIST' }],
      // React Optimistic Updates
      // https://redux-toolkit.js.org/rtk-query/usage/examples#react-optimistic-updates
      async onQueryStarted(planDeleteDto, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          planApi.util.updateQueryData('getPlans', {}, (plansDraft) => {
            const index = plansDraft.findIndex(
              (plan) => plan._id === planDeleteDto.planId
            );
            plansDraft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
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
  useDeletePlanMutation,
} = planApi;
