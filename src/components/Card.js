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

export const CardDeck = (props) => <div {...props} className="CardDeck" />;

export const CustomCard = (props) => {
  const { user } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const { program } = props;
  const handleClose = () => setShowModal(false);

  console.log(program);

  return (
    <Fragment>
      <Card className="Card">
        <Card.Header>
          <Container fluid>
            <Row>
              <Col xs={10}>
                <Card.Title>{program.programName}</Card.Title>
              </Col>
              <Col xs={2}>
                <Tooltip letter="k" />
                <Tooltip letter="c" data={program.contacts} />
                <Tooltip letter="a" data={program.address} />
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col>1 of 2</Col>
              <Col>2 of 2</Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          <div className="Card__Address">{program.address.addressLineOne}</div>
          <div className="Card__Address">{program.address.addressLineTwo}</div>
          <div className="Card__Address">
            {`${program.address.city}, ${program.address.state} ${program.address.zipCode} `}
          </div>
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
