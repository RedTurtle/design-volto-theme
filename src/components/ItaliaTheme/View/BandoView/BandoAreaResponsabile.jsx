import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import {
  RichTextArticle,
  OfficeCard,
} from '@italia/components/ItaliaTheme/View';

const messages = defineMessages({
  area_responsabile: {
    id: 'area_responsabile',
    defaultMessage: 'Area responsabile',
  },
});

const BandoAreaResponsabile = ({ content }) => {
  const intl = useIntl();
  return content?.area_responsabile?.length > 0 ? (
    <RichTextArticle
      tag_id="area_responsabile"
      title={intl.formatMessage(messages.area_responsabile)}
    >
      <div className="mb-5 mt-3">
        <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
          {content?.area_responsabile?.map((item, i) => (
            <OfficeCard key={item['@id']} office={item} />
          ))}
        </div>
      </div>
    </RichTextArticle>
  ) : (
    <></>
  );
};

BandoAreaResponsabile.propTypes = {
  content: PropTypes.shape({
    area_responsabile: PropTypes.array,
  }).isRequired,
};
export default BandoAreaResponsabile;
