import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Form, Col, Button } from 'react-bootstrap';

const EditProgram = (props) => {
  const { programId } = props.match.params;
  const { register, handleSubmit, watch, reset } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    // alert(JSON.stringify(data));
  };

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
        })
        .catch((error) => {
          console.log(error);
        });
      return () => (current = false);
    }
  }, [programId, reset]);

  // useEffect(() => {
  //   const reset = () => {
  //     const result = fetch(
  //       'https://residency.azurewebsites.net/programs/881c96e6-b66c-401b-8c35-9347d6204d47'
  //     ); // result: { firstName: 'test', lastName: 'test2' }
  //     reset(result);
  //   }; // asynchronously reset your form values
  // }, [reset]);

  return (
    <div>
      {/* {isLoading && <p> Loading </p>} */}
      {/* <input type="button" onClick={reset()} /> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formProgramId">
            <Form.Label>ProgramId</Form.Label>
            <Form.Control
              name="programId"
              type="string"
              // value={programId}
              ref={register}
              readOnly
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formProgramName">
            <Form.Label>Program Name</Form.Label>
            <Form.Control
              name="programName"
              type="string"
              // placeholder="Program Name"
              ref={register}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* ) : (
        <p>Not found</p>
      )} */}
    </div>
  );
};

export default EditProgram;
