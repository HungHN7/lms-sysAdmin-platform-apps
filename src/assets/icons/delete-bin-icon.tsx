import { SVGProps, memo } from 'react';

const DeleteBinIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clip-path='url(#clip0_6678_71438)'>
        <path
          d='M14.166 5.00033H18.3327V6.66699H16.666V17.5003C16.666 17.7213 16.5782 17.9333 16.4219 18.0896C16.2657 18.2459 16.0537 18.3337 15.8327 18.3337H4.16602C3.945 18.3337 3.73304 18.2459 3.57676 18.0896C3.42048 17.9333 3.33268 17.7213 3.33268 17.5003V6.66699H1.66602V5.00033H5.83268V2.50033C5.83268 2.27931 5.92048 2.06735 6.07676 1.91107C6.23304 1.75479 6.445 1.66699 6.66602 1.66699H13.3327C13.5537 1.66699 13.7657 1.75479 13.9219 1.91107C14.0782 2.06735 14.166 2.27931 14.166 2.50033V5.00033ZM14.9993 6.66699H4.99935V16.667H14.9993V6.66699ZM7.49935 9.16699H9.16602V14.167H7.49935V9.16699ZM10.8327 9.16699H12.4993V14.167H10.8327V9.16699ZM7.49935 3.33366V5.00033H12.4993V3.33366H7.49935Z'
          fill={props.fill || '#ED1E02'}
        />
      </g>
      <defs>
        <clipPath id='clip0_6678_71438'>
          <rect
            width='20'
            height='20'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default memo(DeleteBinIcon);
