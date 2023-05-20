import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store/store';
import endpoints from '../../services/endpoints';

export const hallifyApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', token);
      }
    },
  }),
  endpoints: () => ({}),
});
