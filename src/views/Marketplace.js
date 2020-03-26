import React from 'react';
import { getMockData } from '../constants';
import { Card, CardDeck } from '../components';

const Marketplace = () => (
  <section className="Marketplace">
    <CardDeck>
      {getMockData.map((residency, index) => (
        <Card key={`${index}-${residency.programId}`} residency={residency} />
      ))}
    </CardDeck>
  </section>
);

export default Marketplace;
