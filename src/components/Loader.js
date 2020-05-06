import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => (
  <div className="Loader">
    <div className="Loader__Overlay"></div>
    <Spinner animation="border" role="status">
      <span className="sr-only Loader__Spinner">Loading...</span>
    </Spinner>
  </div>
);

export default Loader;
