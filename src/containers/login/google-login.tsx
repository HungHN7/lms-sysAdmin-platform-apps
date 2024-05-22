import { GoogleIcon } from 'src/assets/icons';
import { Button } from 'src/components/ui';

const GoogleLogin = () => {
  return (
    <Button
      variant='secondary'
      className='h-14 rounded-xl'
    >
      <GoogleIcon />
      <span className='text-primary pl-4'>Sign in with Google</span>
    </Button>
  );
};

export default GoogleLogin;
