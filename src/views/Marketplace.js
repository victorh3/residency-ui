import React from 'react';
import { Card, CardDeck } from '../components';
import { usePrograms } from '../contexts';
import { threeOptions } from '../utils/Constants';

const Marketplace = () => {
  const { programs, filterSearch, filters } = usePrograms();

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
          .filter(
            (program) =>
              filters.doFriendly.indexOf(
                Object.values(
                  threeOptions.find(
                    (x) => x.expandedValue === program.programDetail.doFriendly
                  )
                )[0]
              ) > -1
          )
          .filter(
            (program) =>
              filters.imsFriendly.indexOf(
                Object.values(
                  threeOptions.find(
                    (x) => x.expandedValue === program.programDetail.imsFriendly
                  )
                )[0]
              ) > -1
          )
          .filter(
            (program) =>
              filters.comlexFriendly.indexOf(
                Object.values(
                  threeOptions.find(
                    (x) =>
                      x.expandedValue ===
                      program.programDetail.comlexLevelOneAccepted
                  )
                )[0]
              ) > -1
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
          , no residencies found matching your search criteria. Try adjusting
          your filters
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
