import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Accordion } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Icon,
  ObjectBrowserWidget,
  TextWidget,
  FileWidget,
  CheckboxWidget,
} from '@plone/volto/components';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  cardImage: {
    id: 'cardImage',
    defaultMessage: "Seleziona l'immagine da mostrare",
  },
  cardImageEnable: {
    id: 'cardImageEnable',
    defaultMessage: "Mostra l'immagine",
  },
});

const Sidebar = ({ data, block, onChangeBlock }) => {
  const intl = useIntl();

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="default" defaultMessage="Default" />
        </h2>
      </header>
      <Accordion className="form">
        <Accordion.Content active={true}>
          <FileWidget
            id="CardImage"
            title={intl.formatMessage(messages.cardImage)}
            value={data.image}
            onChange={(name, value) => {
              onChangeBlock(block, {
                ...data,
                image: value,
              });
            }}
          />
          <CheckboxWidget
            id={'CardImageEnable'}
            title={intl.formatMessage(messages.cardImageEnable)}
            value={data['showImage'] ? data['showImage'] : false}
            onChange={(name, value) => {
              onChangeBlock(block, {
                ...data,
                showImage: value,
              });
            }}
          />
        </Accordion.Content>
      </Accordion>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  block: PropTypes.string,
  onChangeBlock: PropTypes.func,
  selected: PropTypes.any,
  setSelected: PropTypes.func,
};

export default injectIntl(Sidebar);
