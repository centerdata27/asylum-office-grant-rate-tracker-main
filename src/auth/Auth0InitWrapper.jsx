import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Auth0InitWrapper({ children }) {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    // Ticket 3: While the Auth0 SDK initializes, avoid rendering app UI
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

/*
 * Notes for class - Auth0InitWrapper
 * - Purpose: prevents the app from rendering before the Auth0 SDK finishes initialization.
 * - `isLoading` is true while the SDK checks session/caches tokens; `error` reports initialization failures.
 * - Useful talking point: show why waiting for SDK readiness avoids flash-of-unauthenticated UI.
 */
