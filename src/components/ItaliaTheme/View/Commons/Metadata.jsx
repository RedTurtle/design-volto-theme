import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import PropTypes from 'prop-types';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { viewDate } from '@italia/helpers';

const messages = defineMessages({
  other_info: {
    id: 'other_info',
    defaultMessage: 'Ulteriori informazioni',
  },
  modified: {
    id: 'modified',
    defaultMessage: 'Ultimo aggiornamento',
  },
  rights: {
    id: 'rights',
    defaultMessage: 'Diritti',
  },
  subjects: {
    id: 'subjects',
    defaultMessage: 'Tags',
  },
});

/**
 * Metadata view component class.
 * @function Metadata
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const Metadata = ({
  content,
  showTags = false,
  noMargin = false,
  title,
  children,
  moment: Moment,
  designReactKit,
}) => {
  const intl = useIntl();
  const moment = Moment.default;
  moment.locale(intl.locale);

  const { Chip, ChipLabel } = designReactKit;

  return (
    <article
      id="metadata"
      className={cx('it-page-section', 'anchor-offset', { 'mt-5': !noMargin })}
    >
      <h4 id="header-metadata" className="mb-3">
        {title || intl.formatMessage(messages.other_info)}
      </h4>
      {children}
      <p className="text-serif mb-0 mt-4">
        {intl.formatMessage(messages.modified)}
      </p>
      <strong>
        {viewDate(intl.locale, moment, content.modified, 'DD-MM-Y HH:MM')}
      </strong>
      {content.rights && (
        <>
          <p className="text-serif mb-0 mt-4">
            {intl.formatMessage(messages.rights)}
          </p>
          <strong>{content.rights}</strong>
        </>
      )}
      {showTags && content.subjects?.length > 0 && (
        <>
          <p className="text-serif mt-4">
            {intl.formatMessage(messages.subjects)}
          </p>
          {content.subjects?.map((item, i) => (
            <Chip
              color=""
              disabled={true}
              large={false}
              simple
              tag="div"
              key={item + i}
              className="mr-2"
            >
              <ChipLabel tag="span">{item}</ChipLabel>
            </Chip>
          ))}
        </>
      )}
    </article>
  );
};

export default injectLazyLibs(['moment', 'designReactKit'])(Metadata);

Metadata.propTypes = {
  content: PropTypes.object,
  showTags: PropTypes.bool,
  noMargin: PropTypes.bool,
  title: PropTypes.string,
};
