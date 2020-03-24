import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Home, Map, Marketplace } from './views';
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
                <Route path="/map">
                  <Map />
                </Route>
                <Route path="/marketplace">
                  <Marketplace />
                </Route>
                <Route path="/">
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
