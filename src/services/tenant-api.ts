import { createApi } from '@reduxjs/toolkit/query/react';
import { baseNoAuthQuery } from './baseQuery';

export const TenantAPI = createApi({
  baseQuery: baseNoAuthQuery,
  reducerPath: 'TenantAPI',
  endpoints: (builder) => ({
    getTokenByDomain: builder.query({
      query: (params) => ({
        url: '/tenants/domains',
        params,
      }),
    }),
    createTenantAccount: builder.mutation({
      query: (body) => ({
        url: '/tenants/registration',
        body,
        method: 'POST',
      }),
    }),
    verifyTenantAccount: builder.mutation({
      query: (body) => ({
        url: '/tenants/verify',
        body,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetTokenByDomainQuery,
  useCreateTenantAccountMutation,
  useVerifyTenantAccountMutation,
} = TenantAPI;
