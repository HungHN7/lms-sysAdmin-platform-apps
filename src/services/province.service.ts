import { createApi } from '@reduxjs/toolkit/query/react';
import { baseNoAuthQuery } from './baseQuery';
interface ResProvinceType {
  province_id: string;
  description: string;
  name: string;
}
type ResProvince = {
  data: ResProvinceType[];
};

export const ProvinceAPI = createApi({
  baseQuery: baseNoAuthQuery,
  reducerPath: 'ProvinceAPI',
  endpoints: (builder) => ({
    getProvinces: builder.query({
      query: (params) => ({
        url: '/provinces',
        params,
      }),
      transformResponse: (response: ResProvince) => {
        return response.data.map((i) => ({ value: i.province_id, label: i.name }));
      },
    }),
  }),
});

export const { useGetProvincesQuery } = ProvinceAPI;
