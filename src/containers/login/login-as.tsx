import { ChevronRightIcon, X } from 'lucide-react';
import { Avatar, Button, Label } from 'src/components/ui';

const LoginAs = () => {
  return (
    <div className='pt-12'>
      <h5>Login as</h5>
      <div className='flex gap-9 mt-6'>
        {['Admin', 'Editor', 'Developer'].map((item, index) => (
          <button
            className='w-[145px] h-[145px] relative bg-primary/10 rounded-lg p-4 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-background'
            key={index}
          >
            <div className='absolute top-2 right-2'>
              <Button
                variant='outline'
                size='icon'
                className='h-4 w-4 rounded-full bg-inherit border-[#737373]'
              >
                <X className='h-3 w-3 text-[#737373]' />
              </Button>
            </div>
            <div className='flex flex-col items-center gap-3'>
              <Avatar
                src='https://play-lh.googleusercontent.com/EEZRsDvcSq11pwv5SVEyVlqUe5r8nP1r4OL6LM8co4hBX_F1nERK1gtZ-Q8o70MJ_d4'
                fallback='NH'
                className='w-[76px] h-[76px]'
              />
              <p className='font-medium text-sm'>{item}</p>
            </div>
          </button>
        ))}
        <div className='flex flex-col items-center justify-center gap-3'>
          <Button
            size='icon'
            className='rounded-full'
          >
            <ChevronRightIcon />
          </Button>
          <Label className='text-primary font-medium'>More role</Label>
        </div>
      </div>
    </div>
  );
};

export default LoginAs;
