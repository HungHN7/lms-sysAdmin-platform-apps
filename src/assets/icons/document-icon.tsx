import { memo } from 'react';

interface DocumentIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

const DocumentIcon: React.FC<DocumentIconProps> = ({ width = 32, height = 32, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_5291_39724)'>
        <path
          d='M4 10.6667L12.004 2.66675H26.664C27.4 2.66675 28 3.27341 28 3.98941V28.0107C27.9996 28.3617 27.86 28.6981 27.6117 28.9461C27.3635 29.1941 27.0269 29.3334 26.676 29.3334H5.324C5.14891 29.3322 4.97576 29.2965 4.81446 29.2284C4.65316 29.1602 4.50686 29.061 4.38392 28.9363C4.26097 28.8116 4.16379 28.6639 4.09792 28.5017C4.03204 28.3395 3.99877 28.1658 4 27.9907V10.6667ZM13.3333 5.33341V12.0001H6.66667V26.6667H25.3333V5.33341H13.3333Z'
          fill='#707171'
        />
      </g>
      <defs>
        <clipPath id='clip0_5291_39724'>
          <rect
            width='32'
            height='32'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default memo(DocumentIcon);
