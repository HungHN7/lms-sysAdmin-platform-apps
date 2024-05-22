import React, { HTMLAttributes } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from 'src/utils/classnames';

interface BreadcrumbItem {
  to: string;
  label: string | React.ReactNode;
  title?: string;
}

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  seperator?: React.ReactNode;
  base?: string; // The next path segment after your remote app path eg. curriculum,authoring. routing back to remote app main route
  dataBreadcrumbs?: BreadcrumbItem[];
  className?: string;
}
const DEFAULT_SEPERATOR = (
  <svg
    width='16'
    height='17'
    viewBox='0 0 16 17'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M5.66602 3.83366L10.3327 8.50033L5.66602 13.167'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
const DEFAULT_LOGO = (
  <svg
    width='30'
    height='30'
    viewBox='0 0 30 30'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle
      opacity='0.6'
      cx='21.3301'
      cy='21.5059'
      r='2.625'
      fill='currentColor'
    />
    <ellipse
      opacity='0.8'
      cx='15.0586'
      cy='21.5059'
      rx='2.625'
      ry='2.625'
      fill='currentColor'
    />
    <ellipse
      cx='8.78516'
      cy='21.5059'
      rx='2.625'
      ry='2.625'
      fill='currentColor'
    />
    <circle
      opacity='0.6'
      cx='15.0586'
      cy='15.0645'
      r='2.625'
      fill='currentColor'
    />
    <ellipse
      opacity='0.8'
      cx='8.78516'
      cy='15.0645'
      rx='2.625'
      ry='2.625'
      fill='currentColor'
    />
    <ellipse
      opacity='0.6'
      cx='8.78516'
      cy='8.62207'
      rx='2.625'
      ry='2.625'
      fill='currentColor'
    />
  </svg>
);
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  base,
  seperator,
  dataBreadcrumbs,
  className,
  ...props
}) => {
  const location = useLocation();
  const currentSearch = window.location.search;
  const reference = location.state; // Get reference from location state
  const getPathSegments = (path: string): string[] => {
    return path.split('/').filter((segment) => segment !== '');
  };
  const getBreadcrumbItems = ((): BreadcrumbItem[] => {
    const pathSegments = getPathSegments(location.pathname);
    const breadcrumbItems: BreadcrumbItem[] = [];

    pathSegments.reduce((prevPath, currentPath, index) => {
      const path = `${prevPath}/${currentPath}`;
      let label = currentPath.replace(/-/g, ' '); // Transform hyphens to spaces if needed

      const previousSegment = pathSegments[index - 1];

      if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(currentPath)) {
        breadcrumbItems.push({
          to: path,
          label: label,
        });
      } else {
        const previousLabel = previousSegment.replace(/-/g, ' ');
        label = `${previousLabel} ${label}`;
      }

      return path;
    }, '');

    return breadcrumbItems;
  })();
  // If reference is available, we need to add the reference breadcrumb,
  // first breadcrumb will be the base, second breadcrumb will be the reference breadcrumb,
  // and the last breadcrumb will be the same as the last breadcrumb in the getBreadcrumbItems
  const breadcrumbItems = !reference
    ? getBreadcrumbItems
    : [
        {
          to: '',
          label: '',
        },
        {
          to: reference.urlFrom,
          label: reference.from,
        },
        {
          to: getBreadcrumbItems[getBreadcrumbItems.length - 1].to,
          label: getBreadcrumbItems[getBreadcrumbItems.length - 1].label,
        },
      ];

  breadcrumbItems[0] = {
    to: base ? base : '',
    label: DEFAULT_LOGO,
  };

  const dataRender =
    dataBreadcrumbs && dataBreadcrumbs?.length > 0 ? dataBreadcrumbs : breadcrumbItems;
  return (
    <nav
      aria-label='Breadcrumb'
      className={cn('breadcrumb mt-2', className)}
      {...props}
    >
      <ul className='flex items-center space-x-2'>
        {dataRender.map((item, index) => (
          <React.Fragment key={index}>
            <li className='flex items-center breadcrumb-item gap-2 '>
              {index !== 0 && (
                <span className={cn(index !== dataRender.length - 1 && 'text-shadow-neutral70')}>
                  {seperator ? seperator : DEFAULT_SEPERATOR}
                </span>
              )}

              {index === dataRender.length - 1 ? (
                <div className='flex items-center'>
                  <span className='text-sm font-medium capitalize'>{item.label}</span>
                </div>
              ) : (
                <div className='flex items-center'>
                  <Link
                    to={index > 1 ? `${item.to}${currentSearch}` : item.to}
                    className='capitalize text-sm font-normal text-shadow-neutral70 hover:text-primary hover:border-accent group-hover:border-primary transition'
                  >
                    {item.label}
                  </Link>
                </div>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};
Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
