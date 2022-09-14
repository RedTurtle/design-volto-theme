/**
 * FooterInfos component.
 * @module components/Footer/FooterInfos
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { defineMessages, useIntl } from 'react-intl';
import { Row, Col } from 'design-react-kit/dist/design-react-kit';
import { ConditionalLink } from '@plone/volto/components';
import { flattenHTMLToAppURL } from '@plone/volto/helpers';
import {
  getEditableFooterColumns,
  getItemsByPath,
} from '@italia/addons/volto-editablefooter';
import {
  FooterNewsletterSubscribe,
  FooterSocials,
} from '@italia/components/ItaliaTheme';

const messages = defineMessages({
  goToPage: {
    id: 'Vai alla pagina',
    defaultMessage: 'Vai alla pagina',
  },
});

const FooterInfos = () => {
  const intl = useIntl();
  const N_COLUMNS = 4;
  const location = useLocation();
  const dispatch = useDispatch();

  const footerConfiguration = useSelector(
    (state) => state.editableFooterColumns?.result,
  );

  useEffect(() => {
    dispatch(getEditableFooterColumns());
  }, [dispatch, location]);

  //filter rootpaths
  const footerColumns = getItemsByPath(
    footerConfiguration,
    location?.pathname?.length ? location.pathname : '/',
  );

  const colWidth =
    12 / (footerColumns.length < N_COLUMNS ? footerColumns.length : N_COLUMNS);

  return (
    <Row tag="div">
      {footerColumns
        .filter((c) => c.visible)
        .map((column, index) => (
          <Col
            lg={colWidth}
            md={colWidth}
            className="pb-2"
            tag="div"
            widths={['xs', 'sm', 'md', 'lg', 'xl']}
            key={index}
          >
            <h4>
              <ConditionalLink
                condition={column.titleLink?.length > 0}
                item={column.titleLink?.[0]}
                to={column.titleLink?.[0]?.['@id'] ? null : ''}
                title={
                  intl.formatMessage(messages.goToPage) + ':' + column.title
                }
              >
                {column.title}
              </ConditionalLink>
            </h4>
            {column.showSocial && <FooterSocials />}

            <div
              dangerouslySetInnerHTML={{
                __html: flattenHTMLToAppURL(column.text.data),
              }}
            />

            {column.newsletterSubscribe && <FooterNewsletterSubscribe />}
          </Col>
        ))}
    </Row>
  );
};

export default FooterInfos;
