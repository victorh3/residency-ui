import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Form, Col, Button } from 'react-bootstrap';
import { useAuth0 } from '../contexts/auth0-context';
import { formSelect } from './../components/formSelect';
import { useHistory } from 'react-router-dom';

const EditProgramDetail = (props) => {
  const { programDetailId } = props.match.params;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { getTokenSilently } = useAuth0();
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, watch, reset } = useForm();
  const letterOfRec = watch(`letterOfRec`);
  const complexLevelOneAccepted = watch(`comlexLevelOneAccepted`);
  const complexLevelTwoAccepted = watch(`comlexLevelTwoAccepted`);
  const usmleLevelOneAccepted = watch(`usmleLevelOneAccepted`);
  const usmleLevelTwoAccepted = watch(`usmleLevelTwoAccepted`);

  const onSubmit = async (data) => {
    try {
      const token = await getTokenSilently({
        scope: 'read:status, write:program',
        audience: 'https://github.com/tguar/ResidencyAPI',
      });

      axios
        .put(
          `https://residency.azurewebsites.net/programDetails/${data.programDetailId}`,
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
    } catch (error) {
      console.error(error);
    }
  };

  // const onSubmit = (data) => {
  //   console.log(JSON.stringify(data));
  // };

  useEffect(() => {
    let current = true;
    if (current) {
      axios({
        method: 'get',
        baseURL: `https://residency.azurewebsites.net/programDetails/${programDetailId}`,
      })
        .then((response) => {
          setData({ ...response.data });
          reset({ ...response.data });
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      return () => (current = false);
    }
  }, [programDetailId, reset]);

  useEffect(() => {
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

  return (
    <div className="col-md-8 offset-md-2">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formProgramDetailId">
              <Form.Label>Program Detail Id</Form.Label>
              <Form.Control
                name={`programDetailId`}
                type="string"
                // value={program}
                ref={register}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formProgramIdInProgramDetail">
              <Form.Label>Program Id</Form.Label>
              <Form.Control
                name={`programId`}
                type="string"
                // value={programId}
                ref={register}
                readOnly
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formProgramDetailUrl">
              <Form.Label>URL</Form.Label>
              <Form.Control
                name={`url`}
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
                name={`programCode`}
                type="string"
                placeholder="Program Code"
                ref={register}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formProgramDetailYear">
              <Form.Label> Year </Form.Label>
              <Form.Control
                name={`year`}
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
              <Form.Control as="select" name={`letterOfRec`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`letterOfRec`}
                    key={`programDetail.letterOfRec.${selectOption.name}${index}`}
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
              controlId="formProgramDetailNumberOfLetterOfRec"
            >
              <Form.Label> Number of Letters </Form.Label>
              <Form.Control
                name={`numberOfLetterOfRec`}
                type="string"
                ref={register}
                defaultValue=""
                disabled={letterOfRec === 'Yes' ? false : true}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              as={Col}
              controlId="formProgramDetailLetterOfRecDetails"
            >
              <Form.Label> Letter of Rec Details </Form.Label>
              <Form.Control
                name={`letterOfRecDetails`}
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
                name={`comlexLevelOneAccepted`}
                ref={register}
              >
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`comlexLevelOneAccepted`}
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
                name={`comlexLevelOneMininumScore`}
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
                name={`comlexLevelOneAverageScore`}
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
                name={`comlexLevelOneComments`}
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
                name={`comlexLevelTwoAccepted`}
                ref={register}
              >
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`comlexLevelTwoAccepted`}
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
                name={`comlexLevelTwoMininumScore`}
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
                name={`comlexLevelTwoAverageScore`}
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
                name={`comlexLevelTwoComments`}
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
                name={`usmleLevelOneAccepted`}
                ref={register}
              >
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`usmleLevelOneAccepted`}
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
                name={`comlexLevelOneMininumScore`}
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
                name={`comlexLevelOneAverageScore`}
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
                name={`usmleLevelOneComments`}
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
                name={`usmleLevelTwoAccepted`}
                ref={register}
              >
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`usmleLevelTwoAccepted`}
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
                name={`usmleLevelTwoMininumScore`}
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
                name={`usmleLevelTwoAverageScore`}
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
                name={`usmleLevelTwoComments`}
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
              <Form.Control as="select" name={`photo`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`photo`}
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
              <Form.Control as="select" name={`cv`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`cv`}
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
            <Form.Group
              md={3}
              as={Col}
              controlId="formProgramDetailDeansLetter"
            >
              <Form.Label>Dean's Letter?</Form.Label>
              <Form.Control as="select" name={`deansLetter`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`deansLetter`}
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
                name={`deansLetterComments`}
                type="string"
                placeholder="Dean's Letter comments"
                ref={register}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group md={3} as={Col} controlId="formProgramDetailTranscript">
              <Form.Label>Transcript?</Form.Label>
              <Form.Control as="select" name={`transcript`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`transcript`}
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
                name={`transcriptComments`}
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
                name={`personalStatement`}
                ref={register}
              >
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`personalStatement`}
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
                name={`personalStatementComments`}
                type="string"
                placeholder="Personal Statement comments"
                ref={register}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group md={3} as={Col} controlId="formProgramDetailResearch">
              <Form.Label>Research?</Form.Label>
              <Form.Control as="select" name={`research`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`research`}
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
                name={`researchComments`}
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
                name={`auditionRotation`}
                ref={register}
              >
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`auditionRotation`}
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
                name={`auditionRotationComments`}
                type="string"
                placeholder="Audition Rotation comments"
                ref={register}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group md={3} as={Col} controlId="formProgramDOFriendly">
              <Form.Label>DO Friendly?</Form.Label>
              <Form.Control as="select" name={`doFriendly`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`doFriendly`}
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
                name={`doFriendlyComments`}
                type="string"
                placeholder="DO Friendly comments"
                ref={register}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group md={3} as={Col} controlId="formProgramIMSFriendly">
              <Form.Label>IMS Friendly?</Form.Label>
              <Form.Control as="select" name={`imsFriendly`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`imsFriendly`}
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
                name={`imsFriendlyComments`}
                type="string"
                placeholder="IMS Friendly comments"
                ref={register}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group md={3} as={Col} controlId="formProgramERASApplication">
              <Form.Label>ERAS Application?</Form.Label>
              <Form.Control as="select" name={`erasApplication`} ref={register}>
                {formSelect.map((selectOption, index) => (
                  <option
                    name={`erasApplication`}
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
                name={`erasApplicationComments`}
                type="string"
                placeholder="ERAS Application comments"
                ref={register}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              controlId="formProgramDetailERASApplicationDate"
            >
              <Form.Label>Application Date Deadline</Form.Label>
              <Form.Control
                name={`erasApplicationDate`}
                type="string"
                placeholder="1/1/2020"
                ref={register}
              />
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="formProgramDetailNumberOfApplicationsAccepted"
            >
              <Form.Label> Number of Apps Accepted </Form.Label>
              <Form.Control
                name={`numberOfApplicationsAccepted`}
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
                name={`otherCommentsOne`}
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
                name={`otherCommentsTwo`}
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
            <Form.Group
              as={Col}
              controlId="formProgramDetailOtherCommentsThree"
            >
              <Form.Label> Other Comments 3</Form.Label>
              <Form.Control
                name={`otherCommentsThree`}
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
                name={`otherCommentsFour`}
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
                name={`otherCommentsFive`}
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
                name={`lastUpdatedBy`}
                type="string"
                value="Seed"
                ref={register}
                readOnly
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formLastUpdatedDateProgramDetail">
              {/* <Form.Label>AddressId</Form.Label> */}
              <Form.Control
                name={`lastUpdatedDT`}
                type="string"
                value={new Date().toLocaleString()}
                ref={register}
                readOnly
              />
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

export default EditProgramDetail;
