import { Task } from '../../../models/v2/task';
import { hallifyApi } from '../hallifyApi';
import { TaskResponse } from './interfaces/TaskResponse';

export const taskApi = hallifyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], {}>({
      query: (planId: string) => ({ url: `plans/${planId}/tasks` }),
      transformResponse: (response: TaskResponse, meta, args) => response.data,
    }),
  }),
});

export const { useGetTasksQuery, useLazyGetTasksQuery } = taskApi;
