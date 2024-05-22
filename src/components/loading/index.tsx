import { PropsWithChildren } from 'react';
import { cn } from 'src/utils/classnames';

interface LoadingProps {
  isLoading?: boolean;
  className?: string;
}

const Loading = ({ children, isLoading, className }: PropsWithChildren & LoadingProps) => {
  return (
    <div className={cn('relative items-center block w-full h-full', className)}>
      <div
        className={cn('w-full h-full', isLoading && 'opacity-20 pointer-events-none select-none')}
      >
        {children}
      </div>
      {isLoading && (
        <div
          role='status'
          className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2'
        >
          <span className='inline-block border-accent h-8 w-8 animate-spin rounded-full border-4 border-t-primary' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Loading;
