import React from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import targetSVG from '@plone/volto/icons/target.svg';

import DraftJsDropdownButton from './DraftJsDropdownButton';

const LighthouseComponent = (props) => {
  const createBlockStyleButton = props.draftJsCreateBlockStyleButton.default;
  const options = [
    {
      block_type: 'lighthouse_appointment-booking',
      value: createBlockStyleButton({
        blockType: 'lighthouse_appointment-booking',
        children: 'appointment-booking',
      }),
      contentWhenSelected: <Icon name={targetSVG} size="24px" />,
    },
    {
      block_type: 'lighthouse_faq',
      value: createBlockStyleButton({
        blockType: 'lighthouse_faq',
        children: 'faq',
      }),
      contentWhenSelected: <Icon name={targetSVG} size="24px" />,
    },
    {
      block_type: 'lighthouse_report-inefficency',
      value: createBlockStyleButton({
        blockType: 'lighthouse_report-inefficency',
        children: 'report-inefficency',
      }),
      contentWhenSelected: <Icon name={targetSVG} size="24px" />,
    },
    {
      block_type: 'lighthouse_accessibility-link',
      value: createBlockStyleButton({
        blockType: 'lighthouse_accessibility-link',
        children: 'accessibility-link',
      }),
      contentWhenSelected: <Icon name={targetSVG} size="24px" />,
    },
    {
      block_type: 'lighthouse_privacy-policy-link',
      value: createBlockStyleButton({
        blockType: 'lighthouse_privacy-policy-link',
        children: 'privacy-policy-link',
      }),
      contentWhenSelected: <Icon name={targetSVG} size="24px" />,
    },
  ];

  return (
    <DraftJsDropdownButton
      {...props}
      optionsList={options}
      content={<Icon name={targetSVG} size="24px" />}
    />
  );
};

export const AlignButton = injectLazyLibs(['draftJsCreateBlockStyleButton'])(
  LighthouseComponent,
);

export default React.memo(AlignButton);
