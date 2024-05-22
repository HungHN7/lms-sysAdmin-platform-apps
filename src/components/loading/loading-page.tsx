import { PropsWithChildren } from 'react';
import { cn } from 'src/utils/classnames';

interface LoadingPageProps {
  className?: string;
  isLoading?: boolean;
}

const LoadingPage = ({ className, isLoading, children }: LoadingPageProps & PropsWithChildren) => {
  return isLoading ? (
    <div className={cn('relative items-center block w-full h-[calc(100vh-7rem-2px)]', className)}>
      <div
        role='status'
        className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2'
      >
        <span className='inline-block border-accent h-8 w-8 animate-spin rounded-full border-4 border-t-primary' />
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  ) : (
    children
  );
};

export default LoadingPage;
