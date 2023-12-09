import { Task } from '../../../models/v2/task';
import { hallifyApi } from '../hallifyApi';
import { TaskDtoBody } from './interfaces/TaskBody';
import { TaskPostResponse, TaskResponse } from './interfaces/TaskResponse';

export const taskApi = hallifyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], {}>({
      query: (planId: string) => ({ url: `plans/${planId}/tasks` }),
      transformResponse: (response: TaskResponse, meta, args) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tasks' as const, id: _id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    postTask: builder.mutation<TaskPostResponse, TaskDtoBody>({
      query: (taskDto) => ({
        url: `plans/${taskDto.planId}/tasks`,
        method: 'POST',
        body: taskDto,
      }),
      invalidatesTags: (_, __, body) => [
        { type: 'Tasks', id: 'LIST' },
        { type: 'Plans', id: body.planId },
      ],
    }),
  }),
});

export const { useGetTasksQuery, useLazyGetTasksQuery, usePostTaskMutation } =
  taskApi;
