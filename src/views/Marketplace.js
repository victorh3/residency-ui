import React from 'react';
import { Card, CardDeck } from '../components';
import { usePrograms } from '../contexts';

const Marketplace = () => {
  const { programs, filterSearch } = usePrograms();
  return (
    <CardDeck>
      {programs.length ? (
        programs
          .filter((program) =>
            filterSearch.trim().length
              ? program.programName
                  .toLowerCase()
                  .includes(filterSearch.trim().toLowerCase()) ||
                program.programId
                  .toLowerCase()
                  .includes(filterSearch.trim().toLowerCase())
              : true
          )
          .map((program, index) => (
            <Card
              key={`${index}-${program.programId}`}
              program={program}
              marketplace={true}
            />
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
