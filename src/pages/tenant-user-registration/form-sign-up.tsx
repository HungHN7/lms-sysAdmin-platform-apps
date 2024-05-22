/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosAlert } from 'react-icons/io';
import { If } from 'react-if';
import { useNavigate } from 'react-router-dom';
import { SelectPro, TSelectProOption, TextField } from 'src/components';
import PhoneNumberField from 'src/components/phone-field';
import { Button, Checkbox, Form, FormField, FormLabel, Label, Link } from 'src/components/ui';
import { useToast } from 'src/hooks';
import { useStoreDispatch } from 'src/hooks/useStoreDispatch';
import { useStoreSelector } from 'src/hooks/useStoreSelector';
import { saveTenant } from 'src/redux/slices/tenant-slice';
import { SITE_MAP } from 'src/routes/site-map';
import {
  baseUrlGateway,
  useGetTokenByDomainQuery,
  useListRolesMutation,
  useSignUpMutation,
} from 'src/services';
import { emailRegex, fieldRegex, passwordRegex } from 'src/utils/constants/regex';
import * as z from 'zod';

type TypeResponseGetRole = {
  description: string;
  role_id: string;
  role_name: string;
  status: string;
};

const mapArrayRole = (arr: TypeResponseGetRole[]) => {
  if (arr?.length) {
    return arr.map((item: TypeResponseGetRole) => ({
      label: item.role_name,
      value: item.role_id,
    }));
  }
  return [];
};

function checkSpacePassword(input: string): boolean {
  if (input.startsWith(' ') || input.endsWith(' ')) {
    return true;
  }
  return false;
}

const FormSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useStoreDispatch();
  const { tenant } = useStoreSelector((state) => state.tenantSlice);
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [roleOption, setRoleOption] = useState<{ value: string; label: string }[]>([]);
  const [valueRole, setValueRole] = useState<TSelectProOption>();
  const [captchaId, setCaptchaId] = useState('');

  const [signUp, { isLoading }] = useSignUpMutation();
  const [listRole] = useListRolesMutation();
  const { toast } = useToast();
  const { data: dataTenant } = useGetTokenByDomainQuery({
    // domain: 'lms-dev.banvien.com.vn',
    domain: window.location.host.replace('localhost:3000', 'banvien.com.vn'),
  });

  useEffect(() => {
    if (dataTenant?.data?.tenant_id) dispatch(saveTenant(dataTenant?.data));
  }, [dataTenant]);

  useEffect(() => {
    if (tenant?.tenant_id) {
      listRole({
        'pageable.paging_ignored': true,
        tenant_id: tenant?.tenant_id,
      })
        .then((roles: any) => {
          const listRoles: TypeResponseGetRole[] = roles.data?.data || [];
          if (listRoles.length) {
            setRoleOption(mapArrayRole(listRoles));
          }
        })
        .catch((err) => console.log('err', err));
    }
  }, [tenant]);

  const FormSchema = z.object({
    first_name: z.string().min(1, {
      message: 'First name is required.',
    }),
    last_name: z.string().min(1, {
      message: 'Last name is required.',
    }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required.',
      })
      .regex(emailRegex, {
        message: 'Invalid email format. Please provide a valid email format.',
      }),
    username: z
      .string()
      .min(1, {
        message: 'Username is required.',
      })
      .min(8, { message: 'Username must be at least 8 characters.' })
      .regex(fieldRegex, {
        message: 'Invalid username format. Please provide a valid username format.',
      }),
    password: z
      .string()
      .min(1, {
        message: 'Password is required.',
      })
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(passwordRegex, {
        message: 'Invalid password format. Please provide a valid password format.',
      }),
    role: z.string().min(1, {
      message: 'Role is required.',
    }),
    captcha: z.string().min(1, {
      message: 'Captcha is required.',
    }),
    phone_code: z.string(),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (val === undefined || val === null || val === '') {
            return true;
          }
          return val.length >= 6 && val.length <= 12;
        },
        { message: 'Phone number must be between 6 and 12 characters long.' },
      ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      phone: '',
      phone_code: '+1',
      email: '',
      role: '',
      captcha: '',
    },
    mode: 'onBlur',
  });

  const getCaptcha = () => {
    const time = new Date().getTime();
    const captcha_id = `ACCOUNT_REGISTRATION_${time}`;
    setCaptchaId(captcha_id);
  };

  const resetCaptcha = () => {
    getCaptcha();
    form.setValue('captcha', '');
  };

  useEffect(() => {
    getCaptcha();
  }, []);

  const keyEmailError = ['EMAIL_ALREADY_EXIST', 'EMAIL_INVALID'];
  const keyUserNameError = ['USERNAME_ALREADY_EXIST'];
  const keyUserNameInvalid = ['USERNAME_INVALID'];
  const keyPhoneNumberInvalid = ['PHONE_NUMBER_INVALID'];

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    signUp({
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password,
      phone_number: data.phone,
      phone_code: data.phone ? data.phone_code : '',
      email: data.email,
      captcha: data.captcha,
      role_id: valueRole?.value,
      tenant_id: tenant?.tenant_id,
      captcha_id: captchaId,
    })
      .unwrap()
      .then((res) => {
        if (res && res?.id) {
          toast({
            variant: 'success',
            description: 'Sign up successfully!',
          });
          navigate({
            pathname: SITE_MAP.CHECK_EMAIL.path,
            search: queryString.stringify({
              email: 'no-reply@abc.com',
              support: 'support@abc.com',
            }),
          });
        } else {
          resetCaptcha();
          if (res?.error?.code === 2003) {
            form.setError('captcha', {
              message: 'Invalid Captcha.',
            });
          } else {
            const checkErrorEmail = res?.error?.details?.filter((e: { key: string }) =>
              keyEmailError.includes(e?.key),
            )?.length;
            if (checkErrorEmail) {
              form.setError('email', {
                message: 'Email already exists.',
              });
            }
            const checkErrorUserName = res?.error?.details?.filter((e: { key: string }) =>
              keyUserNameError.includes(e?.key),
            )?.length;
            const checkErrorUserNameInvalid = res?.error?.details?.filter((e: { key: string }) =>
              keyUserNameInvalid.includes(e?.key),
            )?.length;
            if (checkErrorUserName) {
              form.setError('username', {
                message: 'Username already exists.',
              });
            }
            if (checkErrorUserNameInvalid) {
              form.setError('username', {
                message: 'Invalid username format. Please provide a valid username format.',
              });
            }
            const checkErrorPhoneNumberInvalid = res?.error?.details?.filter((e: { key: string }) =>
              keyPhoneNumberInvalid.includes(e?.key),
            )?.length;
            if (checkErrorPhoneNumberInvalid) {
              form.setError('phone', {
                message: 'Invalid phone number format. Please provide a valid phone number format.',
              });
            }
          }
        }
      })
      .catch(() => {
        resetCaptcha();
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Server error!',
        });
      });
  };

  useEffect(() => {
    if (form.getValues('captcha')?.length) {
      form.clearErrors('captcha');
    }
  }, [form.watch('captcha')]);

  const handleValidateForm = () => {
    resetCaptcha();
  };

  const fieldWrapClassName = 'flex flex-col justify-between';

  return (
    <Form {...form}>
      <form
        onSubmit={
          form.handleSubmit(onSubmit, handleValidateForm) as React.FormEventHandler<HTMLFormElement>
        }
        className='flex flex-col gap-6 w-full'
      >
        <div className='flex flex-row justify-between gap-4'>
          <div className='w-1/2'>
            <TextField
              classNameWrap={fieldWrapClassName}
              className='h-10 rounded-lg'
              label='First name'
              name='first_name'
              formControl={form}
              placeholder='Enter your first name'
              disabled={isLoading}
              required
              maxLength={50}
            />
          </div>
          <div className='w-1/2'>
            <TextField
              classNameWrap={fieldWrapClassName}
              className='h-10 rounded-lg'
              label='Last name'
              name='last_name'
              formControl={form}
              placeholder='Enter your last name'
              disabled={isLoading}
              required
              maxLength={50}
            />
          </div>
        </div>
        <div className='flex flex-row justify-between gap-4'>
          <div className='w-1/2'>
            <TextField
              className='h-10 rounded-lg'
              classNameWrap={fieldWrapClassName}
              label='Username'
              name='username'
              formControl={form}
              placeholder='Enter username'
              disabled={isLoading}
              required
              maxLength={50}
              onChange={(e) => form.setValue('username', e.target.value.toLocaleLowerCase().trim())}
              onBlur={() => {
                form.trigger('username');
              }}
            />
          </div>
          <div className='w-1/2'>
            <PhoneNumberField
              className={'h-10 rounded-lg'}
              classNameWrap={fieldWrapClassName}
              label='Phone number'
              name={'phone'}
              formControl={form}
              placeholder='Enter your phone number'
              phoneValue={{
                phone_code: form.getValues('phone_code'),
                phone: form.getValues('phone'),
              }}
            />
          </div>
        </div>
        <div className='flex flex-row justify-between gap-4'>
          <div className='w-1/2'>
            <TextField
              className='h-10 rounded-lg'
              label='Email'
              name='email'
              formControl={form}
              placeholder='Enter your email address'
              disabled={isLoading}
              required
              classNameWrap={fieldWrapClassName}
              maxLength={50}
              onChange={(e) => form.setValue('email', e.target.value.toLocaleLowerCase().trim())}
              onBlur={() => {
                form.trigger('email');
              }}
            />
          </div>
          <div className='w-1/2'>
            <FormField
              control={form.control}
              name={'role'}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <div className={fieldWrapClassName}>
                  <FormLabel className={'font-semibold'}>
                    {'Role'}
                    <span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <SelectPro
                    value={valueRole}
                    placeholder='Select your role'
                    options={roleOption}
                    onChange={(e) => {
                      onChange(e.value);
                      setValueRole(e);
                    }}
                    classNameContainer={'mt-[8px]'}
                    error={!!error?.message}
                    onBlur={() => {
                      form.trigger('role');
                    }}
                  />
                  <If condition={!!error?.message}>
                    <p
                      className={
                        'text-sm font-medium text-destructive inline-flex items-center gap-1 mt-1'
                      }
                    >
                      <IoIosAlert className='w-4 h-4' />
                      {'Role is required.'}
                    </p>
                  </If>
                </div>
              )}
            />
          </div>
        </div>
        <TextField
          className='h-10 rounded-lg'
          label='Password'
          name='password'
          classNameWrap={fieldWrapClassName}
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
            'Should be at least 8 characters including: a minimum of 1 lowercase, 1 uppercase, 1 number, and 1 special character.'
          }
          onBlur={() => {
            if (checkSpacePassword(form.getValues('password'))) {
              form.setError('password', {
                message: `Your password can't start or end with a blank space.`,
              });
            } else {
              form.trigger('password');
            }
          }}
        />
        <div className='flex items-start'>
          <img
            src={`${baseUrlGateway}/captcha?key=${captchaId}`}
            className='h-12 object-contain'
            onClick={() => resetCaptcha()}
          />
        </div>
        <div className='w-1/2'>
          <TextField
            className='h-10 rounded-lg'
            label=''
            name='captcha'
            formControl={form}
            placeholder='Enter code from the image above'
            disabled={isLoading}
            required
            maxLength={50}
            onChange={(e) => form.setValue('captcha', e.target.value.toLocaleUpperCase())}
            onBlur={() => {
              form.trigger('captcha');
            }}
          />
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <Checkbox
              id='isConfirm'
              checked={isConfirm}
              onCheckedChange={(check: boolean) => setIsConfirm(check)}
            />
            <Label
              htmlFor='isConfirm'
              className='cursor-pointer flex flex-row items-center'
            >
              By signing up, I agree with the
              <Link
                to=''
                type='inline'
                typeInline='secondary'
              >
                Terms of Use
              </Link>
              &
              <Link
                to=''
                type='inline'
                typeInline='secondary'
              >
                Privacy Policy
              </Link>
            </Label>
          </div>
        </div>
        <div className='flex justify-center'>
          <Button
            disabled={!isConfirm || isLoading}
            type='submit'
            className='w-3/4 mt-4 h-14 rounded-xl text-base'
          >
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Sign up
          </Button>
        </div>
        <div className='flex items-center justify-center text-sm font-normal'>
          <span className='text-muted-foreground'>Already have an account?</span>
          <Link
            to='/login'
            type='inline'
          >
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default FormSignUp;
