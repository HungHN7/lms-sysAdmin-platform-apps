import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { AuthAPI, CountryAPI, TenantAPI, UserAPI } from 'src/services';

import { ProvinceAPI } from 'src/services/province.service';
import countSlice from './slices/countSlice';
import tenantSlice from './slices/tenant-slice';
import userSlice from './slices/user-slice';

const rootReducer = combineReducers({
  countSlice,
  userSlice,
  tenantSlice,
  [AuthAPI.reducerPath]: AuthAPI.reducer,
  [UserAPI.reducerPath]: UserAPI.reducer,
  [TenantAPI.reducerPath]: TenantAPI.reducer,
  [CountryAPI.reducerPath]: CountryAPI.reducer,
  [ProvinceAPI.reducerPath]: ProvinceAPI.reducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(AuthAPI.middleware)
        .concat(UserAPI.middleware)
        .concat(TenantAPI.middleware)
        .concat(ProvinceAPI.middleware)
        .concat(CountryAPI.middleware),
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
