import React from 'react';
import { cn } from 'src/utils/classnames';

interface CommonLogoProps {
  classNameDots?: string;
  className?: string;
}

export const CommonLogo: React.FC<CommonLogoProps> = ({ className, classNameDots }) => {
  return (
    <span
      className={cn(
        'w-8 h-8 px-1.5 py-1.5 shadow-inner justify-center items-center inline-flex',
        className,
      )}
    >
      <span className='w-4 h-5 relative'>
        <span
          className={cn(
            'w-1.5 h-1.5 left-[12.55px] top-[12.88px] absolute opacity-60 bg-primary rounded-full',
            classNameDots,
          )}
        ></span>
        <span
          className={cn(
            'w-1.5 h-1.5 left-[6.27px] top-[12.88px] absolute opacity-80 bg-primary rounded-full',
            classNameDots,
          )}
        ></span>
        <span
          className={cn(
            'w-1.5 h-1.5 left-0 top-[12.88px] absolute bg-primary rounded-full',
            classNameDots,
          )}
        ></span>
        <span
          className={cn(
            'w-1.5 h-1.5 left-[6.27px] top-[6.44px] absolute opacity-60 bg-primary rounded-full',
            classNameDots,
          )}
        ></span>
        <span
          className={cn(
            'w-1.5 h-1.5 left-0 top-[6.44px] absolute opacity-80 bg-primary rounded-full',
            classNameDots,
          )}
        ></span>
        <span
          className={cn(
            'w-1.5 h-1.5 left-0 top-0 absolute opacity-60 bg-primary rounded-full',
            classNameDots,
          )}
        ></span>
      </span>
    </span>
  );
};
