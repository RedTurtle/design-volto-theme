import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import moment from 'moment';
import cx from 'classnames';

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardReadMore,
  Row,
  Col,
} from 'design-react-kit/dist/design-react-kit';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

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

const CardWithoutImageRssTemplate = ({ items = [], isEditMode, data = {} }) => {
  const intl = useIntl();
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
            {items.map((item, index) => (
              <Col lg={3} className="mb-3" key={index}>
                <Card noWrapper={false} tag="div">
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
                      {(item.pubDate || item.date) && (
                        <span>
                          {moment(item.pubDate || item.date).format('DD-MMM-Y')}
                        </span>
                      )}
                    </div>
                    <CardTitle className="big-heading" tag="h5">
                      {item.title}
                    </CardTitle>
                    <CardText tag="p" className="text-serif">
                      {item.contentSnippet}
                    </CardText>
                  </CardBody>
                  <CardReadMore
                    iconName="it-arrow-right"
                    className="ml-4"
                    tag="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item?.link}
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

CardWithoutImageRssTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default CardWithoutImageRssTemplate;
