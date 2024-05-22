import { createApi } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';
import { baseNoAuthQuery, baseUrlGateway } from './baseQuery';

export const AuthAPI = createApi({
  baseQuery: baseNoAuthQuery,
  reducerPath: 'AuthAPI',
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/auth/token',
        body,
        method: 'POST',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `${baseUrlGateway}/users/passwords/forgot`,
        body,
        method: 'POST',
      }),
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: '/users/registration',
        body,
        method: 'POST',
      }),
    }),
    listRoles: builder.mutation({
      query: (body) => ({
        url: `/public/roles?${queryString.stringify(body)}`,
        method: 'GET',
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: '/users/update/password',
        body,
        method: 'POST',
      }),
    }),
    resendEmailForgotPassword: builder.mutation({
      query: (body) => ({
        url: '/users/passwords/resend',
        body,
        method: 'POST',
      }),
    }),
    checkTokenForgotPassword: builder.mutation({
      query: (body) => ({
        url: '/users/passwords/tokens',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useSignUpMutation,
  useListRolesMutation,
  useResetPasswordMutation,
  useResendEmailForgotPasswordMutation,
  useCheckTokenForgotPasswordMutation,
} = AuthAPI;
