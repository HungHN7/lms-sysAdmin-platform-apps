import { createSlice } from '@reduxjs/toolkit';
import { TTenant } from 'src/utils/types/tenant.type';

const initialState: {
  tenant?: TTenant;
} = {
  tenant: undefined,
};

export const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    saveTenant: (state, action) => {
      state.tenant = action.payload;
    },
  },
});

export const { saveTenant } = tenantSlice.actions;

export default tenantSlice.reducer;
