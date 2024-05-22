import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, MinusIcon } from 'lucide-react';
import { cn } from 'src/utils/classnames';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    danger?: boolean;
    variant?: 'circle' | 'square';
    size?: 'small' | 'medium';
  }
>(({ className, danger, variant = 'square', size = 'medium', ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer shrink-0 rounded-sm border-[1.5px] border-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-background disabled:cursor-not-allowed disabled:border-muted disabled:data-[state=checked]:border-muted disabled:data-[state=checked]:bg-muted disabled:data-[state=indeterminate]:border-muted disabled:data-[state=indeterminate]:bg-muted',
      size === 'medium' ? 'w-5 h-5' : 'w-4 h-4',
      danger
        ? 'border-destructive text-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=checked]:border-destructive data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:text-destructive-foreground data-[state=indeterminate]:border-destructive'
        : 'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary',
      props.children && 'w-6 h-6 text-sm leading-6 relative font-semibold inline-block',
      variant === 'circle' && 'rounded-full',
      className,
    )}
    {...props}
  >
    {!props.children && (
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        {props.checked === 'indeterminate' ? (
          <MinusIcon className={cn(size === 'medium' ? 'h-4 w-4' : 'h-3 w-3')} />
        ) : (
          <Check className={cn('stroke-[3px]', size === 'medium' ? 'h-4 w-4' : 'h-3 w-3')} />
        )}
      </CheckboxPrimitive.Indicator>
    )}

    {props.children}
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
