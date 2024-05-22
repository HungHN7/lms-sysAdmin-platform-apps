import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingPage } from 'src/components';
import { useFederatedComponent } from 'src/hooks/useFederatedComponent';

const TenantApp = () => {
  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    process.env.TENANT_ENTRY || 'http://localhost:3003/remoteEntry.js',
    process.env.TENANT_APP || 'tenant',
    './Module',
  );

  return (
    <React.Suspense fallback={<LoadingPage isLoading />}>
      {errorLoading ? (
        <Navigate
          to={'/404'}
          replace
        />
      ) : (
        FederatedComponent && <FederatedComponent />
      )}
    </React.Suspense>
  );
};

export default TenantApp;
