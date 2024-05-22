import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  fillColor?: string;
}

const UploadIcon: React.FC<IconProps> = React.memo(
  ({ width = 40, height = 40, fillColor = '#00CFC9', ...props }) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <path
          d='M6.99935 31.6667H33.666V20H36.9994V33.3333C36.9994 33.7754 36.8238 34.1993 36.5112 34.5118C36.1986 34.8244 35.7747 35 35.3327 35H5.33268C4.89065 35 4.46673 34.8244 4.15417 34.5118C3.84161 34.1993 3.66602 33.7754 3.66602 33.3333V20H6.99935V31.6667Z'
          fill={fillColor}
        />
        <path
          d='M23.666 14.9997V24.9997H16.9993V14.9997H8.66602L20.3327 3.33301L31.9993 14.9997H23.666Z'
          fill={fillColor}
        />
      </svg>
    );
  },
);

export default UploadIcon;
