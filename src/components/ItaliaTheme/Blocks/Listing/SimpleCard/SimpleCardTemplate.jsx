import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'design-react-kit/dist/design-react-kit';
import SimpleCardTemplateDefault from '@italia/components/ItaliaTheme/Blocks/Listing/SimpleCard/SimpleCardTemplateDefault';
import SimpleCardTemplateCompact from '@italia/components/ItaliaTheme/Blocks/Listing/SimpleCard/SimpleCardTemplateCompact';

import { SimpleCardTemplateAppearance_COMPACT } from '@italia/config/Blocks/ListingOptions';

const SimpleCardTemplate = (data) => {
  let content = null;
  switch (data.appearance) {
    case SimpleCardTemplateAppearance_COMPACT:
      content = <SimpleCardTemplateCompact {...data} />;
      break;
    default:
      content = <SimpleCardTemplateDefault {...data} />;
  }

  return <Container className="px-4">{content}</Container>;
};

SimpleCardTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  linkTitle: PropTypes.any,
  linkHref: PropTypes.any,
};

export default SimpleCardTemplate;
