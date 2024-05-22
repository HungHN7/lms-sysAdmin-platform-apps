import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { cn } from 'src/utils/classnames';

const AccordionSystem = AccordionPrimitive.Root;

const AccordionItemSystem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
AccordionItemSystem.displayName = 'AccordionItemSystem';

type AccordionTriggerProps = {
  arrowPosition?: 'left' | 'right';
  showArrow?: boolean;
};

const AccordionTriggerSystem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & AccordionTriggerProps
>(({ className, children, arrowPosition = 'right', showArrow = true, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex bg-grey-3'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        '[&[data-state=open]>button.icon-plus]:hidden [&[data-state=closed]>button.icon-minus]:hidden flex flex-1 items-center justify-between h-[56px] font-semibold pl-6 pr-6 transition-all  hover:bg-grey-5 border-t ',
        className,
      )}
      {...props}
    >
      {arrowPosition === 'left' && showArrow && (
        <>
          <button className='w-10 h-10 flex items-center justify-center icon-minus'>
            <Minus
              size={20}
              strokeWidth={3}
              className='shrink-0 transition-transform duration-200'
            />
          </button>
          <button className='w-10 h-10 flex items-center justify-center icon-plus'>
            <Plus
              size={20}
              strokeWidth={3}
              className='shrink-0 transition-transform duration-200'
            />
          </button>
        </>
      )}
      {children}
      {arrowPosition === 'right' && showArrow && (
        <>
          <button className='w-10 h-10 flex items-center justify-center icon-minus'>
            <Minus
              size={20}
              strokeWidth={3}
              className='shrink-0 transition-transform duration-200'
            />
          </button>
          <button className='w-10 h-10 flex items-center justify-center icon-plus'>
            <Plus
              size={20}
              strokeWidth={3}
              className='shrink-0 transition-transform duration-200'
            />
          </button>
        </>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTriggerSystem.displayName = 'AccordionTriggerSystem';

const AccordionContentSystem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}
  >
    <div className={cn('pt-0 flex mt-4 justify-center', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContentSystem.displayName = 'AccordionContentSystem';

const AccordionHeaderSystem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Header
    {...props}
    ref={ref}
  >
    {children}
  </AccordionPrimitive.Header>
));
AccordionHeaderSystem.displayName = 'AccordionHeaderSystem';

export {
  AccordionSystem,
  AccordionTriggerSystem,
  AccordionHeaderSystem,
  AccordionItemSystem,
  AccordionContentSystem,
};
