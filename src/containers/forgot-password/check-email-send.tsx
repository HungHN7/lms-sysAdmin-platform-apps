import { useState } from 'react';
import checkEmail from 'src/assets/images/check-email.png';
import { CardHeader, CardTitle, Link } from 'src/components/ui';
import { SITE_MAP } from 'src/routes/site-map';
import Countdown from './count-down';

interface Props {
  email: string;
  onResend: () => void;
  timeCountDown: number;
}

const CheckEmailSend: React.FC<Props> = ({ email, onResend, timeCountDown }) => {
  const [disable, setDisable] = useState(true);
  const [reStart, setReStart] = useState(false);

  return (
    <div className='flex justify-center items-center'>
      <CardHeader className='pt-14 pb-14'>
        <div className='flex justify-center'>
          <img
            src={checkEmail}
            alt='forgotPassword'
            className='w-[180px] object-contain'
          />
        </div>
        <CardTitle className='text-[42px] font-semibold text-center text-[#262549]'>
          Check your email!
        </CardTitle>
        <h3 className='pt-8 text-[14px] flex flex-row'>
          {`Thanks! An email was sent to:`}
          <h3 className='text-blue-500 text-[14px] ml-1'>{email}</h3>
        </h3>
        <h3 className='text-[14px] font-normal'>
          Please check and click on the link to reset your password.
        </h3>
        <h3 className='text-[14px] font-normal'>
          If you don't get the email, please contact: support@kinety.com
        </h3>
        {/* <div className='flex flex-row text-center pt-2'>
          <button
            disabled={disable}
            onClick={() => {
              onResend();
              setReStart(true);
              setDisable(true);
            }}
            className={`${disable && 'text-[#B3B7BD]'} underline text-[18px]`}
          >{`Resend email`}</button>
          <h3 className='pl-1 pr-1 text-[18px]'>{'in'}</h3>
          <Countdown
            initialValue={timeCountDown}
            onStart={true}
            onEnd={() => {
              setDisable(false);
              setReStart(false);
            }}
            restart={reStart}
          />
          <h3 className={'pl-1 text-[18px]'}>{'minutes'}</h3>
        </div> */}
        {/* <Link
          to={SITE_MAP.AUTH.LOGIN.path}
          className='text-primary text-center pt-8 pb-11'
        >
          Back to Login
        </Link> */}
        <div className='flex justify-center'>
          <Link
            to={SITE_MAP.AUTH.LOGIN.path}
            className='text-primary pt-7'
          >
            Back to Login
          </Link>
        </div>
      </CardHeader>
    </div>
  );
};

export default CheckEmailSend;
