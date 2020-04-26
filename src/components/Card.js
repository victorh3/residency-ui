import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';

export const CardDeck = (props) => <div {...props} className="CardDeck" />;

export const CustomCard = (props) => {
  const { program } = props;

  return (
    <Fragment>
      <Card className="Card">
        <Card.Body>
          <Card.Title>{program.programName}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <div className="Card__Address">{program.address.addressLineOne}</div>
          <div className="Card__Address">{program.address.addressLineTwo}</div>
          <div className="Card__Address">
            {`${program.address.city}, ${program.address.state} ${program.address.zipCode} `}
          </div>
        </Card.Footer>
      </Card>
    </Fragment>
  );
};
