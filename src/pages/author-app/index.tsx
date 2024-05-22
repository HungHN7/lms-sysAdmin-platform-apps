import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingPage } from 'src/components';
import { useFederatedComponent } from 'src/hooks/useFederatedComponent';

const AuthorApp = () => {
  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    process.env.AUTHOR_ENTRY || 'http://localhost:3001/remoteEntry.js',
    process.env.AUTHOR_APP || 'authoring',
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

export default AuthorApp;
