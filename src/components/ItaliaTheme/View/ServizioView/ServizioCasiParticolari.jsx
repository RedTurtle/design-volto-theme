import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';

import { RichTextArticle } from 'design-volto-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  casi_particolari: {
    id: 'casi_particolari',
    defaultMessage: 'Casi particolari',
  },
});

const ServizioCasiParticolari = ({ content }) => {
  const intl = useIntl();
  return (
    <RichTextArticle
      content={content.casi_particolari}
      tag_id={'text-casi_particolari'}
      title={intl.formatMessage(messages.casi_particolari)}
    />
  );
};

ServizioCasiParticolari.propTypes = {
  content: PropTypes.shape({
    casi_particolari: PropTypes.shape({
      data: PropTypes.string,
    }),
  }),
};
export default ServizioCasiParticolari;
