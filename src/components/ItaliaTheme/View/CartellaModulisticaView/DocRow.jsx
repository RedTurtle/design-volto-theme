/**
 * DocRow view component.
 * @module components/theme/View/DocRow
 */

import React, { useState } from 'react';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { DownloadFileFormat } from '@italia/components/ItaliaTheme/View';
import { FontAwesomeIcon } from '@italia/components/ItaliaTheme';
import { Icon } from '@italia/components/ItaliaTheme';
import cx from 'classnames';

/**
 * DocRow view component class.
 * @function DocRow
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */

const Downloads = ({ item, titleDoc }) => {
  return item['@type'] === 'Modulo' ? (
    <React.Fragment>
      {!titleDoc ? (
        <div className="title">{item.title}</div>
      ) : (
        titleDoc !== item.title && <div className="title">{item.title}</div>
      )}
      <div className="downloads">
        <DownloadFileFormat file={item?.file_principale} />
        <DownloadFileFormat file={item?.formato_alternativo_1} />
        <DownloadFileFormat file={item?.formato_alternativo_2} />
      </div>
    </React.Fragment>
  ) : (
    <UniversalLink
      href={flattenToAppURL(item['@id'])}
      title={item.title}
      className="modulistica-link"
    >
      <div className="title">{item.title}</div>
      <FontAwesomeIcon
        icon={['fas', 'link']}
        alt={item.title}
        role="presentation"
        aria-hidden={true}
      />
    </UniversalLink>
  );
};

const DocRow = ({ doc }) => {
  const [itemOpen, setItemOpen] = useState(false);

  return (
    <>
      <div
        className={cx('doc-row', {
          'has-children': doc.items?.length > 1,
        })}
        key={doc['@id']}
      >
        <div className="doc">
          <div
            className={cx('title-wrap', {
              'single-row': doc.items?.length === 1,
            })}
          >
            <div className="title">
              <UniversalLink href={flattenToAppURL(doc['@id'])}>
                {doc.title}
              </UniversalLink>
            </div>
            {doc?.description && (
              <div className="description single-row text-muted">
                {doc.description}
              </div>
            )}
          </div>
        </div>
        {doc.items?.length === 1 && (
          <div className="doc">
            <div className="title">
              <UniversalLink href={flattenToAppURL(doc['@id'])}>
                {doc.title}
                {doc.items?.length > 1 && ` - ${doc.items[0]?.title}`}
              </UniversalLink>
            </div>
            {doc.items?.length === 1 && (
              <Downloads item={doc.items[0]} titleDoc={doc.title} />
            )}
          </div>
        )}
        {doc.items?.length > 1 && (
          <>
            <h3 id="headingAccordion" className="accordion-header">
              <div className="doc">
                <div id={`title-${doc.id}`} className="title">
                  <UniversalLink href={flattenToAppURL(doc['@id'])}>
                    {doc.title}
                  </UniversalLink>
                </div>
              </div>
              <button
                onClick={() => {
                  setItemOpen(itemOpen ? false : true);
                }}
                aria-expanded={itemOpen}
                aria-controls="collapsedContent"
                aria-labelledby={`title-${doc.id}`}
              >
                <Icon
                  color="primary"
                  icon={itemOpen ? 'it-minus' : 'it-plus'}
                  padding={false}
                />
              </button>
            </h3>
            <div
              id="collapsedContent"
              className={cx('accordion-content', { open: itemOpen })}
              role="region"
              aria-labelledby="headingAccordion"
            >
              <div className="accordion-inner">
                {doc.items.map((modulo) => (
                  <div className="doc modulo" key={modulo['@id']}>
                    <Downloads item={modulo} titleDoc={null} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DocRow;
