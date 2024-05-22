import { memo } from 'react';

const SuccessIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clip-path='url(#clip0_5037_134528)'>
        <path
          d='M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM11.003 16L18.073 8.929L16.659 7.515L11.003 13.172L8.174 10.343L6.76 11.757L11.003 16Z'
          fill='#2fdf1e'
        />
      </g>
      <defs>
        <clipPath id='clip0_5037_134528'>
          <rect
            width='16'
            height='16'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default memo(SuccessIcon);
