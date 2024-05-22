import { memo } from 'react';

const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clip-path='url(#clip0_7429_28802)'>
        <path
          d='M8.00065 14.6673C4.31865 14.6673 1.33398 11.6827 1.33398 8.00065C1.33398 4.31865 4.31865 1.33398 8.00065 1.33398C11.6827 1.33398 14.6673 4.31865 14.6673 8.00065C14.6673 11.6827 11.6827 14.6673 8.00065 14.6673ZM7.33398 10.0007V11.334H8.66732V10.0007H7.33398ZM7.33398 4.66732V8.66732H8.66732V4.66732H7.33398Z'
          fill='#ED1E02'
        />
      </g>
      <defs>
        <clipPath id='clip0_7429_28802'>
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

export default memo(ErrorIcon);
