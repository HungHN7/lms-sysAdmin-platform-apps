import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Else, If, Then } from 'react-if';
import { Link as LinkRouter } from 'react-router-dom';
import { cn } from 'src/utils/classnames';

type Size = 'small' | 'medium' | 'large';

interface LinkProps {
  to: string;
  type?: 'standalone' | 'inline';
  size?: Size;
  disable?: boolean;
  icon?: 'left' | 'right' | undefined;
  visited?: boolean;
  typeInline?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({
  to,
  type = 'standalone',
  size = 'medium',
  disable = false,
  icon = undefined,
  visited = false,
  typeInline = 'primary',
  className,
  children,
}) => {
  const sizeItem = (s: Size) => {
    switch (s) {
      case 'small':
        return 'font-normal text-xs leading-4 text-blue-6';
      case 'medium':
        return 'font-normal text-sm leading-5 text-blue-6';
      case 'large':
        return 'font-normal text-base leading-6 text-blue-6';
      default:
        break;
    }
  };
  return (
    <If condition={type === 'standalone'}>
      <Then>
        <LinkRouter
          className={cn(
            !disable &&
              'hover:underline focus:bg-blue-1 focus:rounded-sm visited:text-purple-6 box-sizing box p-1',
            sizeItem(size),
            disable && 'text-grey-7',
            visited && 'visited:text-purple-6',
            className,
          )}
          to={to}
          onClick={() => {
            if (disable) {
              return;
            }
          }}
        >
          <div className='flex flex-row items-center'>
            {icon && icon === 'left' && (
              <ChevronLeft
                size={20}
                color={disable ? '#9c9d9d' : visited ? '#8300EA' : '#0067EA'}
                className={'mr-1'}
              />
            )}
            {children}
            {icon && icon === 'right' && (
              <ChevronRight
                size={20}
                color={disable ? '#9c9d9d' : visited ? '#8300EA' : '#0067EA'}
                className={'ml-1'}
              />
            )}
          </div>
        </LinkRouter>
      </Then>
      <Else>
        <LinkRouter
          className={cn(
            'underline',
            !disable &&
              'focus:border focus:rounded-sm focus:border-blue-7 focus:no-underline visited:text-purple-6 box-sizing box p-1 border border-background',
            sizeItem(size),
            typeInline === 'primary' ? 'text-blue-6' : 'text-grey-12',
            disable && 'text-grey-7',
            visited && 'visited:text-purple-6',
            className,
          )}
          to={to}
          onClick={() => {
            if (disable) {
              return;
            }
          }}
        >
          <div className='flex flex-row items-center'>
            {icon && icon === 'left' && (
              <ChevronLeft
                size={20}
                color={
                  disable
                    ? '#9c9d9d'
                    : typeInline === 'primary'
                      ? '#0067EA'
                      : visited
                        ? '#8300EA'
                        : '#353636'
                }
                className='mr-1'
              />
            )}
            {children}
            {icon && icon === 'right' && (
              <ChevronRight
                size={20}
                color={
                  disable
                    ? '#9c9d9d'
                    : typeInline === 'primary'
                      ? '#0067EA'
                      : visited
                        ? '#8300EA'
                        : '#353636'
                }
                className='ml-1'
              />
            )}
          </div>
        </LinkRouter>
      </Else>
    </If>
  );
};

export default Link;
