import { ERoleType } from 'src/utils/constants/roles';
import { useStoreSelector } from './useStoreSelector';

export const useRoleArray = (arrRoles: ERoleType[]) => {
  const { user } = useStoreSelector((state) => state.userSlice);
  return arrRoles.some((role: ERoleType) => user?.roles?.includes(role));
};
