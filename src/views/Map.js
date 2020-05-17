import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { usePrograms } from '../contexts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Card } from '../components';

const MapView = () => {
  const { programs } = usePrograms();
  const [selectedProgram, setSelectedProgram] = React.useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  let defaultZoom = 4;
  let defaultCenter = [39.82, -98.57];

  if (programs.length) {
    defaultCenter = [
      programs[0].address.latitude,
      programs[0].address.longitude,
    ];
    defaultZoom = 8;
  }

  return (
    <Map center={defaultCenter} zoom={defaultZoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {programs.map((program) => (
        <Marker
          key={program.programId}
          position={[program.address.latitude, program.address.longitude]}
          onClick={() => {
            setSelectedProgram(program);
          }}
        />
      ))}
      {selectedProgram && (
        <Popup
          position={[
            selectedProgram.address.latitude,
            selectedProgram.address.longitude,
          ]}
          onClose={() => {
            setSelectedProgram(null);
          }}
        >
          <h6>{selectedProgram.programName}</h6>
          <div>{selectedProgram.address.addressLineOne}</div>
          <div>{selectedProgram.address.addressLineTwo}</div>
          <div>{`${selectedProgram.address.city}, ${selectedProgram.address.state} ${selectedProgram.address.zipCode} `}</div>
          <Button
            className="Map-ShowModal--button"
            variant="link"
            onClick={handleShow}
          >
            Learn more
          </Button>
        </Popup>
      )}
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="modal-residency-map-location"
        centered
      >
        <Card
          program={selectedProgram}
          style={{ margin: '0' }}
          className="Map-ModalCard"
        />
      </Modal>
    </Map>
  );
};

export default MapView;
