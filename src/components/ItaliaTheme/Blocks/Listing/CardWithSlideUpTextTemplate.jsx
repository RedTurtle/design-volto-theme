import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  CardReadMore,
} from 'design-react-kit/dist/design-react-kit';

import { UniversalLink } from '@plone/volto/components';

import { getCalendarDate } from '@italia/helpers';
import {
  ListingLinkMore,
  ListingCategory,
  getListingImageBackground,
} from '@italia/components/ItaliaTheme';
import { getCategory } from '@italia/components/ItaliaTheme/Blocks/Listing/Commons/utils';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  vedi: {
    id: 'card_vedi',
    defaultMessage: 'Vedi',
  },
});

const CardWithSlideUpTextTemplate = (props) => {
  const intl = useIntl();

  const {
    items,
    title,
    isEditMode,
    linkTitle,
    linkHref,
    show_type = true,
    show_section,
    show_description = true,
    hide_dates = false,
    id_lighthouse,
  } = props;

  return (
    <div className="card-slide-text-template">
      <Container>
        <div className="title">{title && <h2>{title}</h2>}</div>
        <div className="grid mb-3 mt-5">
          {items.map((item, index) => {
            let image = getListingImageBackground(item, 'teaser');
            const category = getCategory(item, show_type, show_section, props);
            const date = hide_dates ? null : getCalendarDate(item);

            return (
              <UniversalLink
                item={!isEditMode ? item : null}
                href={isEditMode ? '#' : null}
                style={{
                  backgroundImage: `url(${image})`,
                }}
                className="listing-item box bg-img"
                key={index}
                data-element={id_lighthouse && id_lighthouse}
              >
                <div className="bg-gradient"></div>
                {(category || date) && (
                  <div className="category">
                    <ListingCategory category={category} item={item} />
                    {category && date && <span>&nbsp;-&nbsp;</span>}
                    {date}
                  </div>
                )}
                <h3 className="title">{item?.title}</h3>
                <div className="box-slide-up">
                  {show_description && item.description && (
                    <p>{item.description}</p>
                  )}
                  <div className="read-more">
                    <CardReadMore
                      iconName="it-arrow-right"
                      tag={UniversalLink}
                      item={!isEditMode ? item : null}
                      href={isEditMode ? '#' : null}
                      text={intl.formatMessage(messages.vedi)}
                      className="justify-content-end"
                    />
                  </div>
                </div>
              </UniversalLink>
            );
          })}
        </div>

        <ListingLinkMore title={linkTitle} href={linkHref} className="my-4" />
      </Container>
    </div>
  );
};

CardWithSlideUpTextTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  linkTitle: PropTypes.any,
  linkHrefs: PropTypes.any,
};

export default CardWithSlideUpTextTemplate;
