import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { logout } from 'src/redux/slices/user-slice';

import { getIsRemember, getToken, setToken } from 'src/utils/token';

const baseUrl = process.env.REACT_APP_API;
export const baseUrlGateway = 'https://lms-api-dev.banvien.com.vn';

export const baseNoAuthQuery = fetchBaseQuery({
  baseUrl,
  cache: 'no-cache',
});

export const baseAuthQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (getToken()) {
      headers.set('Authorization', `Bearer ${getToken()}`);
    }
    return headers;
  },
  cache: 'no-cache',
});

export const EmptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  reducerPath: 'EmptySplitApi',
  endpoints: () => ({}),
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseAuthQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshArgs = {
      url: '/auth/token/refresh',
      body: {
        // access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token'),
      },
      method: 'POST',
    };
    const { data }: { [key: string]: any } = await baseNoAuthQuery(refreshArgs, api, extraOptions);
    if (data?.data.access_token) {
      setToken(data?.data?.access_token, getIsRemember());
      localStorage.setItem('refresh_token', data?.data.refresh_token);
    } else {
      api.dispatch(logout());
    }
    result = await baseAuthQuery(args, api, extraOptions);
  }
  return result;
};
