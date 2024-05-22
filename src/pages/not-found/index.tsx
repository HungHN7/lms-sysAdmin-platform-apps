import { Link } from 'react-router-dom';
import { EmptyIcon } from 'src/assets/icons';
import { Button, Typography } from 'src/components/ui';

const NotFound = () => {
  return (
    <div className='w-screen h-screen bg-background flex flex-col justify-center items-center gap-4'>
      <EmptyIcon />
      <Typography variant='h3'>Not Found</Typography>
      <Typography>We can't seem to find a page you're looking for.</Typography>
      <Button asChild>
        <Link to='/curriculum/product/products'>BACK TO HOMEPAGE</Link>
      </Button>
    </div>
  );
};

export default NotFound;
