import React from 'react';
import { cn } from 'src/utils/classnames';

type TVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: TVariant;
}

export const Typography = React.forwardRef(
  ({ className, variant = 'p', ...props }: TypographyProps, ref) => {
    const getClassName = (variant: TVariant) => {
      switch (variant) {
        case 'h1':
          return 'text-5xl font-semibold';
        case 'h2':
          return 'text-[32px] leading-[42px] font-semibold';
        case 'h3':
          return 'text-[24px] leading-[32px] font-semibold';
        case 'h4':
          return 'text-[20px] leading-[28px] font-semibold';
        case 'h5':
          return 'text-[16px] leading-[24px] font-semibold';
        case 'h6':
          return 'text-[14px] leading-[20px] font-semibold';

        default:
          return 'text-[14px] leading-[20px]';
      }
    };
    const typographyRef = React.useRef<HTMLHeadingElement>(null);

    React.useImperativeHandle(ref, () => typographyRef.current as HTMLHeadingElement);

    return React.createElement(variant, {
      ref: typographyRef,
      ...props,
      className: cn(getClassName(variant), className),
    });
  },
);
