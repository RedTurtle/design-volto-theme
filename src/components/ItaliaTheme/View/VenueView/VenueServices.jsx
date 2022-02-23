import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { RelatedArticles } from '@italia/components/ItaliaTheme/View';

const messages = defineMessages({
  related_services: {
    id: 'related_services',
    defaultMessage: 'Servizi',
  },
});

const VenueServices = ({ content }) => {
  const intl = useIntl();

  return content?.venue_services?.length > 0 ? (
    <RelatedArticles
      id="venue_services"
      items={content.venue_services}
      title={intl.formatMessage(messages.related_services)}
    />
  ) : (
    <></>
  );
};

VenueServices.propTypes = {
  content: PropTypes.shape({
    venue_services: PropTypes.array,
  }).isRequired,
};

export default VenueServices;
