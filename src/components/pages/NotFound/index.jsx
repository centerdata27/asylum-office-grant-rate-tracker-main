import { Link, useRouteError } from 'react-router-dom';
import React from 'react';
import { pageWrapper } from '../../layout/PageWrapper.jsx';

export const NotFoundPage = () => {
  const error = useRouteError();
  console.warn(error);

  return pageWrapper(
    <div id='error-page'>
      <h1>404 Page Not Found</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to='/'>
        <button>Back To Home</button>
      </Link>
    </div>
  );
};
