import { useAuth0 } from '@auth0/auth0-react';

/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
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
        {user.picture && (
          <img src={user.picture} alt={user.name} className='w-24 h-24 rounded-full mb-4' />
        )}
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
