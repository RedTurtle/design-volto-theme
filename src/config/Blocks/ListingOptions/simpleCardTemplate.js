import { defineMessages } from 'react-intl';

import {
  addSchemaField,
  addDefaultOptions,
  templatesOptions,
} from '@italia/config/Blocks/ListingOptions';

import { addLighthouseField } from '@italia/config/Blocks/ListingOptions/utils';

const messages = defineMessages({
  appearance: {
    id: 'Aspetto',
    defaultMessage: 'Aspetto',
  },
  simplecard_listing_appearance_description: {
    id: 'simplecard_listing_appearance_description',
    defaultMessage:
      "Qui puoi selezionare, per il template 'Card semplice', un aspetto diverso da quello di default.",
  },
  simplecard_listing_appearance_compact: {
    id: 'simplecard_listing_appearance_compact',
    defaultMessage: 'Compatto',
  },
});

/** SIMPLE CARD TEMPLATE **/
export const SimpleCardTemplateAppearance_COMPACT = 'compact';

export const addSimpleCardTemplateOptions = (
  schema,
  formData,
  intl,
  position = 0,
) => {
  let pos = position;

  pos = addLighthouseField(schema, intl, pos);

  addSchemaField(
    schema,
    'appearance',
    intl.formatMessage(messages.appearance),
    intl.formatMessage(messages.simplecard_listing_appearance_description),
    {
      choices: [
        [
          SimpleCardTemplateAppearance_COMPACT,
          intl.formatMessage(messages.simplecard_listing_appearance_compact),
        ],
      ],
    },
    pos,
  );
  pos++;

  pos = addDefaultOptions(schema, formData, intl, pos);

  if (formData.appearance === SimpleCardTemplateAppearance_COMPACT) {
    pos = templatesOptions(schema, formData, intl, ['show_icon'], null, pos);
  } else {
    pos = templatesOptions(
      schema,
      formData,
      intl,
      [
        'show_icon',
        'hide_dates',
        'show_section',
        'show_type',
        'show_description',
        'show_detail_link',
        'show_path_filters',
      ],
      {
        hide_dates: { default: false },
        show_type: { default: false },
        show_detail_link: { default: false },
        show_path_filters: { default: false },
      },
      pos,
    );
  }
  return pos;
};
