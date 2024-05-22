import { useNavigate } from 'react-router-dom';
import img_bg from 'src/assets/images/bg_sign_in.png';
import { Button, Card, CardContent, CardFooter, CardTitle } from 'src/components/ui';
import { SITE_MAP } from 'src/routes/site-map';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className='h-[100vh] w-full flex flex-col relative m-auto'
      style={{
        backgroundImage: `url(${img_bg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Card className='flex flex-col w-[450px] m-auto p-4'>
        <CardTitle className='text-[42px] font-semibold text-center text-[#262549]'>
          Authoring Assessment
        </CardTitle>
        <CardContent>
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book
        </CardContent>
        <CardFooter className='m-auto w-full'>
          <Button
            className='w-full'
            onClick={() => navigate(SITE_MAP.TENANT_REGISTRATION.path)}
          >
            Try it free
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingPage;
