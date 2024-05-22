import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingPage } from 'src/components';
import { useFederatedComponent } from 'src/hooks/useFederatedComponent';

const IntegrationApp = () => {
  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    process.env.INTEGRATION_ENTRY || 'http://localhost:3005/remoteEntry.js',
    process.env.INTEGRATION_APP || 'integration',
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

export default IntegrationApp;
