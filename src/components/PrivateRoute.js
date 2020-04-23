import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../contexts/auth0-context';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isLoading, user } = useAuth0();

  const render = (props) =>
    user && !isLoading ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
