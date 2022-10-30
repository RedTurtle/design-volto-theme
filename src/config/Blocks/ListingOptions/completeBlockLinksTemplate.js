import { templatesOptions } from 'design-volto-theme/config/Blocks/ListingOptions';

export const addCompleteBlockLinksTemplateOptions = (
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
    ['show_description'],
    null,
    pos,
  );
  return pos;
};
