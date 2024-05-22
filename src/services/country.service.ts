import { createApi } from '@reduxjs/toolkit/query/react';
import { baseNoAuthQuery } from './baseQuery';
interface ResCountryType {
  country_id: string;
  description: string;
  name: string;
  type: number;
  phone_code: string;
}
type ResCountry = {
  data: ResCountryType[];
};

export const CountryAPI = createApi({
  baseQuery: baseNoAuthQuery,
  reducerPath: 'CountryAPI',
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: (params) => ({
        url: '/countries',
        params,
      }),
      transformResponse: (response: ResCountry) => {
        return response.data.map((i) => ({
          value: i.country_id,
          label: i.name,
          phone_code: i.phone_code,
        }));
      },
    }),
  }),
});

export const { useGetCountriesQuery } = CountryAPI;
