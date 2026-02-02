import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Auth0InitWrapper({ children }) {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <div className='text-center p-4'>Initializing authentication...</div>;
  }

  if (error) {
    return (
      <div className='text-center p-4'>
        <h2 className='text-xl font-bold'>Auth0 initialization error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return <>{children}</>;
}
