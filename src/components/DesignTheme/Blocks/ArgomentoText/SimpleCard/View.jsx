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
import { settings } from '~/config';
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
  switch (entityStyle.type) {
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

const ArgomentoSimpleTextCardView = ({ data }) => {
  const intl = useIntl();
  console.log('simplecard', data);
  return (
    <>
      <div className="">
        <div className="">
          <h1>
            {data?.simple_card_title?.blocks?.map(item => (
              <h4>{item.text}</h4>
            ))}
          </h1>
          {data?.simple_card_content?.blocks?.map((item, i) => {
            console.log(styler(data?.simple_card_content?.entityMap[i]));
            return (
              <div>
                {styler(data?.simple_card_content?.entityMap[i], item.text)}
              </div>
            );
          })}
        </div>
      </div>
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
