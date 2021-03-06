import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Form, Col, Button } from 'react-bootstrap';
import { states as statesList } from './../components/states';
import { toTitleCase } from './../utils/common';
import { useAuth0 } from '../contexts/auth0-context';
import { useHistory } from 'react-router-dom';

const EditProgram = (props) => {
  const { programId } = props.match.params;
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState({});
  const [indexes, setIndexes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { getTokenSilently } = useAuth0();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const token = await getTokenSilently({
        scope: 'read:status, write:program',
        audience: 'https://github.com/tguar/ResidencyAPI',
      });

      axios
        .put(
          `https://residency.azurewebsites.net/programs/${data.programId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              crossDomain: true,
              withCredentials: true,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(history.push('/marketplace'))
        .catch((e) => console.log(e));
      // const responseData = { result: 'womp' };
      // const responseData = await response;
      // console.log(responseData.text());
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    let current = true;
    if (current) {
      axios({
        method: 'get',
        baseURL: `https://residency.azurewebsites.net/programs/${programId}`,
      })
        .then((response) => {
          setData({ ...response.data });
          reset({ ...response.data });
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => (current = false);
    }
  }, [programId, reset]);

  useEffect(() => {
    // https://residency.azurewebsites.net/swagger/index.html
    let current = true;
    if (current) {
      axios({
        method: 'get',
        baseURL: 'https://residency.azurewebsites.net/categories',
      })
        .then((response) => {
          setCategories([...response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => (current = false);
    }
  }, []);

  // useEffect(() => {
  //   const reset = () => {
  //     const result = fetch(
  //       'https://residency.azurewebsites.net/programs/881c96e6-b66c-401b-8c35-9347d6204d47'
  //     ); // result: { firstName: 'test', lastName: 'test2' }
  //     reset(result);
  //   }; // asynchronously reset your form values
  // }, [reset]);

  return (
    <div className="col-md-8 offset-md-2">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
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
              <Form.Control as="select" name="address.state" ref={register}>
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
              <Form.Control
                name="address.zipCode"
                type="string"
                ref={register}
              />
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
          {/* CONTACTS */}

          {data.contacts.map((contact, index) => {
            const fieldName = `contacts[${index}]`;
            return (
              <div key={`contacts.${index}`}>
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
                  <Form.Group
                    as={Col}
                    controlId={`formContacts${`${index}`}Id`}
                  >
                    <Form.Label>Contact {index}</Form.Label>
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
                    <Form.Label>First Name {index}</Form.Label>
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
                    <Form.Label>Last Name {index}</Form.Label>
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
                    <Form.Label>Program {index}</Form.Label>
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
                    <Form.Label>Position {index}</Form.Label>
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
                    <Form.Label>Email {index}</Form.Label>
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
                    <Form.Label>Phone {index}</Form.Label>
                    <Form.Control
                      name={`${fieldName}.phone`}
                      placeholder="111-222-4567"
                      ref={register}
                      type="phone"
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId={`formContacts${`${index}`}Fax`}
                  >
                    <Form.Label>Fax {index}</Form.Label>
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
                  {/* <Button variant="danger" onClick={removeContact(index)}>
                  Remove
                </Button> */}
                </Form.Row>
                <hr />
              </div>
            );
          })}
          {/* RESIDENCY TYPE */}
          <Form.Row>
            <Form.Group as={Col} controlId="formResidencyTypeId">
              <Form.Label>Program Categories</Form.Label>
              <Form.Control
                as="select"
                name="residencyTypeId"
                ref={register}
                //value={categories[0]}
              >
                {categories.map((category, index) => (
                  <option
                    name="residencyTypeId"
                    key={`residencyTypeId.${category.categoryId}${index}`}
                    value={category.categoryId}
                    id={category.categoryId}
                  >
                    {toTitleCase(category.categoryName.toString())}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <hr></hr>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default EditProgram;
