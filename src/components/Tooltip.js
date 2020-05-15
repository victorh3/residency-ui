import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

const Key = () => {
  return (
    <p>
      <div>
        <span role="img" aria-label="checkmark emoji">
          ✅{' '}
        </span>
        Yes
      </div>
      <div>
        <span role="img" aria-label="x emoji">
          ❌{' '}
        </span>
        No
      </div>
      <div>
        <span>N/Av</span> Not Available
      </div>
      <div>
        <span>N/AP</span> Not Applicable
      </div>
    </p>
  );
};

const Address = (props) => {
  const {
    addressLineOne,
    addressLineTwo,
    city,
    state,
    zipCode,
  } = props.address;
  return (
    <p>
      <div contact>{addressLineOne}</div>
      <div contact>{addressLineTwo}</div>
      <div contact>{`${city}, ${state} ${zipCode}`}</div>
    </p>
  );
};

const Contact = (props) => {
  const { firstName, lastName, position, email, phone } = props.contact[0];
  return (
    <p>
      {firstName} {lastName}
      <br />
      {position}
      <br />
      {email}
      <br />
      {phone}
    </p>
  );
};

const renderTooltipContent = (letter, data = null) => {
  switch (letter) {
    case 'a':
      return <Address address={data} />;
    case 'c':
      return <Contact contact={data} />;
    case 'k':
    default:
      return <Key />;
  }
};

const MyTooltip = (props) => {
  const placement = 'right';
  const { letter, data } = props;
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip>{renderTooltipContent(letter, data)}</Tooltip>}
    >
      <Button variant="secondary" className="Tooltip--button">
        {letter.toUpperCase()}
      </Button>
    </OverlayTrigger>
  );
};

export default MyTooltip;
