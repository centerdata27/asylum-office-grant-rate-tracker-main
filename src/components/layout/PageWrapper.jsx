import Header from './Header.jsx';
import Footer from './Footer.jsx';
import * as React from 'react';

export const pageWrapper = ele => {
  return (
    <>
      <Header />
      {ele}
      <Footer />
    </>
  );
};
