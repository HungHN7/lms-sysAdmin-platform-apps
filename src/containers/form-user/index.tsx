import img_bg from 'src/assets/images/bg_sign_in.png';
import logo from 'src/assets/images/logo_white.png';
import { Card, CardContent, CardHeader } from 'src/components/ui';
import { LeftLogin } from 'src/containers/login';
type Props = {
  Form: () => JSX.Element;
  Header: () => JSX.Element;
};
const TemplateCommonWithForm = ({ Form, Header }: Props) => {
  return (
    <div
      className='h-full w-full flex flex-col relative'
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
      <div className='container h-full flex pt-10 justify-between items-center'>
        <LeftLogin />
        <Card className='rounded-none h-fit shadow-2xl mt-[-40px] mr-[-90px]'>
          <CardHeader className='p-8 pb-6'>
            <Header />
          </CardHeader>
          <CardContent className='p-8 pt-0'>
            <div className='flex flex-col gap-8'>
              <Form />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateCommonWithForm;
