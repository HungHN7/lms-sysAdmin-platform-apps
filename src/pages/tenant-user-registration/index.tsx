import img_bg from 'src/assets/images/bg_sign_in.png';
import logo from 'src/assets/images/logo_white.png';
import { CardContent, CardTitle, ScrollArea } from 'src/components/ui';
import FormSignUp from './form-sign-up';

const TenantUserRegistration = () => {
  const LeftLogin = () => {
    return (
      <div className='flex w-full h-full'>
        <div className='h-1/2 flex justify-center items-center'>
          <div className='flex flex-col gap-4 w-1/2 text-primary-foreground'>
            <h2 className='text-4xl font-bold'>Sign in to </h2>
            <p className='text-2xl'>Lorem Ipsum is simply </p>
            <p className='text-sm font-light'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-row w-screen h-screen relative'>
      <div className='absolute top-6 left-6'>
        <img
          src={logo}
          alt='logo'
        />
      </div>
      <div
        className='flex w-2/5 h-full justify-center items-center'
        style={{
          backgroundImage: `url(${img_bg})`,
          backgroundPositionY: 'bottom',
          backgroundPositionX: 'left',
          backgroundSize: 'cover',
        }}
      >
        <LeftLogin />
      </div>
      <ScrollArea className='flex flex-1 w-3/5 h-screen bg-white pl-14 pr-14'>
        <CardContent className='flex-col justify-center items-center w-full h-screen'>
          <CardTitle className='text-[54px] font-bold text-center pb-8'>Create account</CardTitle>
          <div className='flex flex-col gap-11'>
            <FormSignUp />
          </div>
        </CardContent>
      </ScrollArea>
    </div>
  );
};

export default TenantUserRegistration;
