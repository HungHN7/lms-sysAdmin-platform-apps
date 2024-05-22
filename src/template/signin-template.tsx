import img_bg from 'src/assets/images/bg_sign_in.png';
import logo from 'src/assets/images/logo_white.png';
import { Card, CardContent, CardHeader } from 'src/components/ui';
import { LeftLogin } from 'src/containers/login';
import { Show } from 'src/shared';
import { cn } from 'src/utils/classnames';
type Props = {
  Content: () => JSX.Element;
  Header?: () => JSX.Element;
  isBorder?: boolean;
  isShowHeader?: boolean;
};
const SignInTemplate = ({ Content: Form, Header, isBorder, isShowHeader = true }: Props) => {
  return (
    <div
      className='min-h-screen w-full flex flex-col relative'
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
      <div className='container h-full flex pt-[125px] justify-between '>
        <LeftLogin />
        <Card className={cn('rounded-none h-fit shadow-2xl', isBorder && 'rounded-lg')}>
          <Show when={isShowHeader && Header !== undefined}>
            <CardHeader className='p-8 pb-6'>{Header && <Header />}</CardHeader>
          </Show>
          <CardContent className={cn(`p-8 pt-0`, 'SignInTemplate__card-content ')}>
            <div className='flex flex-col gap-8'>
              <Form />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInTemplate;
