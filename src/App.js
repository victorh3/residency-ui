import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Home, Add, Marketplace } from './views';
import { Header } from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Row>
          <Col>
            <div>
              <Switch>
                <Route exact path="/marketplace">
                  <Marketplace />
                </Route>
                <Route exact path="/add">
                  <Add />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
