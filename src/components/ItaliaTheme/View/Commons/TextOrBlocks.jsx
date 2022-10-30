import React from 'react';
import PropTypes from 'prop-types';

import { hasBlocksData } from '@plone/volto/helpers';
import {
  RichText,
  RenderBlocks,
} from 'design-volto-theme/components/ItaliaTheme/View';

/**
 * TextOrBlocks view component class.
 * @function TextOrBlocks
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const TextOrBlocks = ({ content, exclude = ['title', 'description'] }) => {
  /* Render text or blocks in view, skip title and description blocks by default*/
  return (
    <>
      {hasBlocksData(content) ? (
        <RenderBlocks content={content} />
      ) : (
        content.text?.data && (
          <RichText serif={false} content={content.text.data} />
        )
      )}
    </>
  );
};

export default TextOrBlocks;

TextOrBlocks.propTypes = {
  content: PropTypes.any,
};
