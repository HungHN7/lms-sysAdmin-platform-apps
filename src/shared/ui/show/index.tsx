import { type ReactNode } from 'react';

type Props = {
  children: ReactNode | (() => ReactNode);
  when: any;
  fallback?: any;
};

export function Show(props: Props) {
  const { children, when, fallback } = props;

  if (when) {
    if (typeof children === 'function') {
      return <>{children()}</>;
    }
    return <>{children}</>;
  }

  if (typeof fallback === 'function') {
    return <>{fallback()}</>;
  }

  return <>{fallback}</>;
}
