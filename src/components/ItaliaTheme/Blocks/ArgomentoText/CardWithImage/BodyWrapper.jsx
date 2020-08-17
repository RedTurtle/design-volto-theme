import React from 'react';
import cx from 'classnames';

const BodyWrapper = ({ data, inEditMode, children }) => {
  return (
    <div>
      <h2>{data.text}</h2>
      <div>{children}</div>
    </div>
  );
};
export default BodyWrapper;
