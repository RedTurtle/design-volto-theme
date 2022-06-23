import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';

import {
  Card,
  CardBody,
  CardTitle,
  CardReadMore,
  Row,
  Col,
} from 'design-react-kit/dist/design-react-kit';

import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { getViewDate } from '@italia/components/ItaliaTheme/Blocks/RssBlock/utils';

const messages = defineMessages({
  readMore: { id: 'rss_read_more', defaultMessage: 'Read more' },
  noResults: {
    id: 'rss_no_results',
    defaultMessage: 'No results from RSS feed.',
  },
  view_all: {
    id: 'Vedi tutto',
    defaultMessage: 'Vedi tutto',
  },
});

const CardWithImageRssTemplate = ({
  items = [],
  isEditMode,
  data = {},
  moment: Moment,
}) => {
  const intl = useIntl();
  const moment = Moment.default;
  moment.locale(intl.locale);

  return (
    <div className={cx('', { 'public-ui': isEditMode })}>
      {items?.length > 0 ? (
        <>
          {data.title && (
            <Row>
              <Col>
                <h2 className="mb-4 mt-5">{data.title}</h2>
              </Col>
            </Row>
          )}
          <Row>
            {items.map((item) => (
              <Col lg={3} className="mb-3" key={item['@id']}>
                <Card className="card-bg card-img" noWrapper={false} tag="div">
                  {item.enclosure?.url && (
                    <div className="img-responsive-wrapper">
                      <div className="img-responsive img-responsive-panoramic">
                        <figure className="img-wrapper">
                          <img
                            aria-hidden="true"
                            alt={item.title}
                            src={item.enclosure.url}
                            loading="lazy"
                          />
                        </figure>
                      </div>
                    </div>
                  )}
                  <CardBody tag="div">
                    <div className="category-top">
                      {item?.categories?.length > 0 && item.categories[0]._ && (
                        <>
                          <span className="category">
                            {item.categories[0]._}
                          </span>
                          <span className="mx-1">&mdash;</span>
                        </>
                      )}
                      <span>{getViewDate(item.pubDate, moment)}</span>{' '}
                    </div>
                    <CardTitle className="big-heading" tag="h6">
                      {item.title}
                    </CardTitle>
                  </CardBody>
                  <CardReadMore
                    iconName="it-arrow-right"
                    className="ml-4"
                    tag="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item?.url}
                    text={intl.formatMessage(messages.readMore)}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          {data.linkMore && data.linkMoreTitle && (
            <div className="link-button text-center my-4">
              <UniversalLink
                href={flattenToAppURL(data.linkMore)}
                className="btn btn-tertiary"
              >
                {data.linkMoreTitle || intl.formatMessage(messages.view_all)}
              </UniversalLink>
            </div>
          )}
        </>
      ) : data.feed ? (
        <div className="no-rss-feed-results">
          {intl.formatMessage(messages.noResults)}
        </div>
      ) : null}
    </div>
  );
};

CardWithImageRssTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default injectLazyLibs(['moment'])(CardWithImageRssTemplate);
