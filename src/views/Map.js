import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { usePrograms } from '../contexts';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Card } from '../components';
import L from 'leaflet';
import { threeOptions } from '../utils/Constants';

const MapView = () => {
  const { programs, filterSearch, filters } = usePrograms();
  const [selectedProgram, setSelectedProgram] = React.useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [bounds, setBounds] = React.useState([32.25233, -110.87966]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (programs.length) {
      const latLngs = programs.map((program) => {
        return L.latLng(program.address.latitude, program.address.longitude);
      });

      const bnds = L.latLngBounds(latLngs);
      setBounds(bnds);
      setIsLoading(false);
    }
  }, [programs]);

  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Map bounds={bounds}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {programs
            .filter((program) =>
              filterSearch.trim().length
                ? program.programName
                    .toLowerCase()
                    .includes(filterSearch.trim().toLowerCase()) ||
                  program.programId
                    .toLowerCase()
                    .includes(filterSearch.trim().toLowerCase())
                : true
            )
            .filter(
              (program) =>
                filters.doFriendly.indexOf(
                  Object.values(
                    threeOptions.find(
                      (x) =>
                        x.expandedValue === program.programDetail.doFriendly
                    )
                  )[0]
                ) > -1
            )
            .filter(
              (program) =>
                filters.imsFriendly.indexOf(
                  Object.values(
                    threeOptions.find(
                      (x) =>
                        x.expandedValue === program.programDetail.imsFriendly
                    )
                  )[0]
                ) > -1
            )
            .filter(
              (program) =>
                filters.comlexFriendly.indexOf(
                  Object.values(
                    threeOptions.find(
                      (x) =>
                        x.expandedValue ===
                        program.programDetail.comlexLevelOneAccepted
                    )
                  )[0]
                ) > -1
            )
            .map((program) => (
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
      )}
    </div>
  );
};

export default MapView;
