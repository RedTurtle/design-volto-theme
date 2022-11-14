/**
 * FooterSmall component.
 * @module components/theme/Footer/FooterSmall
 */

import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';
import { Container } from 'design-react-kit/dist/design-react-kit';
import { getSiteProperty } from '@italia/helpers';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubFooter, getItemsByPath } from '@italia/addons/volto-subfooter';
import { flattenToAppURL } from '@plone/volto/helpers';
import { displayBanner } from '@italia/addons/volto-gdpr-privacy';

const messages = defineMessages({
  goToPage: {
    id: 'Vai alla pagina',
    defaultMessage: 'Vai alla pagina',
  },
  cookieSettings: {
    id: 'Impostazioni cookie footer',
    defaultMessage: 'Impostazioni cookie',
  },
});

/**
 * FooterSmall component class.
 * @class FooterSmall
 * @extends Component
 */
const FooterSmall = () => {
  const intl = useIntl();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const [links, setLinks] = useState([]);

  const subFooter = useSelector((state) => state.subFooter?.result);
  const subFooterItems = getItemsByPath(subFooter, pathname)?.filter(
    (item) => item.visible,
  );

  useEffect(() => {
    dispatch(getSubFooter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let _links = getSiteProperty('smallFooterLinks', intl.locale) ?? [];
    setLinks(_links);
  }, [intl.locale]);

  return subFooterItems?.length > 0 || links.length > 0 || true ? (
    <div className="it-footer-small-prints clearfix">
      <Container tag="div">
        <h3 className="sr-only">{intl.formatMessage(messages.goToPage)}</h3>
        <ul className="it-footer-small-prints-list list-inline mb-0 d-flex flex-column flex-md-row">
          {subFooterItems?.length > 0 &&
            subFooterItems.map((item, index) => {
              let url =
                item.href || flattenToAppURL(item.linkUrl?.[0]?.['@id']) || '/';
              return (
                <li
                  className={cx('list-inline-item', {
                    'in-evidence': item.inEvidence,
                  })}
                  key={url + index}
                >
                  <UniversalLink
                    data-element={item.id_lighthouse}
                    href={url}
                    title={item.title}
                  >
                    {item.title}
                  </UniversalLink>
                </li>
              );
            })}
          {links?.length > 0 &&
            links.map((link) => (
              <li className="list-inline-item" key={link.url}>
                <UniversalLink href={link.url} title={link.title}>
                  {link.title}
                </UniversalLink>
              </li>
            ))}
          <li className="list-inline-item">
            <UniversalLink
              className="footer-gdpr-privacy-show-banner"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                dispatch(displayBanner(true, true));
              }}
              title={intl.formatMessage(messages.cookieSettings)}
              data-element="privacy-policy-link"
            >
              {intl.formatMessage(messages.cookieSettings)}
            </UniversalLink>
          </li>
        </ul>
      </Container>
    </div>
  ) : null;
};

export default FooterSmall;
