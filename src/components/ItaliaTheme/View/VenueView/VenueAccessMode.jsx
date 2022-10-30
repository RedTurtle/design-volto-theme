import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import {
  richTextHasContent,
  RichTextArticle,
} from 'design-volto-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  modalita_accesso: {
    id: 'modalita_accesso',
    defaultMessage: 'Modalità di accesso',
  },
});

const VenueAccessMode = ({ content }) => {
  const intl = useIntl();

  return richTextHasContent(content?.modalita_accesso) ? (
    <RichTextArticle
      content={content.modalita_accesso}
      tag_id={'modalita-accesso'}
      title={intl.formatMessage(messages.modalita_accesso)}
    />
  ) : (
    <></>
  );
};

VenueAccessMode.propTypes = {
  content: PropTypes.shape({
    modalita_accesso: PropTypes.object,
  }).isRequired,
};
export default VenueAccessMode;
