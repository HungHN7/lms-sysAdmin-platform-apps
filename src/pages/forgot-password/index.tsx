import { useSearchParams } from 'react-router-dom';
import img_bg from 'src/assets/images/bg_sign_in.png';
import logo from 'src/assets/images/logo_white.png';
import { Card } from 'src/components/ui';
import { FormForgotPasswordEmail } from 'src/containers/forgot-password';

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
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
          <FormForgotPasswordEmail type={searchParams.get('type') || ''} />
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
