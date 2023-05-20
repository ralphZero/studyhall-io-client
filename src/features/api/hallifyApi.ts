import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hallifyApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.hallify.com/' }),
  endpoints: () => ({}),
});
