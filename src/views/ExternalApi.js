import React, { useState } from 'react';
import { useAuth0 } from '../contexts/auth0-context';

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const { getTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getTokenSilently({
        scope: 'read:status, write:program',
        audience: 'https://github.com/tguar/ResidencyAPI',
      });

      console.log(token);
      const response = await fetch(
        'https://residency.azurewebsites.net/categories/health',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const responseData = { result: 'womp' };
      const responseData = await response;
      // console.log(responseData.text());
      setShowResult(true);
      console.log(responseData.statusText);
      let a = responseData.statusText;
      setApiMessage(a);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Ping API</button>
      {showResult && <p>Endpoint status is: {apiMessage} </p>}
    </>
  );
};

export default ExternalApi;
