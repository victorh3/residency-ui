import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {
  AddProgram,
  EditProgram,
  AddProgramDetail,
  EditProgramDetail,
  Main,
  Marketplace,
  Map,
} from './views';
import { Header } from './components';
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
          <PrivateRoute
            exact
            path={'/editProgram/:programId'}
            component={EditProgram}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path={'/editProgramDetail/:programDetailId'}
            component={EditProgramDetail}
          />
          <PrivateRoute exact path="/external-api" component={ExternalApi} />
          <Route exact path="/">
            <Main>
              <Marketplace />
            </Main>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
