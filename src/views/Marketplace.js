import React from 'react';
import axios from 'axios';
import { getMockData } from '../constants';
import { Card, CardDeck } from '../components';

const Marketplace = () => {
  axios({
    method: 'get',
    baseURL: 'https://localhost:5003',
    url: '/categories',
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <section className="Marketplace">
      <CardDeck>
        {getMockData.map((residency, index) => (
          <Card key={`${index}-${residency.programId}`} residency={residency} />
        ))}
      </CardDeck>
    </section>
  );
};

export default Marketplace;
