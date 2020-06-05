/**
 * PaginaArgomentoView view component.
 * @module components/theme/View/PaginaArgomentoView
 */

import React from 'react';
import PropTypes from 'prop-types';
import PaginaArgomentoViewNoBlocks from './PaginaArgomentoViewNoBlocks';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';
import { Helmet } from '@plone/volto/helpers';
import { map } from 'lodash';
import { blocks } from '~/config';
import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
/**
 * PaginaArgomentoView view component class.
 * @function PaginaArgomentoView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

const PaginaArgomentoView = ({ content }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const intl = useIntl();
  const location = useLocation();
  console.log(content);
  console.log(blocksLayoutFieldname);
  return hasBlocksData(content) ? (
    <div id="page-document" className="ui container">
      <Helmet title={content.title} />
      {map(content[blocksLayoutFieldname].items, block => {
        console.log(blocks);
        const Block =
          blocks.blocksConfig[content[blocksFieldname]?.[block]?.['@type']]?.[
            'view'
          ] || null;
        return Block !== null ? (
          <Block
            key={block}
            id={block}
            properties={content}
            data={content[blocksFieldname][block]}
            path={getBaseUrl(location?.pathname || '')}
          />
        ) : (
          <div key={block}>
            {intl.formatMessage(messages.unknownBlock, {
              block: content[blocksFieldname]?.[block]?.['@type'],
            })}
          </div>
        );
      })}
    </div>
  ) : (
    <PaginaArgomentoViewNoBlocks content={content} />
  );
};

export default PaginaArgomentoView;
