import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Add, Marketplace } from './views';
import { Header } from './components';
import { useAuth0 } from './react-auth0-spa';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ExternalApi from './views/ExternalApi';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/marketplace">
            <Marketplace />
          </Route>
          {/* <Route exact path="/add">
                  <Add />
                </Route> */}
          <PrivateRoute path="/add" component={Add} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
