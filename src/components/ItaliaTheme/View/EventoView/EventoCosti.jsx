import React from 'react';
import PropTypes from 'prop-types';

import { defineMessages, useIntl } from 'react-intl';

import { RichTextArticle } from 'design-volto-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  costi: {
    id: 'event_costi',
    defaultMessage: 'Costi',
  },
});

const EventoCosti = ({ content }) => {
  const intl = useIntl();

  return (
    <RichTextArticle
      content={content?.prezzo}
      tag_id="costi"
      title={intl.formatMessage(messages.costi)}
    />
  );
};

EventoCosti.propTypes = {
  content: PropTypes.shape({
    prezzo: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default EventoCosti;
