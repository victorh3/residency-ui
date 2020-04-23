import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Col, Button } from 'react-bootstrap';
import uuid from 'react-uuid';
import { states as statesList } from './../components/states';
import axios from 'axios';
import { toTitleCase } from './../utils/common';

const useResidencyApiGet = (endpoint, filters = {}) => {
  const [data, setData] = useState([]);

  let query = `/${endpoint}`;
  switch (endpoint) {
    case 'categories':
    default:
  }

  // console.log(query);

  useEffect(() => {
    // https://residency.azurewebsites.net/swagger/index.html
    let current = true;
    if (current) {
      axios({
        method: 'get',
        baseURL: 'https://residency.azurewebsites.net',
        url: query,
      })
        .then((response) => {
          setData([...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => (current = false);
    }
  }, [query]);

  return data;
};

const AddProgram = () => {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    alert(JSON.stringify(data));
  };

  const programId = uuid();
  const addressId = uuid();
  // const dateTime = new Date().toLocaleString();

  const addContact = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeContact = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  if (counter < 1) {
    addContact();
  }

  const categories = useResidencyApiGet('categories');

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
              name="address.state"
              ref={register}
              value={statesList[0]}
            >
              {statesList.map((state, index) => (
                <option
                  name="address.state"
                  key={`stateAddressDropdownKey.${index}`}
                  value={state.abbreviation}
                  id={`stateAddressDropdown.${index}`}
                >
                  {state.name}
                </option>
              ))}
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
              value={new Date().toLocaleString()}
              ref={register}
              readOnly
            />
          </Form.Group>
        </Form.Row>

        <hr></hr>

        {indexes.map((index) => {
          const fieldName = `contacts[${index}]`;
          return (
            <div>
              <Form.Row>
                {/* <Form.Group
                  as={Col}
                  controlId={`formProgramIdcontacts[${index}]`}
                >
                  <Form.Label>ProgramId</Form.Label>
                  <Form.Control
                    name={`${fieldName}.programId`}
                    type="string"
                    value={programId}
                    ref={register}
                    readOnly
                  />
                </Form.Group> */}
                <Form.Group as={Col} controlId={`formContacts${`${index}`}Id`}>
                  <Form.Label>Contact {`${index}`}</Form.Label>
                  {/* <Form.Control
                    name={`${fieldName}.Id`}
                    type="string"
                    value={`${fieldName}`}
                    readOnly
                  /> */}
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}ContactId`}
                >
                  <Form.Label>ContactId</Form.Label>
                  <Form.Control
                    name={`${fieldName}.contactId`}
                    type="string"
                    value={uuid()}
                    ref={register}
                    readOnly
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}FirstName`}
                >
                  <Form.Label>First Name {`${index}`}</Form.Label>
                  <Form.Control
                    name={`${fieldName}.firstName`}
                    placeholder="Tom"
                    ref={register}
                    type="string"
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}LasttName`}
                >
                  <Form.Label>Last Name {`${index}`}</Form.Label>
                  <Form.Control
                    name={`${fieldName}.lastName`}
                    placeholder="Smith"
                    ref={register}
                    type="string"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}ProgramName`}
                >
                  <Form.Label>Program {`${index}`}</Form.Label>
                  <Form.Control
                    name={`${fieldName}.programName`}
                    placeholder="Program Name"
                    ref={register}
                    type="string"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}Position`}
                >
                  <Form.Label>Position {`${index}`}</Form.Label>
                  <Form.Control
                    name={`${fieldName}.position`}
                    placeholder="Lead Coordinator"
                    ref={register}
                    type="string"
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}Email`}
                >
                  <Form.Label>Email {`${index}`}</Form.Label>
                  <Form.Control
                    name={`${fieldName}.email`}
                    placeholder="example@gmail.com"
                    type="email"
                    ref={register}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}Phone`}
                >
                  <Form.Label>Phone {`${index}`}</Form.Label>
                  <Form.Control
                    name={`${fieldName}.phone`}
                    placeholder="111-222-4567"
                    ref={register}
                    type="phone"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId={`formContacts${`${index}`}Fax`}>
                  <Form.Label>Fax {`${index}`}</Form.Label>
                  <Form.Control
                    name={`${fieldName}.fax`}
                    placeholder="999-888-3433"
                    ref={register}
                    type="phone"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}LastUpdatedBy`}
                >
                  {/* <Form.Label>{`${index}`}</Form.Label> */}
                  <Form.Control
                    name={`${fieldName}.lastUpdatedBy`}
                    type="string"
                    value="Seed"
                    ref={register}
                    readOnly
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId={`formContacts${`${index}`}LastUpdatedDT`}
                >
                  {/* <Form.Label>AddressId</Form.Label> */}
                  <Form.Control
                    name={`${fieldName}.lastUpdatedDT`}
                    type="string"
                    value={new Date().toLocaleString()}
                    ref={register}
                    readOnly
                  />
                </Form.Group>
                <Button variant="danger" onClick={removeContact(index)}>
                  Remove
                </Button>
              </Form.Row>
              <hr />
            </div>
          );
        })}
        <hr></hr>
        <Form.Group as={Col} controlId="formResidencyType">
          <Form.Label>Program Categories</Form.Label>
          <Form.Control
            as="select"
            name="residencyType"
            ref={register}
            value={categories[0]}
          >
            {categories.map((category) => (
              <option
                name="residencyType"
                key={`.${category.categoryId}`}
                value={category.categoryId}
                id={category.categoryId}
              >
                {toTitleCase(category.categoryName.toString())}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="secondary" onClick={addContact}>
          Add Contact
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default AddProgram;
