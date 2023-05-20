import { hallifyApi } from '../hallifyApi';

export const planApi = hallifyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({}),
});
