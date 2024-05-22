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

interface StatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TVariant;
  type?: 'bold' | 'subtle' | 'ghost';
}

export const Status = React.forwardRef(
  ({ variant = 'primary', type = 'bold', ...props }: StatusProps, ref) => {
    const getBg = (variant: TVariant) => {
      switch (variant) {
        case 'blue':
          return type === 'bold' ? 'bg-blue-6' : type === 'subtle' ? 'bg-blue-1' : '';
        case 'green':
          return type === 'bold' ? 'bg-green-6' : type === 'subtle' ? 'bg-green-1' : '';
        case 'orange':
          return type === 'bold' ? 'bg-orange-6' : type === 'subtle' ? 'bg-orange-1' : '';
        case 'red':
          return type === 'bold' ? 'bg-red-6' : type === 'subtle' ? 'bg-red-1' : '';
        case 'yellow':
          return type === 'bold' ? 'bg-yellow-6' : type === 'subtle' ? 'bg-yellow-1' : '';
        case 'purple':
          return type === 'bold' ? 'bg-purple-6' : type === 'subtle' ? 'bg-purple-1' : '';
        case 'cyan':
          return type === 'bold' ? 'bg-cyan-6' : type === 'subtle' ? 'bg-cyan-1' : '';
        case 'magenta':
          return type === 'bold' ? 'bg-magenta-6' : type === 'subtle' ? 'bg-magenta-1' : '';
        case 'teal':
          return type === 'bold' ? 'bg-teal-6' : type === 'subtle' ? 'bg-teal-1' : '';
        case 'gray':
          return type === 'bold' ? 'bg-grey-6' : type === 'subtle' ? 'bg-grey-4' : '';
        default:
          return type === 'bold' ? 'bg-teal-6' : type === 'subtle' ? 'bg-teal-1' : '';
      }
    };

    const getColor = (variant: TVariant) => {
      switch (variant) {
        case 'blue':
          return type !== 'bold' ? 'text-blue-6' : '';
        case 'green':
          return type !== 'bold' ? 'text-green-6' : '';
        case 'orange':
          return type !== 'bold' ? 'text-orange-6' : '';
        case 'red':
          return type !== 'bold' ? 'text-red-6' : '';
        case 'yellow':
          return type !== 'bold' ? 'text-yellow-6' : '';
        case 'purple':
          return type !== 'bold' ? 'text-purple-6' : '';
        case 'cyan':
          return type !== 'bold' ? 'text-cyan-6' : '';
        case 'magenta':
          return type !== 'bold' ? 'text-magenta-6' : '';
        case 'teal':
          return type !== 'bold' ? 'text-teal-6' : '';
        case 'gray':
          return type !== 'bold' ? 'text-grey-6' : '';
        default:
          return type !== 'bold' ? 'text-teal-6' : '';
      }
    };

    return React.createElement('span', {
      ref,
      className: cn(
        type === 'ghost' ? 'text-sm' : 'text-xs',
        'text-white px-2 py-1 leading-4 rounded-[24px] w-fit font-semibold text-center',
        getBg(variant),
        getColor(variant),
        props.className,
      ),
      ...props,
    });
  },
);
