import { useEffect, useState } from 'react';
import { Case, Switch } from 'react-if';
import CircleCheckLargeIcon from 'src/assets/icons/circle-check-large-icon';
import CircleWarningIcon from 'src/assets/icons/circle-warn-icon';
import { Loading } from 'src/components';
import { AlertMessage, Button, CardTitle, Link } from 'src/components/ui';
import { useRouter } from 'src/hooks/use-router';
import { SITE_MAP } from 'src/routes/site-map';
import { useVerifyTenantAccountMutation, useVerifyTenantUserAccountMutation } from 'src/services';
import { Show } from 'src/shared';
enum EStatusType {
  SUCCESS = 'SUCCESS',
  TOKEN_NOT_FOUND_OR_EXPIRED = 'TOKEN_NOT_FOUND_OR_EXPIRED',
  ALREADY_ACTIVE_OR_VERIFIED = 'ALREADY_ACTIVE_OR_VERIFIED',
}
function EmailVerification() {
  const { query, location, navigate } = useRouter<{
    token: string;
  }>();
  const path = location.pathname;
  const [verifyTenantAdmin, { isLoading: isLoadingTenantAdmin }] = useVerifyTenantAccountMutation();
  const [verifyTenantUser, { isLoading: isLoadingTenantUser }] =
    useVerifyTenantUserAccountMutation();
  const [statusType, setStatusType] = useState<EStatusType>(EStatusType.TOKEN_NOT_FOUND_OR_EXPIRED);
  useEffect(() => {
    const handleVerify = () => {
      switch (path) {
        case SITE_MAP.VERIFY_TENANT.path:
          {
            verifyTenantAdmin({ token: query.token })
              .unwrap()
              .then((data: any) => {
                if (data.error) {
                  if (
                    data.error.details[0]?.key &&
                    data.error.details[0]?.key == 'TENANT_MUST_INACTIVE'
                  ) {
                    setStatusType(EStatusType.ALREADY_ACTIVE_OR_VERIFIED);
                  }
                  if (
                    data.error.details[0]?.key &&
                    data.error.details[0]?.key == 'TOKEN_NOT_FOUND_OR_EXPIRED'
                  ) {
                    setStatusType(EStatusType.TOKEN_NOT_FOUND_OR_EXPIRED);
                  }
                }
                if (data.id) {
                  setStatusType(EStatusType.SUCCESS);
                }
              });
          }
          break;
        case SITE_MAP.VERIFY_USER.path:
          verifyTenantUser({ token: query.token })
            .unwrap()
            .then((data: any) => {
              if (data?.code == 2004) {
                setStatusType(EStatusType.TOKEN_NOT_FOUND_OR_EXPIRED);
              }
              if (data?.code == 2006) {
                setStatusType(EStatusType.ALREADY_ACTIVE_OR_VERIFIED);
              }
              if (data?.code == 1) {
                setStatusType(EStatusType.SUCCESS);
              }
            });
          break;
        default:
          break;
      }
    };
    handleVerify();
  }, []);

  return (
    <Loading isLoading={isLoadingTenantAdmin || isLoadingTenantUser}>
      <div className='pt-14  flex flex-col w-[451px] items-center'>
        <Show when={!isLoadingTenantAdmin && !isLoadingTenantUser}>
          <Switch>
            <Case condition={statusType === EStatusType.TOKEN_NOT_FOUND_OR_EXPIRED}>
              <CircleWarningIcon color={'#F47500'} />
            </Case>
            <Case
              condition={
                statusType === EStatusType.SUCCESS ||
                statusType === EStatusType.ALREADY_ACTIVE_OR_VERIFIED
              }
            >
              <CircleCheckLargeIcon color={'#00CFC9'} />
            </Case>
          </Switch>
          <CardTitle className='text-[42px] mb-7 font-semibold text-center text-[#262549]'>
            {/* Handle message */}
            <Switch>
              <Case condition={path === SITE_MAP.VERIFY_TENANT.path}>Activate</Case>
              <Case condition={path === SITE_MAP.VERIFY_USER.path}>Verify</Case>
            </Switch>{' '}
            account
          </CardTitle>
          <div className='flex flex-col w-full items-center pb-6 '>
            <Switch>
              <Case condition={statusType === EStatusType.TOKEN_NOT_FOUND_OR_EXPIRED}>
                <Switch>
                  <Case condition={path === SITE_MAP.VERIFY_TENANT.path}>
                    <p className='text-sm mb-7'>The link you are trying to access has expired.</p>
                  </Case>
                  <Case condition={path === SITE_MAP.VERIFY_USER.path}>
                    Can not access has expired.
                  </Case>
                </Switch>
                <div className='flex flex-col items-center gap-1 w-full'>
                  <Button
                    className='w-full flex-shrink-0 text-base'
                    onClick={() => navigate(SITE_MAP.AUTH.LOGIN.path)}
                  >
                    Back to sign in
                  </Button>
                  <Link
                    size='small'
                    to='#'
                    className=' text-sm'
                  >
                    Need help?
                  </Link>
                </div>
              </Case>
              <Case condition={statusType === EStatusType.SUCCESS}>
                <Switch>
                  <Case condition={path === SITE_MAP.VERIFY_TENANT.path}>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Your account has been activated successfully.</p>
                      <p className='text-sm'>
                        <b>Please check your email.</b> We’ve just sent an email including your
                        account URL and login information.
                      </p>
                    </div>
                  </Case>
                  <Case condition={path === SITE_MAP.VERIFY_USER.path}>
                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>
                        Your account has been verified and sent for approval.
                      </p>
                      <p className='text-sm'>
                        <b>Once your account is approved,</b> we will send an email including your
                        login information.
                      </p>
                    </div>
                  </Case>
                </Switch>
              </Case>
              <Case condition={statusType === EStatusType.ALREADY_ACTIVE_OR_VERIFIED}>
                <Switch>
                  <Case condition={path === SITE_MAP.VERIFY_TENANT.path}>
                    <AlertMessage
                      message={'Your account has been activated!'}
                      description=''
                      variant={'successLight'}
                      showIcon
                      classNameTitle='mb-0  text-sm'
                    />

                    <div className='flex flex-col gap-2'>
                      <p className='text-sm'>Your account has been activated successfully.</p>
                      <p className='text-sm'>
                        We already sent an email including your account URL and login information.
                      </p>
                      <p className='flex items-center gap-1 w-full text-sm'>
                        <span>Please go back to </span>
                        <Link
                          size='small'
                          to='/login'
                          className='underline text-sm'
                        >
                          login page
                        </Link>
                        <span> to continue.</span>
                      </p>
                    </div>
                  </Case>
                  <Case condition={path === SITE_MAP.VERIFY_USER.path}>
                    <AlertMessage
                      message={'Your account has been verified!'}
                      description=''
                      variant={'successLight'}
                      showIcon
                      classNameTitle='mb-0 '
                    />

                    <div className='flex flex-col gap-2 '>
                      <p className='text-sm'>
                        Your account has been verified and sent for approval.
                      </p>
                      <p className='text-sm'>
                        <b>Once your account is approved</b>, we will send an email including your
                        login information.
                      </p>
                      <p className='flex items-center gap-1 w-full text-sm flex-wrap'>
                        <span>If you already received the email, please go back to</span>
                        <Link
                          size='small'
                          to='/login'
                          className='underline text-sm'
                        >
                          login page
                        </Link>
                        <span> to continue.</span>
                      </p>
                    </div>
                  </Case>
                </Switch>
              </Case>
            </Switch>
          </div>
        </Show>
      </div>
    </Loading>
  );
}

export default EmailVerification;
