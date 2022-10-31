import {
  templatesOptions,
  addDefaultOptions,
} from '@italia/config/Blocks/ListingOptions';

import { addLighthouseField } from '@italia/config/Blocks/ListingOptions/utils';

export const addCardWithSlideUpTextTemplateOptions = (
  schema,
  formData,
  intl,
  position = 0,
) => {
  let pos = position;

  pos = addLighthouseField(schema, intl, pos);

  pos = addDefaultOptions(schema, formData, intl, pos);

  pos = templatesOptions(
    schema,
    formData,
    intl,
    ['show_section', 'show_type', 'hide_dates', 'show_description'],
    {
      show_section: { default: false },
      hide_dates: { default: false },
    },
    pos,
  );
  return pos;
};
