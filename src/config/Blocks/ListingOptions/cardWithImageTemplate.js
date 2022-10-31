import { defineMessages } from 'react-intl';

import { templatesOptions } from '@italia/config/Blocks/ListingOptions';
import { addSchemaField } from '@italia/config/Blocks/ListingOptions';

const messages = defineMessages({
  always_show_image: {
    id: 'always_show_image',
    defaultMessage: "Mostra l'immagine per tutti gli elementi",
  },
  natural_image_size: {
    id: 'natural_image_size',
    defineMessages: "Non alterare le dimensioni naturali dell'immagine",
  },
  show_topics: {
    id: 'show_topics',
    defaultMessage: 'Mostra gli argomenti',
  },
  set_four_columns: {
    id: 'set_four_columns',
    defaultMessage: 'Disponi su 4 colonne',
  },
  sevice_category_link: {
    id: 'sevice_category_link',
    defaultMessage: 'sevice_category_link',
  },
  newEntry2: {
    id: 'newEntry2',
    defaultMessage: 'newEntry2',
  },
  newEntry3: {
    id: 'newEntry3',
    defaultMessage: 'newEntry3',
  },
  id_lighthouse: {
    id: 'ID Lighthouse',
    defaultMessage: 'ID Lighthouse',
  },
});

export const addCardWithImageTemplateOptions = (
  schema,
  formData,
  intl,
  position = 0,
) => {
  let pos = position;

  pos = templatesOptions(
    schema,
    formData,
    intl,
    [
      'id_lighthouse',
      'always_show_image',
      'natural_image_size',
      'set_four_columns',
      'show_icon',
      'show_section',
      'show_type',
      'hide_dates',
      'show_description',
      'show_topics',
    ],
    {
      always_show_image: {
        default: false,
        label: intl.formatMessage(messages.always_show_image),
      },
      natural_image_size: {
        default: false,
        label: intl.formatMessage(messages.natural_image_size),
      },
      set_four_columns: {
        default: false,
        label: intl.formatMessage(messages.set_four_columns),
      },
      show_section: { default: false },
      hide_dates: { default: false },
      show_topics: { label: intl.formatMessage(messages.show_topics) },
    },
    pos,
  );

  addSchemaField(
    schema,
    'id_lighthouse',
    intl.formatMessage(messages.id_lighthouse),
    null,
    {
      choices: [
        [
          'sevice_category_link',
          intl.formatMessage(messages.sevice_category_link),
        ],
        ['newEntry2', intl.formatMessage(messages.newEntry2)],
        ['newEntry3', intl.formatMessage(messages.newEntry3)],
      ],
      /* default: 'medium', */
    },
    pos,
  );

  return pos;
};
