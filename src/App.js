import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Home,
  AddProgram,
  EditProgram,
  AddProgramDetail,
  EditProgramDetail,
  Main,
  Marketplace,
  Map,
} from './views';
import { Header, Loader } from './components';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ExternalApi from './views/ExternalApi';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/marketplace">
            <Main>
              <Marketplace />
            </Main>
          </Route>
          <Route exact path="/map">
            <Main>
              <Map />
            </Main>
          </Route>
          <PrivateRoute exact path="/addProgram" component={AddProgram} />
          <PrivateRoute
            exact
            path="/addProgramDetail"
            component={AddProgramDetail}
          />
          <PrivateRoute exact path="/editProgram" component={EditProgram} />
          <PrivateRoute
            exact
            path="/editProgramDetail"
            component={EditProgramDetail}
          />
          <PrivateRoute exact path="/external-api" component={ExternalApi} />
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <Loader />
    </Router>
  );
}

export default App;
