import React from 'react';
import { Card, CardDeck } from '../components';
import { usePrograms } from '../contexts';

const Marketplace = () => {
  const { programs } = usePrograms();

  return (
    <CardDeck>
      {programs.length ? (
        programs.map((program, index) => (
          <Card key={`${index}-${program.programId}`} program={program} />
        ))
      ) : (
        <p>
          Sorry{' '}
          <span role="img" aria-label="sad face">
            😞
          </span>
          , no residencies
          <span role="img" aria-label="hospital">
            🏥
          </span>{' '}
          found matching your search criteria. Try adjusting your filters
          <span role="img" aria-label="stethoscope and lab coat">
            🩺🥼
          </span>
          .
        </p>
      )}
    </CardDeck>
  );
};

export default Marketplace;
