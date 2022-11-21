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
        children: 'appointment-booking',
      }),
      contentWhenSelected: <Icon name={showSVG} size="24px" />,
    },
    {
      block_type: 'lighthouse_faq',
      value: createBlockStyleButton({
        blockType: 'lighthouse_faq',
        children: 'faq',
      }),
      contentWhenSelected: <Icon name={showSVG} size="24px" />,
    },
    {
      block_type: 'lighthouse_report-inefficency',
      value: createBlockStyleButton({
        blockType: 'lighthouse_report-inefficency',
        children: 'report-inefficency',
      }),
      contentWhenSelected: <Icon name={showSVG} size="24px" />,
    },
    {
      block_type: 'lighthouse_accessibility-link',
      value: createBlockStyleButton({
        blockType: 'lighthouse_accessibility-link',
        children: 'accessibility-link',
      }),
      contentWhenSelected: <Icon name={showSVG} size="24px" />,
    },
    {
      block_type: 'lighthouse_privacy-policy-link',
      value: createBlockStyleButton({
        blockType: 'lighthouse_privacy-policy-link',
        children: 'privacy-policy-link',
      }),
      contentWhenSelected: <Icon name={showSVG} size="24px" />,
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
