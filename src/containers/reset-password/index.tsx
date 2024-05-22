/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TextField } from 'src/components';
import { Button, Form } from 'src/components/ui';
import { useToast } from 'src/hooks';
import { useResetPasswordMutation } from 'src/services';
import { passwordRegex } from 'src/utils/constants/regex';
import * as z from 'zod';

function checkSpacePassword(input: string): boolean {
  if (input.startsWith(' ') || input.endsWith(' ')) {
    return true;
  }
  return false;
}

const FormResetPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const FormSchema = z
    .object({
      new_password: z
        .string()
        .min(1, {
          message: 'New password is required.',
        })
        .min(8, { message: 'New password must be at least 8 characters.' })
        .regex(passwordRegex, {
          message: 'Invalid new password format. Please provide a valid new password format.',
        }),
      re_password: z.string().min(1, {
        message: 'Re-enter password is required.',
      }),
    })
    .refine((data) => data.new_password === data.re_password, {
      message: 'Passwords entered do not match.',
      path: ['re_password'],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      new_password: '',
      re_password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    resetPassword({
      new_password: data.new_password,
      token: searchParams.get('token'),
      type: Number(searchParams.get('type')),
    })
      .unwrap()
      .then((res) => {
        if (res?.code === 1) {
          toast({
            variant: 'success',
            description: 'Reset password successfully!',
          });
          navigate('/login');
        } else if (res?.code === 2004) {
          toast({
            variant: 'destructive',
            description: res?.message,
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
          });
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
        });
      });
  };

  const handleCheckPassword = () => {
    const newPass = form.getValues('new_password');
    const rePass = form.getValues('re_password');
    if (newPass !== rePass) {
      form.setError('re_password', {
        message: 'Passwords entered do not match.',
      });
      form.setValue('re_password', '');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={
          form.handleSubmit(
            onSubmit,
            handleCheckPassword,
          ) as React.FormEventHandler<HTMLFormElement>
        }
        className='flex flex-col gap-4 w-full'
      >
        <TextField
          className='h-10 rounded-lg'
          label='New password'
          name='new_password'
          formControl={form}
          placeholder='Enter your password'
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
          autoComplete='new-password'
          isShowHelpText={true}
          helpText={
            'Should be at least 8 characters including: a minimum of 1 lowercase, 1 uppercase, 1 number, 1 special character in your password.'
          }
          onBlur={() => {
            if (checkSpacePassword(form.getValues('new_password'))) {
              form.setError('new_password', {
                message: `Your password can't start or end with a blank space.`,
              });
            } else {
              form.trigger('new_password');
            }
          }}
        />
        <TextField
          className='h-10 rounded-lg'
          label='Re-enter password'
          name='re_password'
          formControl={form}
          placeholder='Re-enter your password'
          disabled={isLoading}
          required
          type={showRePassword ? 'text' : 'password'}
          icon={
            <button
              onClick={() => setShowRePassword((prev) => !prev)}
              type='button'
              tabIndex={-1}
            >
              {showRePassword ? (
                <EyeIcon className='w-5 h-5' />
              ) : (
                <EyeOffIcon className='w-5 h-5' />
              )}
            </button>
          }
          iconPlacement='right'
          classNameIcon='pointer-events-auto cursor-pointer'
          maxLength={50}
          autoComplete='new-password'
        />

        <div className='flex justify-center'>
          <Button
            disabled={
              form.getValues('new_password') === '' ||
              form.getValues('re_password') === '' ||
              isLoading
            }
            type='submit'
            className='mt-5 h-12 rounded-xl w-full'
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Reset Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormResetPassword;
