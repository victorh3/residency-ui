import React from 'react';
import { programDetailMap } from '../utils/Constants';

const CardFooterComments = (props) => {
  const { programDetail } = props;
  let programDetailKeys = Object.keys(programDetail);

  programDetailKeys = programDetailKeys.filter((i) => {
    return i.toLowerCase().includes('othercomments') && programDetail[i];
  });

  return (
    <div className="Card__Footer">
      {programDetailKeys.map((detail, index) => (
        <div key={`0.${index}`}>
          <span className="Card--bold CardFooter__comments">
            {programDetailMap.get(detail)}
          </span>
          <span>{programDetail[detail]}</span>
        </div>
      ))}
    </div>
  );
};

export default CardFooterComments;
