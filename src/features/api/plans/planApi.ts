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
      invalidatesTags: (result, error, { _id }) => [{ type: 'Plan', id: _id }],
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
} = planApi;
