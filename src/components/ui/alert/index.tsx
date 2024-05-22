import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  RiCloseCircleFill,
  RiAlertFill,
  RiCheckboxCircleFill,
  RiInformationFill,
} from 'react-icons/ri';

import { cn } from 'src/utils/classnames';

const alertVariants = cva(
  'relative w-full rounded-lg p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        info: 'bg-[#E6F0FD] text-info [&>svg]:text-info',
        success: 'bg-[#E6F8EF] text-success [&>svg]:text-success',
        warning: 'bg-[#FEF1E6] text-warning [&>svg]:text-warning',
        error: 'bg-[#FDE9E6] text-destructive [&>svg]:text-destructive',
        successLight: 'bg-primary-light text-primary [&>svg]:text-primary',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role='alert'
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed font-normal', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

const AlertMessage = ({
  message,
  description,
  variant,
  showIcon,
  className,
  classNameIcon,
  classNameTitle,
  classNameDescription,
  isDescription,
}: {
  message?: string;
  description?: string;
  showIcon?: boolean;
  className?: string;
  classNameIcon?: string;
  classNameTitle?: string;
  classNameDescription?: string;
  isDescription?: boolean;
} & VariantProps<typeof alertVariants>) => {
  return (
    <Alert
      variant={variant}
      className={className}
    >
      <div className={cn('flex flex-row gap-2', isDescription && 'items-center')}>
        {showIcon && (
          <>
            {variant === 'info' && (
              <RiInformationFill
                size={20}
                className={classNameIcon}
              />
            )}
            {variant === 'success' && (
              <RiCheckboxCircleFill
                size={20}
                className={classNameIcon}
              />
            )}
            {variant === 'successLight' && (
              <RiCheckboxCircleFill
                size={20}
                className={classNameIcon}
              />
            )}
            {variant === 'warning' && (
              <RiAlertFill
                size={20}
                className={classNameIcon}
              />
            )}
            {variant === 'error' && (
              <RiCloseCircleFill
                size={20}
                className={classNameIcon}
              />
            )}
          </>
        )}
        <div className='flex flex-col items-center'>
          {message && <AlertTitle className={classNameTitle}>{message}</AlertTitle>}
          {description && (
            <AlertDescription className={cn(message ? 'text-[#444646]' : '', classNameDescription)}>
              {description}
            </AlertDescription>
          )}
        </div>
      </div>
    </Alert>
  );
};

export { Alert, AlertTitle, AlertDescription, AlertMessage };
