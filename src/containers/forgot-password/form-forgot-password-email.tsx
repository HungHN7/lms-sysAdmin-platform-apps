/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Else, If, Then } from 'react-if';
import ImageforgotPassword from 'src/assets/images/forgotPassword.png';
import { TextField } from 'src/components';
import {
  AlertMessage,
  Button,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  Link,
} from 'src/components/ui';
import { useToast } from 'src/hooks';
import { useStoreDispatch } from 'src/hooks/useStoreDispatch';
import { useStoreSelector } from 'src/hooks/useStoreSelector';
import { saveTenant } from 'src/redux/slices/tenant-slice';
import { SITE_MAP } from 'src/routes/site-map';
import {
  baseUrlGateway,
  useForgotPasswordMutation,
  useGetTokenByDomainQuery,
  useResendEmailForgotPasswordMutation,
} from 'src/services';
import * as z from 'zod';
import CheckEmailSend from './check-email-send';
interface Props {
  type: string;
}

const FormForgotPasswordEmail: React.FC<Props> = ({ type }) => {
  const { toast } = useToast();
  const dispatch = useStoreDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [resendEmailForgotPassword] = useResendEmailForgotPasswordMutation();
  const { tenant } = useStoreSelector((state) => state.tenantSlice);
  const [captchaId, setCaptchaId] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [timeCountDown, setTimeCountDown] = useState(0);

  const { data: dataTenant } = useGetTokenByDomainQuery({
    // domain: 'lms-dev.banvien.com.vn',
    domain: window.location.host.replace('localhost:3000', 'banvien.com.vn'),
  });

  useEffect(() => {
    if (dataTenant?.data?.tenant_id) dispatch(saveTenant(dataTenant?.data));
  }, [dataTenant]);

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: 'Email is required.',
      })
      .email('Invalid email format. Please provide a valid email format.'),
    captcha: z.string().min(1, {
      message: 'Captcha is required.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      captcha: '',
    },
    mode: 'onBlur',
  });

  const callApi = (data) => {
    forgotPassword({
      ...data,
    })
      .unwrap()
      .then((res) => {
        if (res?.code === 1) {
          toast({
            variant: 'success',
            title: 'Forgot password success.',
            description: res?.message,
          });
          setIsSend(true);
        } else if (res?.code === 2003) {
          form.setError('captcha', {
            message: 'Captcha code is invalid.',
          });
        } else if (res?.code === 2005) {
          toast({
            variant: 'destructive',
            description: 'You have exceeded the maximum number of email resend attempts',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: res?.message,
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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    callApi({ ...data, tenant_id: tenant?.tenant_id, captcha_key: captchaId });
  };

  const getCaptcha = () => {
    const time = new Date().getTime();
    const captcha_id = `ACCOUNT_FORGOTPASWORD_${time}`;
    setCaptchaId(captcha_id);
  };

  useEffect(() => {
    getCaptcha();
    setTimeCountDown(120);
  }, []);

  useEffect(() => {
    if (form.getValues('captcha')?.length) {
      form.clearErrors('captcha');
    }
  }, [form.watch('captcha')]);

  return (
    <If condition={!isSend}>
      <Then>
        <CardHeader className='pt-14 pl-10 pr-10 pb-6'>
          <div className='flex justify-center'>
            <img
              src={ImageforgotPassword}
              alt='forgotPassword'
              className='w-[80px] object-contain'
            />
          </div>
          <CardTitle className='text-[42px] font-semibold text-center text-[#262549] pb-4'>
            Forgot password
          </CardTitle>
          {type === 'expired' ? (
            <>
              <AlertMessage
                showIcon
                variant='error'
                description={`Your reset password link has been expired!`}
                isDescription
              />
              <CardDescription className='text-[14px] font-normal text-left text-[#353636] pt-2'>
                {
                  'Please enter your email to receive a new link, or Login if you already have a new password.'
                }
              </CardDescription>
            </>
          ) : (
            <CardDescription className='text-[14px] font-normal text-left text-[#353636] pt-2'>
              {'Please enter your email so that we can send you the reset password link.'}
            </CardDescription>
          )}
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={
              form.handleSubmit(onSubmit, getCaptcha) as React.FormEventHandler<HTMLFormElement>
            }
            className='flex flex-col gap-4 w-full pl-10 pr-10 pb-14'
          >
            <TextField
              className='h-10 rounded-xl'
              label='Email'
              name='email'
              formControl={form}
              placeholder='Enter your email address'
              disabled={isLoading}
              required
              maxLength={50}
              onChange={(e) => form.setValue('email', e.target.value.toLocaleLowerCase().trim())}
              onBlur={() => {
                form.trigger('email');
              }}
            />
            <div className='flex items-start mt-2'>
              <img
                src={`${baseUrlGateway}/captcha?key=${captchaId}`}
                className='h-12 object-contain'
                onClick={() => getCaptcha()}
              />
            </div>
            <div className='w-full'>
              <TextField
                className='h-10 rounded-lg'
                label=''
                name='captcha'
                formControl={form}
                placeholder='Enter code from the image above'
                disabled={isLoading}
                required
                maxLength={50}
                onChange={(e) =>
                  form.setValue('captcha', e.target.value.toLocaleUpperCase().trim())
                }
                onBlur={() => {
                  form.trigger('captcha');
                }}
              />
            </div>
            <div className='flex justify-center'>
              <Button
                disabled={isLoading}
                type='submit'
                className='mt-5 h-12 rounded-xl w-full'
              >
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Send email
              </Button>
            </div>
            <div className='flex justify-center'>
              <Link
                to={SITE_MAP.AUTH.LOGIN.path}
                className='text-primary'
              >
                Back to Login
              </Link>
            </div>
          </form>
        </Form>
      </Then>
      <Else>
        <CheckEmailSend
          timeCountDown={timeCountDown}
          email={form.getValues('email')}
          onResend={() => {
            resendEmailForgotPassword({
              email: form.getValues('email'),
              tenant_id: tenant?.tenant_id,
            })
              .unwrap()
              .then((res) => {
                if (res?.code === 1) {
                  toast({
                    variant: 'success',
                    title: 'Resend email success.',
                    description: res?.message,
                  });
                  setIsSend(true);
                } else if (res?.code === 2005) {
                  toast({
                    variant: 'destructive',
                    description: 'You have exceeded the maximum number of email resend attempts',
                  });
                  setTimeCountDown(3600);
                } else {
                  toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: res?.message,
                  });
                }
              })
              .catch((error) => {
                toast({
                  variant: 'destructive',
                  title: 'Uh oh! Something went wrong.',
                  description: error?.message,
                });
              });
          }}
        />
      </Else>
    </If>
  );
};

export default FormForgotPasswordEmail;
