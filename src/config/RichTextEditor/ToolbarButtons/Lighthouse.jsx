import React from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import showSVG from '@plone/volto/icons/show.svg';

import DraftJsDropdownButton from './DraftJsDropdownButton';

const AlignButtonComponent = (props) => {
  const createBlockStyleButton = props.draftJsCreateBlockStyleButton.default;
  const options = [
    {
      block_type: 'lighthouse_appointment-booking',
      value: createBlockStyleButton({
        blockType: 'lighthouse_appointment-booking',
        children: '1-appointment-booking',
      }),
      contentWhenSelected: '1',
    },
    {
      block_type: 'lighthouse_faq',
      value: createBlockStyleButton({
        blockType: 'lighthouse_faq',
        children: '2-faq',
      }),
      contentWhenSelected: '2',
    },
    {
      block_type: 'lighthouse_report-inefficency',
      value: createBlockStyleButton({
        blockType: 'lighthouse_report-inefficency',
        children: '3-report-inefficency',
      }),
      contentWhenSelected: '3',
    },
    {
      block_type: 'lighthouse_accessibility-link',
      value: createBlockStyleButton({
        blockType: 'lighthouse_accessibility-link',
        children: '4-accessibility-link',
      }),
      contentWhenSelected: '4',
    },
    {
      block_type: 'lighthouse_privacy-policy-link',
      value: createBlockStyleButton({
        blockType: 'lighthouse_privacy-policy-link',
        children: '5-privacy-policy-link',
      }),
      contentWhenSelected: '5',
    },
  ];

  return (
    <DraftJsDropdownButton
      {...props}
      optionsList={options}
      content={<Icon name={showSVG} size="24px" />}
    />
  );
};

export const AlignButton = injectLazyLibs(['draftJsCreateBlockStyleButton'])(
  AlignButtonComponent,
);

export default React.memo(AlignButton);
