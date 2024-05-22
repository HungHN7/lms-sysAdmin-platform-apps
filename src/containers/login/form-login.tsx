import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Checkbox, Form, Label, Link, TYPE_ERROR } from 'src/components/ui';
import { useGetTokenByDomainQuery, useLoginMutation } from 'src/services';
import { setToken } from 'src/utils/token';
import { TextField } from 'src/components';
import { useToast } from 'src/hooks';
import { useEffect, useState } from 'react';
import { useStoreDispatch } from 'src/hooks/useStoreDispatch';
import { saveTenant } from 'src/redux/slices/tenant-slice';
import { SITE_MAP } from 'src/routes/site-map';

const FormLogin = () => {
  const dispatch = useStoreDispatch();
  const { state, pathname } = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const { data: dataTenant } = useGetTokenByDomainQuery({
    domain: window.location.host.replace('localhost:3000', 'banvien.com.vn'),
  });
  // RUN LOCAL HOST : http://lms-dev.localhost:3000/
  useEffect(() => {
    if (dataTenant?.data?.tenant_id) dispatch(saveTenant(dataTenant?.data));
  }, [dataTenant]);

  const FormSchema = z.object({
    username: z.string().trim().min(1, {
      message: 'Username/ Email is required.',
    }),
    password: z.string().trim().min(1, {
      message: 'Password is required.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    login({
      username: data.username.trim(),
      password: data.password.trim(),
      ...(dataTenant?.data?.tenant_id && { tenant_id: dataTenant?.data?.tenant_id, login_type: 1 }),
      ...(pathname === SITE_MAP.ADMINISTRATOR.path && { login_type: 2 }),
    })
      .unwrap()
      .then((dataLogin) => {
        if (dataLogin?.data) {
          setToken(dataLogin?.data?.access_token, isRemember);
          localStorage.setItem('refresh_token', dataLogin?.data?.refresh_token);
          localStorage.setItem('isRemember', JSON.stringify(isRemember));
          state?.from ? navigate(state.from) : navigate('/curriculum/products/product');
        } else {
          form.setError('username', { type: TYPE_ERROR.HIDE_MESSAGE });
          form.setError('password', { message: 'Username/ Email or password  is incorrect.' });
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          description: 'Invalid username or password. Please check your credentials and try again!',
        });
      });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit) as React.FormEventHandler<HTMLFormElement>}
        className='flex flex-col gap-6 w-full'
      >
        <TextField
          className='h-12 rounded-lg'
          label='Username/ Email'
          name='username'
          formControl={form}
          placeholder='Username or email address'
          disabled={isLoading}
          required
          maxLength={50}
        />
        <TextField
          className='h-12 rounded-lg'
          label='Password'
          name='password'
          formControl={form}
          placeholder='Password'
          disabled={isLoading}
          required
          type={showPassword ? 'text' : 'password'}
          icon={
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type='button'
              tabIndex={-1}
            >
              {showPassword ? <EyeIcon className='w-5 h-5' /> : <EyeOffIcon className='w-5 h-5' />}
            </button>
          }
          iconPlacement='right'
          classNameIcon='pointer-events-auto cursor-pointer'
          maxLength={50}
        />
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Checkbox
              id='remember'
              checked={isRemember}
              onCheckedChange={(check: boolean) => setIsRemember(check)}
            />
            <Label
              htmlFor='remember'
              className='cursor-pointer text-black leading-5'
            >
              Remember me
            </Label>
          </div>
          <Link to='/forgot-password'>Forgot Password</Link>
        </div>

        <Button
          disabled={isLoading}
          type='submit'
          className='mt-4 h-14 rounded-xl text-base'
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Sign in
        </Button>
        <div className='flex items-center justify-center text-sm font-normal'>
          <span className='text-muted-foreground'>Create an Tenant?</span>
          <Link to={SITE_MAP.TENANT_USER_REGISTRATION.path}>Sign up</Link>
        </div>
      </form>
    </Form>
  );
};

export default FormLogin;
