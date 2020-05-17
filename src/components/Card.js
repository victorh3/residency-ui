import React, { Fragment, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth0 } from '../contexts/auth0-context';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';
import CardBodyDetails from './CardBodyDetails';
import CardFooterComments from './CardFooterComments';
import { urlFormatter } from '../utils/common';

export const CardDeck = (props) => <div {...props} className="CardDeck" />;

export const CustomCard = (props) => {
  const { user } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const { program, marketplace } = props;
  const handleClose = () => setShowModal(false);

  return (
    <Fragment>
      <Card className={marketplace ? 'Card Marketplace-card' : 'Card'}>
        <Card.Header>
          <Container fluid>
            <Row className="CardHeader__title">
              <Col xs={10}>
                <Card.Title className="CardHeader__titleText">
                  {program.programName}
                </Card.Title>
              </Col>
              <Col xs={2} className="Card--alignRight">
                <Tooltip letter="k" />
              </Col>
            </Row>
            <Row className="CardHeader__date">
              <Col xs={10}>
                {`Appy by: ${new Date(
                  program.programDetail.erasApplicationDate
                ).toDateString()}`}
              </Col>
              <Col xs={2} className="Card--alignRight">
                <Tooltip letter="c" data={program.contacts} />
              </Col>
            </Row>
            <Row className="CardHeader__url">
              <Col xs={10} className="Card--alignLeft">
                <a
                  href={urlFormatter(program.programDetail.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Website
                </a>
              </Col>
              <Col xs={2} className="Card--alignRight">
                <Tooltip letter="a" data={program.address} />
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col>
                <CardBodyDetails programDetail={program.programDetail} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          <Container fluid>
            <Row>
              <Col>
                <CardFooterComments programDetail={program.programDetail} />
              </Col>
            </Row>
          </Container>
          {user && (
            <InputGroup size="sm" className="mb-3">
              <Link to={`/editProgram/${program.programId}`}>
                <Button>Edit Program </Button>
              </Link>
              <Link
                to={`/editProgramDetail/${program.programDetail.programDetailId}`}
              >
                <Button variant="secondary">Edit Program Detail</Button>
              </Link>
            </InputGroup>
          )}
        </Card.Footer>
      </Card>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="modal-residency-map-location"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-residency-map-location">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Map</h4>
          <p>A cute little map goes here.</p>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
