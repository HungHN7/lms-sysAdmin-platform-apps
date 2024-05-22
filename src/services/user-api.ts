import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const UserAPI = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: 'UserAPI',
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
    getUserSettings: builder.query({
      query: () => ({
        url: `/user-settings`,
      }),
    }),
    verifyTenantUserAccount: builder.mutation({
      query: (body) => ({
        url: '/users/verify',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetUserSettingsQuery,
  useLazyGetUserSettingsQuery,
  useVerifyTenantUserAccountMutation,
} = UserAPI;
