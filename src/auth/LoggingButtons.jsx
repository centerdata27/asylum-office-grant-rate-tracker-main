/**
 * TODO: Ticket 3:
 * Implement authentication and logging functionality using Auth0
 */
import { useAuth0 } from '@auth0/auth0-react';

/*
 * Notes for class - Login / Logout Buttons
 * - This component uses the `useAuth0()` hook to access authentication state.
 * - `loginWithRedirect()` sends the user to Auth0's hosted login page.
 * - `logout({ logoutParams: { returnTo } })` logs the user out and returns them
 *   to the application's origin.
 * - Talking points:
 *   1. `isAuthenticated` controls button label and behavior.
 *   2. `loginWithRedirect()` starts the Authorization Code Flow with PKCE.
 */

export const LoggingButtons = () => {
  // TODO: Replace these with Auth0 functionality
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const buttonText = isAuthenticated ? 'Log Out' : 'Log In';

  const handleLogging = () => {
    if (isAuthenticated) {
      // Ticket 3: Logout — calls Auth0 SDK to end session and redirect back
      logout({ 
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } else {
      // Ticket 3: Login — redirects the user to Auth0's hosted login page
      loginWithRedirect();
    }
  };

  return (
    <button className='nav-btn  px-4 py-1' onClick={handleLogging}>
      {buttonText}
    </button>
  );
};