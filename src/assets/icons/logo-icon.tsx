import React from 'react';

const Logo = () => {
  return (
    <svg
      width='24'
      height='46'
      viewBox='0 0 27 46'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='transition-none'
    >
      <g filter='url(#filter0_d_6828_40043)'>
        <circle
          opacity='0.6'
          cx='22.2275'
          cy='28.6787'
          r='3.5'
          fill='#00CFC9'
        />
        <circle
          opacity='0.8'
          cx='13.8633'
          cy='28.6787'
          r='3.5'
          fill='#00CFC9'
        />
        <ellipse
          cx='5.5'
          cy='28.6787'
          rx='3.5'
          ry='3.5'
          fill='#00CFC9'
        />
        <ellipse
          opacity='0.6'
          cx='13.8633'
          cy='20.0889'
          rx='3.5'
          ry='3.5'
          fill='#00CFC9'
        />
        <ellipse
          opacity='0.8'
          cx='5.5'
          cy='20.0889'
          rx='3.5'
          ry='3.5'
          fill='#00CFC9'
        />
        <ellipse
          opacity='0.6'
          cx='5.5'
          cy='11.5'
          rx='3.5'
          ry='3.5'
          fill='#00CFC9'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_6828_40043'
          x='0.911565'
          y='7.45578'
          width='25.9044'
          height='26.3556'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood
            flood-opacity='0'
            result='BackgroundImageFix'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='0.544218' />
          <feGaussianBlur stdDeviation='0.544218' />
          <feComposite
            in2='hardAlpha'
            operator='out'
          />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_6828_40043'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_6828_40043'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
