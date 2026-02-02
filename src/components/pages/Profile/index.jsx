import { useAuth0 } from '@auth0/auth0-react';

/**
 * Ticket 3 - Profile Page (class notes)
 *
 * What this page does:
 * - Uses `useAuth0()` to read the `user` object provided by Auth0.
 * - Displays basic user info: profile picture, name, email, and nickname.
 * - Shows a loading message while the SDK initializes and a fallback if no user is present.
 *
 * Talking points for class:
 * - Explain where `user` comes from (Auth0's user profile returned after login).
 * - Show how this page would be protected in a production app (redirect to login if unauthenticated).
 */
const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  if (!user) {
    return <div className='text-center p-4'>No user data available</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h1 className='text-4xl font-bold mb-6'>User Profile</h1>
        {/* Ticket 3: Display user profile info provided by Auth0's `user` object */}
        {user.picture && (
          <img src={user.picture} alt={user.name} className='w-24 h-24 rounded-full mb-4' />
        )}
        {/* Name and email are common fields returned by Auth0 */}
        <p className='text-lg mb-2'><strong>Name:</strong> {user.name}</p>
        <p className='text-lg mb-2'><strong>Email:</strong> {user.email}</p>
        {user.nickname && (
          <p className='text-lg'><strong>Nickname:</strong> {user.nickname}</p>
        )}
      </div>
    </div>
  );
};


export default Profile;
