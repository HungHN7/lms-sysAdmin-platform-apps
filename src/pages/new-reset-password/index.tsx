import { Label } from 'src/components/ui';
import FirstTimeReset from 'src/containers/first-time-reset';
import SignInTemplate from 'src/template/signin-template';

function ResetPassword() {
  return (
    <div className='h-screen'>
      <SignInTemplate
        isBorder
        Content={FirstTimeReset}
        Header={() => (
          <div className='flex justify-center'>
            <Label className='text-2xl font-semibold text-center'>Reset password</Label>
          </div>
        )}
      />
    </div>
  );
}

export default ResetPassword;
