import { Check, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button, Label } from 'src/components/ui';
import { cn } from 'src/utils/classnames';

const ListItems = [
  {
    id: 'mail',
    value: 'mail',
    icon: <Mail />,
    title: 'Reset via Email',
    description: 'Lorem ipsum dolor sit amet, consect adipiscing elit. Nam ultricies nisi.',
  },
  {
    id: 'sms',
    value: 'sms',
    icon: <Phone />,
    title: 'Reset via SMS',
    description: 'Lorem ipsum dolor sit amet, consect adipiscing elit. Nam ultricies nisi.',
  },
];

const FormForgotPassword = () => {
  const [value, setValue] = useState('mail');

  return (
    <div className='flex flex-col gap-6'>
      {ListItems.map((item) => (
        <button
          key={item.id}
          className={cn(
            'rounded-xl ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-background disabled:pointer-events-none disabled:opacity-50 h-[120px] p-6 bg-accent',
            item.value === value && 'bg-primary/10 border border-primary',
          )}
          onClick={() => setValue(item.value)}
        >
          <div
            className='
            pointer-events-none
            flex 
            items-center 
            justify-center
            space-x-6
          '
          >
            <div
              className={cn(
                'w-[56px] h-[56px] text-[#828282] rounded-full p-4 bg-input',
                item.value === value && 'text-primary bg-primary/20',
              )}
            >
              {item.icon}
            </div>
            <div className='space-y-1'>
              <p className='font-medium text-start text-sm'>{item.title}</p>
              <p className='text-start text-[12px]'>{item.description}</p>
            </div>

            <div
              className={cn(
                'w-5 h-5 rounded-full bg-primary/40 text-primary invisible',
                item.value === value && 'visible',
              )}
            >
              <Check className='w-5 h-5 p-1' />
            </div>
          </div>
        </button>
      ))}

      <Button className='rounded-xl h-[54px] mt-6'>Send link</Button>

      <Label className='text-center'>
        Don’t recieve code?{' '}
        <button className='text-primary hover:underline underline-offset-2'>Resend</button>
      </Label>
    </div>
  );
};

export default FormForgotPassword;
