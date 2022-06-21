import React from 'react';
import { Icon } from '@italia/components/ItaliaTheme';
import logo from './logo.png';

/*
 * Customization with image
 *
 * If you have a jpg/png, do like this:
 *
 * <figure className="icon">
 *  <img src={logo} alt="" width="" height="" />
 * </figure>
 *
 * Note the icon class.
 */

const Logo = () => <img src={logo} className="icon" />; //<Icon color="" icon="it-pa" padding={false} size="" />;

export default Logo;
