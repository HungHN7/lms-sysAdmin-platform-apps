/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import img_bg from 'src/assets/images/bg_sign_in.png';
import logo from 'src/assets/images/logo_white.png';
import image_reset_password from 'src/assets/images/reset-password.png';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui';
import FormResetPassword from 'src/containers/reset-password';
import { SITE_MAP } from 'src/routes/site-map';
import { useCheckTokenForgotPasswordMutation } from 'src/services';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checkTokenForgotPassword] = useCheckTokenForgotPasswordMutation();

  useEffect(() => {
    checkTokenForgotPassword({
      token: searchParams.get('token'),
      type: Number(searchParams.get('type')),
    })
      .unwrap()
      .then((res) => {
        if (res?.code === 1) {
          return;
        } else if (res?.code === 2007) {
          navigate({
            pathname: SITE_MAP.AUTH.RESET_PASSWORD_HAS_RESET.path,
          });
        } else {
          navigate({
            pathname: SITE_MAP.AUTH.FORGOT_PASSWORD.path,
            search: createSearchParams({
              type: 'expired',
            }).toString(),
          });
        }
      });
  }, []);

  const LeftFotgot = () => {
    return (
      <div className='flex flex-col w-[calc(100%-500px)] h-full'>
        <div className='h-1/2 flex items-center'>
          <div className='flex flex-col gap-4 w-1/2 text-primary-foreground'>
            <h2 className='text-4xl font-bold'>Reset your password</h2>
            <p className='text-2xl'>Lorem Ipsum is simply</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className='h-[100vh] w-full flex flex-col relative'
      style={{
        backgroundImage: `url(${img_bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className='absolute top-6 left-6'>
        <img
          src={logo}
          alt='logo'
        />
      </div>
      <div className='container h-full flex justify-between items-center'>
        <LeftFotgot />
        <Card className='w-[600px] rounded-xl shadow-2xl'>
          <CardHeader className='pt-14 pl-10 pr-10 pb-6'>
            <div className='flex justify-center'>
              <img
                src={image_reset_password}
                alt='image_reset_password'
                className='w-[80px] object-contain'
              />
            </div>
            <CardTitle className='text-[42px] font-semibold text-center text-[#262549] pb-4'>
              Reset Password
            </CardTitle>
            <CardDescription className='text-left text-[14px] font-normal text-[#353636] pt-2'>
              {'Please kindly set your new password.'}
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-14 pl-10 pr-10'>
            <div className='flex flex-col gap-11'>
              <FormResetPassword />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
