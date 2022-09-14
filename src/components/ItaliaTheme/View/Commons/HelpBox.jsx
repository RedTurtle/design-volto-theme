import React from 'react';
import PropTypes from 'prop-types';
import { Callout, CalloutTitle } from 'design-react-kit/dist/design-react-kit';
import { Icon } from '@italia/components/ItaliaTheme';
import { RichText } from '@italia/components/ItaliaTheme/View';

const HelpBox = ({ text }) => {
  return text ? (
    <Callout color="" highlight={false} tag="div">
      <CalloutTitle tag="div">
        <Icon
          color=""
          icon="it-info-circle"
          padding={false}
          size=""
          style={{
            ariaHidden: true,
          }}
        />
      </CalloutTitle>

      <p>
        <RichText content={text} />
      </p>
    </Callout>
  ) : null;
};
HelpBox.propTypes = {
  text: PropTypes.object.isRequired,
};

export default HelpBox;
