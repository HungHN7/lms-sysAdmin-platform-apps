import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/utils/classnames';
import { ErrorIcon, SuccessIcon, WarningIcon } from 'src/assets/icons';

const labelVariants = cva('text-sm leading-none flex items-center gap-1');

type TVariant = 'warning' | 'error' | 'success';
type TValueVariant = { icon: React.ReactNode; className: string };
const valuesOfVariant: Record<TVariant, TValueVariant> = {
  warning: {
    icon: <WarningIcon />,
    className: 'text-warning',
  },
  error: {
    icon: <ErrorIcon />,
    className: 'text-destructive',
  },
  success: {
    icon: <SuccessIcon />,
    className: 'text-success',
  },
};

const Message = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { variant?: TVariant; isShow?: boolean }
>(({ variant = 'error', isShow = true, className, children, ...props }, ref) => {
  return (
    <>
      {isShow && (
        <LabelPrimitive.Root
          ref={ref}
          className={cn(labelVariants(), className)}
          {...props}
        >
          {valuesOfVariant[variant].icon}
          {children && <span className={valuesOfVariant[variant].className}>{children}</span>}
        </LabelPrimitive.Root>
      )}
    </>
  );
});
Message.displayName = 'Message';

export { Message };
