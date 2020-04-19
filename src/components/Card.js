import React, { useState, Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

export const CardDeck = (props) => <div {...props} className="CardDeck" />;

export const CustomCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { program } = props;
  console.log(program);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Fragment>
      {/* <Card className="Card" onClick={handleShow}> */}
      <Card className="Card">
        <Card.Body>
          <Card.Title>{program.programName}</Card.Title>
          {/* <Card.Text>{program.programDetail}</Card.Text> */}
        </Card.Body>
        <Card.Footer>
          <div className="Card__Address">{program.address.addressLineOne}</div>
          <div className="Card__Address">{program.address.addressLineTwo}</div>
          <div className="Card__Address">
            {`${program.address.city}, ${program.address.state} ${program.address.zipCode} `}
          </div>
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
