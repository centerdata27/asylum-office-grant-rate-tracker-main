import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { ProvideAppContext } from './context/AppContext.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import Auth0InitWrapper from './auth/Auth0InitWrapper.jsx';

const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;
console.log('auth_domain... ', AUTH_DOMAIN);
console.log('auth_client_id... ', AUTH_CLIENT_ID);

/**
 * Ticket 3 - Auth0 integration (class notes)
 *
 * What this file does:
 * - Reads `VITE_AUTH_DOMAIN` and `VITE_AUTH_CLIENT_ID` from the local environment.
 * - If values are present, wraps the app in `Auth0Provider` so all components can
 *   use `useAuth0()` to inspect authentication state.
 * - Uses `Auth0InitWrapper` to wait for the SDK to finish initializing before
 *   rendering the app (prevents rendering while auth is still starting).
 * - If env vars are missing, shows instructions so students can configure their
 *   `.env.local` file.
 *
 * Talking points for class:
 * - Show the difference between client-side config (Client ID) and secrets (never store Client Secret here).
 * - Explain why `redirect_uri` must match the Allowed Callback URL in Auth0 dashboard.
 * - Demonstrate how this provider makes `useAuth0()` available across the app.
 */
const RootApp = () => {
  if (!AUTH_DOMAIN || !AUTH_CLIENT_ID) {
    console.error('Missing Auth0 environment variables: VITE_AUTH_DOMAIN and/or VITE_AUTH_CLIENT_ID');
    return (
      <ProvideAppContext>
        <div className='p-6'>
          <div className='mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500'>
            <h2 className='text-lg font-bold'>Auth0 Not Configured</h2>
            <p>
              To enable authentication, create a <code>.env.local</code> file at the project root with the following values:
            </p>
            <pre className='mt-2 p-2 bg-gray-100'>VITE_AUTH_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH_CLIENT_ID=your-client-id</pre>
            <p className='mt-2'>Then restart the dev server.</p>
          </div>
          <App />
        </div>
      </ProvideAppContext>
    );
  }

  return (
    <Auth0Provider
      domain={AUTH_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {/* Ticket 3: Auth0 Provider - makes `useAuth0()` available to all components */}
      <Auth0InitWrapper>
        <ProvideAppContext>
          <App />
        </ProvideAppContext>
      </Auth0InitWrapper>
    </Auth0Provider>
  );
};

createRoot(document.getElementById('root')).render(<RootApp />);
