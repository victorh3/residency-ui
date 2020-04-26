import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { usePrograms } from '../contexts';

const MapView = () => {
  const { programs } = usePrograms();
  const [selectedProgram, setSelectedProgram] = React.useState(null);
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
          {/* <Card key={selectedProgram.programId} program={selectedProgram} /> */}
          <h2>{selectedProgram.programName}</h2>
          <div>{selectedProgram.addressLineOne}</div>
          <div>{selectedProgram.address.addressLineTwo}</div>
          <div>{`${selectedProgram.address.city}, ${selectedProgram.address.state} ${selectedProgram.address.zipCode} `}</div>
        </Popup>
      )}
    </Map>
  );
};

export default MapView;
