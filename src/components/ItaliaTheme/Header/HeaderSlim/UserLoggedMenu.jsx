/**
 * UserLoggedMenu component.
 * @module components/ItaliaTheme/Header/HeaderSlim/ArLogin
 */

import React from 'react';
//import { Link } from 'react-router-dom';
//import { defineMessages, useIntl } from 'react-intl';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

//const messages = defineMessages({});

const UserLoggedMenu = ({ designReactKit }) => {
  //const intl = useIntl();
  //const { Nav, NavItem, NavLink } = designReactKit;

  return <></>;

  /*Example:

  return (
    <>
      <LinkListItem
        to="/ar/i-miei-servizi"
        title={intl.formatMessage(messages.ar_i_miei_servizi)}
        tag={Link}
      >
        <span>{intl.formatMessage(messages.ar_i_miei_servizi)}</span>
      </LinkListItem>
      <LinkListItem
        to="/ar/le-mie-pratiche"
        title={intl.formatMessage(messages.ar_le_mie_pratiche)}
        tag={Link}
      >
        <span>{intl.formatMessage(messages.ar_le_mie_pratiche)}</span>
      </LinkListItem>
      <LinkListItem
        to="/ar/notifiche"
        title={intl.formatMessage(messages.notifiche)}
        tag={Link}
      >
        <span>{intl.formatMessage(messages.notifiche)}</span>
      </LinkListItem>
    </>
  );
  */
};

export default injectLazyLibs(['designReactKit'])(UserLoggedMenu);
