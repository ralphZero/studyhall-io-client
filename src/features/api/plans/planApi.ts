import { hallifyApi } from '../hallifyApi';

export const planApi = hallifyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getPlanById: builder.query({
      query: (planId) => ({ url: `halls/${planId}` }),
    }),
  }),
});

export const { useGetPlanByIdQuery } = planApi;
