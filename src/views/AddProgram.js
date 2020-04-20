import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Col, Button } from 'react-bootstrap';
import uuid from 'react-uuid';

const AddProgram = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  const programId = uuid();
  const addressId = uuid();
  const dateTime = new Date().toLocaleString();

  return (
    <div className="col-md-8 offset-md-2">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formProgramId">
            <Form.Label>ProgramId</Form.Label>
            <Form.Control
              name="programId"
              type="string"
              value={programId}
              ref={register}
              readOnly
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formProgramName">
            <Form.Label>Program Name</Form.Label>
            <Form.Control
              name="programName"
              type="string"
              placeholder="Program Name"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formProgramIdInAddress">
            <Form.Label>ProgramId</Form.Label>
            <Form.Control
              name="address.programId"
              type="string"
              value={programId}
              ref={register}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formAddressId">
            <Form.Label>AddressId</Form.Label>
            <Form.Control
              name="address.addressId"
              type="string"
              value={addressId}
              ref={register}
              readOnly
            />
          </Form.Group>
        </Form.Row>
        <hr></hr>
        <Form.Row>
          <Form.Group as={Col} controlId="formAddressLineOne">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control
              name="address.addressLineOne"
              placeholder="1234 Main St"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formAddressLineTwo">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control
              name="address.addressLineTwo"
              placeholder="Apartment, studio, or floor"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control name="address.city" ref={register} />
          </Form.Group>

          <Form.Group as={Col} controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              value="AZ"
              name="address.state"
              ref={register}
            >
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control name="address.zipCode" ref={register} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formLatitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              name="address.latitude"
              placeholder=""
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLongitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              name="address.longitude"
              placeholder=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formLastUpdatedByAddress">
            {/* <Form.Label>Last</Form.Label> */}
            <Form.Control
              name="address.lastUpdatedBy"
              type="string"
              value="Seed"
              ref={register}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLastUpdatedDate">
            {/* <Form.Label>AddressId</Form.Label> */}
            <Form.Control
              name="address.lastUpdatedDT"
              type="string"
              value={dateTime}
              ref={register}
              readOnly
            />
          </Form.Group>
        </Form.Row>
        <hr></hr>
        {/* <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control ref={register} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" value="Choose..." ref={register}>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label ref={register}>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" ref={register} />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {/* <div>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" placeholder="bill" ref={register} />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" placeholder="luo" ref={register} />
        </div>

        <div>
          <label htmlFor="isDeveloper">Is an developer?</label>
          <input
            type="checkbox"
            name="isDeveloper"
            placeholder="luo"
            value="yes"
            ref={register}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="bluebill1049@hotmail.com"
            type="email"
            ref={register}
          />
        </div>
        <input type="submit" /> */}
      </Form>
    </div>
  );
};
export default AddProgram;
