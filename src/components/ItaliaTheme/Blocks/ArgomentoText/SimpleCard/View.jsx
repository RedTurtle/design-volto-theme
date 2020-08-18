/**
 * View title block.
 * @module components/manage/Blocks/Title/View
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { Portal } from 'react-portal';
import { flattenToAppURL } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import redraft from 'redraft';
import Block from './Block';
/**
 * View title block class.
 * @class View
 * @extends Component
 */

const messages = defineMessages({
  testo_riquadro_semplice: {
    id: 'testo_riquadro_semplice',
    defaultMessage: 'Testo riquadro semplice',
  },
});

const styler = (entityStyle, data) => {
  console.log(entityStyle);
  switch (entityStyle?.['@type']) {
    case 'LINK':
      return (
        <a
          href={entityStyle.data.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data}
        </a>
      );

    default:
      break;
  }
};

const ArgomentoSimpleTextCardView = ({ data, properties }) => {
  const intl = useIntl();
  console.log('simplecard', data.blocks);
  console.log('title with editor', data.simple_card_title);
  console.log(
    'content with textwidget',
    data.simple_card_content,
    data.simple_card_content.entityMap,
  );
  return (
    <>
      <Block
        title={data?.simple_card_title?.blocks[0]?.text}
        content={data?.simple_card_content?.blocks}
        entityMap={data?.simple_card_content?.entityMap}
        inEditMode={false}
      />
    </>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ArgomentoSimpleTextCardView.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ArgomentoSimpleTextCardView;
