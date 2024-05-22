import { decrement, increment, incrementByAmount } from 'src/redux/slices/countSlice';
import { logout as logoutUser, saveUser } from 'src/redux/slices/user-slice';
import { TUser } from 'src/utils/types/user.type';
import { useStoreDispatch } from './useStoreDispatch';
import { TTenant } from 'src/utils/types/tenant.type';
import { saveTenant } from 'src/redux/slices/tenant-slice';

export default function useStore() {
  const dispatch = useStoreDispatch();
  const incrementCounter = () => {
    dispatch(increment());
  };
  const decrementCounter = () => {
    dispatch(decrement());
  };
  const incrementByAmountCounter = (amount: number) => {
    dispatch(incrementByAmount(amount));
  };

  const updateUser = (user: TUser) => {
    dispatch(saveUser(user));
  };
  const logout = () => {
    dispatch(logoutUser());
  };

  const updateTenant = (tenant: TTenant) => {
    dispatch(saveTenant(tenant));
  };

  return {
    incrementCounter,
    decrementCounter,
    incrementByAmountCounter,

    updateUser,
    logout,

    updateTenant,
  };
}
