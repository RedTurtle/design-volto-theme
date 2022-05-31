/**
 * Icon component.
 * @module components/ItaliaTheme/Icons/SectionIcon
 */
import React from 'react';
import classNames from 'classnames';

import DesignIcon from './DesignIcon';
import TelegramSVG from './svg/TelegramSVG';
import { FontAwesomeIcon } from '@italia/components/ItaliaTheme';

const Icon = (props) => {
  const { icon, className, color, size, padding } = props;
  if (icon) {
    const classes = classNames(
      'icon',
      className,
      {
        [`icon-${color}`]: color,
        [`icon-${size}`]: size,
        'icon-padded': padding,
      },
      size,
    );

    const parts = icon.split(' ');

    if (icon.indexOf('it-') === 0) {
      return <DesignIcon {...props} className={classes} />;
    } else if (icon === 'telegram') {
      return <TelegramSVG className={classes} />;
    } else if (parts.length > 1) {
      return <FontAwesomeIcon icon={parts} className={`fal ${classes}`} />;
    } else {
      return <FontAwesomeIcon icon={icon} className={`fal ${classes}`} />;
    }
  }
  return null;
};

export default Icon;
