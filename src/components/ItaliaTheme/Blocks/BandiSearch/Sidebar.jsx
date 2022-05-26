import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Accordion } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import {
  SelectWidget,
  Icon,
  ObjectBrowserWidget,
} from '@plone/volto/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import FiltersConfig from '@italia/components/ItaliaTheme/Blocks/BandiSearch/FiltersConfig';

const messages = defineMessages({
  help: {
    id: 'searchBlock_help',
    defaultMessage: 'Seleziona i filtri di ricerca da mostrare nel blocco.',
  },
  primary: {
    id: 'searchBlock_primarycolor',
    defaultMessage: 'Primario',
  },
  secondary: {
    id: 'searchBlock_secondaryColor',
    defaultMessage: 'Secondario',
  },
  tertiary: {
    id: 'searchBlock_tertiaryColor',
    defaultMessage: 'Ternario',
  },
  filter_one: {
    id: 'searchBlock_filter_one',
    defaultMessage: 'Filtro 1',
  },
  filter_two: {
    id: 'searchBlock_filter_two',
    defaultMessage: 'Filtro 2',
  },
  filter_three: {
    id: 'searchBlock_filter_three',
    defaultMessage: 'Filtro 3',
  },
  location_to_search: {
    id: 'location_to_search',
    defaultMessage: 'Posizione in cui cercare',
  },
  bg_color: {
    id: 'searchBlock_bg_color',
    defaultMessage: 'Colore di sfondo',
  },
  button_color: {
    id: 'searchBlock_button_color',
    defaultMessage: 'Colore del bottone',
  },
  styles: {
    id: 'searchBlock_style',
    defaultMessage: 'Aspetto',
  },
  text_filter: {
    id: 'searchBlock_text_filter',
    defaultMessage: 'Filtro di testo',
  },
  venue_filter: {
    id: 'searchBlock_venue_filter',
    defaultMessage: 'Filtro per luoghi',
  },
  date_filter: {
    id: 'searchBlock_date_filter',
    defaultMessage: 'Filtro per date',
  },
});

const Sidebar = (props) => {
  const moment = props.moment.default;
  const [activeAccIndex, setActiveAccIndex] = useState(1);

  function handleAccClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeAccIndex === index ? -1 : index;

    setActiveAccIndex(newIndex);
  }

  let filtersConfig = FiltersConfig(null, moment);

  const filters = Object.keys(filtersConfig).map((k) => [
    k,
    filtersConfig[k].label,
  ]);

  const colors = [
    ['primary', props.intl.formatMessage(messages.primary)],
    ['secondary', props.intl.formatMessage(messages.secondary)],
  ];

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage
            id="SearchBandiBlock"
            defaultMessage="Ricerca bandi"
          />
        </h2>
      </header>
      <Segment>
        <div className="ui form">
          <p className="help">{props.intl.formatMessage(messages.help)}</p>
          <SelectWidget
            id="filter_one"
            title={props.intl.formatMessage(messages.filter_one)}
            value={props.data.filter_one}
            onChange={(id, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                filter_one: value,
              });
            }}
            required={true}
            choices={filters}
          />
          <SelectWidget
            id="filter_two"
            title={props.intl.formatMessage(messages.filter_two)}
            value={props.data.filter_two}
            onChange={(id, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                filter_two: value,
              });
            }}
            choices={filters}
          />
          <SelectWidget
            id="filter_three"
            title={props.intl.formatMessage(messages.filter_three)}
            value={props.data.filter_three}
            onChange={(id, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                filter_three: value,
              });
            }}
            choices={filters}
          />
          <ObjectBrowserWidget
            id="location"
            title={props.intl.formatMessage(messages.location_to_search)}
            value={props.data.location}
            mode={'link'}
            onChange={(name, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                location: value,
              });
            }}
          />
        </div>
      </Segment>
      <Accordion fluid styled className="form">
        <Accordion.Title
          active={activeAccIndex === 1}
          index={1}
          onClick={handleAccClick}
        >
          {props.intl.formatMessage(messages.styles)}
          {activeAccIndex === 1 ? (
            <Icon name={upSVG} size="20px" />
          ) : (
            <Icon name={downSVG} size="20px" />
          )}
        </Accordion.Title>
        <Accordion.Content active={activeAccIndex === 1}>
          <SelectWidget
            id="bg_color"
            title={props.intl.formatMessage(messages.bg_color)}
            value={props.data.bg_color}
            onChange={(id, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                bg_color: value,
              });
            }}
            choices={colors}
          />
          <SelectWidget
            id="button_color"
            title={props.intl.formatMessage(messages.button_color)}
            value={props.data.button_color}
            onChange={(id, value) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                button_color: value,
              });
            }}
            choices={[
              ...colors,
              ['tertiary', props.intl.formatMessage(messages.tertiary)],
            ]}
          />
        </Accordion.Content>
      </Accordion>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default injectLazyLibs(['moment'])(injectIntl(Sidebar));
