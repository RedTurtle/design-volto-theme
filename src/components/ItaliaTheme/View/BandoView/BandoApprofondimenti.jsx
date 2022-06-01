import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { Icon } from '@italia/components/ItaliaTheme';

import {
  Attachment,
  RichTextArticle,
  Module,
} from '@italia/components/ItaliaTheme/View';

const messages = defineMessages({
  allegati: {
    id: 'allegati',
    defaultMessage: 'Documenti allegati',
  },
});

const BandoApprofondimenti = ({ content, designReactKit }) => {
  const intl = useIntl();
  const { Card, CardBody, CardTitle } = designReactKit;

  const getAttachment = (item, i) => {
    if (item.type === 'File' || item.type === 'Image') {
      return (
        <Attachment
          key={item.url + i}
          title={item.title}
          description={item.description}
          download_url={item.url}
          item={item}
        />
        // item={item} viene utilizzato nelle customizzazioni per ottenere altre proprietà
      );
    } else if (item.type === 'Link') {
      return (
        <Card
          className="card card-teaser shadow p-4 mt-3 rounded attachment"
          noWrapper={true}
          tag="div"
        >
          <Icon
            className={undefined}
            icon={'it-external-link'}
            padding={false}
          />
          <CardBody>
            <CardTitle tag="h3" className="title">
              <UniversalLink
                href={flattenToAppURL(item.url)}
                rel="noopener noreferrer"
              >
                {item.title}
              </UniversalLink>
            </CardTitle>
          </CardBody>
        </Card>
      );
    } else if (item.type === 'Documento') {
      return (
        <Card
          className="card card-teaser shadow p-4 mt-3 rounded attachment"
          noWrapper={true}
          tag="div"
        >
          <Icon className={undefined} icon={'it-file'} padding={false} />
          <CardBody>
            <CardTitle tag="h3" className="title">
              <UniversalLink
                item={{
                  ...item,
                  '@id': item.url.replace(/\/view$/, ''),
                }}
                rel="noopener noreferrer"
              >
                {item.title}
              </UniversalLink>
            </CardTitle>
          </CardBody>
        </Card>
      );
    }
  };

  return content?.approfondimento?.length > 0 ? (
    <RichTextArticle
      tag_id="allegati"
      title={intl.formatMessage(messages.allegati)}
    >
      {/* Se ho una sola cartella lascio solo "allegati" altrimenti
      aggiungo gli altri titoli */}
      {content?.approfondimento?.length === 1 ? (
        <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
          {content.approfondimento[0].children.map((item, i) =>
            item.type === 'Modulo' ? (
              <Module
                item={{
                  ...item,
                  '@id': item.url.replace(/\/view$/, ''),
                }}
                key={item.url + i}
              />
            ) : (
              getAttachment(item, i)
            ),
          )}
        </div>
      ) : (
        <>
          {content.approfondimento.map((item, i) => (
            <>
              <h5>{item.title}</h5>
              <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
                {content.approfondimento[i].children.map((inner_item, x) =>
                  inner_item.type === 'Modulo' ? (
                    <Module
                      item={{
                        ...inner_item,
                        '@id': inner_item.url.replace(/\/view$/, ''),
                      }}
                      key={inner_item.url + x}
                    />
                  ) : (
                    getAttachment(inner_item, x)
                  ),
                )}
              </div>
            </>
          ))}
        </>
      )}
    </RichTextArticle>
  ) : (
    <></>
  );
};

BandoApprofondimenti.propTypes = {
  content: PropTypes.shape({
    chiusura_procedimento_bando: PropTypes.string,
    scadenza_bando: PropTypes.string,
    scadenza_domande_bando: PropTypes.string,
    effective: PropTypes.string,
  }).isRequired,
};
export default injectLazyLibs(['designReactKit'])(BandoApprofondimenti);
