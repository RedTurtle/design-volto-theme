import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '@italia/components/ItaliaTheme';

const propTypes = {
  iconName: PropTypes.string,
  date: PropTypes.any,
  href: PropTypes.string,
};

const CardCategory = (props) => {
  const { iconName, date, href, ...attributes } = props;
  const { children, ...rest } = attributes;
  const classes = classNames({
    'category-top': date || ' ',
    'categoryicon-top': iconName,
  });
  // Simple category link
  const categoryLink = href && (
    <a href={href} className="category">
      {children}
    </a>
  );
  const categoryDate = date && <span className="data">{date}</span>;
  // Category with icon
  const categoryText = !href && children && (
    <span className="text">{children}</span>
  );
  const categoryIcon = iconName && <Icon icon={iconName} />;

  return (
    <div className={classes} {...rest}>
      {categoryLink}
      {categoryIcon}

      {categoryText}
      {categoryDate}
    </div>
  );
};

CardCategory.propTypes = propTypes;

export default CardCategory;