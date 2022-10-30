import React from 'react';
import PropTypes from 'prop-types';

import { defineMessages, useIntl } from 'react-intl';

import { Chip, ChipLabel } from 'design-react-kit/dist/design-react-kit';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import {
  RichText,
  RichTextArticle,
  richTextHasContent,
  Gallery,
} from 'design-volto-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  cos_e: {
    id: 'event_cos_e',
    defaultMessage: "Cos'è",
  },
  event_destinatari: {
    id: 'event_destinatari',
    defaultMessage: "L'evento è di interesse per",
  },
  parteciperanno: {
    id: 'parteciperanno',
    defaultMessage: 'Parteciperanno',
  },
});

const EventoCosE = ({ content }) => {
  const intl = useIntl();

  return (
    <RichTextArticle
      tag_id={'text-body'}
      title={intl.formatMessage(messages.cos_e)}
      show_title={false}
      content={content.descrizione_estesa}
    >
      <Gallery content={content} folder_name={'multimedia'} />

      {richTextHasContent(content?.descrizione_destinatari) && (
        <div className="mb-5">
          <RichText
            title_size="h5"
            title={intl.formatMessage(messages.event_destinatari)}
            content={content?.descrizione_destinatari}
          />
        </div>
      )}

      {content?.persone_amministrazione?.length > 0 && (
        <>
          <h5>{intl.formatMessage(messages.parteciperanno)}</h5>
          {content.persone_amministrazione.map((item, i) => (
            <Chip
              color="primary"
              disabled={false}
              large={false}
              simple
              tag="div"
              key={item['@id']}
              className="mr-2"
            >
              <ChipLabel tag="span">
                <UniversalLink href={flattenToAppURL(item['@id'])}>
                  {item.title}
                </UniversalLink>
              </ChipLabel>
            </Chip>
          ))}
        </>
      )}
    </RichTextArticle>
  );
};

EventoCosE.propTypes = {
  content: PropTypes.shape({
    descrizione_estesa: PropTypes.object,
    descrizione_destinatari: PropTypes.shape({
      data: PropTypes.string,
    }),
    persone_amministrazione: PropTypes.array,
  }).isRequired,
};

export default EventoCosE;
