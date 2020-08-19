import React from 'react';
import PropTypes from 'prop-types';
import BodyWrapper from './BodyWrapper';

import Block from './Block';

const ArgomentoCardWithImageView = ({ data, id }) => {
  return (
    <BodyWrapper data={data} inEditMode={false}>
      <Block data={data} inEditMode={false} />
    </BodyWrapper>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ArgomentoCardWithImageView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export default ArgomentoCardWithImageView;
