import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Card, Label, Typography } from 'src/components/ui';
import { RootState } from 'src/redux/store';

export const ContentProfile = () => {
  const { user } = useSelector((state: RootState) => state.userSlice);

  return (
    <div className='p-6 flex flex-col gap-y-6'>
      <Card className='flex items-center gap-x-4 p-6'>
        <Avatar
          className='w-[64px] h-[64px]'
          classNameFallback='w-[64px] h-[64px]'
          fallback={user?.last_name?.at(0) ?? 'A'}
          src={user?.avatar}
        />
        <div>
          <Typography variant='h5'>{`${user?.first_name} ${user?.last_name}`}</Typography>
          <Typography>Teacher</Typography>
        </div>
      </Card>
      <Card className='p-6'>
        <Typography variant='h5'>Personal information</Typography>
        <div className='pt-4 grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-y-2'>
            <Label className='font-semibold'>First name</Label>
            <Typography>{user?.first_name}</Typography>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label className='font-semibold'>Last name</Label>
            <Typography>{user?.last_name}</Typography>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label className='font-semibold'>Email</Label>
            <Typography>{user?.email}</Typography>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label className='font-semibold'>Phone number</Label>
            <Typography>{user?.phone}</Typography>
          </div>
        </div>
      </Card>
      <Card className='p-6'>
        <Typography variant='h5'>Password</Typography>
      </Card>
    </div>
  );
};
