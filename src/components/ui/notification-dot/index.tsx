import React from 'react';
import { cn } from 'src/utils/classnames';

type TVariant =
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'cyan'
  | 'magenta'
  | 'teal'
  | 'gray'
  | 'primary';

interface NotificationDotProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TVariant;
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const NotificationDot = React.forwardRef(
  ({ variant = 'primary', size = 'md', asChild = false, ...props }: NotificationDotProps, ref) => {
    const getBg = (variant: TVariant) => {
      switch (variant) {
        case 'blue':
          return 'bg-blue-6';
        case 'green':
          return 'bg-green-6';
        case 'orange':
          return 'bg-orange-6';
        case 'red':
          return 'bg-red-6';
        case 'yellow':
          return 'bg-yellow-6';
        case 'purple':
          return 'bg-purple-6';
        case 'cyan':
          return 'bg-cyan-6';
        case 'magenta':
          return 'bg-magenta-6';
        case 'teal':
          return 'bg-teal-6';
        case 'gray':
          return 'bg-grey-6';
        default:
          return 'bg-teal-6';
      }
    };

    const getWidthHeight = (size: 'sm' | 'md' | 'lg') => {
      switch (size) {
        case 'sm':
          return asChild ? 'w-[20px] h-[20px]' : 'w-[8px] h-[8px]';
        case 'md':
          return asChild ? 'w-[24px] h-[24px]' : 'w-[12px] h-[12px]';
        case 'lg':
          return asChild ? 'w-[32px] h-[32px]' : 'w-[16px] h-[16px]';
      }
    };
    return (
      <div
        ref={ref as any}
        className={cn(
          size === 'lg' ? 'text-sm leading-[18px]' : 'text-xs leading-4',
          'text-white  rounded-full  font-semibold text-center flex items-center justify-center',
          //   getPadding(size),
          getBg(variant),
          getWidthHeight(size),
          props.className,
        )}
        {...props}
      >
        {props.children}
      </div>
    );
  },
);
