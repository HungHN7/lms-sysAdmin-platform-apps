import { useSearchParams } from 'react-router-dom';
import checkEmail from 'src/assets/images/check-email.png';
import { CardTitle } from 'src/components/ui';

function CheckEmailContent() {
  const [searchParams] = useSearchParams();
  const emailFrom = searchParams.get('email') || '';

  return (
    <div className='pt-14 flex flex-col max-w-[451px] items-center'>
      <img
        src={checkEmail}
        alt='forgotPassword'
        className='w-[180px] h-[138px] object-contain'
      />
      <CardTitle className='text-[42px] mb-10 font-semibold text-center text-[#262549]'>
        Check your email!
      </CardTitle>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>
          Thanks! Your account request has been submitted. Please check your email to verify the
          account.{' '}
        </p>
        <p
          className='text-sm'
          dangerouslySetInnerHTML={{
            __html: `If you haven’t received the email within 30 minutes, please double check your junk or spam folder. You will see an email from </br> "<span style="color:#0067EA;">${emailFrom?.toString()}</span>"`,
          }}
        />
        <p
          className='text-sm'
          dangerouslySetInnerHTML={{
            __html: `If you are sure you haven’t received an email, contact: "<span style="color:#0067EA; text-decoration: underline;">support@abc.com</span>"`,
          }}
        />
      </div>
    </div>
  );
}

export default CheckEmailContent;
