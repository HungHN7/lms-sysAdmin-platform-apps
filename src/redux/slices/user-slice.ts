import { createSlice } from '@reduxjs/toolkit';
import { TUser } from 'src/utils/types/user.type';

const initialState: {
  user?: TUser;
} = {
  user: undefined,
};

export const userSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      removeUser();
      state.user = undefined;
    },
  },
});

export const { saveUser, logout } = userSlice.actions;

export default userSlice.reducer;

export const removeUser = () => {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('isRemember');
  localStorage.removeItem('roles');
  localStorage.removeItem('batchItems');
};
