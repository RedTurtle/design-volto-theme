import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { GenericCard } from '@italia/components/ItaliaTheme/View';
/**
 * RelateedArticles view component class.
 * @function RelatedArticles
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const RelatedArticles = ({
  id = 'related-articles',
  items,
  title,
  showimage = true,
  title_size,
  show_title = true,
  noMargin = false,
}) => {
  return (
    <article
      id={id}
      className={cx('it-page-section', 'anchor-offset', { 'mt-5': !noMargin })}
    >
      {title && show_title ? (
        title_size === 'h5' ? (
          <h5>{title}</h5>
        ) : (
          <h4 id={`header-${id}`}>{title}</h4>
        )
      ) : null}

      <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
        {items?.map((item, i) => (
          <GenericCard
            key={item['@id']}
            item={item}
            showimage={showimage}
            image_field={'immagine'}
          />
        ))}
      </div>
    </article>
  );
};
export default RelatedArticles;

RelatedArticles.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  items: PropTypes.arrayOf(Object),
  title_size: PropTypes.string,
  show_title: PropTypes.bool,
  showimage: PropTypes.bool,
  noMargin: PropTypes.bool,
};
