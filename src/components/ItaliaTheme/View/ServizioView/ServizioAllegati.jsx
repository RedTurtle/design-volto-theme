import React from 'react';

import { Attachments } from 'design-volto-theme/components/ItaliaTheme/View';

const ServizioAllegati = ({ content }) => {
  return <Attachments content={content} folder_name={'allegati'} />;
};

export default ServizioAllegati;
