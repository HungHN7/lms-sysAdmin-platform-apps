import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from 'src/utils/classnames';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';
type AccordionTriggerProps = {
  arrowPosition?: 'left' | 'right';
  showArrow?: boolean;
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & AccordionTriggerProps
>(({ className, children, arrowPosition = 'right', showArrow = true, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between pb-3 font-medium transition-all hover:underline [&[data-state=open]>button>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {arrowPosition === 'left' && showArrow && (
        <button className='w-10 h-10 flex items-center justify-center'>
          <ChevronDown className='w-5 h-5 shrink-0 transition-transform duration-200 ' />
        </button>
      )}
      {children}
      {arrowPosition === 'right' && showArrow && (
        <button className='w-10 h-10 flex items-center justify-center arrow'>
          <ChevronDown className='w-5 h-5 shrink-0 transition-transform duration-200' />
        </button>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}
  >
    <div className={cn('pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const AccordionHeader = React.forwardRef<
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
AccordionHeader.displayName = AccordionPrimitive.Header.displayName;

const AccordionTriggerBase = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      'pb-3 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90',
      className,
    )}
    {...props}
  >
    <ChevronRight
      className='shrink-0 transition-transform duration-200 '
      size={20}
    />
  </AccordionPrimitive.Trigger>
));
AccordionTriggerBase.displayName = AccordionPrimitive.Trigger.displayName + 'Base';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionHeader,
  AccordionTriggerBase,
};
