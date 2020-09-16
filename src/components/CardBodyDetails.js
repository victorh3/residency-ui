import React from 'react';
import _ from 'lodash';

const CardBodyDetails = (props) => {
  const { programDetail } = props;
  let programDetailKeys = Object.keys(programDetail);

  programDetailKeys = programDetailKeys.filter((i) => {
    if (i.toLowerCase().includes('othercomments')) return false;
    if (i.toLowerCase().includes('programdetailid')) return false;
    if (i.toLowerCase().includes('programid')) return false;
    if (i.toLowerCase().includes('url')) return false;
    if (i.toLowerCase().includes('lastupdatedby')) return false;
    if (i.toLowerCase().includes('lastupdateddt')) return false;
    if (i.toLowerCase().includes('erasapplicationdate')) return false;
    return programDetail[i];
  });

  const renderData = (key, data) => {
    if (data === 'Yes')
      return (
        <span role="img" aria-label="checkmark emoji">
          ✔️
        </span>
      );
    if (data === 'No')
      return (
        <span role="img" aria-label="x emoji">
          ❌{' '}
        </span>
      );
    if (data === 'Not Available') return 'N/Av';
    if (data === 'Not Applicable') return 'N/Ap';
    if (
      key.toLowerCase().includes('date') &&
      !key.toLowerCase().includes('lastupdatedby')
    )
      return new Date(data).toDateString();

    return data;
  };

  return (
    <div className="Card__Body">
      {programDetailKeys.map((detail, index) =>
        detail.toLowerCase().includes('comments') ||
        detail.toLowerCase().includes('details') ||
        detail.toLowerCase().includes('score') ? (
          <div className="Card__BodyDetail" key={`0.${index}`}>
            <div className="Break">
              <div className="Card--bold">{_.startCase(detail)}</div>
              <div>{renderData(detail, programDetail[detail])}</div>
            </div>
          </div>
        ) : (
          <div className="Card__BodyDetail" key={`0.${index}`}>
            <span className="Card--bold">{_.startCase(detail)}</span>
            <span>{renderData(detail, programDetail[detail])}</span>
          </div>
        )
      )}
    </div>
  );
};

export default CardBodyDetails;
