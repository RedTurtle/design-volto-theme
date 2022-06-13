import React from 'react';
import { Icon } from '@italia/components/ItaliaTheme';
import { flattenToAppURL } from '@plone/volto/helpers';

/*
 * Customization with image
 *
 * If you have a jpg/png, do like this:
 *
 * <figure className="icon">
 *  <img src={logo} alt="" />
 * </figure>
 *
 * Note the icon class.
 */

const Logo = (props) => (
  <>
    {!props.subsite ? (
      <Icon color="" icon="it-pa" padding={false} size="" />
    ) : (
      <figure className="icon">
        <img
          src={flattenToAppURL(
            props.subsite.subsite_logo.scales?.mini?.download,
          )}
          alt="Logo"
        />
      </figure>
    )}
  </>
);

export default Logo;
