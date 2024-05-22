/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import img_bg from 'src/assets/images/bg_sign_in.png';
import logo from 'src/assets/images/logo_white.png';
import image_reset_password from 'src/assets/images/reset-password.png';
import { AlertMessage, Card, CardHeader, CardTitle, Label, Link } from 'src/components/ui';
import { SITE_MAP } from 'src/routes/site-map';

const ResetPasswordHasReset = () => {
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
          <CardHeader className='pt-14 pl-10 pr-10 pb-14'>
            <div className='flex justify-center'>
              <img
                src={image_reset_password}
                alt='image_reset_password'
                className='w-[80px] object-contain'
              />
            </div>
            <CardTitle className='text-[42px] font-semibold text-center text-[#262549] pb-7'>
              Reset Password
            </CardTitle>
            <AlertMessage
              showIcon
              isDescription
              variant='successLight'
              description={`Your password has been reset!`}
            />
            <h3 className='text-[14px] text-black font-normal pt-7'>
              You already reset the password in the first-time login.
            </h3>
            <Label
              htmlFor='isConfirm'
              className='cursor-pointer flex flex-row items-center'
            >
              Please go back to
              <Link
                to={SITE_MAP.AUTH.LOGIN.path}
                type='inline'
                typeInline='secondary'
              >
                login page
              </Link>
              to continue.
            </Label>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordHasReset;
