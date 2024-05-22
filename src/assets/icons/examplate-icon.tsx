import React from 'react';

const ExampleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M19.7274 9.80859L13.4548 16.0586L7.18219 9.80859'
        stroke='black'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ExampleIcon;
