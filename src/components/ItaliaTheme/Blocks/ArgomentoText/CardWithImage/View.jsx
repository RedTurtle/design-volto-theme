import React from 'react';
import PropTypes from 'prop-types';
import BodyWrapper from './BodyWrapper';

import Block from './Block';
import { useIntl } from 'react-intl';

const ArgomentoCardWithImageView = ({ data, id }) => {
  const currentIntl = useIntl();
  console.log('content', Object.keys(data));
  return (
    <BodyWrapper data={data} inEditMode={false}>
      <Block
        hasImage={data?.showImage}
        content={data?.image_card_content?.blocks}
        entityMap={data?.image_card_content?.entityMap}
        inEditMode={false}
        intl={currentIntl}
      />
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
