import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingPage } from 'src/components';
import { useFederatedComponent } from 'src/hooks/useFederatedComponent';

const CurriculumApp = () => {
  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    process.env.CURRICULUM_ENTRY || 'http://localhost:3002/remoteEntry.js',
    process.env.CURRICULUM_APP || 'curriculum',
    './Module',
  );
debugger
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

export default CurriculumApp;
