import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';

import {
  RichTextArticle,
  GenericCard,
} from '@italia/components/ItaliaTheme/View';

const messages = defineMessages({
  altri_documenti: {
    id: 'altri_documenti',
    defaultMessage: 'Documenti correlati',
  },
});

const ServizioAltriDocumenti = ({ content }) => {
  const intl = useIntl();
  return content.altri_documenti?.length > 0 ? (
    <RichTextArticle
      tag_id="altri_documenti_items"
      title={intl.formatMessage(messages.altri_documenti)}
    >
      <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
        {content.altri_documenti.map((item, i) => (
          <GenericCard
            show_icon={'it-files'}
            key={item['@id']}
            item={item}
            showimage={false}
          />
        ))}
      </div>
    </RichTextArticle>
  ) : (
    <></>
  );
};

ServizioAltriDocumenti.propTypes = {
  content: PropTypes.shape({
    altri_documenti: PropTypes.array,
  }),
};
export default ServizioAltriDocumenti;
