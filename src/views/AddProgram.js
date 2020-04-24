import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Col, Button } from 'react-bootstrap';
import uuid from 'react-uuid';
import { states as statesList } from './../components/states';
import axios from 'axios';
import { toTitleCase } from './../utils/common';
import { formSelect } from './../components/formSelect';

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
  const { register, handleSubmit, watch } = useForm();
  const letterOfRec = watch('programDetail.letterOfRec');
  const complexLevelOneAccepted = watch('programDetail.comlexLevelOneAccepted');
  const complexLevelTwoAccepted = watch('programDetail.comlexLevelTwoAccepted');
  const usmleLevelOneAccepted = watch('programDetail.usmleLevelOneAccepted');
  const usmleLevelTwoAccepted = watch('programDetail.usmleLevelTwoAccepted');

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

        <Form.Row>
          <Form.Group as={Col} controlId="formResidencyType">
            <Form.Label>Program Categories</Form.Label>
            <Form.Control
              as="select"
              name="residencyType"
              ref={register}
              //value={categories[0]}
            >
              {categories.map((category, index) => (
                <option
                  name="residencyType"
                  key={`residencyType.${category.categoryId}${index}`}
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
        <Form.Row>
          <Form.Group as={Col} controlId="formProgramDetailId">
            <Form.Label>Program Detail Id</Form.Label>
            <Form.Control
              name="programDetail.programDetailId"
              type="string"
              value={uuid()}
              ref={register}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formProgramIdInProgramDetail">
            <Form.Label>Program Id</Form.Label>
            <Form.Control
              name="programDetail.programId"
              type="string"
              value={programId}
              ref={register}
              readOnly
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formProgramDetailUrl">
            <Form.Label>URL</Form.Label>
            <Form.Control
              name="programDetail.url"
              type="string"
              placeholder="Url"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formProgramDetailProgramCode">
            <Form.Label>Program Code</Form.Label>
            <Form.Control
              name="programDetail.programCode"
              type="string"
              placeholder="Program Code"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formProgramDetailYear">
            <Form.Label> Year </Form.Label>
            <Form.Control
              name="programDetail.year"
              type="number"
              placeholder="Program year"
              defaultValue="2021"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formProgramDetailLetterOfRec">
            <Form.Label>Letters of Rec</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.letterOfRec"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.letterOfRec"
                  key={`programDetail.letterOfRec.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formProgramDetailNumberOfLetterOfRec">
            <Form.Label> Number of Letters </Form.Label>
            <Form.Control
              name="programDetail.numberOfLetterOfRec"
              type="string"
              ref={register}
              defaultValue=""
              disabled={letterOfRec === 'Yes' ? false : true}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formProgramDetailLetterOfRecDetails">
            <Form.Label> Letter of Rec Details </Form.Label>
            <Form.Control
              name="programDetail.letterOfRecDetails"
              as="textarea"
              rows="2"
              placeholder="Enter details here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formProgramDetailcomlexLevelOneAccepted"
          >
            <Form.Label>Comlex Level 1 Accepted?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.comlexLevelOneAccepted"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.comlexLevelOneAccepted"
                  key={`programDetail.comlexLevelOneAccepted.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formProgramDetailComlexLevelOneMinimumScore"
          >
            <Form.Label> Comlex 1 Min Score </Form.Label>
            <Form.Control
              name="programDetail.comlexLevelOneMininumScore"
              type="string"
              ref={register}
              defaultValue=""
              disabled={complexLevelOneAccepted === 'Yes' ? false : true}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formProgramDetailComlexLevelOneAverageScore"
          >
            <Form.Label> Comlex 1 Avg Score </Form.Label>
            <Form.Control
              name="programDetail.comlexLevelOneAverageScore"
              type="string"
              ref={register}
              defaultValue=""
              disabled={complexLevelOneAccepted === 'Yes' ? false : true}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formProgramDetailComlexLevelTwoComments"
          >
            <Form.Label> Comlex Level 1 Comments </Form.Label>
            <Form.Control
              name="programDetail.comlexLevelOneComments"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formProgramDetailcomlexLevelTwoAccepted"
          >
            <Form.Label>Comlex Level 2 Accepted?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.comlexLevelTwoAccepted"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.comlexLevelTwoAccepted"
                  key={`programDetail.comlexLevelTwoAccepted.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formProgramDetailComlexLevelTwoMinimumScore"
          >
            <Form.Label> Comlex 2 Min Score </Form.Label>
            <Form.Control
              name="programDetail.comlexLevelTwoMininumScore"
              type="string"
              ref={register}
              defaultValue=""
              disabled={complexLevelTwoAccepted === 'Yes' ? false : true}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formProgramDetailComlexLevelTwoAverageScore"
          >
            <Form.Label> Comlex 2 Avg Score </Form.Label>
            <Form.Control
              name="programDetail.comlexLevelTwoAverageScore"
              type="string"
              ref={register}
              defaultValue=""
              disabled={complexLevelTwoAccepted === 'Yes' ? false : true}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formProgramDetailComlexLevelTwoComments"
          >
            <Form.Label> Comlex Level 2 Comments </Form.Label>
            <Form.Control
              name="programDetail.comlexLevelTwoComments"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formProgramDetailUSMLELevelOneAccepted"
          >
            <Form.Label>USMLE Level 1 Accepted?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.usmleLevelOneAccepted"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.usmleLevelOneAccepted"
                  key={`programDetail.usmleLevelOneAccepted.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formProgramDetailUSMLELevelOneMinimumScore"
          >
            <Form.Label> USMLE 1 Min Score </Form.Label>
            <Form.Control
              name="programDetail.comlexLevelOneMininumScore"
              type="string"
              ref={register}
              defaultValue=""
              disabled={usmleLevelOneAccepted === 'Yes' ? false : true}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formProgramDetailComlexLevelOneAverageScore"
          >
            <Form.Label> USMLE 1 Avg Score </Form.Label>
            <Form.Control
              name="programDetail.comlexLevelOneAverageScore"
              type="string"
              ref={register}
              defaultValue=""
              disabled={usmleLevelOneAccepted === 'Yes' ? false : true}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formProgramDetailUSMLELevelOneComments"
          >
            <Form.Label> USMLE Level 1 Comments </Form.Label>
            <Form.Control
              name="programDetail.usmleLevelOneComments"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formProgramDetailUSMLELevelTwoAccepted"
          >
            <Form.Label>USMLE Level 2 Accepted?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.usmleLevelTwoAccepted"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.usmleLevelTwoAccepted"
                  key={`programDetail.usmleLevelTwoAccepted.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group
            as={Col}
            controlId="formProgramDetailUSMLELevelTwoMinimumScore"
          >
            <Form.Label> USMLE 2 Min Score </Form.Label>
            <Form.Control
              name="programDetail.usmleLevelTwoMininumScore"
              type="string"
              ref={register}
              defaultValue=""
              disabled={usmleLevelTwoAccepted === 'Yes' ? false : true}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formProgramDetailUSMLELevelTwoAverageScore"
          >
            <Form.Label> USMLE 2 Avg Score </Form.Label>
            <Form.Control
              name="programDetail.usmleLevelTwoAverageScore"
              type="string"
              ref={register}
              defaultValue=""
              disabled={usmleLevelTwoAccepted === 'Yes' ? false : true}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            as={Col}
            controlId="formProgramDetailUSMLELevelTwoComments"
          >
            <Form.Label> USMLE Level 2 Comments </Form.Label>
            <Form.Control
              name="programDetail.usmleLevelTwoComments"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formProgramDetailPhoto">
            <Form.Label>Photo?</Form.Label>
            <Form.Control as="select" name="programDetail.photo" ref={register}>
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.photo"
                  key={`programDetail.photo.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formProgramDetailCV">
            <Form.Label>CV?</Form.Label>
            <Form.Control as="select" name="programDetail.cv" ref={register}>
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.cv"
                  key={`programDetail.cv.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group md={3} as={Col} controlId="formProgramDetailDeansLetter">
            <Form.Label>Dean's Letter?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.deansLetter"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.deansLetter"
                  key={`programDetail.deansLetter.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            md={9}
            as={Col}
            controlId="formProgramDetailDeansLetterComments"
          >
            <Form.Label>Dean's Letter Comments</Form.Label>
            <Form.Control
              name="programDetail.deansLetterComments"
              type="string"
              placeholder="Dean's Letter comments"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group md={3} as={Col} controlId="formProgramDetailTranscript">
            <Form.Label>Transcript?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.transcript"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.transcript"
                  key={`programDetail.transcript.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            md={9}
            as={Col}
            controlId="formProgramDetailTranscriptComments"
          >
            <Form.Label>Transcript Comments</Form.Label>
            <Form.Control
              name="programDetail.transcriptComments"
              type="string"
              placeholder="Transcript comments"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            md={3}
            as={Col}
            controlId="formProgramDetailPersonalStatement"
          >
            <Form.Label>Personal Statement?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.personalStatement"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.personalStatement"
                  key={`programDetail.personalStatement.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            md={9}
            as={Col}
            controlId="formProgramDetail.personalStatementComments"
          >
            <Form.Label>Personal Statement Comments</Form.Label>
            <Form.Control
              name="programDetail.personalStatementComments"
              type="string"
              placeholder="Personal Statement comments"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group md={3} as={Col} controlId="formProgramDetailResearch">
            <Form.Label>Research?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.research"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.research"
                  key={`programDetail.research.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            md={9}
            as={Col}
            controlId="formProgramDetailResearchComments"
          >
            <Form.Label>Research Comments</Form.Label>
            <Form.Control
              name="programDetail.researchComments"
              type="string"
              placeholder="Research comments"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md={3} as={Col} controlId="formProgramAuditionRotation">
            <Form.Label>Audition Rotation?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.auditionRotation"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.auditionRotation"
                  key={`programDetail.auditionRotation.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            md={9}
            as={Col}
            controlId="formProgramDetailAuditionRotationComments"
          >
            <Form.Label>Audition Rotation Comments</Form.Label>
            <Form.Control
              name="programDetail.auditionRotationComments"
              type="string"
              placeholder="Audition Rotation comments"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md={3} as={Col} controlId="formProgramDOFriendly">
            <Form.Label>DO Friendly?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.doFriendly"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.doFriendly"
                  key={`programDetail.doFriendly.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            md={9}
            as={Col}
            controlId="formProgramDetailDOFriendlyComments"
          >
            <Form.Label>DO Friendly Comments</Form.Label>
            <Form.Control
              name="programDetail.doFriendlyComments"
              type="string"
              placeholder="DO Friendly comments"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group md={3} as={Col} controlId="formProgramIMSFriendly">
            <Form.Label>IMS Friendly?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.imsFriendly"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.imsFriendly"
                  key={`programDetail.imsFriendly.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            md={9}
            as={Col}
            controlId="formProgramDetailIMSFriendlyComments"
          >
            <Form.Label>IMS Friendly Comments</Form.Label>
            <Form.Control
              name="programDetail.imsFriendlyComments"
              type="string"
              placeholder="IMS Friendly comments"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group md={3} as={Col} controlId="formProgramERASApplication">
            <Form.Label>ERAS Application?</Form.Label>
            <Form.Control
              as="select"
              name="programDetail.erasApplication"
              ref={register}
            >
              {formSelect.map((selectOption, index) => (
                <option
                  name="programDetail.erasApplication"
                  key={`programDetail.erasApplication.${selectOption.name}${index}`}
                  value={selectOption.value}
                  id={selectOption.name}
                >
                  {selectOption.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            md={9}
            as={Col}
            controlId="formProgramDetailERASApplicationComments"
          >
            <Form.Label>ERAS Application Comments</Form.Label>
            <Form.Control
              name="programDetail.erasApplicationComments"
              type="string"
              placeholder="ERAS Application comments"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formProgramDetailERASApplicationDate">
            <Form.Label>Application Date Deadline</Form.Label>
            <Form.Control
              name="programDetail.erasApplicationDate"
              type="string"
              value="1/1/2020"
              ref={register}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formProgramDetailNumberOfApplicationsAccepted"
          >
            <Form.Label> Number of Apps Accepted </Form.Label>
            <Form.Control
              name="programDetail.numberOfApplicationsAccepted"
              type="number"
              placeholder="20"
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {' '}
          <Form.Group as={Col} controlId="formProgramDetailOtherCommentsOne">
            <Form.Label> Other Comments 1</Form.Label>
            <Form.Control
              name="programDetail.otherCommentsOne"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {' '}
          <Form.Group as={Col} controlId="formProgramDetailOtherCommentsTwo">
            <Form.Label> Other Comments 2</Form.Label>
            <Form.Control
              name="programDetail.otherCommentsTwo"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {' '}
          <Form.Group as={Col} controlId="formProgramDetailOtherCommentsThree">
            <Form.Label> Other Comments 3</Form.Label>
            <Form.Control
              name="programDetail.otherCommentsThree"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {' '}
          <Form.Group as={Col} controlId="formProgramDetailOtherCommentsFour">
            <Form.Label> Other Comments 4</Form.Label>
            <Form.Control
              name="programDetail.otherCommentsFour"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {' '}
          <Form.Group as={Col} controlId="formProgramDetailOtherCommentsFive">
            <Form.Label> Other Comments 5</Form.Label>
            <Form.Control
              name="programDetail.otherCommentsFive"
              as="textarea"
              rows="2"
              placeholder="Enter comments here..."
              defaultValue=""
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formLastUpdatedByProgramDetail">
            {/* <Form.Label>Last</Form.Label> */}
            <Form.Control
              name="programDetail.lastUpdatedBy"
              type="string"
              value="Seed"
              ref={register}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLastUpdatedDateProgramDetail">
            {/* <Form.Label>AddressId</Form.Label> */}
            <Form.Control
              name="programDetail.lastUpdatedDT"
              type="string"
              value={new Date().toLocaleString()}
              ref={register}
              readOnly
            />
          </Form.Group>
        </Form.Row>

        <hr></hr>
        <Form.Row>
          <Form.Group as={Col} controlId="formLastUpdatedBy">
            {/* <Form.Label>Last</Form.Label> */}
            <Form.Control
              name="lastUpdatedBy"
              type="string"
              value="Seed"
              ref={register}
              readOnly
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formLastUpdatedDt">
            {/* <Form.Label>AddressId</Form.Label> */}
            <Form.Control
              name="lastUpdatedDT"
              type="string"
              value={new Date().toLocaleString()}
              ref={register}
              readOnly
            />
          </Form.Group>
        </Form.Row>
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
