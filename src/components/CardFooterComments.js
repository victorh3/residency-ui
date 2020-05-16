import React from 'react';
import _ from 'lodash';

const CardFooterComments = (props) => {
  const { programDetail } = props;
  let programDetailKeys = Object.keys(programDetail);

  programDetailKeys = programDetailKeys.filter((i) => {
    return i.toLowerCase().includes('othercomments') && programDetail[i];
  });

  return (
    <div className="Card__Footer">
      {programDetailKeys.map((detail) => (
        <div>
          <span className="Card--bold CardFooter__comments">
            {_.startCase(detail)}
          </span>
          <span>{programDetail[detail]}</span>
        </div>
      ))}
    </div>
  );
};

export default CardFooterComments;
