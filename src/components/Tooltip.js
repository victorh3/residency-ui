import React, { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

const Key = () => {
  return (
    <div>
      <div>
        <span role="img" aria-label="checkmark emoji">
          ✔️{' '}
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
        <span>N/Ap</span> Not Applicable
      </div>
    </div>
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
    <div>
      <div contact>{addressLineOne}</div>
      <div contact>{addressLineTwo}</div>
      <div contact>{`${city}, ${state} ${zipCode}`}</div>
    </div>
  );
};

const Contact = (props) => {
  const { firstName, lastName, position, email, phone } = props.contact[0];
  return (
    <div>
      {firstName} {lastName}
      <br />
      {position}
      <br />
      <a href={`mailto:${email}`}>{email}</a>
      <br />
      <a href={`tel:${phone}`}>{phone}</a>
    </div>
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
  const [show, setShow] = useState(false);
  const tooltipRef = useRef(null);
  const placement = 'left';
  const { letter, data, emoji } = props;
  return (
    <>
      <Button
        ref={tooltipRef}
        variant="outline-dark"
        className="Tooltip--button"
        onClick={() => setShow(!show)}
      >
        {emoji}
      </Button>
      <Overlay target={tooltipRef.current} show={show} placement={placement}>
        {(props) => (
          <Tooltip {...props}>
            {renderTooltipContent(letter, data, emoji)}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default MyTooltip;
