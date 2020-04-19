import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Col, Button } from 'react-bootstrap';
import uuid from 'react-uuid';

const AddProgram = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="col-md-8 offset-md-2">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="programId">
            <Form.Label>ProgramId</Form.Label>
            <Form.Control
              type="string"
              value={uuid()}
              ref={register}
              readonly
            />
          </Form.Group>

          <Form.Group as={Col} controlId="programName">
            <Form.Label>Program Name</Form.Label>
            <Form.Control
              type="string"
              placeholder="Program Name"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" ref={register} />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            ref={register}
          />
        </Form.Group>

        <Form.Row>
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
        </Form.Group>

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
