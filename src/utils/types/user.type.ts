import { ERoleType } from '../constants/roles';

export type TGroup = {
  group_id: string;
  string: string;
  description: string;
};
export type EUserStatus = {
  Disabled: 2;
  Active: 1;
  InActive: 0;
};
export type TUser = {
  id: string;
  first_name: string;
  last_name: string;
  tenant_id: string;
  email: string;
  phone: string;
  avatar: string;
  created_date: string;
  created_by: string;
  type: number;
  username: string;
  status: EUserStatus;
  groups: TGroup[];
  roles: ERoleType[];
  inactive_future: boolean;
  inactive_date: string;
};
