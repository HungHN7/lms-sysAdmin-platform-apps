import { Card, CardHeader, CardTitle, CardContent, Label } from 'src/components/ui';
import { FormLogin, LeftLogin } from 'src/containers/login';
import img_bg from 'src/assets/images/bg_sign_in.png';
import logo from 'src/assets/images/logo_white.png';

const Login = () => {
  return (
    <div
      className=' min-h-screen w-full flex flex-col relative'
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
      <div className='container h-full flex  justify-between items-start  pt-[125px]'>
        <LeftLogin />
        <Card className='w-[500px] rounded-xl h-fit shadow-2xl pb-10 '>
          <CardHeader className='p-11 pb-6'>
            <div className='flex justify-center'>
              <Label className='text-2xl font-semibold text-center'>
                Welcome to <span className='bold uppercase text-primary'>AUTHORING TOOL</span>
              </Label>
            </div>

            <CardTitle className='text-[54px] font-bold text-center'>Sign in</CardTitle>
          </CardHeader>
          <CardContent className='p-11 pt-0'>
            <div className='flex flex-col gap-11'>
              <FormLogin />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
