/**
 * FooterInfos component.
 * @module components/Footer/FooterInfos
 */

import React from 'react';

import { defineMessages, useIntl } from 'react-intl';
import {
  Form,
  Label,
  Input,
  Button,
} from 'design-react-kit/dist/design-react-kit';
import { Icon } from 'design-volto-theme/components/ItaliaTheme';

const messages = defineMessages({
  subscribe: {
    id: 'Subscribe',
    defaultMessage: 'Iscriviti',
  },
  subscribeNewsletterLabel: {
    id: 'Iscriviti per ricevere la newsletter',
    defaultMessage: 'Iscriviti per riceverla',
  },
});

const FooterNewsletterSubscribe = () => {
  const intl = useIntl();
  return (
    <Form action="#" className="form-newsletter" method="post" tag="form">
      <Label
        className="text-white font-weight-semibold active"
        htmlFor="input-newsletter"
        style={{
          transition: 'none 0 ease 0',
        }}
        tag="label"
        widths={['xs', 'sm', 'md', 'lg', 'xl']}
      >
        {intl.formatMessage(messages.subscribeNewsletterLabel)}
      </Label>
      <Input
        type="email"
        id="input-newsletter"
        name="input-newsletter"
        placeholder="mail@example.com"
        className="mb-3"
      />
      <Button
        color="primary"
        className="btn-icon"
        type="submit"
        tag="button"
        icon={false}
      >
        <Icon icon="it-mail" color="white" padding={false} size="" />
        <span>{intl.formatMessage(messages.subscribe)}</span>
      </Button>
    </Form>
  );
};

export default FooterNewsletterSubscribe;
