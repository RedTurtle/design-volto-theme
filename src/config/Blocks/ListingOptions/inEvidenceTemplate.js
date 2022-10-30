import { defineMessages } from 'react-intl';

import { templatesOptions } from 'design-volto-theme/config/Blocks/ListingOptions';

const messages = defineMessages({
  show_topics: {
    id: 'show_topics',
    defaultMessage: 'Mostra gli argomenti',
  },
});

export const addInEvidenceTemplateOptions = (
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
      'show_icon',
      'show_section',
      'show_type',
      'hide_dates',
      'show_description',
      'show_topics',
    ],
    {
      hide_dates: { default: false },
      show_section: { default: false },
      show_topics: { label: intl.formatMessage(messages.show_topics) },
    },
    pos,
  );
  return pos;
};
