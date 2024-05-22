import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { FaCircleDot } from 'react-icons/fa6';

import { cn } from 'src/utils/classnames';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    danger?: boolean;
    size?: 'small' | 'medium';
  }
>(({ className, danger, size = 'small', ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'relative aspect-square rounded-full border border-foreground text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-background disabled:cursor-not-allowed disabled:!text-grey-7 disabled:!border-grey-7 aria-checked:border-primary',
        size === 'medium' ? 'h-5 w-5' : 'h-4 w-4',
        danger && '!text-destructive !border-destructive',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn('absolute -top-[1px] -left-[1px]', size === 'medium' ? 'h-5 w-5' : 'h-4 w-4')}
      >
        <FaCircleDot
          className={cn(
            'h-4 w-4 fill-current text-current',
            size === 'medium' ? 'h-5 w-5' : 'h-4 w-4',
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
