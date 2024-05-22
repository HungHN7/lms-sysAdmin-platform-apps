import React, { ReactNode } from 'react';
import useDynamicScript from './useDynamicScript';
import { loadComponent } from 'src/utils/federation';

const componentCache = new Map();
export const useFederatedComponent = (remoteUrl: string, scope: string, module: string) => {
  debugger
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState<any>(null);

  const { ready, errorLoading, loading } = useDynamicScript(remoteUrl);
  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return { errorLoading, Component, loading };
};
