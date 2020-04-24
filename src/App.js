import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Home,
  AddProgram,
  EditProgram,
  AddProgramDetail,
  EditProgramDetail,
  Marketplace,
} from './views';
import { Header } from './components';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ExternalApi from './views/ExternalApi';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path="/marketplace">
            <Marketplace />
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
    </Router>
  );
}

export default App;
