import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';

import { UniversalLink } from '@plone/volto/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { CardCategory } from '@italia/components/ItaliaTheme';
import { getCategory } from '@italia/components/ItaliaTheme/Blocks/Listing/Commons/utils';
import {
  getItemIcon,
  ListingCategory,
  ListingText,
  ListingLinkMore,
} from '@italia/components/ItaliaTheme';
import { getCalendarDate, getEventRecurrenceMore } from '@italia/helpers';

const messages = defineMessages({
  card_detail_label: { id: 'Card detail label', defaultMessage: 'Vedi' },
});

const SimpleCardTemplateDefault = (props) => {
  const intl = useIntl();
  const moment = props.moment.default;
  moment.locale(intl.locale);

  const {
    items,
    isEditMode,
    linkTitle,
    linkHref,
    show_icon = true,
    show_section = true,
    show_type,
    show_description = true,
    show_detail_link,
    detail_link_label,
    title,
    show_block_bg,
    hide_dates,
    path_filters,
    show_path_filters,
    addFilters,
    additionalFilters = [],
  } = props;

  let currentPathFilter = additionalFilters
    ?.filter((f) => {
      return f.i === 'path';
    })
    ?.map((f) => {
      return f.v;
    });

  const [pathFilter, setPathFilter] = useState(currentPathFilter?.[0] || null);

  const getItemClass = (item) => {
    let className = null;
    switch (item['@type']) {
      case 'News Item':
        className = item.tipologia_notizia?.toLowerCase().replace(' ', '_');
        break;
      default:
        className = null;
        break;
    }
    return className;
  };

  const path_filters_buttons =
    show_path_filters && path_filters
      ? Object.keys(path_filters)
          .map((k) => {
            return {
              label: path_filters[k].label,
              path: path_filters[k].path?.[0],
            };
          })
          .filter((f) => f.path)
      : null;

  const addPathFilter = (path) => {
    let new_path = pathFilter === path ? null : path;
    setPathFilter(new_path);
    let filters = [];
    if (new_path) {
      filters = [
        {
          i: 'path',
          o: 'plone.app.querystring.operation.string.absolutePath',
          v: new_path,
        },
      ];
    }
    addFilters(filters);
  };

  const {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardReadMore,
    Button,
    Row,
    Col,
  } = props.designReactKit;

  return (
    <div className="simple-card-default">
      {(title || path_filters_buttons) && (
        <Row
          className={cx('template-header', {
            'with-filters': path_filters_buttons,
          })}
        >
          {title && (
            <Col md={path_filters_buttons ? 6 : 12}>
              <h2
                className={cx('', {
                  'mt-5': !show_block_bg,
                  'mb-4': !path_filters_buttons,
                })}
              >
                {title}
              </h2>
            </Col>
          )}

          {path_filters_buttons && (
            <Col md={title ? 6 : 12} className="path-filter-buttons">
              <div className="path-filter-buttons-wrapper">
                {path_filters_buttons.map((button, i) => (
                  <Button
                    key={i}
                    color="primary"
                    outline={button.path['@id'] !== pathFilter}
                    size="xs"
                    icon={false}
                    tag="button"
                    className="ml-3"
                    onClick={(e) => {
                      addPathFilter(button.path['@id']);
                    }}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>
            </Col>
          )}
        </Row>
      )}

      <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal card-teaser-block-3 mb-3">
        {items.map((item, index) => {
          const icon = show_icon ? getItemIcon(item) : null;
          const itemTitle = item.title || item.id;
          const date = hide_dates ? null : getCalendarDate(item, moment);
          const eventRecurrenceMore = hide_dates
            ? null
            : getEventRecurrenceMore(item, isEditMode);
          const listingText = show_description ? (
            <ListingText item={item} />
          ) : null;
          const category = getCategory(item, show_type, show_section, props);

          return (
            <Card
              className={`align-items-top rounded shadow ${getItemClass(item)}`}
              noWrapper
              teaser
              key={index}
            >
              <CardBody
                className={cx('', {
                  'pb-5': show_detail_link || eventRecurrenceMore,
                })}
              >
                {(icon || category || date) && (
                  <CardCategory iconName={icon} date={date}>
                    {category && (
                      <span className="text font-weight-bold">
                        <ListingCategory category={category} item={item} />
                      </span>
                    )}
                  </CardCategory>
                )}
                <CardTitle tag="h3">
                  <UniversalLink
                    item={!isEditMode ? item : null}
                    href={isEditMode ? '#' : null}
                  >
                    {itemTitle}
                  </UniversalLink>
                </CardTitle>
                {listingText && (
                  <CardText className={cx('', { 'mb-5': eventRecurrenceMore })}>
                    {listingText}
                  </CardText>
                )}
                {eventRecurrenceMore}
                {show_detail_link && (
                  <CardReadMore
                    iconName="it-arrow-right"
                    tag={UniversalLink}
                    item={!isEditMode ? item : null}
                    href={isEditMode ? '#' : null}
                    text={
                      detail_link_label ||
                      intl.formatMessage(messages.card_detail_label)
                    }
                  />
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      <ListingLinkMore title={linkTitle} href={linkHref} className="my-4" />
    </div>
  );
};

SimpleCardTemplateDefault.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  linkTitle: PropTypes.any,
  linkHref: PropTypes.any,
};

export default injectLazyLibs(['moment', 'designReactKit'])(
  SimpleCardTemplateDefault,
);
