import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import moment from 'moment';
import PropTypes from 'prop-types';

/**
 * PageHeaderNewsItem view component class.
 * @function PageHeaderNewsItem
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */

const messages = defineMessages({
  numero_progressivo_cs: {
    id: 'numero_progressivo_cs',
    defaultMessage: 'Numero del comunicato stampa',
  },
});

const PageHeaderNewsItem = ({ content }) => {
  const intl = useIntl();
  moment.locale(intl.locale);

  return (
    <>
      {content.numero_progressivo_cs && (
        <p className="mb-0">
          <strong>
            {intl.formatMessage(messages.numero_progressivo_cs)}:{' '}
          </strong>
          {content.numero_progressivo_cs}
        </p>
      )}
    </>
  );
};
export default PageHeaderNewsItem;

PageHeaderNewsItem.propTypes = {
  params: PropTypes.shape({
    content: PropTypes.object,
  }),
};
